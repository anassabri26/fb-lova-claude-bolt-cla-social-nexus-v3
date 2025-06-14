
import React, { useState } from 'react';
import { Search, Clock, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface SearchResult {
  id: number;
  type: 'user' | 'page' | 'group' | 'recent';
  name: string;
  avatar: string;
  subtitle?: string;
}

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const recentSearches: SearchResult[] = [
    {
      id: 1,
      type: 'recent',
      name: 'JavaScript Developers',
      avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      subtitle: 'Group'
    },
    {
      id: 2,
      type: 'recent',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      subtitle: 'Friend'
    }
  ];

  const searchResults: SearchResult[] = [
    {
      id: 3,
      type: 'user',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      subtitle: 'Friend'
    },
    {
      id: 4,
      type: 'page',
      name: 'React Development',
      avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
      subtitle: 'Page • 12k followers'
    },
    {
      id: 5,
      type: 'group',
      name: 'Web Developers United',
      avatar: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
      subtitle: 'Group • 5.2k members'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-96">
        <Card className="bg-white shadow-lg border-0 shadow-gray-200">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search Facebook"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-100 border-none rounded-full"
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-80 overflow-y-auto">
            {searchQuery === '' ? (
              <div>
                <div className="px-4 py-2 bg-gray-50 border-b">
                  <h4 className="text-sm font-semibold text-gray-700">Recent searches</h4>
                </div>
                {recentSearches.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{result.name}</p>
                        <p className="text-xs text-gray-500">{result.subtitle}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                      <X className="w-3 h-3 text-gray-500" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {searchResults
                  .filter(result => result.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={result.avatar} />
                        <AvatarFallback>{result.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{result.name}</p>
                        <p className="text-xs text-gray-500">{result.subtitle}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchDropdown;
