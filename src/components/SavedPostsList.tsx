
import React, { useState } from 'react';
import { Bookmark, Heart, MessageCircle, Share, MoreHorizontal, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface SavedPost {
  id: string;
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
  savedAt: string;
}

const SavedPostsList = () => {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      content: 'Just finished building an amazing React application! The satisfaction of seeing your code come to life is unmatched. 🚀 #ReactJS #WebDevelopment',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      timestamp: '2h',
      likes: 42,
      comments: 8,
      shares: 3,
      savedAt: 'Yesterday'
    },
    {
      id: '2',
      author: {
        name: 'Tech News Daily',
        avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
        verified: true
      },
      content: 'The future of web development: AI-powered coding assistants are revolutionizing how we build applications. What do you think about this trend?',
      timestamp: '1d',
      likes: 156,
      comments: 32,
      shares: 18,
      savedAt: '2 days ago'
    },
    {
      id: '3',
      author: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      content: 'Beautiful sunset from my office window today. Sometimes you need to pause and appreciate the simple moments. 🌅',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      timestamp: '3d',
      likes: 89,
      comments: 15,
      shares: 7,
      savedAt: '1 week ago'
    }
  ]);

  const handleUnsave = (postId: string) => {
    setSavedPosts(prev => prev.filter(post => post.id !== postId));
    toast.success('Post removed from saved items');
  };

  const handleLike = (postId: string) => {
    setSavedPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    toast.success('Post liked!');
  };

  const handleComment = (postId: string) => {
    toast.info('Comment feature coming soon!');
  };

  const handleShare = (postId: string) => {
    toast.success('Post shared!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Posts</h1>
          <p className="text-gray-600 mt-1">Posts you've saved for later</p>
        </div>
        <div className="flex items-center space-x-2">
          <Bookmark className="w-6 h-6 text-blue-600" />
          <span className="text-lg font-medium text-gray-900">{savedPosts.length}</span>
        </div>
      </div>

      {savedPosts.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved posts yet</h3>
          <p className="text-gray-500">Posts you save will appear here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {savedPosts.map(post => (
            <Card key={post.id} className="bg-white shadow-sm">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-gray-900">{post.author.name}</span>
                        {post.author.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span>Saved {post.savedAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUnsave(post.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </AccessibleButton>
                    <AccessibleButton variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </AccessibleButton>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="mb-4">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full rounded-lg object-cover max-h-96"
                    />
                  </div>
                )}

                {/* Post Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-around">
                  <AccessibleButton
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 flex-1 justify-center"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className="w-5 h-5" />
                    <span>Like</span>
                  </AccessibleButton>
                  
                  <AccessibleButton
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 flex-1 justify-center"
                    onClick={() => handleComment(post.id)}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Comment</span>
                  </AccessibleButton>
                  
                  <AccessibleButton
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 flex-1 justify-center"
                    onClick={() => handleShare(post.id)}
                  >
                    <Share className="w-5 h-5" />
                    <span>Share</span>
                  </AccessibleButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPostsList;
