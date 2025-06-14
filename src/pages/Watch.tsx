
import React, { useState } from 'react';
import { Play, Tv, Video, Search, Filter } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import LiveStreamCard from '../components/LiveStreamCard';
import MobileNavigation from '../components/MobileNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AccessibleButton from '../components/AccessibleButton';

const Watch = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Gaming', 'Music', 'Sports', 'News', 'Entertainment', 'Education'];
  
  const liveStreams = [
    {
      id: '1',
      streamer: {
        name: 'GameMaster Pro',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      title: 'Epic Gameplay Session - New Game Launch!',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      viewers: 12500,
      duration: '2:45:30',
      category: 'Gaming'
    },
    {
      id: '2',
      streamer: {
        name: 'Music Live',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      title: 'Acoustic Session - Your Favorite Songs',
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
      viewers: 3200,
      duration: '1:15:20',
      category: 'Music'
    },
    {
      id: '3',
      streamer: {
        name: 'Tech News Daily',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      title: 'Breaking: Latest Tech Announcements',
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      viewers: 8900,
      duration: '0:45:12',
      category: 'News'
    }
  ];

  const filteredStreams = liveStreams.filter(stream => {
    const matchesCategory = selectedCategory === 'All' || stream.category === selectedCategory;
    const matchesSearch = stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stream.streamer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Tv className="w-8 h-8 mr-2 text-blue-600" />
                Watch
              </h1>
              <AccessibleButton
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => console.log('Start live stream')}
              >
                <Video className="w-4 h-4 mr-2" />
                Go Live
              </AccessibleButton>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search live videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Streams Grid */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  Live Now ({filteredStreams.length})
                </h2>
              </div>
              
              {filteredStreams.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Tv className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No live streams found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search or category filter</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStreams.map((stream) => (
                    <LiveStreamCard
                      key={stream.id}
                      stream={stream}
                      onClick={() => console.log(`Watch stream: ${stream.title}`)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Videos */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={`https://images.unsplash.com/photo-${
                            i === 1 ? '1461749280684-dccba630e2f6' : 
                            i === 2 ? '1518770660439-4636190af475' : 
                            '1487058792275-0ad4aaf24ca7'
                          }?w=800&h=600&fit=crop`}
                          alt={`Recommended video ${i}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          {i === 1 ? '10:45' : i === 2 ? '15:30' : '8:20'}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                          {i === 1 ? 'React Tutorial: Building Modern Apps' : 
                           i === 2 ? 'JavaScript Tips and Tricks' : 
                           'Web Development Best Practices'}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">TechChannel</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {i === 1 ? '1.2M views • 2 days ago' : 
                           i === 2 ? '850K views • 1 week ago' : 
                           '500K views • 3 days ago'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Watch;
