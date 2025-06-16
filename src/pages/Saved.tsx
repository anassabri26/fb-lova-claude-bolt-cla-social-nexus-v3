import React, { useState } from 'react';
import { Bookmark, Heart, MessageCircle, Share, MoreHorizontal, X, Folder } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MobileNavigation from '../components/MobileNavigation';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

interface SavedItem {
  id: string;
  type: 'post' | 'video' | 'event' | 'marketplace';
  title: string;
  content?: string;
  author: {
    name: string;
    avatar: string;
  };
  image?: string;
  savedDate: string;
  collection: string;
  originalPost?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const Saved = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    {
      id: '1',
      type: 'post',
      title: 'Amazing React Development Tips',
      content: 'Just finished building an amazing React application! The satisfaction of seeing your code come to life is unmatched. 🚀 #ReactJS #WebDevelopment',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      savedDate: '2 days ago',
      collection: 'Tech Tips',
      originalPost: {
        likes: 42,
        comments: 8,
        shares: 3
      }
    },
    {
      id: '2',
      type: 'event',
      title: 'Tech Conference 2024',
      content: 'Join us for the biggest tech conference of the year featuring latest innovations.',
      author: {
        name: 'Tech Events Inc',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      savedDate: '1 week ago',
      collection: 'Events',
    },
    {
      id: '3',
      type: 'video',
      title: 'Amazing Sunset Timelapse',
      content: 'Beautiful timelapse video of sunset from Mount Wilson',
      author: {
        name: 'Nature Explorer',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      savedDate: '3 days ago',
      collection: 'Videos',
    }
  ]);

  const [selectedCollection, setSelectedCollection] = useState('All');

  const collections = ['All', 'Tech Tips', 'Events', 'Videos', 'Recipes', 'Travel'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return <MessageCircle className="w-4 h-4" />;
      case 'video': return <Share className="w-4 h-4" />;
      case 'event': return <Heart className="w-4 h-4" />;
      default: return <Bookmark className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      post: 'bg-blue-100 text-blue-800',
      video: 'bg-red-100 text-red-800',
      event: 'bg-green-100 text-green-800',
      marketplace: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const removeSavedItem = (id: string) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
    toast.success('Item removed from saved');
  };

  const filteredItems = selectedCollection === 'All' 
    ? savedItems 
    : savedItems.filter(item => item.collection === selectedCollection);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved</h1>
            <p className="text-gray-600">Items you've saved for later</p>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Folder className="w-4 h-4" />
            <span>New Collection</span>
          </Button>
        </div>

        {/* Collections Filter */}
        <div className="flex space-x-2 overflow-x-auto mb-6 scrollbar-thin">
          {collections.map((collection) => (
            <Button
              key={collection}
              variant={selectedCollection === collection ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCollection(collection)}
              className="whitespace-nowrap"
            >
              {collection}
              {collection === 'All' && (
                <Badge variant="secondary" className="ml-2">
                  {savedItems.length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Saved Items */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedCollection === 'All' ? 'No saved items' : `No items in ${selectedCollection}`}
              </h3>
              <p className="text-gray-500">
                {selectedCollection === 'All' 
                  ? 'Posts, videos, and events you save will appear here.'
                  : `Try selecting a different collection or save items to ${selectedCollection}.`
                }
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Image */}
                    {item.image && (
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-l-lg"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getTypeBadge(item.type)}>
                            {getTypeIcon(item.type)}
                            <span className="ml-1 capitalize">{item.type}</span>
                          </Badge>
                          <Badge variant="outline">{item.collection}</Badge>
                        </div>
                        <AccessibleButton
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSavedItem(item.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </AccessibleButton>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h3>

                      {item.content && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {item.content}
                        </p>
                      )}

                      {/* Author and Date */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={item.author.avatar} />
                            <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{item.author.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">Saved {item.savedDate}</span>
                      </div>

                      {/* Original Post Stats */}
                      {item.originalPost && (
                        <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Heart className="w-4 h-4" />
                            <span>{item.originalPost.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <MessageCircle className="w-4 h-4" />
                            <span>{item.originalPost.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Share className="w-4 h-4" />
                            <span>{item.originalPost.shares}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Saved;