
import React, { useState } from 'react';
import { TrendingUp, Flame, Music, GamepadIcon, Trophy, Globe, Clock, Eye, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface TrendingVideo {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  thumbnail: string;
  views: number;
  likes: number;
  duration: string;
  publishedAt: string;
  category: string;
  trendingScore: number;
  growthRate: number;
  description: string;
}

const TrendingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  const trendingVideos: TrendingVideo[] = [
    {
      id: '1',
      title: 'Revolutionary AI Breakthrough Changes Everything',
      creator: {
        name: 'Tech Insider',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      views: 2500000,
      likes: 186000,
      duration: '12:45',
      publishedAt: '6 hours ago',
      category: 'Technology',
      trendingScore: 98,
      growthRate: 340,
      description: 'The latest AI breakthrough that will reshape the future of technology'
    },
    {
      id: '2',
      title: 'Epic Gaming Moment Goes Viral',
      creator: {
        name: 'GameMaster Pro',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
      views: 1800000,
      likes: 145000,
      duration: '8:32',
      publishedAt: '12 hours ago',
      category: 'Gaming',
      trendingScore: 95,
      growthRate: 280,
      description: 'The most incredible gaming moment that broke the internet'
    },
    {
      id: '3',
      title: 'New Music Video Breaks Records',
      creator: {
        name: 'Music Central',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      views: 3200000,
      likes: 234000,
      duration: '4:12',
      publishedAt: '8 hours ago',
      category: 'Music',
      trendingScore: 92,
      growthRate: 420,
      description: 'The hottest new music video that everyone is talking about'
    },
    {
      id: '4',
      title: 'Sports Highlight of the Century',
      creator: {
        name: 'Sports Hub',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
      views: 1500000,
      likes: 98000,
      duration: '3:45',
      publishedAt: '4 hours ago',
      category: 'Sports',
      trendingScore: 89,
      growthRate: 190,
      description: 'An unbelievable sports moment that will be remembered forever'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Globe },
    { id: 'technology', name: 'Technology', icon: TrendingUp },
    { id: 'gaming', name: 'Gaming', icon: GamepadIcon },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'sports', name: 'Sports', icon: Trophy }
  ];

  const timeRanges = [
    { id: '24h', name: 'Last 24 hours' },
    { id: '7d', name: 'This week' },
    { id: '30d', name: 'This month' }
  ];

  const handleVideoClick = (video: TrendingVideo) => {
    toast.success(`Playing: ${video.title}`);
    console.log('Playing trending video:', video);
  };

  const handleCreatorClick = (creator: string) => {
    toast.info(`Viewing ${creator}'s channel`);
    console.log('Viewing creator:', creator);
  };

  const filteredVideos = selectedCategory === 'all' 
    ? trendingVideos 
    : trendingVideos.filter(v => v.category.toLowerCase() === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white p-6">
        <div className="flex items-center space-x-3 mb-2">
          <Flame className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Trending</h1>
        </div>
        <p className="text-lg opacity-90">
          Discover what's hot and trending right now across the platform
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.id}
              variant={timeRange === range.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range.id)}
            >
              {range.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Trending List */}
      <div className="space-y-4">
        {filteredVideos.map((video, index) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Trending Position */}
                <div className="md:w-16 bg-gradient-to-b from-red-500 to-pink-500 text-white flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">#{index + 1}</div>
                    <TrendingUp className="w-4 h-4 mx-auto mt-1" />
                  </div>
                </div>

                {/* Video Thumbnail */}
                <div className="relative md:w-80">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 md:h-full object-cover cursor-pointer"
                    onClick={() => handleVideoClick(video)}
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <Flame className="w-3 h-3 mr-1" />
                      TRENDING
                    </Badge>
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex-1 p-4 space-y-3">
                  <div>
                    <h3 
                      className="text-lg font-bold text-gray-900 line-clamp-2 cursor-pointer hover:text-blue-600"
                      onClick={() => handleVideoClick(video)}
                    >
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                      {video.description}
                    </p>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      className="w-8 h-8 cursor-pointer"
                      onClick={() => handleCreatorClick(video.creator.name)}
                    >
                      <AvatarImage src={video.creator.avatar} />
                      <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span 
                          className="text-sm font-medium cursor-pointer hover:text-blue-600"
                          onClick={() => handleCreatorClick(video.creator.name)}
                        >
                          {video.creator.name}
                        </span>
                        {video.creator.verified && (
                          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{video.publishedAt}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{video.likes.toLocaleString()} likes</span>
                    </div>
                    <Badge variant="secondary">
                      {video.category}
                    </Badge>
                  </div>

                  {/* Trending Metrics */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Trending Score</span>
                      <span className="font-medium text-red-600">{video.trendingScore}/100</span>
                    </div>
                    <Progress value={video.trendingScore} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Growth Rate</span>
                      <span className="font-medium text-green-600">+{video.growthRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No trending videos</h3>
          <p className="text-gray-500">
            No videos are trending in this category right now. Check back later!
          </p>
        </div>
      )}

      {/* Trending Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>How Trending Works</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">View Velocity</h4>
              <p className="text-gray-600">
                How quickly a video gains views compared to its typical performance
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Engagement Rate</h4>
              <p className="text-gray-600">
                Likes, comments, and shares relative to view count
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Freshness</h4>
              <p className="text-gray-600">
                Recently published content gets priority in trending
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingPage;
