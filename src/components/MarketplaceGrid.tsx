
import React, { useState } from 'react';
import MarketplaceSearch from './MarketplaceSearch';
import MarketplaceCategories from './MarketplaceCategories';
import MarketplaceItemCard from './MarketplaceItemCard';
import { toast } from 'sonner';

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

  const categories = ['all', 'Electronics', 'Furniture', 'Clothing', 'Sports', 'Books'];

  const [items] = useState<MarketplaceItem[]>([
    {
      id: '1',
      title: 'MacBook Pro 13"',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      location: 'San Francisco, CA',
      seller: {
        name: 'John Smith',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      condition: 'Like New',
      category: 'Electronics',
      description: 'Excellent condition MacBook Pro, barely used. Perfect for students or professionals.'
    },
    {
      id: '2',
      title: 'Gaming Chair',
      price: 250,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      location: 'Los Angeles, CA',
      seller: {
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      condition: 'Good',
      category: 'Furniture',
      description: 'Comfortable gaming chair with lumbar support. Great for long work sessions.'
    },
    {
      id: '3',
      title: 'Nike Running Shoes',
      price: 80,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
      location: 'New York, NY',
      seller: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face'
      },
      condition: 'New',
      category: 'Sports',
      description: 'Brand new Nike running shoes, size 10. Never worn, still in box.'
    }
  ]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContact = (seller: any) => {
    toast.success(`Starting conversation with ${seller.name}`);
    console.log('Contact seller:', seller);
  };

  const handleSave = (item: MarketplaceItem) => {
    toast.success(`Saved ${item.title} to your saved items`);
    console.log('Save item:', item);
  };

  return (
    <div className="space-y-6">
      <MarketplaceSearch 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <MarketplaceCategories 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="text-center py-12">
          <p className="text-gray-500">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MarketplaceGrid;
