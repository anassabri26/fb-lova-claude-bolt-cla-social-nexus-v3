
import React, { useState } from 'react';
import { Bookmark, Trash2, Share } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface SavedPost {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  savedAt: string;
}

const SavedPostsList = () => {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      content: 'Amazing React tips and tricks for better performance!',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      savedAt: '2 days ago'
    },
    {
      id: '2',
      author: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      content: 'Beautiful sunset photography techniques',
      savedAt: '1 week ago'
    }
  ]);

  const handleUnsave = (postId: string) => {
    setSavedPosts(posts => posts.filter(p => p.id !== postId));
    toast.success('Post removed from saved items');
  };

  const handleShare = (post: SavedPost) => {
    console.log('Sharing post:', post);
    toast.success('Post shared successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Bookmark className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">Saved Posts</h2>
      </div>
      
      {savedPosts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No saved posts yet</p>
            <p className="text-sm text-gray-500 mt-2">Posts you save will appear here</p>
          </CardContent>
        </Card>
      ) : (
        savedPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-500">Saved {post.savedAt}</p>
                </div>
              </div>
              
              <p className="text-gray-800 mb-3">{post.content}</p>
              
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-64 object-cover rounded-lg mb-3"
                />
              )}
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(post)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                >
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </AccessibleButton>
                
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUnsave(post.id)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </AccessibleButton>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default SavedPostsList;
