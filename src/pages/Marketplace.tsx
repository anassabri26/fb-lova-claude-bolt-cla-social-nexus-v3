
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Heart, Plus, Filter } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');

  const marketplaceItems = [
    {
      id: 1,
      title: 'MacBook Pro 16" 2023',
      price: '$2,400',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400&h=400&fit=crop',
      seller: 'Tech Store',
      posted: '2 days ago',
      isSaved: false
    },
    {
      id: 2,
      title: 'Vintage Leather Sofa',
      price: '$800',
      location: 'Oakland, CA',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      seller: 'Home Seller',
      posted: '1 week ago',
      isSaved: true
    },
    {
      id: 3,
      title: 'iPhone 15 Pro Max',
      price: '$1,100',
      location: 'San Jose, CA',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      seller: 'Phone Market',
      posted: '3 days ago',
      isSaved: false
    }
  ];

  const categories = [
    { name: 'Electronics', icon: '📱' },
    { name: 'Vehicles', icon: '🚗' },
    { name: 'Home & Garden', icon: '🏠' },
    { name: 'Clothing', icon: '👕' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Books', icon: '📚' }
  ];

  const handleSaveItem = (itemId: number) => {
    toast.success('Item saved to your wishlist!');
  };

  const handleContactSeller = (seller: string) => {
    toast.info(`Opening chat with ${seller}`);
  };

  const handleCreateListing = () => {
    toast.info('Create listing feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
              <AccessibleButton
                onClick={handleCreateListing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Listing
              </AccessibleButton>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="browse">Browse</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="selling">Selling</TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {categories.map((category) => (
                    <Card key={category.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <h3 className="text-sm font-medium">{category.name}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h2 className="text-lg font-semibold mb-4">Today's Picks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketplaceItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <AccessibleButton
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
                          onClick={() => handleSaveItem(item.id)}
                        >
                          <Heart className={`w-4 h-4 ${item.isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                        </AccessibleButton>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-lg font-bold text-green-600 mb-2">{item.price}</p>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {item.location}
                        </p>
                        <p className="text-xs text-gray-500 mb-3">{item.posted}</p>
                        <AccessibleButton
                          onClick={() => handleContactSeller(item.seller)}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Contact Seller
                        </AccessibleButton>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="search" className="mt-6">
                <div className="space-y-4 mb-6">
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search Marketplace..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <AccessibleButton variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </AccessibleButton>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketplaceItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-lg font-bold text-green-600 mb-2">{item.price}</p>
                        <p className="text-sm text-gray-600">{item.location}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="mt-6">
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved items</h3>
                  <p className="text-gray-600">Items you save will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="selling" className="mt-6">
                <div className="text-center py-12">
                  <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Start selling</h3>
                  <p className="text-gray-600 mb-4">List an item to start selling</p>
                  <AccessibleButton
                    onClick={handleCreateListing}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create Listing
                  </AccessibleButton>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Marketplace;
