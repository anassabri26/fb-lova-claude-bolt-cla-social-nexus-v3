import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, MoreHorizontal, Heart, MessageCircle, Share, Eye, Filter, Search, Settings, Clock, Bookmark, Flag, Upload, List, Users, Plus, TrendingUp, Zap, Grid, Calendar, Bell, Radio, Video, Tv } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { formatNumber, formatTimeAgo } from '@/lib/utils';
import { useIsMobile, useIsTablet } from '@/hooks/use-device';
import { MOCK_IMAGES } from '@/lib/constants';

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
  isPremium?: boolean;
}

interface Reel {
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
  isLiked?: boolean;
  isSaved?: boolean;
}

interface LiveStream {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
    isFollowing: boolean;
  };
  thumbnail: string;
  viewers: number;
  startedAt: string;
  category: string;
  tags: string[];
  isRecommended?: boolean;
}

const Watch = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const [videos] = useState<Video[]>([
    {
      id: '1',
      title: 'Amazing Sunset Timelapse from Mount Wilson Observatory',
      creator: {
        name: 'Nature Explorer',
        avatar: MOCK_IMAGES.AVATARS[0],
        verified: true,
        isFollowing: false,
        subscribers: '890K'
      },
      thumbnail: MOCK_IMAGES.POSTS[0],
      duration: '3:45',
      views: 125000,
      likes: 8900,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      category: 'Nature',
      description: 'Watch this breathtaking sunset timelapse captured from Mount Wilson Observatory.',
      isTrending: true
    },
    {
      id: '2',
      title: 'Live: Tech Conference 2024 - Latest Innovations',
      creator: {
        name: 'Tech Today',
        avatar: MOCK_IMAGES.AVATARS[1],
        verified: true,
        isFollowing: true,
        subscribers: '2.5M'
      },
      thumbnail: MOCK_IMAGES.POSTS[1],
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
        avatar: MOCK_IMAGES.AVATARS[2],
        verified: false,
        isFollowing: false,
        subscribers: '156K'
      },
      thumbnail: MOCK_IMAGES.POSTS[2],
      duration: '0:45',
      views: 8900,
      likes: 567,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Food',
      description: 'Quick 45-second pasta recipe!',
      isShort: true
    },
    {
      id: '4',
      title: 'Advanced Photography Masterclass',
      creator: {
        name: 'Pro Photographer',
        avatar: MOCK_IMAGES.AVATARS[3],
        verified: true,
        isFollowing: false,
        subscribers: '1.2M'
      },
      thumbnail: MOCK_IMAGES.POSTS[3],
      duration: '45:20',
      views: 67000,
      likes: 3400,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Education',
      description: 'Learn advanced photography techniques from a professional.',
      isPremium: true
    }
  ]);

  const [reels, setReels] = useState<Reel[]>([
    {
      id: 'reel-1',
      title: 'Amazing skateboard trick',
      creator: {
        name: 'Skate Pro',
        avatar: MOCK_IMAGES.AVATARS[4],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[4],
      duration: '0:28',
      views: 1200000,
      likes: 245000
    },
    {
      id: 'reel-2',
      title: 'Cute puppy learns new trick',
      creator: {
        name: 'Pet Lovers',
        avatar: MOCK_IMAGES.AVATARS[5],
        verified: false
      },
      thumbnail: MOCK_IMAGES.POSTS[5],
      duration: '0:15',
      views: 3400000,
      likes: 890000
    },
    {
      id: 'reel-3',
      title: 'Incredible dance moves',
      creator: {
        name: 'Dance Studio',
        avatar: MOCK_IMAGES.AVATARS[6],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[0],
      duration: '0:32',
      views: 5600000,
      likes: 1200000
    },
    {
      id: 'reel-4',
      title: 'Life hack you need to know',
      creator: {
        name: 'Life Hacks',
        avatar: MOCK_IMAGES.AVATARS[7],
        verified: false
      },
      thumbnail: MOCK_IMAGES.POSTS[1],
      duration: '0:22',
      views: 2800000,
      likes: 560000
    },
    {
      id: 'reel-5',
      title: 'Funny cat moment',
      creator: {
        name: 'Cat World',
        avatar: MOCK_IMAGES.AVATARS[0],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[2],
      duration: '0:18',
      views: 7800000,
      likes: 1500000
    },
    {
      id: 'reel-6',
      title: 'Amazing science experiment',
      creator: {
        name: 'Science Fun',
        avatar: MOCK_IMAGES.AVATARS[1],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[3],
      duration: '0:45',
      views: 1900000,
      likes: 450000
    }
  ]);

  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([
    {
      id: 'live-1',
      title: 'Live Gaming: Fortnite Tournament Finals',
      creator: {
        name: 'Gaming Pro',
        avatar: MOCK_IMAGES.AVATARS[2],
        verified: true,
        isFollowing: true
      },
      thumbnail: MOCK_IMAGES.POSTS[4],
      viewers: 15400,
      startedAt: '2 hours ago',
      category: 'Gaming',
      tags: ['fortnite', 'tournament', 'esports'],
      isRecommended: true
    },
    {
      id: 'live-2',
      title: 'Live Coding: Building a React App from Scratch',
      creator: {
        name: 'Code Master',
        avatar: MOCK_IMAGES.AVATARS[3],
        verified: true,
        isFollowing: false
      },
      thumbnail: MOCK_IMAGES.POSTS[5],
      viewers: 8200,
      startedAt: '45 minutes ago',
      category: 'Technology',
      tags: ['coding', 'react', 'webdev']
    },
    {
      id: 'live-3',
      title: 'Live Concert: Summer Vibes 2024',
      creator: {
        name: 'Music Festival',
        avatar: MOCK_IMAGES.AVATARS[4],
        verified: true,
        isFollowing: false
      },
      thumbnail: MOCK_IMAGES.POSTS[0],
      viewers: 45600,
      startedAt: '30 minutes ago',
      category: 'Music',
      tags: ['concert', 'live music', 'festival']
    },
    {
      id: 'live-4',
      title: 'Live Q&A: Ask Me Anything About Fitness',
      creator: {
        name: 'Fitness Coach',
        avatar: MOCK_IMAGES.AVATARS[5],
        verified: false,
        isFollowing: true
      },
      thumbnail: MOCK_IMAGES.POSTS[1],
      viewers: 3200,
      startedAt: '1 hour ago',
      category: 'Health',
      tags: ['fitness', 'workout', 'health']
    },
    {
      id: 'live-5',
      title: 'Live Cooking Show: Italian Pasta Masterclass',
      creator: {
        name: 'Chef Maria',
        avatar: MOCK_IMAGES.AVATARS[2],
        verified: true,
        isFollowing: false
      },
      thumbnail: MOCK_IMAGES.POSTS[2],
      viewers: 12800,
      startedAt: '15 minutes ago',
      category: 'Food',
      tags: ['cooking', 'italian', 'pasta']
    },
    {
      id: 'live-6',
      title: 'Live News: Breaking Technology Updates',
      creator: {
        name: 'Tech News Network',
        avatar: MOCK_IMAGES.AVATARS[6],
        verified: true,
        isFollowing: false
      },
      thumbnail: MOCK_IMAGES.POSTS[3],
      viewers: 28500,
      startedAt: '5 minutes ago',
      category: 'News',
      tags: ['tech news', 'breaking', 'updates'],
      isRecommended: true
    }
  ]);

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [savedVideos, setSavedVideos] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isReelPlaying, setIsReelPlaying] = useState(false);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [savedReels, setSavedReels] = useState<Set<string>>(new Set());
  const [followedCreators, setFollowedCreators] = useState<Set<string>>(new Set(['Tech Today', 'Fitness Coach']));
  const [liveFilter, setLiveFilter] = useState<'all' | 'following' | 'recommended'>('all');

  const categories = ['All', 'Technology', 'Nature', 'Food', 'Music', 'Gaming', 'Sports', 'Education', 'Health'];

  useEffect(() => {
    // Reset reel playing state when tab changes
    if (activeTab !== 'reels') {
      setIsReelPlaying(false);
    }
  }, [activeTab]);

  const handleVideoClick = (videoId: string) => {
    navigate(`/watch/${videoId}`);
  };

  const handleChannelClick = (creatorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const channelId = creatorName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/channel/${channelId}`);
  };

  const handleLike = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = new Set(likedVideos);
    
    if (likedVideos.has(videoId)) {
      newLiked.delete(videoId);
      toast.success('Removed from liked videos');
    } else {
      newLiked.add(videoId);
      toast.success('Added to liked videos');
    }
    setLikedVideos(newLiked);
  };

  const handleSave = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = new Set(savedVideos);
    
    if (savedVideos.has(videoId)) {
      newSaved.delete(videoId);
      toast.success('Removed from saved videos');
    } else {
      newSaved.add(videoId);
      toast.success('Saved to watch later');
    }
    setSavedVideos(newSaved);
  };

  const handleFollow = (creatorName: string, videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFollowed = new Set(followedCreators);
    
    if (followedCreators.has(creatorName)) {
      newFollowed.delete(creatorName);
      toast.success(`Unsubscribed from ${creatorName}`);
    } else {
      newFollowed.add(creatorName);
      toast.success(`Subscribed to ${creatorName}`);
    }
    
    setFollowedCreators(newFollowed);
  };

  const handleShare = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videos.find(v => v.id === videoId);
    navigator.clipboard.writeText(`${window.location.origin}/watch/${videoId}`);
    toast.success('Video link copied to clipboard');
  };

  const handleReelLike = (reelId: string) => {
    const newLiked = new Set(likedReels);
    
    if (likedReels.has(reelId)) {
      newLiked.delete(reelId);
      toast.success('Removed like from reel');
    } else {
      newLiked.add(reelId);
      toast.success('Liked reel');
    }
    setLikedReels(newLiked);
  };

  const handleReelSave = (reelId: string) => {
    const newSaved = new Set(savedReels);
    
    if (savedReels.has(reelId)) {
      newSaved.delete(reelId);
      toast.success('Removed from saved reels');
    } else {
      newSaved.add(reelId);
      toast.success('Saved reel');
    }
    setSavedReels(newSaved);
  };

  const handleReelShare = (reelId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/reels/${reelId}`);
    toast.success('Reel link copied to clipboard');
  };

  const handleNextReel = () => {
    setCurrentReelIndex((prev) => (prev + 1) % reels.length);
  };

  const handlePrevReel = () => {
    setCurrentReelIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  const handleJoinLiveStream = (streamId: string) => {
    navigate(`/watch/${streamId}`);
    toast.success('Joining live stream...');
  };

  const handleRemindLiveStream = (streamId: string) => {
    toast.success('You will be notified when this stream starts');
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

  const filteredLiveStreams = liveStreams.filter(stream => {
    if (liveFilter === 'following') {
      return followedCreators.has(stream.creator.name);
    } else if (liveFilter === 'recommended') {
      return stream.isRecommended;
    }
    return true;
  });

  const renderVideoCard = (video: Video) => (
    <Card 
      key={video.id} 
      className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => handleVideoClick(video.id)}
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
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
            <Badge className="bg-red-500 text-white">
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

        {video.isPremium && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-yellow-500 text-black">
              Premium
            </Badge>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-800 ml-1" />
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
          <Avatar 
            className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
            onClick={(e) => handleChannelClick(video.creator.name, e)}
          >
            <AvatarImage src={video.creator.avatar} />
            <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight group-hover:text-blue-600 transition-colors">
              {video.title}
            </h3>
            <div className="flex items-center space-x-1 mt-1">
              <p 
                className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
                onClick={(e) => handleChannelClick(video.creator.name, e)}
              >
                {video.creator.name}
              </p>
              {video.creator.verified && (
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
              <span>{formatNumber(video.views)} views</span>
              <span>•</span>
              <span>{video.timestamp.includes('ago') ? video.timestamp : formatTimeAgo(video.timestamp)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{video.description}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleLike(video.id, e)}
              className={`flex items-center space-x-1 ${
                likedVideos.has(video.id) ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${likedVideos.has(video.id) ? 'fill-current' : ''}`} />
              <span className="text-sm">{video.likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleSave(video.id, e)}
              className={`flex items-center space-x-1 ${
                savedVideos.has(video.id) ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${savedVideos.has(video.id) ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleShare(video.id, e)}
              className="text-gray-600 hover:text-green-600"
            >
              <Share className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toast.info('More options');
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Subscribe button for non-following creators */}
        {!followedCreators.has(video.creator.name) && (
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              onClick={(e) => handleFollow(video.creator.name, video.id, e)}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Subscribe
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderReelCard = (reel: Reel, index: number) => (
    <div 
      key={reel.id}
      className={`relative ${index === currentReelIndex ? 'scale-100' : 'scale-95 opacity-70'} transition-all duration-300 cursor-pointer`}
      onClick={() => setCurrentReelIndex(index)}
    >
      <div className="relative h-96 w-full max-w-xs mx-auto overflow-hidden rounded-xl">
        <img 
          src={reel.thumbnail} 
          alt={reel.title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70">
          {/* Top info */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src={reel.creator.avatar} />
                <AvatarFallback>{reel.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-1">
                <span className="text-white text-sm font-medium">{reel.creator.name}</span>
                {reel.creator.verified && (
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </div>
            <Badge variant="secondary" className="bg-black/50 text-white border-0">
              {reel.duration}
            </Badge>
          </div>
          
          {/* Bottom info */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm font-medium mb-2 line-clamp-2">{reel.title}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-white text-xs">
                <Eye className="w-3 h-3" />
                <span>{formatNumber(reel.views)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReelLike(reel.id);
                  }}
                >
                  <Heart className={`w-5 h-5 ${likedReels.has(reel.id) ? 'fill-current text-red-500' : ''}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReelSave(reel.id);
                  }}
                >
                  <Bookmark className={`w-5 h-5 ${savedReels.has(reel.id) ? 'fill-current text-yellow-500' : ''}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReelShare(reel.id);
                  }}
                >
                  <Share className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Play button overlay */}
          {index === currentReelIndex && !isReelPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                variant="ghost" 
                size="lg" 
                className="rounded-full bg-black/30 hover:bg-black/50 text-white h-16 w-16"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsReelPlaying(true);
                }}
              >
                <Play className="w-8 h-8 ml-1" />
              </Button>
            </div>
          )}
          
          {/* Pause button overlay */}
          {index === currentReelIndex && isReelPlaying && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="lg" 
                className="rounded-full bg-black/30 hover:bg-black/50 text-white h-16 w-16"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsReelPlaying(false);
                }}
              >
                <Pause className="w-8 h-8" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderLiveStreamCard = (stream: LiveStream) => (
    <Card 
      key={stream.id}
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => handleJoinLiveStream(stream.id)}
    >
      <div className="relative">
        <img 
          src={stream.thumbnail}
          alt={stream.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Live badge */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-red-500 text-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
            LIVE
          </Badge>
        </div>
        
        {/* Viewers count */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white border-0">
            <Eye className="w-3 h-3 mr-1" />
            {formatNumber(stream.viewers)} watching
          </Badge>
        </div>
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={stream.creator.avatar} />
            <AvatarFallback>{stream.creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600">
              {stream.title}
            </h3>
            
            <div className="flex items-center space-x-1 mb-1">
              <span className="text-sm text-gray-600">{stream.creator.name}</span>
              {stream.creator.verified && (
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
              <span>{stream.category}</span>
              <span>•</span>
              <span>Started {stream.startedAt}</span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {stream.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleJoinLiveStream(stream.id);
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Now
              </Button>
              
              {!followedCreators.has(stream.creator.name) ? (
                <Button 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFollow(stream.creator.name, stream.id, e);
                  }}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Follow
                </Button>
              ) : (
                <Button 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemindLiveStream(stream.id);
                  }}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Remind
                </Button>
              )}
            </div>
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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 gap-2">
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
            <TabsTrigger value="reels" className="flex items-center space-x-2">
              <Video className="w-4 h-4" />
              <span>Reels</span>
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center space-x-2">
              <Radio className="w-4 h-4" />
              <span>Live</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Subscriptions</span>
            </TabsTrigger>
            <TabsTrigger value="tv" className="flex items-center space-x-2">
              <Tv className="w-4 h-4" />
              <span>TV Shows</span>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  >
                    {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label="Filter options"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
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
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
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
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

          {/* Reels tab */}
          <TabsContent value="reels" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Video className="w-5 h-5 mr-2 text-blue-500" />
                  Reels
                </h2>
                <Button 
                  variant="outline"
                  onClick={() => toast.info('Create reel feature coming soon')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Reel
                </Button>
              </div>
              
              <div className="relative">
                {/* Reels carousel */}
                <div className="flex justify-center items-center">
                  {/* Navigation buttons */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 z-10 bg-black/30 text-white hover:bg-black/50 h-10 w-10 rounded-full"
                    onClick={handlePrevReel}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  
                  {/* Reels */}
                  <div className="flex justify-center items-center gap-4 overflow-hidden">
                    {reels.map((reel, index) => {
                      // Show current reel and one on each side
                      const shouldShow = 
                        index === currentReelIndex || 
                        index === (currentReelIndex + 1) % reels.length || 
                        index === (currentReelIndex - 1 + reels.length) % reels.length;
                      
                      return shouldShow ? renderReelCard(reel, index) : null;
                    })}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 z-10 bg-black/30 text-white hover:bg-black/50 h-10 w-10 rounded-full"
                    onClick={handleNextReel}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
                
                {/* Reel indicators */}
                <div className="flex justify-center mt-4 space-x-1">
                  {reels.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1 rounded-full transition-all ${
                        index === currentReelIndex 
                          ? 'w-8 bg-blue-600' 
                          : 'w-2 bg-gray-300'
                      }`}
                      onClick={() => setCurrentReelIndex(index)}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Popular reels grid */}
              <div className="mt-12">
                <h3 className="text-lg font-medium mb-4">Popular Reels</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {reels.map((reel) => (
                    <div 
                      key={`grid-${reel.id}`}
                      className="relative cursor-pointer group"
                      onClick={() => {
                        const index = reels.findIndex(r => r.id === reel.id);
                        setCurrentReelIndex(index);
                        setIsReelPlaying(true);
                      }}
                    >
                      <div className="aspect-[9/16] overflow-hidden rounded-lg">
                        <img 
                          src={reel.thumbnail}
                          alt={reel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-xs font-medium line-clamp-1">{reel.title}</p>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center space-x-1">
                              <Avatar className="w-4 h-4 border border-white">
                                <AvatarImage src={reel.creator.avatar} />
                                <AvatarFallback>{reel.creator.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-white text-xs">{reel.creator.name}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-white text-xs">
                              <Heart className="w-3 h-3" />
                              <span>{formatNumber(reel.likes)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {reel.duration}
                        </Badge>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Live tab */}
          <TabsContent value="live" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Radio className="w-5 h-5 mr-2 text-red-500" />
                  Live Now
                </h2>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={liveFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLiveFilter('all')}
                  >
                    All Streams
                  </Button>
                  <Button
                    variant={liveFilter === 'following' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLiveFilter('following')}
                  >
                    Following
                  </Button>
                  <Button
                    variant={liveFilter === 'recommended' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLiveFilter('recommended')}
                  >
                    Recommended
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info('Go live feature coming soon')}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Go Live
                  </Button>
                </div>
              </div>
              
              {/* Featured live stream */}
              {filteredLiveStreams.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Featured Live Stream</h3>
                  <div className="relative rounded-lg overflow-hidden cursor-pointer group" onClick={() => handleJoinLiveStream(filteredLiveStreams[0].id)}>
                    <img 
                      src={filteredLiveStreams[0].thumbnail}
                      alt={filteredLiveStreams[0].title}
                      className="w-full h-[50vh] object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40">
                      {/* Top info */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <Badge className="bg-red-500 text-white animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                          LIVE
                        </Badge>
                        
                        <Badge variant="secondary" className="bg-black/70 text-white border-0">
                          <Eye className="w-3 h-3 mr-1" />
                          {formatNumber(filteredLiveStreams[0].viewers)} watching
                        </Badge>
                      </div>
                      
                      {/* Bottom info */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                          <h3 className="text-white text-xl font-bold mb-2">{filteredLiveStreams[0].title}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <Avatar className="w-8 h-8 border-2 border-white">
                              <AvatarImage src={filteredLiveStreams[0].creator.avatar} />
                              <AvatarFallback>{filteredLiveStreams[0].creator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex items-center space-x-1">
                              <span className="text-white text-sm">{filteredLiveStreams[0].creator.name}</span>
                              {filteredLiveStreams[0].creator.verified && (
                                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {filteredLiveStreams[0].tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="bg-black/50 text-white border-0 text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJoinLiveStream(filteredLiveStreams[0].id);
                            }}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch Now
                          </Button>
                          
                          {!followedCreators.has(filteredLiveStreams[0].creator.name) ? (
                            <Button 
                              variant="outline"
                              className="bg-black/30 text-white border-white/50 hover:bg-black/50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFollow(filteredLiveStreams[0].creator.name, filteredLiveStreams[0].id, e);
                              }}
                            >
                              <Bell className="w-4 h-4 mr-2" />
                              Follow
                            </Button>
                          ) : (
                            <Button 
                              variant="outline"
                              className="bg-black/30 text-white border-white/50 hover:bg-black/50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemindLiveStream(filteredLiveStreams[0].id);
                              }}
                            >
                              <Bell className="w-4 h-4 mr-2" />
                              Remind
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Live streams grid */}
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredLiveStreams.slice(1).map(renderLiveStreamCard)}
              </div>
              
              {filteredLiveStreams.length === 0 && (
                <div className="text-center py-12">
                  <Radio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No live streams found</h3>
                  <p className="text-gray-500 mb-6">
                    {liveFilter === 'following' 
                      ? 'None of the creators you follow are currently live. Follow more creators or check back later.'
                      : liveFilter === 'recommended'
                        ? 'No recommended streams available right now. Check back later.'
                        : 'There are no live streams available right now. Check back later.'}
                  </p>
                  {liveFilter !== 'all' && (
                    <Button onClick={() => setLiveFilter('all')}>
                      Show All Streams
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Subscriptions tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Your Subscriptions
              </h2>
              
              {followedCreators.size > 0 ? (
                <div className="space-y-6">
                  {/* Followed creators */}
                  <div className="flex space-x-4 overflow-x-auto pb-4">
                    {Array.from(followedCreators).map((creatorName, index) => {
                      const creator = videos.find(v => v.creator.name === creatorName)?.creator;
                      if (!creator) return null;
                      
                      return (
                        <div 
                          key={index} 
                          className="flex flex-col items-center space-y-2 min-w-[80px]"
                          onClick={(e) => handleChannelClick(creatorName, e)}
                        >
                          <div className="relative">
                            <Avatar className="w-16 h-16 border-2 border-transparent hover:border-blue-500 cursor-pointer">
                              <AvatarImage src={creator.avatar} />
                              <AvatarFallback>{creatorName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {videos.some(v => v.creator.name === creatorName && v.isLive) && (
                              <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <span className="text-sm text-center line-clamp-1">{creatorName}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Videos from subscriptions */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Recent from your subscriptions</h3>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {videos
                        .filter(video => followedCreators.has(video.creator.name))
                        .map(renderVideoCard)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No subscriptions yet</h3>
                  <p className="text-gray-500 mb-6">Subscribe to creators to see their latest videos here</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Discover Creators
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TV Shows tab */}
          <TabsContent value="tv" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Tv className="w-5 h-5 mr-2 text-purple-500" />
                TV Shows
              </h2>
              <div className="text-center py-12">
                <Tv className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">TV Shows coming soon</h3>
                <p className="text-gray-500 mb-6">We're working on bringing you the best TV shows and series</p>
                <Button variant="outline" onClick={() => setActiveTab('home')}>
                  Explore Videos Instead
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