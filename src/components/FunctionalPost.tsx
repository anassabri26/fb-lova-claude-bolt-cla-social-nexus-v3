
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, ThumbsUp, Laugh, Angry } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface PostProps {
  post: {
    id: number;
    author: {
      name: string;
      avatar: string;
      verified?: boolean;
    };
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
  };
}

const FunctionalPost = ({ post }: PostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [reaction, setReaction] = useState<string | null>(null);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      content: 'This is amazing! 🔥',
      timestamp: '2h'
    }
  ]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setReaction(isLiked ? null : 'like');
    toast.success(isLiked ? 'Removed like' : 'Post liked!');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved' : 'Post saved!');
  };

  const handleShare = () => {
    toast.success('Post shared to your story!');
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        content: newComment,
        timestamp: 'now'
      };
      setComments([...comments, comment]);
      setNewComment('');
      toast.success('Comment added!');
    }
  };

  const reactions = [
    { type: 'like', icon: ThumbsUp, color: 'text-blue-600' },
    { type: 'love', icon: Heart, color: 'text-red-600' },
    { type: 'laugh', icon: Laugh, color: 'text-yellow-600' },
    { type: 'angry', icon: Angry, color: 'text-red-600' }
  ];

  return (
    <Card className="mb-6">
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
                <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                {post.author.verified && (
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
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
        {post.image && (
          <div className="w-full">
            <img
              src={post.image}
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
              <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
            <span>{post.likes + (isLiked ? 1 : 0)}</span>
          </div>
          <div className="flex space-x-4">
            <span>{comments.length} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Action Buttons */}
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <AccessibleButton
              variant="ghost"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isLiked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={handleLike}
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

          <AccessibleButton
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={isSaved ? 'text-yellow-600' : 'text-gray-600'}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </AccessibleButton>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-200">
            <div className="p-4 space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl px-3 py-2">
                      <h4 className="font-semibold text-sm">{comment.author}</h4>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{comment.timestamp}</span>
                      <button className="hover:underline">Like</button>
                      <button className="hover:underline">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="px-4 pb-4 flex space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
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

export default FunctionalPost;
