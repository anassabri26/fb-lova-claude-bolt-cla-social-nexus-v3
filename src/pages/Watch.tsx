
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, MoreHorizontal, Heart, MessageCircle, Share, Eye, Filter, Search, Maximize, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import AccessibleButton from '../components/AccessibleButton';
import LiveVideoIndicator from '../components/LiveVideoIndicator';
import { toast } from 'sonner';

interface Video {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
    isFollowing: boolean;
  };
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  timestamp: string;
  isLive?: boolean;
  category: string;
  description: string;
  videoUrl?: string;
}

const Watch = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Amazing Sunset Timelapse from Mount Wilson',
      creator: {
        name: 'Nature Explorer',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        verified: true,
        isFollowing: false
      },
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      duration: '3:45',
      views: 12500,
      likes: 890,
      timestamp: '2 hours ago',
      category: 'Nature',
      description: 'Watch this breathtaking sunset timelapse captured from Mount Wilson Observatory.'
    },
    {
      id: '2',
      title: 'Live: Tech Conference 2024 - Latest Innovations',
      creator: {
        name: 'Tech Today',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: true,
        isFollowing: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      duration: 'LIVE',
      views: 5400,
      likes: 234,
      timestamp: 'Started 30 min ago',
      isLive: true,
      category: 'Technology',
      description: 'Join us live for the biggest tech conference of 2024!'
    },
    {
      id: '3',
      title: 'Cooking Masterclass: Perfect Pasta in 15 Minutes',
      creator: {
        name: 'Chef Maria',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
        verified: false,
        isFollowing: false
      },
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      duration: '15:22',
      views: 8900,
      likes: 567,
      timestamp: '1 day ago',
      category: 'Food',
      description: 'Learn how to make restaurant-quality pasta at home in just 15 minutes!'
    },
    {
      id: '4',
      title: 'Live: Gaming Tournament Finals',
      creator: {
        name: 'GameStream Pro',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
        verified: true,
        isFollowing: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
      duration: 'LIVE',
      views: 15200,
      likes: 1890,
      timestamp: 'Started 1 hour ago',
      isLive: true,
      category: 'Gaming',
      description: 'Watch the most exciting gaming tournament finals live!'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [savedVideos, setSavedVideos] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  const categories = ['All', 'Technology', 'Nature', 'Food', 'Music', 'Gaming', 'Sports', 'Education'];

  const handleVideoClick = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
    const video = videos.find(v => v.id === videoId);
    toast.success(`${playingVideo === videoId ? 'Paused' : 'Playing'}: ${video?.title}`);
    console.log(`Video ${videoId} ${playingVideo === videoId ? 'paused' : 'playing'}`);
  };

  const handleLike = (videoId: string) => {
    const newLiked = new Set(likedVideos);
    const video = videos.find(v => v.id === videoId);
    
    if (likedVideos.has(videoId)) {
      newLiked.delete(videoId);
      toast.info('Removed like');
      // Update video likes count
      setVideos(prev => prev.map(v => 
        v.id === videoId ? { ...v, likes: v.likes - 1 } : v
      ));
    } else {
      newLiked.add(videoId);
      toast.success('Video liked!');
      setVideos(prev => prev.map(v => 
        v.id === videoId ? { ...v, likes: v.likes + 1 } : v
      ));
    }
    setLikedVideos(newLiked);
    console.log(`Video ${videoId} ${likedVideos.has(videoId) ? 'unliked' : 'liked'}`);
  };

  const handleSave = (videoId: string) => {
    const newSaved = new Set(savedVideos);
    const video = videos.find(v => v.id === videoId);
    
    if (savedVideos.has(videoId)) {
      newSaved.delete(videoId);
      toast.info('Removed from saved');
    } else {
      newSaved.add(videoId);
      toast.success('Video saved!');
    }
    setSavedVideos(newSaved);
    console.log(`Video ${videoId} ${savedVideos.has(videoId) ? 'unsaved' : 'saved'}`);
  };

  const handleFollow = (creatorName: string, videoId: string) => {
    setVideos(prev => prev.map(v => 
      v.id === videoId 
        ? { ...v, creator: { ...v.creator, isFollowing: !v.creator.isFollowing } }
        : v
    ));
    const video = videos.find(v => v.id === videoId);
    toast.success(`${video?.creator.isFollowing ? 'Unfollowed' : 'Now following'} ${creatorName}!`);
    console.log(`${video?.creator.isFollowing ? 'Unfollowed' : 'Followed'} ${creatorName}`);
  };

  const handleShare = (videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    navigator.clipboard.writeText(`${window.location.origin}/watch/${videoId}`);
    toast.success('Video link copied to clipboard!');
    console.log(`Shared video: ${video?.title}`);
  };

  const handleComment = (videoId: string) => {
    toast.info('Opening comments...');
    console.log(`Opening comments for video ${videoId}`);
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? 'Sound on' : 'Sound off');
  };

  const handleFullscreen = (videoId: string) => {
    toast.info('Entering fullscreen...');
    console.log(`Fullscreen for video ${videoId}`);
  };

  const handleVideoSettings = (videoId: string) => {
    toast.info('Video settings opened');
    console.log(`Settings for video ${videoId}`);
  };

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      case 'newest':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      default:
        return 0;
    }
  });

  const liveVideos = videos.filter(v => v.isLive);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header with Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Watch</h1>
              <p className="text-gray-600">Discover videos from creators you follow and explore new content</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="destructive" className="animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                {liveVideos.length} LIVE
              </Badge>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <AccessibleButton
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                <Filter className="w-4 h-4" />
              </AccessibleButton>
            </div>
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
              {category !== 'All' && videos.filter(v => v.category === category).length > 0 && (
                <span className="ml-1 text-xs">
                  ({videos.filter(v => v.category === category).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {sortedVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleVideoClick(video.id)}
                />
                
                {/* Live Indicator */}
                <LiveVideoIndicator viewerCount={video.views} isLive={video.isLive || false} />

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all cursor-pointer flex items-center justify-center"
                     onClick={() => handleVideoClick(video.id)}>
                  <div className="opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      {playingVideo === video.id ? (
                        <Pause className="w-8 h-8 text-gray-800" />
                      ) : (
                        <Play className="w-8 h-8 text-gray-800 ml-1" />
                      )}
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

                {/* Video Controls (when playing) */}
                {playingVideo === video.id && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AccessibleButton
                        size="sm"
                        onClick={handleVolumeToggle}
                        className="text-white bg-black bg-opacity-50 p-2 rounded"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </AccessibleButton>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AccessibleButton
                        size="sm"
                        onClick={() => handleVideoSettings(video.id)}
                        className="text-white bg-black bg-opacity-50 p-2 rounded"
                      >
                        <Settings className="w-4 h-4" />
                      </AccessibleButton>
                      <AccessibleButton
                        size="sm"
                        onClick={() => handleFullscreen(video.id)}
                        className="text-white bg-black bg-opacity-50 p-2 rounded"
                      >
                        <Maximize className="w-4 h-4" />
                      </AccessibleButton>
                    </div>
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
                    <p className="text-xs text-gray-500 mt-1">{video.description}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Button
                      variant={video.creator.isFollowing ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleFollow(video.creator.name, video.id)}
                    >
                      {video.creator.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSave(video.id)}
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </AccessibleButton>
                  </div>
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
                      className={`flex items-center space-x-1 ${
                        likedVideos.has(video.id) ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedVideos.has(video.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm">{video.likes}</span>
                    </AccessibleButton>
                    
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleComment(video.id)}
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
        {sortedVideos.length === 0 && (
          <div className="text-center py-12">
            <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-500">
              {searchQuery ? `No results for "${searchQuery}"` : 'Try selecting a different category or check back later.'}
            </p>
          </div>
        )}
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Watch;
