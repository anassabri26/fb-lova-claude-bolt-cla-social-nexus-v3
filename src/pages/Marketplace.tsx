import React, { useState } from 'react';
import { Search, Plus, Filter, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import CreateMarketplaceItem from '../components/CreateMarketplaceItem';
import AccessibleButton from '../components/AccessibleButton';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateItem, setShowCreateItem] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'vehicles', name: 'Vehicles' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'sports', name: 'Sports' },
  ];

  const marketplaceItems = [
    {
      id: 1,
      title: 'iPhone 13 Pro Max',
      price: 899,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      location: 'San Francisco, CA',
      seller: 'John Smith',
      category: 'electronics'
    },
    {
      id: 2,
      title: '2019 Honda Civic',
      price: 18500,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
      location: 'Los Angeles, CA',
      seller: 'Mike Johnson',
      category: 'vehicles'
    },
    {
      id: 3,
      title: 'Cozy Living Room Set',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1567016546063-3c45a7c7d1cb?w=400&h=300&fit=crop',
      location: 'New York, NY',
      seller: 'Emily Davis',
      category: 'home'
    },
    {
      id: 4,
      title: 'Nike Running Shoes',
      price: 85,
      image: 'https://images.unsplash.com/photo-1542296660-6e53a663ff9b?w=400&h=300&fit=crop',
      location: 'Portland, OR',
      seller: 'Chris Williams',
      category: 'sports'
    },
    {
      id: 5,
      title: 'Summer Dress Collection',
      price: 45,
      image: 'https://images.unsplash.com/photo-1560243573-6bbd3c7ca5a4?w=400&h=300&fit=crop',
      location: 'Miami, FL',
      seller: 'Jessica Brown',
      category: 'clothing'
    }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
            <AccessibleButton
              onClick={() => setShowCreateItem(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Sell Something
            </AccessibleButton>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search Marketplace"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <AccessibleButton variant="outline" className="md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </AccessibleButton>
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
            {categories.map((category) => (
              <AccessibleButton
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedCategory === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </AccessibleButton>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-xl font-bold text-green-600 mb-2">
                      ${item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                    <p className="text-sm text-gray-600">Sold by {item.seller}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
        <MobileNavigation />
      </div>

      {/* Create Item Dialog */}
      <Dialog open={showCreateItem} onOpenChange={setShowCreateItem}>
        <DialogContent className="max-w-md">
          <CreateMarketplaceItem onClose={() => setShowCreateItem(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Marketplace;
