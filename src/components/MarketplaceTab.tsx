
import React, { useState } from 'react';
import { Search, Filter, MapPin, Heart, Share, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const MarketplaceTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'books', label: 'Books' },
    { id: 'sports', label: 'Sports' },
    { id: 'automotive', label: 'Automotive' }
  ];

  const listings = [
    {
      id: '1',
      title: 'MacBook Pro 13" 2021',
      price: '$1,200',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      seller: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        rating: 4.8
      },
      category: 'electronics',
      posted: '2 hours ago',
      isSaved: false
    },
    {
      id: '2',
      title: 'Vintage Leather Sofa',
      price: '$450',
      location: 'Brooklyn, NY',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      seller: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        rating: 4.5
      },
      category: 'furniture',
      posted: '1 day ago',
      isSaved: true
    },
    {
      id: '3',
      title: 'Mountain Bike - Like New',
      price: '$350',
      location: 'Queens, NY',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      seller: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
        rating: 5.0
      },
      category: 'sports',
      posted: '3 days ago',
      isSaved: false
    },
    {
      id: '4',
      title: 'Designer Winter Jacket',
      price: '$80',
      location: 'Manhattan, NY',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      seller: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
        rating: 4.2
      },
      category: 'clothing',
      posted: '1 week ago',
      isSaved: false
    }
  ];

  const handleSave = (id: string, title: string) => {
    toast.success(`Saved "${title}" to your list`);
  };

  const handleMessage = (sellerName: string) => {
    toast.info(`Opening chat with ${sellerName}`);
  };

  const handleShare = (title: string) => {
    toast.success(`Shared "${title}"`);
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Create Listing
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search marketplace..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
            className="whitespace-nowrap"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <AccessibleButton
                  onClick={() => handleSave(listing.id, listing.title)}
                  className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100"
                >
                  <Heart className={`w-4 h-4 ${listing.isSaved ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </AccessibleButton>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{listing.title}</h3>
                  <p className="text-xl font-bold text-blue-600">{listing.price}</p>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{listing.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={listing.seller.avatar} />
                      <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{listing.seller.name}</p>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-yellow-500">★</span>
                        <span className="text-xs text-gray-600">{listing.seller.rating}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{listing.posted}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleMessage(listing.seller.name)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <AccessibleButton
                    onClick={() => handleShare(listing.title)}
                    variant="outline"
                    className="px-3"
                  >
                    <Share className="w-4 h-4" />
                  </AccessibleButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default MarketplaceTab;
