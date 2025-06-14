
import React, { useState } from 'react';
import { Bookmark, Heart, MessageCircle, Share, MoreHorizontal, Filter, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface SavedPost {
  id: string;
  type: 'post' | 'video' | 'photo' | 'link';
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  savedAt: string;
  likes: number;
  comments: number;
  category: string;
}

const SavedPostsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([
    {
      id: '1',
      type: 'post',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      content: 'Just finished building an amazing React application! The satisfaction of seeing your code come to life is unmatched. 🚀',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      timestamp: '2 days ago',
      savedAt: 'Yesterday',
      likes: 42,
      comments: 8,
      category: 'Technology'
    },
    {
      id: '2',
      type: 'photo',
      author: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      content: 'Beautiful sunset from my office window today.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      timestamp: '1 week ago',
      savedAt: '3 days ago',
      likes: 127,
      comments: 23,
      category: 'Photography'
    },
    {
      id: '3',
      type: 'video',
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      content: 'Quick tutorial on modern CSS techniques',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
      timestamp: '3 days ago',
      savedAt: '1 week ago',
      likes: 89,
      comments: 15,
      category: 'Education'
    }
  ]);

  const categories = ['all', 'Technology', 'Photography', 'Education', 'Travel', 'Food'];

  const filteredPosts = savedPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUnsave = (postId: string) => {
    setSavedPosts(prev => prev.filter(post => post.id !== postId));
    toast.success('Post removed from saved items');
  };

  const handleLike = (postId: string) => {
    toast.success('Post liked!');
  };

  const handleComment = (postId: string) => {
    toast.info('Comments feature coming soon!');
  };

  const handleShare = (postId: string) => {
    toast.success('Link copied to clipboard!');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'photo':
        return '📷';
      case 'link':
        return '🔗';
      default:
        return '📝';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Saved Posts</h2>
          <p className="text-gray-600">{savedPosts.length} saved items</p>
        </div>
        <AccessibleButton variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Organize
        </AccessibleButton>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search saved posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <AccessibleButton
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category === 'all' ? 'All' : category}
            </AccessibleButton>
          ))}
        </div>
      </div>

      {/* Saved Posts */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {searchQuery || selectedCategory !== 'all' ? 'No matching posts found' : 'No saved posts yet'}
            </h3>
            <p className="text-gray-500">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Posts you save will appear here'}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="md:flex">
                  {/* Post Image */}
                  {post.image && (
                    <div className="relative md:w-64">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-48 md:h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        {getTypeIcon(post.type)} {post.type}
                      </div>
                    </div>
                  )}
                  
                  {/* Post Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                          <p className="text-sm text-gray-500">{post.timestamp}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <AccessibleButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUnsave(post.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </AccessibleButton>
                      </div>
                    </div>
                    
                    <p className="text-gray-900 mb-4 line-clamp-3">{post.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <AccessibleButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                        >
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </AccessibleButton>
                        
                        <AccessibleButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleComment(post.id)}
                          className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </AccessibleButton>
                        
                        <AccessibleButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(post.id)}
                          className="flex items-center space-x-1 text-gray-600 hover:text-green-600"
                        >
                          <Share className="w-4 h-4" />
                          <span>Share</span>
                        </AccessibleButton>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Saved {post.savedAt}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedPostsList;
