
import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, MoreHorizontal, Heart, MessageCircle, Share, Eye, Filter, Search, Maximize, Settings, SkipBack, SkipForward, Clock, Bookmark, Download, Flag } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
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
  durationSeconds: number;
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
      durationSeconds: 225,
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
      durationSeconds: 0,
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
      durationSeconds: 922,
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
      durationSeconds: 0,
      views: 15200,
      likes: 1890,
      timestamp: 'Started 1 hour ago',
      isLive: true,
      category: 'Gaming',
      description: 'Watch the most exciting gaming tournament finals live!'
    },
    {
      id: '5',
      title: 'Morning Yoga Routine for Beginners',
      creator: {
        name: 'Wellness Coach',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
        verified: false,
        isFollowing: false
      },
      thumbnail: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=600&fit=crop',
      duration: '12:30',
      durationSeconds: 750,
      views: 3400,
      likes: 289,
      timestamp: '3 days ago',
      category: 'Health',
      description: 'Start your day with this gentle yoga routine perfect for beginners.'
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
  const [currentTime, setCurrentTime] = useState<Record<string, number>>({});
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState<string | null>(null);
  const [watchLater, setWatchLater] = useState<Set<string>>(new Set());

  const categories = ['All', 'Technology', 'Nature', 'Food', 'Music', 'Gaming', 'Sports', 'Education', 'Health'];

  // Simulate video time progression
  useEffect(() => {
    const interval = setInterval(() => {
      if (playingVideo) {
        setCurrentTime(prev => {
          const current = prev[playingVideo] || 0;
          const video = videos.find(v => v.id === playingVideo);
          const maxDuration = video?.durationSeconds || 0;
          
          if (current >= maxDuration && !video?.isLive) {
            setPlayingVideo(null);
            toast.info('Video ended');
            return prev;
          }
          
          return { ...prev, [playingVideo]: current + playbackSpeed };
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playingVideo, videos, playbackSpeed]);

  const handleVideoClick = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
    const video = videos.find(v => v.id === videoId);
    toast.success(`${playingVideo === videoId ? 'Paused' : 'Playing'}: ${video?.title}`);
    console.log(`Video ${videoId} ${playingVideo === videoId ? 'paused' : 'playing'}`);
  };

  const handleLike = (videoId: string) => {
    const newLiked = new Set(likedVideos);
    
    if (likedVideos.has(videoId)) {
      newLiked.delete(videoId);
      toast.info('Removed like');
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

  const handleWatchLater = (videoId: string) => {
    const newWatchLater = new Set(watchLater);
    const video = videos.find(v => v.id === videoId);
    
    if (watchLater.has(videoId)) {
      newWatchLater.delete(videoId);
      toast.info('Removed from Watch Later');
    } else {
      newWatchLater.add(videoId);
      toast.success('Added to Watch Later!');
    }
    setWatchLater(newWatchLater);
    console.log(`Video ${videoId} ${watchLater.has(videoId) ? 'removed from' : 'added to'} Watch Later`);
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

  const handleSkip = (videoId: string, direction: 'forward' | 'backward') => {
    const skipAmount = 10;
    const current = currentTime[videoId] || 0;
    const video = videos.find(v => v.id === videoId);
    const newTime = direction === 'forward' 
      ? Math.min(current + skipAmount, video?.durationSeconds || 0)
      : Math.max(current - skipAmount, 0);
    
    setCurrentTime(prev => ({ ...prev, [videoId]: newTime }));
    toast.info(`Skipped ${direction} ${skipAmount}s`);
  };

  const handleFullscreen = (videoId: string) => {
    setIsFullscreen(isFullscreen === videoId ? null : videoId);
    toast.info(isFullscreen === videoId ? 'Exited fullscreen' : 'Entered fullscreen');
    console.log(`Fullscreen toggled for video ${videoId}`);
  };

  const handleVideoSettings = (videoId: string) => {
    toast.info('Video settings opened');
    console.log(`Settings for video ${videoId}`);
  };

  const handleDownload = (videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    toast.success(`Downloading: ${video?.title}`);
    console.log(`Download initiated for video ${videoId}`);
  };

  const handleReport = (videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    toast.info(`Report submitted for: ${video?.title}`);
    console.log(`Report submitted for video ${videoId}`);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    toast.info(`Playback speed: ${speed}x`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
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
      case 'duration':
        return b.durationSeconds - a.durationSeconds;
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
              <Badge variant="secondary">
                {savedVideos.size} Saved
              </Badge>
              <Badge variant="outline">
                {watchLater.size} Watch Later
              </Badge>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search videos, creators, or topics..."
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
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
              <AccessibleButton
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
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
            <Card key={video.id} className={`overflow-hidden hover:shadow-lg transition-shadow ${isFullscreen === video.id ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={`w-full object-cover cursor-pointer ${isFullscreen === video.id ? 'h-screen' : 'h-48'}`}
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
                  <>
                    {/* Progress Bar */}
                    <div className="absolute bottom-16 left-4 right-4">
                      <Progress 
                        value={video.isLive ? 0 : (currentTime[video.id] || 0) / video.durationSeconds * 100} 
                        className="h-1 bg-white bg-opacity-30"
                      />
                      {!video.isLive && (
                        <div className="flex justify-between text-white text-xs mt-1">
                          <span>{formatTime(currentTime[video.id] || 0)}</span>
                          <span>{formatDuration(video.duration)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {!video.isLive && (
                          <>
                            <AccessibleButton
                              size="sm"
                              onClick={() => handleSkip(video.id, 'backward')}
                              className="text-white bg-black bg-opacity-50 p-2 rounded"
                            >
                              <SkipBack className="w-4 h-4" />
                            </AccessibleButton>
                            <AccessibleButton
                              size="sm"
                              onClick={() => handleSkip(video.id, 'forward')}
                              className="text-white bg-black bg-opacity-50 p-2 rounded"
                            >
                              <SkipForward className="w-4 h-4" />
                            </AccessibleButton>
                          </>
                        )}
                        <AccessibleButton
                          size="sm"
                          onClick={handleVolumeToggle}
                          className="text-white bg-black bg-opacity-50 p-2 rounded"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </AccessibleButton>
                      </div>
                      
                      <div className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                        {video.views.toLocaleString()} watching
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Select value={playbackSpeed.toString()} onValueChange={(value) => handleSpeedChange(parseFloat(value))}>
                          <SelectTrigger className="w-16 h-8 text-xs text-white bg-black bg-opacity-50 border-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.5">0.5x</SelectItem>
                            <SelectItem value="0.75">0.75x</SelectItem>
                            <SelectItem value="1">1x</SelectItem>
                            <SelectItem value="1.25">1.25x</SelectItem>
                            <SelectItem value="1.5">1.5x</SelectItem>
                            <SelectItem value="2">2x</SelectItem>
                          </SelectContent>
                        </Select>
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
                  </>
                )}
              </div>

              {!isFullscreen && (
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
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{video.description}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Button
                        variant={video.creator.isFollowing ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleFollow(video.creator.name, video.id)}
                      >
                        {video.creator.isFollowing ? 'Following' : 'Follow'}
                      </Button>
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

                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleWatchLater(video.id)}
                        className={`flex items-center space-x-1 ${
                          watchLater.has(video.id) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                      </AccessibleButton>

                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSave(video.id)}
                        className={`flex items-center space-x-1 ${
                          savedVideos.has(video.id) ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${savedVideos.has(video.id) ? 'fill-current' : ''}`} />
                      </AccessibleButton>
                    </div>

                    <div className="flex items-center space-x-1">
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(video.id)}
                        className="text-gray-600 hover:text-green-600"
                      >
                        <Download className="w-4 h-4" />
                      </AccessibleButton>

                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(video.id)}
                        className="text-gray-600 hover:text-green-600"
                      >
                        <Share className="w-4 h-4" />
                      </AccessibleButton>

                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReport(video.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Flag className="w-4 h-4" />
                      </AccessibleButton>
                    </div>
                  </div>
                </CardContent>
              )}
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
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
                className="mt-4"
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Watch;
