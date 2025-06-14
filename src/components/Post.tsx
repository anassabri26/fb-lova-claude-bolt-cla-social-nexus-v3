
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import CommentsSection from './CommentsSection';

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
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Card className="bg-white shadow-sm border-0 shadow-gray-100">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-900">{post.author.name}</span>
                {post.author.verified && (
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <span className="text-gray-500 text-sm">{post.timestamp}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-gray-900 leading-relaxed">{post.content}</p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="relative">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-96 object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Post Stats */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-1">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">❤️</span>
                </div>
              </div>
              <span>{likeCount} likes</span>
            </div>
            <div className="flex space-x-4">
              <button 
                className="hover:underline"
                onClick={() => setShowComments(!showComments)}
              >
                {post.comments} comments
              </button>
              <span>{post.shares} shares</span>
            </div>
          </div>
        </div>

        {/* Post Actions */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                liked ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={handleLike}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span className="font-medium">Like</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-6 py-3 rounded-lg"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Comment</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-6 py-3 rounded-lg">
              <Share className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection postId={post.id} isVisible={showComments} />
      </CardContent>
    </Card>
  );
};

export default Post;
