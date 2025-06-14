
import React, { useState } from 'react';
import { Users, Hash, Video, Store, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface SearchResult {
  id: string;
  type: 'user' | 'page' | 'group' | 'video' | 'marketplace' | 'event';
  title: string;
  subtitle?: string;
  image: string;
  verified?: boolean;
  members?: number;
  category?: string;
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onClose }) => {
  const [results] = useState<SearchResult[]>([
    {
      id: '1',
      type: 'user',
      title: 'Sarah Johnson',
      subtitle: 'Frontend Developer at Tech Corp',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      verified: true
    },
    {
      id: '2',
      type: 'group',
      title: 'React Developers Community',
      subtitle: 'Public group',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      members: 15420
    },
    {
      id: '3',
      type: 'page',
      title: 'Tech News Daily',
      subtitle: 'Media/News Company',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      verified: true
    },
    {
      id: '4',
      type: 'video',
      title: 'Building Amazing React Apps',
      subtitle: 'Tech Academy • 2 days ago',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return Users;
      case 'group': return Users;
      case 'page': return Hash;
      case 'video': return Video;
      case 'marketplace': return Store;
      case 'event': return Calendar;
      default: return Users;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    toast.success(`Opening ${result.title}`);
    console.log('Search result clicked:', result);
    onClose();
  };

  const filteredResults = results.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    (result.subtitle && result.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  if (!query.trim()) {
    return (
      <Card className="mt-2 shadow-lg border-0">
        <CardContent className="p-4">
          <div className="text-center py-8">
            <p className="text-gray-500">Type to start searching...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-2 shadow-lg border-0">
      <CardContent className="p-0">
        <div className="py-2">
          {filteredResults.length > 0 ? (
            <>
              {filteredResults.map((result) => {
                const IconComponent = getIcon(result.type);
                return (
                  <AccessibleButton
                    key={result.id}
                    variant="ghost"
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 text-left"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={result.image} />
                        <AvatarFallback>
                          <IconComponent className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      {result.verified && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 truncate">{result.title}</h4>
                        <IconComponent className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </div>
                      {result.subtitle && (
                        <p className="text-sm text-gray-500 truncate">{result.subtitle}</p>
                      )}
                      {result.members && (
                        <p className="text-sm text-gray-500">
                          {result.members.toLocaleString()} members
                        </p>
                      )}
                    </div>
                  </AccessibleButton>
                );
              })}
              <div className="border-t px-3 py-2">
                <AccessibleButton
                  variant="ghost"
                  className="w-full text-blue-600 text-sm"
                  onClick={() => {
                    toast.info('See all results feature coming soon!');
                    onClose();
                  }}
                >
                  See all results for "{query}"
                </AccessibleButton>
              </div>
            </>
          ) : (
            <div className="text-center py-8 px-4">
              <p className="text-gray-500">No results found for "{query}"</p>
              <p className="text-sm text-gray-400 mt-2">Try searching for people, pages, or groups</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResults;
