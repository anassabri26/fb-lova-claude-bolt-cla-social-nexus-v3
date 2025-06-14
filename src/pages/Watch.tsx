
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, MoreHorizontal, Heart, MessageCircle, Share, Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

interface Video {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  timestamp: string;
  isLive?: boolean;
  category: string;
}

const Watch = () => {
  const [videos] = useState<Video[]>([
    {
      id: '1',
      title: 'Amazing Sunset Timelapse from Mount Wilson',
      creator: {
        name: 'Nature Explorer',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      duration: '3:45',
      views: 12500,
      likes: 890,
      timestamp: '2 hours ago',
      category: 'Nature'
    },
    {
      id: '2',
      title: 'Live: Tech Conference 2024 - Latest Innovations',
      creator: {
        name: 'Tech Today',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      duration: 'LIVE',
      views: 5400,
      likes: 234,
      timestamp: 'Started 30 min ago',
      isLive: true,
      category: 'Technology'
    },
    {
      id: '3',
      title: 'Cooking Masterclass: Perfect Pasta in 15 Minutes',
      creator: {
        name: 'Chef Maria',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      duration: '15:22',
      views: 8900,
      likes: 567,
      timestamp: '1 day ago',
      category: 'Food'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const categories = ['All', 'Technology', 'Nature', 'Food', 'Music', 'Gaming', 'Sports'];

  const handleVideoClick = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
    toast.info('Video player opened');
  };

  const handleLike = (videoId: string) => {
    toast.success('Video liked!');
  };

  const handleShare = (videoId: string) => {
    toast.success('Video shared!');
  };

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Watch</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
              2 LIVE
            </Badge>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto mb-6 scrollbar-thin">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleVideoClick(video.id)}
                />
                
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all cursor-pointer flex items-center justify-center"
                     onClick={() => handleVideoClick(video.id)}>
                  <div className="opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2">
                  <Badge 
                    variant={video.isLive ? 'destructive' : 'secondary'}
                    className={video.isLive ? 'animate-pulse' : ''}
                  >
                    {video.duration}
                  </Badge>
                </div>

                {/* Live Indicator */}
                {video.isLive && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="destructive" className="animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                      LIVE
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                {/* Creator Info */}
                <div className="flex items-start space-x-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={video.creator.avatar} />
                    <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight">
                      {video.title}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <p className="text-sm text-gray-600">{video.creator.name}</p>
                      {video.creator.verified && (
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <AccessibleButton variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </AccessibleButton>
                </div>

                {/* Video Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views.toLocaleString()}</span>
                    </div>
                    <span>{video.timestamp}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(video.id)}
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{video.likes}</span>
                    </AccessibleButton>
                    
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">Comment</span>
                    </AccessibleButton>
                  </div>

                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(video.id)}
                    className="text-gray-600 hover:text-green-600"
                  >
                    <Share className="w-4 h-4" />
                  </AccessibleButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-500">Try selecting a different category or check back later.</p>
          </div>
        )}
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Watch;
