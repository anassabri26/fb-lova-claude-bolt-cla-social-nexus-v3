import React, { useState, memo } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp, Bookmark, Download } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/ui/LazyImage';
import PhotoViewer from '@/components/PhotoViewer';
import { Post, useLikePost } from '@/hooks/usePosts';
import { useComments, useCreateComment } from '@/hooks/useComments';
import { useAuth } from '@/contexts/AuthContext';
import { formatTimeAgo } from '@/lib/utils';
import ReactionPicker from '@/components/ReactionPicker';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = memo(({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(post.user_has_liked || false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  
  const { user } = useAuth();
  const likeMutation = useLikePost();
  const { data: comments, isLoading: commentsLoading } = useComments(post.id);
  const createCommentMutation = useCreateComment();

  const handleLike = async () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);
    setReaction(newIsLiked ? '👍' : null);
    
    try {
      await likeMutation.mutateAsync({ postId: post.id, isLiked });
    } catch (error) {
      setIsLiked(isLiked);
      setLikesCount(post.likes_count || 0);
      setReaction(isLiked ? '👍' : null);
    }
  };

  const handleReaction = async (emoji: string) => {
    setShowReactionPicker(false);
    
    if (reaction === emoji) {
      // Remove reaction
      setReaction(null);
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      // Set new reaction
      const wasLiked = !!reaction;
      setReaction(emoji);
      setIsLiked(true);
      setLikesCount(prev => wasLiked ? prev : prev + 1);
    }
    
    try {
      await likeMutation.mutateAsync({ 
        postId: post.id, 
        isLiked: !isLiked || reaction !== emoji,
        reaction: emoji
      });
    } catch (error) {
      // Revert on error
      setReaction(reaction);
      setIsLiked(isLiked);
      setLikesCount(post.likes_count || 0);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.profiles?.full_name}`,
        text: post.content,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleComment = async () => {
    if (newComment.trim()) {
      try {
        await createCommentMutation.mutateAsync({ 
          postId: post.id, 
          content: newComment.trim() 
        });
        setNewComment('');
      } catch (error) {
        // Handle error silently
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  const handleImageClick = () => {
    if (post.image_url) {
      setShowPhotoViewer(true);
    }
  };

  const handleDownload = () => {
    if (post.image_url) {
      const link = document.createElement('a');
      link.href = post.image_url;
      link.download = `post-${post.id}.jpg`;
      link.click();
    }
  };

  // Mock photos for photo viewer
  const photos = post.image_url ? [{
    id: post.id,
    url: post.image_url,
    caption: post.content,
    author: {
      name: post.profiles?.full_name || 'Anonymous User',
      avatar: post.profiles?.avatar_url || ''
    },
    likes: likesCount,
    comments: comments?.length || 0,
    timestamp: formatTimeAgo(post.created_at)
  }] : [];

  return (
    <>
      <Card className="card-responsive shadow-sm hover:shadow-md transition-shadow bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-0">
          {/* Post Header */}
          <div className="spacing-responsive flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="avatar-responsive">
                <AvatarImage src={post.profiles?.avatar_url} />
                <AvatarFallback className="bg-blue-500 text-white">
                  {post.profiles?.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer text-responsive-sm dark:text-gray-100">
                  {post.profiles?.full_name || 'Anonymous User'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(post.created_at)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="hover:bg-gray-100 touch-target dark:hover:bg-gray-700"
                disabled={!post.image_url}
              >
                <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 touch-target dark:hover:bg-gray-700">
                <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </Button>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-3">
            <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-responsive-base dark:text-gray-100">
              {post.content}
            </p>
          </div>

          {/* Post Media */}
          {post.image_url && (
            <div className="w-full">
              <LazyImage
                src={post.image_url}
                alt="Post content"
                className="w-full h-auto max-h-96 cursor-pointer hover:opacity-95 transition-opacity"
                onClick={handleImageClick}
              />
            </div>
          )}

          {/* Reaction Summary */}
          <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-500 border-b border-gray-100 dark:border-gray-700 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              {likesCount > 0 && (
                <>
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      {reaction ? (
                        <span className="text-xs">{reaction}</span>
                      ) : (
                        <ThumbsUp className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="hover:underline cursor-pointer text-responsive-sm">
                    {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                  </span>
                </>
              )}
            </div>
            <div className="flex space-x-4 text-responsive-sm">
              <span className="hover:underline cursor-pointer" onClick={() => setShowComments(!showComments)}>
                {comments?.length || 0} {comments?.length === 1 ? 'comment' : 'comments'}
              </span>
              <span>0 shares</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="relative">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 button-responsive rounded-lg transition-colors ${
                    isLiked 
                      ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30' 
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                  onMouseEnter={() => setShowReactionPicker(true)}
                  onMouseLeave={() => setShowReactionPicker(false)}
                  onClick={handleLike}
                  disabled={likeMutation.isPending}
                >
                  {reaction ? (
                    <span className="text-xl mr-2">{reaction}</span>
                  ) : (
                    <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  )}
                  <span className="font-medium text-responsive-sm">
                    {reaction ? 'React' : 'Like'}
                  </span>
                </Button>
                
                {showReactionPicker && (
                  <ReactionPicker 
                    onSelect={handleReaction} 
                    position="top"
                    className="z-10"
                  />
                )}
              </div>

              <Button
                variant="ghost"
                className="flex items-center space-x-2 button-responsive rounded-lg text-gray-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium text-responsive-sm">Comment</span>
              </Button>

              <Button
                variant="ghost"
                className="flex items-center space-x-2 button-responsive rounded-lg text-gray-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={handleShare}
              >
                <Share className="w-5 h-5" />
                <span className="font-medium text-responsive-sm">Share</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={`${isSaved ? 'text-yellow-600' : 'text-gray-600 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
              {commentsLoading ? (
                <div className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                  Loading comments...
                </div>
              ) : comments && comments.length > 0 ? (
                <div className="px-4 py-3 space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={comment.profiles?.avatar_url} />
                        <AvatarFallback className="bg-gray-400 text-white text-xs dark:bg-gray-600">
                          {comment.profiles?.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-lg px-3 py-2 shadow-sm dark:bg-gray-800">
                          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                            {comment.profiles?.full_name || 'Anonymous User'}
                          </p>
                          <p className="text-gray-800 break-words text-responsive-sm dark:text-gray-200">
                            {comment.content}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-3 dark:text-gray-400">
                          {formatTimeAgo(comment.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-3 text-center text-gray-500 text-responsive-sm dark:text-gray-400">
                  No comments yet. Be the first to comment!
                </div>
              )}
              
              {/* Add Comment */}
              <div className="px-4 py-4 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="flex space-x-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      {user?.user_metadata?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex space-x-2">
                    <Input
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-responsive-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      disabled={createCommentMutation.isPending}
                    />
                    <Button 
                      onClick={handleComment} 
                      size="sm"
                      disabled={!newComment.trim() || createCommentMutation.isPending}
                      className="rounded-full px-4 button-responsive"
                    >
                      {createCommentMutation.isPending ? 'Posting...' : 'Post'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photo Viewer */}
      {showPhotoViewer && photos.length > 0 && (
        <PhotoViewer
          photos={photos}
          currentIndex={0}
          isOpen={showPhotoViewer}
          onClose={() => setShowPhotoViewer(false)}
          onNavigate={() => {}}
        />
      )}
    </>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;