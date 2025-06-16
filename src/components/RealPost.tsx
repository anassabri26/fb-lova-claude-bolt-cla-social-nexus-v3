import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AccessibleButton from './AccessibleButton';
import { Post, useLikePost } from '@/hooks/usePosts';
import { useComments, useCreateComment } from '@/hooks/useComments';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface RealPostProps {
  post: Post;
}

const RealPost = ({ post }: RealPostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(post.user_has_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const { user } = useAuth();
  const likeMutation = useLikePost();
  const { data: comments, isLoading: commentsLoading } = useComments(post.id);
  const createCommentMutation = useCreateComment();

  const handleLike = async () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);
    
    try {
      await likeMutation.mutateAsync({ postId: post.id, isLiked });
    } catch (error) {
      setIsLiked(isLiked);
      setLikesCount(post.likes_count || 0);
    }
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
      toast.success('Link copied to clipboard!');
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
        toast.error('Failed to post comment');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  return (
    <Card className="card-responsive shadow-sm hover:shadow-md transition-shadow bg-white border border-gray-200">
      <CardContent className="p-0">
        <div className="spacing-responsive flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="avatar-responsive">
              <AvatarImage src={post.profiles?.avatar_url} />
              <AvatarFallback className="bg-blue-500 text-white">
                {post.profiles?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer text-responsive-sm">
                {post.profiles?.full_name || 'Anonymous User'}
              </h3>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <AccessibleButton variant="ghost" size="sm" className="hover:bg-gray-100 touch-target">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </AccessibleButton>
        </div>

        <div className="px-4 pb-3">
          <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-responsive-base">{post.content}</p>
        </div>

        {post.image_url && (
          <div className="w-full">
            <img
              src={post.image_url}
              alt="Post content"
              className="image-responsive w-full h-auto max-h-96 object-cover cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => window.open(post.image_url, '_blank')}
            />
          </div>
        )}

        <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-500 border-b border-gray-100">
          <div className="flex items-center space-x-1">
            {likesCount > 0 && (
              <>
                <div className="flex -space-x-1">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <ThumbsUp className="w-3 h-3 text-white" />
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

        <div className="px-4 py-2 flex items-center justify-between">
          <AccessibleButton
            variant="ghost"
            className={`flex items-center space-x-2 button-responsive rounded-lg transition-colors ${
              isLiked 
                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={handleLike}
            disabled={likeMutation.isPending}
          >
            <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium text-responsive-sm">Like</span>
          </AccessibleButton>

          <AccessibleButton
            variant="ghost"
            className="flex items-center space-x-2 button-responsive rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium text-responsive-sm">Comment</span>
          </AccessibleButton>

          <AccessibleButton
            variant="ghost"
            className="flex items-center space-x-2 button-responsive rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={handleShare}
          >
            <Share className="w-5 h-5" />
            <span className="font-medium text-responsive-sm">Share</span>
          </AccessibleButton>
        </div>

        {showComments && (
          <div className="border-t border-gray-200 bg-gray-50">
            {commentsLoading ? (
              <div className="px-4 py-4 text-center text-gray-500">
                Loading comments...
              </div>
            ) : comments && comments.length > 0 ? (
              <div className="px-4 py-3 space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={comment.profiles?.avatar_url} />
                      <AvatarFallback className="bg-gray-400 text-white text-xs">
                        {comment.profiles?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                        <p className="font-semibold text-sm text-gray-900">
                          {comment.profiles?.full_name || 'Anonymous User'}
                        </p>
                        <p className="text-gray-800 break-words text-responsive-sm">{comment.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-3">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-center text-gray-500 text-responsive-sm">
                No comments yet. Be the first to comment!
              </div>
            )}
            
            <div className="px-4 py-4 border-t border-gray-200 bg-white">
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
                    className="rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-responsive-sm"
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
  );
};

export default RealPost;