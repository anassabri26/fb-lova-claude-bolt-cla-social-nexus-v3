
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AccessibleButton from './AccessibleButton';
import { Post, useLikePost } from '@/hooks/usePosts';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface RealPostProps {
  post: Post;
}

const RealPost = ({ post }: RealPostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(post.user_has_liked || false);
  const likeMutation = useLikePost();

  const handleLike = () => {
    setIsLiked(!isLiked);
    likeMutation.mutate({ postId: post.id, isLiked });
  };

  const handleShare = () => {
    toast.success('Post shared!');
  };

  const handleComment = () => {
    if (newComment.trim()) {
      // TODO: Implement comment creation
      toast.success('Comment functionality coming soon!');
      setNewComment('');
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.profiles?.avatar_url} />
              <AvatarFallback>{post.profiles?.full_name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{post.profiles?.full_name || 'User'}</h3>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <AccessibleButton variant="ghost" size="sm">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </AccessibleButton>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-gray-900">{post.content}</p>
        </div>

        {/* Post Image */}
        {post.image_url && (
          <div className="w-full">
            <img
              src={post.image_url}
              alt="Post content"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        {/* Reaction Summary */}
        <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-3 h-3 text-white" />
              </div>
            </div>
            <span>{post.likes_count || 0}</span>
          </div>
          <div className="flex space-x-4">
            <span>{post.comments_count || 0} comments</span>
            <span>0 shares</span>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Action Buttons */}
        <div className="px-4 py-2 flex items-center justify-between">
          <AccessibleButton
            variant="ghost"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
              isLiked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={handleLike}
            disabled={likeMutation.isPending}
          >
            <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>Like</span>
          </AccessibleButton>

          <AccessibleButton
            variant="ghost"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </AccessibleButton>

          <AccessibleButton
            variant="ghost"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={handleShare}
          >
            <Share className="w-5 h-5" />
            <span>Share</span>
          </AccessibleButton>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-200 px-4 py-4">
            <div className="flex space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  className="rounded-full"
                />
                <Button onClick={handleComment} size="sm">
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealPost;
