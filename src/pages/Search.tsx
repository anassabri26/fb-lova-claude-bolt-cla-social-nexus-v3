import React, { useState } from 'react';
import SearchResults from '@/components/SearchResults';
import AdvancedSearch from '@/components/AdvancedSearch';

interface SearchFilters {
  query: string;
  type: string;
  dateRange: string;
  location: string;
  author: string;
}

const Search = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: 'all',
    dateRange: 'any',
    location: '',
    author: ''
  });

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    console.log('Searching with filters:', newFilters);
  };

  return (
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <AdvancedSearch onSearch={handleSearch} />
        <SearchResults />
      </div>
    </div>
  );
};

export default Search;