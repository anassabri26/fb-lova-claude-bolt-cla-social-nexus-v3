import React, { useState } from 'react';
import { Search, Plus, MapPin, Filter, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CreateMarketplaceItem from './CreateMarketplaceItem';
import { MOCK_IMAGES } from '@/lib/constants';

interface MarketplaceItem {
  id: string;
  title: string;
  price: string;
  location: string;
  seller: {
    name: string;
    avatar: string;
  };
  image: string;
  category: string;
  condition: string;
  postedDate: string;
  description: string;
  isSaved: boolean;
}

const MarketplaceTab = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([
    {
      id: '1',
      title: 'MacBook Pro 13" M2 Chip',
      price: '$1,200',
      location: 'San Francisco, CA',
      seller: {
        name: 'Sarah Johnson',
        avatar: MOCK_IMAGES.AVATARS[0]
      },
      image: MOCK_IMAGES.POSTS[0],
      category: 'Electronics',
      condition: 'Like New',
      postedDate: '2 days ago',
      description: 'Excellent condition MacBook Pro with M2 chip. Barely used, comes with original charger.',
      isSaved: false
    },
    {
      id: '2',
      title: 'Vintage Leather Sofa',
      price: '$800',
      location: 'Oakland, CA',
      seller: {
        name: 'Mike Chen',
        avatar: MOCK_IMAGES.AVATARS[1]
      },
      image: MOCK_IMAGES.POSTS[2],
      category: 'Furniture',
      condition: 'Good',
      postedDate: '1 week ago',
      description: 'Beautiful vintage leather sofa in good condition. Perfect for living room.',
      isSaved: true
    },
    {
      id: '3',
      title: '2018 Honda Civic',
      price: '$18,500',
      location: 'San Jose, CA',
      seller: {
        name: 'Emma Wilson',
        avatar: MOCK_IMAGES.AVATARS[2]
      },
      image: MOCK_IMAGES.POSTS[3],
      category: 'Vehicles',
      condition: 'Excellent',
      postedDate: '3 days ago',
      description: 'Well-maintained 2018 Honda Civic with low mileage. Clean title, no accidents.',
      isSaved: false
    },
    {
      id: '4',
      title: 'iPhone 14 Pro',
      price: '$750',
      location: 'Berkeley, CA',
      seller: {
        name: 'David Kim',
        avatar: MOCK_IMAGES.AVATARS[3]
      },
      image: MOCK_IMAGES.POSTS[4],
      category: 'Electronics',
      condition: 'Like New',
      postedDate: '5 days ago',
      description: 'iPhone 14 Pro in excellent condition. No scratches, includes original box and charger.',
      isSaved: false
    },
    {
      id: '5',
      title: 'Gaming Setup - Complete',
      price: '$1,500',
      location: 'San Francisco, CA',
      seller: {
        name: 'Alex Rodriguez',
        avatar: MOCK_IMAGES.AVATARS[5]
      },
      image: MOCK_IMAGES.POSTS[5],
      category: 'Electronics',
      condition: 'Good',
      postedDate: '1 day ago',
      description: 'Complete gaming setup including monitor, keyboard, mouse, and RGB lighting.',
      isSaved: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const categories = ['All', 'Electronics', 'Furniture', 'Vehicles', 'Clothing', 'Home & Garden', 'Sports'];
  const priceFilters = ['All', 'Under $100', '$100-$500', '$500-$1000', 'Over $1000'];

  const handleSaveItem = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, isSaved: !item.isSaved }
        : item
    ));
    console.log('Item saved/unsaved:', itemId);
  };

  const handleMessageSeller = (sellerName: string) => {
    console.log('Messaging seller:', sellerName);
  };

  const handleShare = (itemTitle: string) => {
    if (navigator.share) {
      navigator.share({
        title: itemTitle,
        text: `Check out this item: ${itemTitle}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    console.log('Shared item:', itemTitle);
  };

  const handleCreateListing = () => {
    setIsCreateModalOpen(true);
  };

  const handleItemClick = (item: MarketplaceItem) => {
    console.log('Item clicked:', item);
  };

  const handleApplyFilters = () => {
    console.log('Filters applied:', { selectedCategory, priceFilter, locationFilter });
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setPriceFilter('All');
    setLocationFilter('');
    setSearchTerm('');
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesLocation = !locationFilter || item.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter !== 'All') {
      const price = parseInt(item.price.replace(/[$,]/g, ''));
      switch (priceFilter) {
        case 'Under $100':
          matchesPrice = price < 100;
          break;
        case '$100-$500':
          matchesPrice = price >= 100 && price <= 500;
          break;
        case '$500-$1000':
          matchesPrice = price >= 500 && price <= 1000;
          break;
        case 'Over $1000':
          matchesPrice = price > 1000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  return (
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          <Button onClick={handleCreateListing} className="flex items-center space-x-2 sm:self-end">
            <Plus className="w-4 h-4" />
            <span>Create Listing</span>
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-blue-600 text-xs"
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input 
                        placeholder="Enter location" 
                        className="pl-10" 
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Price Range</label>
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {priceFilters.map(filter => (
                        <option key={filter} value={filter}>{filter}</option>
                      ))}
                    </select>
                  </div>

                  <Button onClick={handleApplyFilters} className="w-full" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Items:</span>
                    <span className="font-medium">{filteredItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saved Items:</span>
                    <span className="font-medium">{items.filter(i => i.isSaved).length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search Marketplace..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {filteredItems.length} of {items.length} items
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveItem(item.id);
                      }}
                      className={`absolute top-2 right-2 rounded-full ${
                        item.isSaved ? 'text-red-600 bg-white/90' : 'text-gray-600 bg-white/90'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${item.isSaved ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                        <span className="font-bold text-blue-600">{item.price}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge variant="outline">{item.condition}</Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={item.seller.avatar} />
                            <AvatarFallback>{item.seller.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{item.seller.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{item.postedDate}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMessageSeller(item.seller.name);
                          }}
                          className="flex-1"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(item.title);
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters.</p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <CreateMarketplaceItem 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default MarketplaceTab;