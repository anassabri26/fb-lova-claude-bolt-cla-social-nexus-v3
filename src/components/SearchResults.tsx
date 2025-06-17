import React, { useState, useEffect } from 'react';
import { Search, Users, Video, Image, Hash, MapPin, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams } from 'react-router-dom';
import { MOCK_IMAGES } from '@/lib/constants';

interface SearchResult {
  id: string;
  type: 'people' | 'posts' | 'videos' | 'photos' | 'pages' | 'groups' | 'events';
  title: string;
  subtitle?: string;
  image: string;
  verified?: boolean;
  mutualFriends?: number;
  timestamp?: string;
  location?: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query) {
      // Simulate search results
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'people',
          title: 'Sarah Johnson',
          subtitle: 'Software Engineer at Tech Corp',
          image: MOCK_IMAGES.AVATARS[0],
          verified: true,
          mutualFriends: 12
        },
        {
          id: '2',
          type: 'posts',
          title: 'Amazing React development tips',
          subtitle: 'Posted by Mike Chen',
          image: MOCK_IMAGES.POSTS[0],
          timestamp: '2 hours ago'
        },
        {
          id: '3',
          type: 'videos',
          title: 'Tech Conference 2024 Highlights',
          subtitle: 'Tech Events Inc',
          image: MOCK_IMAGES.POSTS[1],
          timestamp: '1 day ago'
        },
        {
          id: '4',
          type: 'groups',
          title: 'React Developers Community',
          subtitle: '15.2K members',
          image: MOCK_IMAGES.POSTS[2]
        },
        {
          id: '5',
          type: 'pages',
          title: 'Tech News Daily',
          subtitle: '2.5M followers',
          image: MOCK_IMAGES.POSTS[3],
          verified: true
        },
        {
          id: '6',
          type: 'events',
          title: 'JavaScript Conference 2024',
          subtitle: 'March 25, 2024',
          image: MOCK_IMAGES.POSTS[4],
          location: 'San Francisco, CA'
        }
      ];
      setResults(mockResults);
    }
  }, [query]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'people': return <Users className="w-4 h-4" />;
      case 'posts': return <Hash className="w-4 h-4" />;
      case 'videos': return <Video className="w-4 h-4" />;
      case 'photos': return <Image className="w-4 h-4" />;
      case 'events': return <Calendar className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(result => result.type === activeTab);

  const getResultCounts = () => {
    const counts = results.reduce((acc, result) => {
      acc[result.type] = (acc[result.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return counts;
  };

  const counts = getResultCounts();

  if (!query) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Search Facebook</h2>
          <p className="text-gray-500">Find people, posts, photos, and more</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Search results for "{query}"
        </h1>
        <p className="text-gray-600">{results.length} results found</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">All ({results.length})</TabsTrigger>
          <TabsTrigger value="people">People ({counts.people || 0})</TabsTrigger>
          <TabsTrigger value="posts">Posts ({counts.posts || 0})</TabsTrigger>
          <TabsTrigger value="videos">Videos ({counts.videos || 0})</TabsTrigger>
          <TabsTrigger value="groups">Groups ({counts.groups || 0})</TabsTrigger>
          <TabsTrigger value="pages">Pages ({counts.pages || 0})</TabsTrigger>
          <TabsTrigger value="events">Events ({counts.events || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                        {getTypeIcon(result.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 truncate">{result.title}</h3>
                        {result.verified && (
                          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                        <Badge variant="outline" className="text-xs capitalize">
                          {result.type}
                        </Badge>
                      </div>
                      
                      {result.subtitle && (
                        <p className="text-sm text-gray-600 truncate">{result.subtitle}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        {result.mutualFriends && (
                          <span>{result.mutualFriends} mutual friends</span>
                        )}
                        {result.timestamp && <span>{result.timestamp}</span>}
                        {result.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{result.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {result.type === 'people' && (
                        <>
                          <Button size="sm">Add Friend</Button>
                          <Button variant="outline" size="sm">Message</Button>
                        </>
                      )}
                      {result.type === 'groups' && (
                        <Button size="sm">Join Group</Button>
                      )}
                      {result.type === 'pages' && (
                        <Button size="sm">Follow</Button>
                      )}
                      {result.type === 'events' && (
                        <Button size="sm">Interested</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No {activeTab === 'all' ? '' : activeTab} results found
              </h3>
              <p className="text-gray-500">
                Try searching for something else or check your spelling
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchResults;