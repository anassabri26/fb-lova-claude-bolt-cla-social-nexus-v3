
import React, { useState } from 'react';
import { Search, Users, Video, Store, Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface SearchResult {
  id: string;
  type: 'people' | 'pages' | 'groups' | 'posts' | 'videos' | 'events';
  title: string;
  subtitle?: string;
  avatar?: string;
  image?: string;
  description?: string;
  metadata?: string;
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const SearchResults = ({ query, onClose }: SearchResultsProps) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'people',
      title: 'Sarah Johnson',
      subtitle: 'Software Engineer at Tech Corp',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      metadata: '5 mutual friends'
    },
    {
      id: '2',
      type: 'pages',
      title: 'React Developers Community',
      subtitle: 'Technology • 125K likes',
      avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      description: 'A community for React developers to share knowledge and best practices.'
    },
    {
      id: '3',
      type: 'groups',
      title: 'Web Development Tips',
      subtitle: 'Private group • 45K members',
      avatar: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
      description: 'Share tips, tricks, and resources for web development.'
    },
    {
      id: '4',
      type: 'videos',
      title: 'React Tutorial for Beginners',
      subtitle: 'Tech Channel • 2 days ago',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
      metadata: '45K views'
    },
    {
      id: '5',
      type: 'events',
      title: 'React Conference 2024',
      subtitle: 'March 15, 2024 • Virtual Event',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      metadata: '2.3K interested'
    }
  ];

  const filteredResults = mockResults.filter(result => {
    if (activeFilter === 'all') return true;
    return result.type === activeFilter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'people': return Users;
      case 'pages': return Users;
      case 'groups': return Users;
      case 'videos': return Video;
      case 'events': return Calendar;
      default: return Search;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    toast.success(`Opening ${result.title}`);
    onClose();
  };

  const filters = [
    { id: 'all', label: 'All', count: mockResults.length },
    { id: 'people', label: 'People', count: mockResults.filter(r => r.type === 'people').length },
    { id: 'pages', label: 'Pages', count: mockResults.filter(r => r.type === 'pages').length },
    { id: 'groups', label: 'Groups', count: mockResults.filter(r => r.type === 'groups').length },
    { id: 'videos', label: 'Videos', count: mockResults.filter(r => r.type === 'videos').length },
    { id: 'events', label: 'Events', count: mockResults.filter(r => r.type === 'events').length }
  ];

  if (!query.trim()) {
    return (
      <Card className="mt-2 shadow-lg">
        <CardContent className="p-4">
          <div className="text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Start typing to search Facebook</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Try searching for:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">People</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Pages</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Groups</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Events</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-2 shadow-lg max-h-96 overflow-hidden">
      <CardContent className="p-0">
        {/* Search Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2 text-gray-600 mb-3">
            <Search className="w-4 h-4" />
            <span className="text-sm">Search results for "{query}"</span>
          </div>
          
          {/* Filters */}
          <div className="flex space-x-1 overflow-x-auto">
            {filters.map((filter) => (
              <AccessibleButton
                key={filter.id}
                variant={activeFilter === filter.id ? 'default' : 'ghost'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label} {filter.count > 0 && `(${filter.count})`}
              </AccessibleButton>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-64 overflow-y-auto">
          {filteredResults.length > 0 ? (
            <div className="space-y-1">
              {filteredResults.map((result) => {
                const IconComponent = getIcon(result.type);
                
                return (
                  <div
                    key={result.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.avatar ? (
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={result.avatar} />
                        <AvatarFallback>{result.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : result.image ? (
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{result.title}</h4>
                      {result.subtitle && (
                        <p className="text-sm text-gray-500 truncate">{result.subtitle}</p>
                      )}
                      {result.description && (
                        <p className="text-xs text-gray-400 truncate">{result.description}</p>
                      )}
                      {result.metadata && (
                        <p className="text-xs text-blue-600">{result.metadata}</p>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-400 capitalize">
                      {result.type}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-2">Try different keywords or check your spelling</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResults;
