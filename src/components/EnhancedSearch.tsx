
import React, { useState, useCallback, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AccessibleButton from './AccessibleButton';

interface SearchResult {
  id: number;
  type: 'user' | 'page' | 'group' | 'post';
  name: string;
  avatar?: string;
  subtitle?: string;
  verified?: boolean;
}

const EnhancedSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches] = useState<string[]>(['React development', 'Web design', 'JavaScript tips']);
  const [trending] = useState<string[]>(['#ReactJS', '#WebDev', '#UI/UX', '#TypeScript']);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockResults: SearchResult[] = [
    {
      id: 1,
      type: 'user',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      subtitle: 'Software Developer',
      verified: true,
    },
    {
      id: 2,
      type: 'page',
      name: 'React Developers',
      avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      subtitle: '2.3M followers',
    },
    {
      id: 3,
      type: 'group',
      name: 'Web Development Community',
      subtitle: '450K members',
    },
  ];

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      // Simulate search with mock data
      const filtered = mockResults.filter(result =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, []);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          ref={inputRef}
          placeholder="Search Facebook"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 bg-gray-100 border-none rounded-full"
          aria-label="Search Facebook"
        />
        {query && (
          <AccessibleButton
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </AccessibleButton>
        )}
      </div>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
            <CardContent className="p-0">
              {query && results.length > 0 ? (
                <div className="py-2">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      role="button"
                      tabIndex={0}
                    >
                      {result.avatar ? (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={result.avatar} alt={result.name} />
                          <AvatarFallback>{result.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-sm">{result.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-1">
                          <p className="font-medium text-gray-900">{result.name}</p>
                          {result.verified && (
                            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        {result.subtitle && (
                          <p className="text-sm text-gray-500">{result.subtitle}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 capitalize">{result.type}</span>
                    </div>
                  ))}
                </div>
              ) : !query ? (
                <div className="py-2">
                  {recentSearches.length > 0 && (
                    <div className="px-4 py-2">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Recent searches</span>
                      </h3>
                      {recentSearches.map((search, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer"
                          onClick={() => handleSearch(search)}
                        >
                          <span className="text-gray-700">{search}</span>
                          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="px-4 py-2 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending</span>
                    </h3>
                    {trending.map((trend, index) => (
                      <div
                        key={index}
                        className="py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer"
                        onClick={() => handleSearch(trend)}
                      >
                        <span className="text-blue-600 font-medium">{trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  <p>No results found for "{query}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default EnhancedSearch;
