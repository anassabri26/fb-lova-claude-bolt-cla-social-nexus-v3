
import React from 'react';
import { Search, User, Users, Video, Image } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';

interface SearchResult {
  id: string;
  type: 'user' | 'page' | 'group' | 'post' | 'video';
  title: string;
  subtitle?: string;
  avatar?: string;
  image?: string;
  verified?: boolean;
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const SearchResults = ({ query, onClose }: SearchResultsProps) => {
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'user',
      title: 'Sarah Johnson',
      subtitle: 'Frontend Developer at Tech Corp',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      verified: true
    },
    {
      id: '2',
      type: 'group',
      title: 'React Developers Community',
      subtitle: '45.2K members',
      avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      type: 'page',
      title: 'TechNews Daily',
      subtitle: '2.1M followers',
      avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
      verified: true
    },
    {
      id: '4',
      type: 'video',
      title: 'How to build React apps',
      subtitle: 'Tech Tutorial • 1.2M views',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop'
    }
  ];

  const filteredResults = mockResults.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.subtitle?.toLowerCase().includes(query.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return User;
      case 'group': return Users;
      case 'video': return Video;
      case 'page': return Image;
      default: return Search;
    }
  };

  if (!query.trim()) return null;

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Search Results</h3>
          <AccessibleButton
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500"
          >
            ×
          </AccessibleButton>
        </div>
        
        {filteredResults.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No results found for "{query}"</p>
        ) : (
          <div className="space-y-2">
            {filteredResults.map((result) => {
              const Icon = getIcon(result.type);
              return (
                <AccessibleButton
                  key={result.id}
                  variant="ghost"
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    console.log(`Navigate to ${result.type}: ${result.title}`);
                    onClose();
                  }}
                >
                  {result.avatar || result.image ? (
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={result.avatar || result.image} />
                      <AvatarFallback>{result.title.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-1">
                      <p className="font-medium text-gray-900">{result.title}</p>
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
                  <Icon className="w-4 h-4 text-gray-400" />
                </AccessibleButton>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchResults;
