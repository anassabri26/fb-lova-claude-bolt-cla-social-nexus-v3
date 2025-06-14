
import React from 'react';
import AccessibleButton from './AccessibleButton';

interface MarketplaceCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const MarketplaceCategories = ({ categories, selectedCategory, onCategoryChange }: MarketplaceCategoriesProps) => {
  return (
    <div className="flex space-x-2 overflow-x-auto">
      {categories.map(category => (
        <AccessibleButton
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="whitespace-nowrap"
        >
          {category === 'all' ? 'All Categories' : category}
        </AccessibleButton>
      ))}
    </div>
  );
};

export default MarketplaceCategories;
