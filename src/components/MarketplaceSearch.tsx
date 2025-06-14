
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MarketplaceSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const MarketplaceSearch = ({ searchQuery, onSearchChange }: MarketplaceSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder="Search Marketplace..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default MarketplaceSearch;
