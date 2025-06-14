
import React, { useState } from 'react';
import { toast } from 'sonner';
import MarketplaceItemCard from './MarketplaceItemCard';
import MarketplaceSearch from './MarketplaceSearch';
import MarketplaceCategories from './MarketplaceCategories';

interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  seller: {
    name: string;
    avatar: string;
  };
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  category: string;
  description: string;
}

const MarketplaceGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const items: MarketplaceItem[] = [
    {
      id: '1',
      title: 'MacBook Pro 13" M2',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      location: 'San Francisco, CA',
      seller: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      condition: 'Like New',
      category: 'Electronics',
      description: 'Barely used MacBook Pro in excellent condition'
    },
    {
      id: '2',
      title: 'Vintage Wooden Chair',
      price: 85,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
      location: 'New York, NY',
      seller: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      condition: 'Good',
      category: 'Furniture',
      description: 'Beautiful vintage chair perfect for any room'
    },
    {
      id: '3',
      title: 'Digital Camera',
      price: 350,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      location: 'Los Angeles, CA',
      seller: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      condition: 'New',
      category: 'Electronics',
      description: 'Brand new DSLR camera with warranty'
    },
    {
      id: '4',
      title: 'Bicycle',
      price: 200,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      location: 'Chicago, IL',
      seller: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face'
      },
      condition: 'Good',
      category: 'Sports',
      description: 'Well-maintained mountain bike'
    }
  ];

  const categories = ['all', 'Electronics', 'Furniture', 'Sports', 'Clothing', 'Books'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContact = (seller: any) => {
    toast.success(`Contacting ${seller.name}...`);
  };

  const handleSave = (item: MarketplaceItem) => {
    toast.success(`${item.title} saved to your wishlist!`);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <MarketplaceSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <MarketplaceCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <MarketplaceItemCard
            key={item.id}
            item={item}
            onContact={handleContact}
            onSave={handleSave}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No items found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default MarketplaceGrid;
