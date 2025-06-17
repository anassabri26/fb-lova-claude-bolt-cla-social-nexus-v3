import React, { useState } from 'react';
import { Bookmark, Heart, MessageCircle, Share, MoreHorizontal, X, Folder, Search, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SavedItem {
  id: string;
  type: 'post' | 'video' | 'event' | 'marketplace' | 'article' | 'photo';
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
  url?: string;
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
    },
    {
      id: '4',
      type: 'article',
      title: 'The Future of Web Development',
      content: 'An in-depth look at emerging technologies and trends shaping the future of web development.',
      author: {
        name: 'Tech Blog',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      },
      savedDate: '5 days ago',
      collection: 'Articles',
      url: 'https://example.com/article'
    }
  ]);

  const [selectedCollection, setSelectedCollection] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const collections = ['All', 'Tech Tips', 'Events', 'Videos', 'Articles', 'Recipes', 'Travel'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return <MessageCircle className="w-4 h-4" />;
      case 'video': return <Share className="w-4 h-4" />;
      case 'event': return <Heart className="w-4 h-4" />;
      case 'article': return <Bookmark className="w-4 h-4" />;
      default: return <Bookmark className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      post: 'bg-blue-100 text-blue-800',
      video: 'bg-red-100 text-red-800',
      event: 'bg-green-100 text-green-800',
      marketplace: 'bg-purple-100 text-purple-800',
      article: 'bg-orange-100 text-orange-800',
      photo: 'bg-pink-100 text-pink-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const removeSavedItem = (id: string) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  const moveToCollection = (id: string, newCollection: string) => {
    setSavedItems(savedItems.map(item => 
      item.id === id ? { ...item, collection: newCollection } : item
    ));
  };

  const filteredItems = savedItems.filter(item => {
    const matchesCollection = selectedCollection === 'All' || item.collection === selectedCollection;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCollection && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.savedDate).getTime() - new Date(b.savedDate).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'type':
        return a.type.localeCompare(b.type);
      default: // recent
        return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved</h1>
            <p className="text-gray-600">Items you've saved for later</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Folder className="w-4 h-4" />
              <span>New Collection</span>
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search saved items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="type">Type</option>
            </select>
          </div>
        </div>

        <Tabs value={selectedCollection} onValueChange={setSelectedCollection} className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-7 mb-6 overflow-x-auto">
            {collections.map((collection) => (
              <TabsTrigger key={collection} value={collection} className="whitespace-nowrap">
                {collection}
                {collection === 'All' && (
                  <Badge variant="secondary" className="ml-2">
                    {savedItems.length}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCollection} className="space-y-4">
            {sortedItems.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm ? `No results for "${searchTerm}"` : 
                   selectedCollection === 'All' ? 'No saved items' : `No items in ${selectedCollection}`}
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms.' :
                   selectedCollection === 'All' 
                    ? 'Posts, videos, and events you save will appear here.'
                    : `Try selecting a different collection or save items to ${selectedCollection}.`
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow group">
                    <CardContent className="p-0">
                      {/* Image */}
                      {item.image && (
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className={getTypeBadge(item.type)}>
                              {getTypeIcon(item.type)}
                              <span className="ml-1 capitalize">{item.type}</span>
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSavedItem(item.id)}
                              className="bg-white/90 hover:bg-white text-gray-600 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="p-4">
                        {!item.image && (
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={getTypeBadge(item.type)}>
                              {getTypeIcon(item.type)}
                              <span className="ml-1 capitalize">{item.type}</span>
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSavedItem(item.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}

                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>

                        {item.content && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {item.content}
                          </p>
                        )}

                        {/* Author and Date */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={item.author.avatar} />
                              <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{item.author.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">Saved {item.savedDate}</span>
                        </div>

                        {/* Collection */}
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline">{item.collection}</Badge>
                          <select
                            value={item.collection}
                            onChange={(e) => moveToCollection(item.id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          >
                            {collections.filter(c => c !== 'All').map(collection => (
                              <option key={collection} value={collection}>{collection}</option>
                            ))}
                          </select>
                        </div>

                        {/* Original Post Stats */}
                        {item.originalPost && (
                          <div className="flex items-center space-x-4 pt-3 border-t border-gray-100">
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

                        {/* Actions */}
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Share
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Saved;