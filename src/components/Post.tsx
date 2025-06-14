
import React, { useState, useCallback, memo } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import CommentsSection from './CommentsSection';
import OptimizedImage from './OptimizedImage';
import AccessibleButton from './AccessibleButton';
import useTouchHandler from '../hooks/useTouchHandler';
import usePerformanceMonitoring from '../hooks/usePerformanceMonitoring';

interface PostProps {
  post: {
    id: number;
    author: {
      name: string;
      avatar: string;
      verified: boolean;
    };
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
  };
}

const Post: React.FC<PostProps> = memo(({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const { trackInteractionStart, trackInteractionEnd } = usePerformanceMonitoring('Post');

  const handleLike = useCallback(() => {
    trackInteractionStart();
    setLiked(prev => !prev);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    trackInteractionEnd('like');
  }, [liked, trackInteractionStart, trackInteractionEnd]);

  const handleToggleComments = useCallback(() => {
    trackInteractionStart();
    setShowComments(prev => !prev);
    trackInteractionEnd('toggle-comments');
  }, [trackInteractionStart, trackInteractionEnd]);

  const handleShare = useCallback(() => {
    trackInteractionStart();
    // Implement share functionality
    console.log('Share post:', post.id);
    trackInteractionEnd('share');
  }, [post.id, trackInteractionStart, trackInteractionEnd]);

  const touchHandlers = useTouchHandler({
    onTap: handleLike,
    onLongPress: () => console.log('Long press on post'),
  });

  return (
    <Card className="bg-white shadow-sm border-0 shadow-gray-100" role="article" aria-labelledby={`post-${post.id}`}>
      <CardContent className="p-0">
        {/* Post Header */}
        <header className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatar} alt={`${post.author.name}'s profile picture`} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <h3 id={`post-${post.id}`} className="font-semibold text-gray-900">{post.author.name}</h3>
                {post.author.verified && (
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center" aria-label="Verified account">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <time className="text-gray-500 text-sm" dateTime={post.timestamp}>
                {post.timestamp}
              </time>
            </div>
          </div>
          <AccessibleButton 
            variant="ghost" 
            size="sm" 
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="More options"
            tooltip="More options"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </AccessibleButton>
        </header>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-gray-900 leading-relaxed" aria-label="Post content">
            {post.content}
          </p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="relative" {...touchHandlers}>
            <OptimizedImage
              src={post.image}
              alt="Post image"
              className="w-full h-96"
              onLoad={() => console.log('Image loaded')}
            />
          </div>
        )}

        {/* Post Stats */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-1" aria-label="Reaction types">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">❤️</span>
                </div>
              </div>
              <span aria-label={`${likeCount} people liked this post`}>
                {likeCount} {likeCount === 1 ? 'like' : 'likes'}
              </span>
            </div>
            <div className="flex space-x-4">
              <AccessibleButton
                variant="ghost"
                size="sm"
                className="hover:underline p-0 h-auto font-normal text-sm text-gray-500"
                onClick={handleToggleComments}
                aria-label={`${post.comments} comments on this post`}
                aria-expanded={showComments}
              >
                {post.comments} {post.comments === 1 ? 'comment' : 'comments'}
              </AccessibleButton>
              <span aria-label={`${post.shares} people shared this post`}>
                {post.shares} {post.shares === 1 ? 'share' : 'shares'}
              </span>
            </div>
          </div>
        </div>

        {/* Post Actions */}
        <div className="px-4 py-2" role="toolbar" aria-label="Post actions">
          <div className="flex items-center justify-between">
            <AccessibleButton
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                liked ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={handleLike}
              aria-label={liked ? 'Unlike this post' : 'Like this post'}
              aria-pressed={liked}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span className="font-medium">Like</span>
            </AccessibleButton>
            
            <AccessibleButton 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-6 py-3 rounded-lg"
              onClick={handleToggleComments}
              aria-label={showComments ? 'Hide comments' : 'Show comments'}
              aria-expanded={showComments}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Comment</span>
            </AccessibleButton>
            
            <AccessibleButton 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-6 py-3 rounded-lg"
              onClick={handleShare}
              aria-label="Share this post"
            >
              <Share className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </AccessibleButton>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection postId={post.id} isVisible={showComments} />
      </CardContent>
    </Card>
  );
});

Post.displayName = 'Post';

export default Post;
