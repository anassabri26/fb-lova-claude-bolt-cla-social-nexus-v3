
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const EnhancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const searchResults = [
    {
      id: 1,
      type: 'person',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 12
    },
    {
      id: 2,
      type: 'page',
      name: 'Tech News Daily',
      avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      followers: '25K'
    },
    {
      id: 3,
      type: 'group',
      name: 'React Developers',
      avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
      members: '15K'
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const handleResultClick = (result: any) => {
    toast.info(`Opening ${result.name}`);
    setSearchQuery('');
    setIsExpanded(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsExpanded(false);
  };

  const filteredResults = searchResults.filter(result =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search Facebook"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchQuery && setIsExpanded(true)}
          className="pl-10 pr-10 bg-gray-100 border-0 focus:bg-white focus:ring-1 focus:ring-blue-500"
        />
        {searchQuery && (
          <AccessibleButton
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
            onClick={clearSearch}
          >
            <X className="w-4 h-4" />
          </AccessibleButton>
        )}
      </div>

      {isExpanded && filteredResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto">
          <CardContent className="p-2">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={result.avatar} />
                  <AvatarFallback>{result.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{result.name}</p>
                  <p className="text-xs text-gray-500">
                    {result.type === 'person' && `${result.mutualFriends} mutual friends`}
                    {result.type === 'page' && `${result.followers} followers`}
                    {result.type === 'group' && `${result.members} members`}
                  </p>
                </div>
                <span className="text-xs text-gray-400 capitalize">{result.type}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedSearch;
