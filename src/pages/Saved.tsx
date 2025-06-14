
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bookmark, Link, Video, Image, Plus, Folder } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Saved = () => {
  const [activeTab, setActiveTab] = useState('all');

  const savedItems = [
    {
      id: 1,
      type: 'post',
      title: 'Amazing React Tutorial - Build a Full App',
      description: 'Learn how to build a complete React application from scratch...',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      savedDate: '2 days ago',
      author: 'Tech Creator'
    },
    {
      id: 2,
      type: 'video',
      title: 'Beautiful Sunset Timelapse',
      description: 'A stunning timelapse of sunset over the mountains...',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
      savedDate: '1 week ago',
      author: 'Nature Explorer'
    },
    {
      id: 3,
      type: 'link',
      title: 'Best Practices for Web Development',
      description: 'A comprehensive guide to modern web development practices...',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      savedDate: '3 days ago',
      author: 'Dev Blog'
    }
  ];

  const collections = [
    { id: 1, name: 'React Resources', count: 12, icon: Folder },
    { id: 2, name: 'Design Inspiration', count: 8, icon: Folder },
    { id: 3, name: 'Recipes', count: 5, icon: Folder }
  ];

  const handleCreateCollection = () => {
    toast.info('Create collection feature coming soon!');
  };

  const handleOpenItem = (item: any) => {
    toast.info(`Opening: ${item.title}`);
  };

  const handleRemoveItem = (item: any) => {
    toast.success(`Removed: ${item.title}`);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'link': return Link;
      case 'image': return Image;
      default: return Bookmark;
    }
  };

  const filteredItems = activeTab === 'all' 
    ? savedItems 
    : savedItems.filter(item => item.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Saved</h1>
              <AccessibleButton
                onClick={handleCreateCollection}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Collection
              </AccessibleButton>
            </div>

            {/* Collections */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">My Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {collections.map((collection) => (
                  <Card key={collection.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <collection.icon className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="font-medium">{collection.name}</h3>
                          <p className="text-sm text-gray-500">{collection.count} items</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="post">Posts</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="link">Links</TabsTrigger>
                <TabsTrigger value="image">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {filteredItems.map((item) => {
                    const IconComponent = getIcon(item.type);
                    return (
                      <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex space-x-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <IconComponent className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-500 capitalize">{item.type}</span>
                                  </div>
                                  <h3 className="font-semibold text-gray-900 mb-1">
                                    {item.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {item.description}
                                  </p>
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <span>By {item.author}</span>
                                    <span>Saved {item.savedDate}</span>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <AccessibleButton
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleOpenItem(item)}
                                  >
                                    Open
                                  </AccessibleButton>
                                  <AccessibleButton
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveItem(item)}
                                  >
                                    Remove
                                  </AccessibleButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {filteredItems.length === 0 && (
                  <div className="text-center py-12">
                    <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved items</h3>
                    <p className="text-gray-600">
                      {activeTab === 'all' 
                        ? 'Items you save will appear here'
                        : `No saved ${activeTab}s found`
                      }
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Saved;
