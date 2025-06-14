
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import OptimizedImage from './OptimizedImage';
import AccessibleButton from './AccessibleButton';
import CommentSystem from './CommentSystem';
import { toast } from 'sonner';

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

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    toast.success('Post shared!');
  };

  return (
    <Card className="bg-white shadow-sm border-0 shadow-gray-100 mb-4">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatar} alt={`${post.author.name}'s profile`} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-gray-900 text-sm">{post.author.name}</h3>
                {post.author.verified && (
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <AccessibleButton
            variant="ghost"
            size="sm"
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </AccessibleButton>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-gray-900 leading-relaxed">{post.content}</p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="relative">
            <OptimizedImage
              src={post.image}
              alt="Post content"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        {/* Reaction Summary */}
        <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-3 h-3 text-white" />
              </div>
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
            <span>{likesCount}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleComment}
              className="hover:underline"
            >
              {commentsCount} comments
            </button>
            <span>{post.shares} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-100 px-4 py-2">
          <div className="flex justify-around">
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors ${
                isLiked 
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              aria-label={isLiked ? 'Unlike post' : 'Like post'}
              aria-pressed={isLiked}
            >
              <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">Like</span>
            </AccessibleButton>
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleComment}
              className="flex-1 flex items-center justify-center space-x-2 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              aria-label="Comment on post"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Comment</span>
            </AccessibleButton>
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex-1 flex items-center justify-center space-x-2 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              aria-label="Share post"
            >
              <Share className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </AccessibleButton>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSystem 
          postId={post.id} 
          isVisible={showComments} 
          onClose={() => setShowComments(false)} 
        />
      </CardContent>
    </Card>
  );
};

export default Post;
