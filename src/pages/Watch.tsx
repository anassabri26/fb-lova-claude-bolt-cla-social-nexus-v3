import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, MoreHorizontal, Heart, MessageCircle, Share, Eye, Filter, Search, Settings, Clock, Bookmark, Flag, Upload, List, Users, Plus, TrendingUp, Zap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccessibleButton from '@/components/AccessibleButton';
import { toast } from 'sonner';

interface Video {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
    isFollowing: boolean;
    subscribers: string;
  };
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  timestamp: string;
  isLive?: boolean;
  category: string;
  description: string;
  isTrending?: boolean;
  isShort?: boolean;
}

const Watch = () => {
  const [videos] = useState<Video[]>([
    {
      id: '1',
      title: 'Amazing Sunset Timelapse from Mount Wilson',
      creator: {
        name: 'Nature Explorer',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        verified: true,
        isFollowing: false,
        subscribers: '890K'
      },
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      duration: '3:45',
      views: 12500,
      likes: 890,
      timestamp: '2 hours ago',
      category: 'Nature',
      description: 'Watch this breathtaking sunset timelapse captured from Mount Wilson Observatory.',
      isTrending: true
    },
    {
      id: '2',
      title: 'Live: Tech Conference 2024 - Latest Innovations',
      creator: {
        name: 'Tech Today',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: true,
        isFollowing: true,
        subscribers: '2.5M'
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
      title: 'Quick Pasta Recipe',
      creator: {
        name: 'Chef Maria',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
        verified: false,
        isFollowing: false,
        subscribers: '156K'
      },
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      duration: '0:45',
      views: 8900,
      likes: 567,
      timestamp: '1 day ago',
      category: 'Food',
      description: 'Quick 45-second pasta recipe!',
      isShort: true
    }
  ]);

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [savedVideos, setSavedVideos] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const categories = ['All', 'Technology', 'Nature', 'Food', 'Music', 'Gaming', 'Sports', 'Education', 'Health'];

  const handleVideoClick = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
    const video = videos.find(v => v.id === videoId);
    console.log(`Video ${videoId} ${playingVideo === videoId ? 'paused' : 'playing'}`);
  };

  const handleLike = (videoId: string) => {
    const newLiked = new Set(likedVideos);
    
    if (likedVideos.has(videoId)) {
      newLiked.delete(videoId);
    } else {
      newLiked.add(videoId);
    }
    setLikedVideos(newLiked);
    console.log(`Video ${videoId} ${likedVideos.has(videoId) ? 'unliked' : 'liked'}`);
  };

  const handleSave = (videoId: string) => {
    const newSaved = new Set(savedVideos);
    
    if (savedVideos.has(videoId)) {
      newSaved.delete(videoId);
    } else {
      newSaved.add(videoId);
    }
    setSavedVideos(newSaved);
    console.log(`Video ${videoId} ${savedVideos.has(videoId) ? 'unsaved' : 'saved'}`);
  };

  const handleFollow = (creatorName: string, videoId: string) => {
    console.log(`Followed/Unfollowed ${creatorName}`);
  };

  const handleShare = (videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    navigator.clipboard.writeText(`${window.location.origin}/watch/${videoId}`);
    console.log(`Shared video: ${video?.title}`);
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
      default:
        return 0;
    }
  });

  const liveVideos = videos.filter(v => v.isLive);
  const trendingVideos = videos.filter(v => v.isTrending);
  const shortsVideos = videos.filter(v => v.isShort);

  const renderVideoCard = (video: Video) => (
    <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => handleVideoClick(video.id)}
        />
        
        {/* Live indicator */}
        {video.isLive && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
              LIVE
            </Badge>
          </div>
        )}
        
        {video.isTrending && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-500 text-white animate-pulse">
              <TrendingUp className="w-3 h-3 mr-1" />
              TRENDING
            </Badge>
          </div>
        )}
        
        {video.isShort && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-purple-500 text-white">
              <Zap className="w-3 h-3 mr-1" />
              SHORTS
            </Badge>
          </div>
        )}

        {/* Play overlay */}
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

        {/* Duration */}
        <div className="absolute bottom-2 right-2">
          <Badge 
            variant={video.isLive ? 'destructive' : video.isShort ? 'secondary' : 'secondary'}
            className={video.isLive ? 'animate-pulse' : ''}
          >
            {video.duration}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Creator info */}
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
              <span className="text-xs text-gray-500">• {video.creator.subscribers} subscribers</span>
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

        {/* Video stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{video.views.toLocaleString()}</span>
            </div>
            <span>{video.timestamp}</span>
            {video.category && (
              <Badge variant="outline" className="text-xs">
                {video.category}
              </Badge>
            )}
          </div>
        </div>

        {/* Action buttons */}
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
              onClick={() => console.log(`Comment on ${video.id}`)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Comment</span>
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
              onClick={() => handleShare(video.id)}
              className="text-gray-600 hover:text-green-600"
            >
              <Share className="w-4 h-4" />
            </AccessibleButton>

            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={() => console.log(`Report ${video.id}`)}
              className="text-gray-600 hover:text-red-600"
            >
              <Flag className="w-4 h-4" />
            </AccessibleButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab list */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Home</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="shorts" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Shorts</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Subscriptions</span>
            </TabsTrigger>
          </TabsList>

          {/* Home tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
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
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {trendingVideos.length} Trending
                  </Badge>
                  <Badge variant="outline">
                    <Zap className="w-3 h-3 mr-1" />
                    {shortsVideos.length} Shorts
                  </Badge>
                </div>
              </div>

              {/* Search and filters */}
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
                    </SelectContent>
                  </Select>
                  <AccessibleButton
                    variant="outline"
                    size="sm"
                    aria-label="Filter options"
                  >
                    <Filter className="w-4 h-4" />
                  </AccessibleButton>
                </div>
              </div>
            </div>

            {/* Category filters */}
            <div className="flex space-x-2 overflow-x-auto scrollbar-thin">
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

            {/* Videos grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {sortedVideos.map(renderVideoCard)}
            </div>

            {/* Empty state */}
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
          </TabsContent>

          {/* Trending tab */}
          <TabsContent value="trending" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
                Trending Videos
              </h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {trendingVideos.map(renderVideoCard)}
              </div>
            </div>
          </TabsContent>

          {/* Shorts tab */}
          <TabsContent value="shorts" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-purple-500" />
                Shorts
              </h2>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {shortsVideos.map(renderVideoCard)}
              </div>
            </div>
          </TabsContent>

          {/* Subscriptions tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Your Subscriptions
              </h2>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No subscriptions yet</h3>
                <p className="text-gray-500 mb-6">Subscribe to creators to see their latest videos here</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Discover Creators
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Watch;