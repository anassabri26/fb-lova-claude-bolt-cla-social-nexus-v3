import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, MoreHorizontal, Heart, MessageCircle, Share, Eye, Filter, Search, Settings, Clock, Bookmark, Flag, Upload, List, Users, Plus, TrendingUp, Zap, Grid, Calendar, ChevronLeft, ChevronRight, Video, Radio } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
  watchProgress?: number;
}

const Watch = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const [videos, setVideos] = useState<Video[]>([
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
    },
    {
      id: '5',
      title: 'Morning Meditation for Beginners - Start Your Day Right',
      creator: {
        name: 'Mindful Living',
        avatar: MOCK_IMAGES.AVATARS[4],
        verified: true,
        isFollowing: false,
        subscribers: '750K'
      },
      thumbnail: MOCK_IMAGES.POSTS[4],
      duration: '15:30',
      views: 42000,
      likes: 2800,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Health',
      description: 'A gentle morning meditation routine for beginners.',
      watchProgress: 45
    },
    {
      id: '6',
      title: 'How to Build a React App from Scratch - Complete Tutorial',
      creator: {
        name: 'Code Master',
        avatar: MOCK_IMAGES.AVATARS[5],
        verified: true,
        isFollowing: true,
        subscribers: '1.8M'
      },
      thumbnail: MOCK_IMAGES.POSTS[5],
      duration: '1:22:15',
      views: 189000,
      likes: 12400,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Technology',
      description: 'Learn how to build a complete React application from scratch.',
      watchProgress: 75
    },
    {
      id: '7',
      title: 'Epic Mountain Biking Adventure in the Alps',
      creator: {
        name: 'Extreme Sports',
        avatar: MOCK_IMAGES.AVATARS[6],
        verified: false,
        isFollowing: false,
        subscribers: '620K'
      },
      thumbnail: MOCK_IMAGES.POSTS[0],
      duration: '18:45',
      views: 78000,
      likes: 5600,
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Sports',
      description: 'Join us for an epic mountain biking adventure in the Swiss Alps.',
      isTrending: true
    },
    {
      id: '8',
      title: 'DIY Home Office Makeover - Budget Friendly Ideas',
      creator: {
        name: 'Home Design',
        avatar: MOCK_IMAGES.AVATARS[7],
        verified: true,
        isFollowing: false,
        subscribers: '950K'
      },
      thumbnail: MOCK_IMAGES.POSTS[1],
      duration: '22:10',
      views: 103000,
      likes: 8700,
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Lifestyle',
      description: 'Transform your home office on a budget with these creative ideas.'
    },
    {
      id: '9',
      title: 'Live: Music Festival 2024 - Main Stage Performances',
      creator: {
        name: 'Music Events',
        avatar: MOCK_IMAGES.AVATARS[0],
        verified: true,
        isFollowing: false,
        subscribers: '3.2M'
      },
      thumbnail: MOCK_IMAGES.POSTS[2],
      duration: 'LIVE',
      views: 78500,
      likes: 12300,
      timestamp: 'Started 2h ago',
      isLive: true,
      category: 'Music',
      description: 'Watch the main stage performances from Music Festival 2024 live!'
    },
    {
      id: '10',
      title: 'Live: Breaking News - Global Summit Coverage',
      creator: {
        name: 'World News',
        avatar: MOCK_IMAGES.AVATARS[3],
        verified: true,
        isFollowing: true,
        subscribers: '5.7M'
      },
      thumbnail: MOCK_IMAGES.POSTS[4],
      duration: 'LIVE',
      views: 125000,
      likes: 8400,
      timestamp: 'Started 45m ago',
      isLive: true,
      category: 'News',
      description: 'Live coverage of the Global Summit with world leaders.'
    },
    {
      id: '11',
      title: 'Live: Gaming Tournament Finals - Championship Match',
      creator: {
        name: 'Gaming Network',
        avatar: MOCK_IMAGES.AVATARS[5],
        verified: true,
        isFollowing: false,
        subscribers: '4.1M'
      },
      thumbnail: MOCK_IMAGES.POSTS[3],
      duration: 'LIVE',
      views: 320000,
      likes: 45600,
      timestamp: 'Started 1h ago',
      isLive: true,
      category: 'Gaming',
      description: 'Watch the championship match of the Gaming Tournament Finals live!'
    }
  ]);

  // Reels data
  const [reels, setReels] = useState([
    {
      id: 'reel1',
      title: 'Amazing sunset at the beach',
      creator: {
        name: 'Nature Explorer',
        avatar: MOCK_IMAGES.AVATARS[0],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[0],
      views: 1200000,
      likes: 85000,
      isLiked: false
    },
    {
      id: 'reel2',
      title: 'Quick coding tip for React developers',
      creator: {
        name: 'Code Master',
        avatar: MOCK_IMAGES.AVATARS[5],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[1],
      views: 450000,
      likes: 32000,
      isLiked: false
    },
    {
      id: 'reel3',
      title: '30-second workout routine',
      creator: {
        name: 'Fitness Pro',
        avatar: MOCK_IMAGES.AVATARS[2],
        verified: false
      },
      thumbnail: MOCK_IMAGES.POSTS[2],
      views: 780000,
      likes: 45000,
      isLiked: false
    },
    {
      id: 'reel4',
      title: 'Amazing drone shot of mountains',
      creator: {
        name: 'Adventure Seeker',
        avatar: MOCK_IMAGES.AVATARS[3],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[3],
      views: 920000,
      likes: 67000,
      isLiked: false
    },
    {
      id: 'reel5',
      title: 'Quick recipe: 1-minute chocolate mug cake',
      creator: {
        name: 'Chef Maria',
        avatar: MOCK_IMAGES.AVATARS[2],
        verified: false
      },
      thumbnail: MOCK_IMAGES.POSTS[4],
      views: 1500000,
      likes: 120000,
      isLiked: false
    },
    {
      id: 'reel6',
      title: 'Incredible magic trick revealed',
      creator: {
        name: 'Magic Master',
        avatar: MOCK_IMAGES.AVATARS[6],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[5],
      views: 2100000,
      likes: 180000,
      isLiked: false
    },
    {
      id: 'reel7',
      title: 'Life hack: How to fold a shirt in 2 seconds',
      creator: {
        name: 'Life Hacker',
        avatar: MOCK_IMAGES.AVATARS[7],
        verified: false
      },
      thumbnail: MOCK_IMAGES.POSTS[0],
      views: 3400000,
      likes: 290000,
      isLiked: false
    },
    {
      id: 'reel8',
      title: 'Cutest puppy reaction to new toy',
      creator: {
        name: 'Pet Lover',
        avatar: MOCK_IMAGES.AVATARS[4],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[1],
      views: 4200000,
      likes: 350000,
      isLiked: false
    }
  ]);

  // Current reel being viewed
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isReelPlaying, setIsReelPlaying] = useState(false);

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [savedVideos, setSavedVideos] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [watchHistory, setWatchHistory] = useState<Record<string, any>>({});

  const categories = ['All', 'Technology', 'Nature', 'Food', 'Music', 'Gaming', 'Sports', 'Education', 'Health', 'Lifestyle'];

  // Load watch history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('watchHistory');
      if (savedHistory) {
        setWatchHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading watch history:', error);
    }
  }, []);

  // Update videos with watch progress
  useEffect(() => {
    if (Object.keys(watchHistory).length > 0) {
      setVideos(prevVideos => 
        prevVideos.map(video => {
          const history = watchHistory[video.id];
          if (history) {
            return {
              ...video,
              watchProgress: history.completionPercentage
            };
          }
          return video;
        })
      );
    }
  }, [watchHistory]);

  // Simulate loading when changing pages
  useEffect(() => {
    if (currentPage > 1) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

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
    
    setVideos(prevVideos => 
      prevVideos.map(video => 
        video.id === videoId 
          ? {
              ...video,
              creator: {
                ...video.creator,
                isFollowing: !video.creator.isFollowing
              }
            }
          : video
      )
    );
    
    const video = videos.find(v => v.id === videoId);
    if (video) {
      toast.success(video.creator.isFollowing 
        ? `Unsubscribed from ${creatorName}` 
        : `Subscribed to ${creatorName}`);
    }
  };

  const handleShare = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videos.find(v => v.id === videoId);
    navigator.clipboard.writeText(`${window.location.origin}/watch/${videoId}`);
    toast.success('Video link copied to clipboard');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
      // In a real app, this would trigger a search API call
    }
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
      default: // relevance
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedVideos.length / itemsPerPage);
  const paginatedVideos = sortedVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const liveVideos = videos.filter(v => v.isLive);
  const trendingVideos = videos.filter(v => v.isTrending);
  const shortsVideos = videos.filter(v => v.isShort);
  const watchHistoryVideos = videos.filter(v => v.watchProgress);

  // Handle reel like
  const handleReelLike = (reelId: string) => {
    setReels(prevReels => 
      prevReels.map(reel => 
        reel.id === reelId 
          ? { 
              ...reel, 
              isLiked: !reel.isLiked,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
            }
          : reel
      )
    );
  };

  // Navigate between reels
  const handleNextReel = () => {
    setCurrentReelIndex(prev => (prev + 1) % reels.length);
  };

  const handlePrevReel = () => {
    setCurrentReelIndex(prev => (prev - 1 + reels.length) % reels.length);
  };

  const renderVideoCard = (video: Video) => (
    <Card 
      key={video.id} 
      className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
      onClick={() => handleVideoClick(video.id)}
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Watch progress */}
        {video.watchProgress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-red-600" 
              style={{ width: `${video.watchProgress}%` }}
            ></div>
          </div>
        )}
        
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
              <span>{video.views.toLocaleString()} views</span>
              <span>•</span>
              <span>{video.timestamp.includes('ago') ? video.timestamp : new Date(video.timestamp).toLocaleDateString()}</span>
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
        {!video.creator.isFollowing && (
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

  const renderListViewCard = (video: Video) => (
    <Card 
      key={video.id} 
      className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
      onClick={() => handleVideoClick(video.id)}
    >
      <CardContent className="p-3">
        <div className="flex space-x-4">
          <div className="relative w-48 h-28 flex-shrink-0">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
            />
            
            {/* Watch progress */}
            {video.watchProgress && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className="h-full bg-red-600" 
                  style={{ width: `${video.watchProgress}%` }}
                ></div>
              </div>
            )}
            
            {/* Duration */}
            <div className="absolute bottom-2 right-2">
              <Badge 
                variant={video.isLive ? 'destructive' : video.isShort ? 'secondary' : 'secondary'}
                className={video.isLive ? 'animate-pulse' : ''}
              >
                {video.duration}
              </Badge>
            </div>
            
            {/* Live/Trending indicators */}
            {video.isLive && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-red-500 text-white animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                  LIVE
                </Badge>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight group-hover:text-blue-600 transition-colors">
              {video.title}
            </h3>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
              <span>{video.views.toLocaleString()} views</span>
              <span>•</span>
              <span>{video.timestamp.includes('ago') ? video.timestamp : new Date(video.timestamp).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center space-x-1 mt-2">
              <Avatar 
                className="w-6 h-6 cursor-pointer"
                onClick={(e) => handleChannelClick(video.creator.name, e)}
              >
                <AvatarImage src={video.creator.avatar} />
                <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p 
                className="text-xs text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
                onClick={(e) => handleChannelClick(video.creator.name, e)}
              >
                {video.creator.name}
                {video.creator.verified && (
                  <span className="ml-1 text-blue-600">✓</span>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleLike(video.id, e)}
                className="h-8 w-8 p-0"
              >
                <Heart className={`w-4 h-4 ${likedVideos.has(video.id) ? 'fill-current text-red-600' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleSave(video.id, e)}
                className="h-8 w-8 p-0"
              >
                <Bookmark className={`w-4 h-4 ${savedVideos.has(video.id) ? 'fill-current text-green-600' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleShare(video.id, e)}
                className="h-8 w-8 p-0"
              >
                <Share className="w-4 h-4" />
              </Button>
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
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>History</span>
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
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search videos, creators, or topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </form>
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
                    onClick={() => toast.info('Advanced filters coming soon')}
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Category filters */}
            <div className="flex space-x-2 overflow-x-auto scrollbar-thin pb-2">
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

            {/* Videos grid/list */}
            {isLoading ? (
              // Loading skeleton
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/3 animate-pulse"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {viewMode === 'grid' 
                  ? paginatedVideos.map(renderVideoCard)
                  : paginatedVideos.map(renderListViewCard)
                }
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(index + 1)}
                      className="w-8 h-8"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Empty state */}
            {paginatedVideos.length === 0 && !isLoading && (
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
                {trendingVideos.length > 0 ? (
                  trendingVideos.map(renderVideoCard)
                ) : (
                  <div className="col-span-full text-center py-12">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No trending videos</h3>
                    <p className="text-gray-500">Check back later for trending content</p>
                  </div>
                )}
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
                {shortsVideos.length > 0 ? (
                  shortsVideos.map(video => (
                    <div 
                      key={video.id}
                      className="cursor-pointer group"
                      onClick={() => handleVideoClick(video.id)}
                    >
                      <div className="relative aspect-[9/16] rounded-xl overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-sm font-medium line-clamp-2">{video.title}</p>
                          <p className="text-white/80 text-xs">{video.views.toLocaleString()} views</p>
                        </div>
                        <Badge className="absolute top-2 right-2 bg-purple-500">
                          <Zap className="w-3 h-3 mr-1" />
                          Short
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No shorts available</h3>
                    <p className="text-gray-500">Check back later for short-form content</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Reels tab */}
          <TabsContent value="reels" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Video className="w-5 h-5 mr-2 text-blue-500" />
                Reels
              </h2>
              
              {/* Reels Viewer */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Current Reel */}
                <div className="md:w-1/2 lg:w-2/3">
                  <div className="relative aspect-[9/16] max-h-[70vh] mx-auto bg-black rounded-xl overflow-hidden">
                    <img 
                      src={reels[currentReelIndex].thumbnail} 
                      alt={reels[currentReelIndex].title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
                    
                    {/* Navigation controls */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 rounded-full bg-black/30 text-white"
                        onClick={handlePrevReel}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 rounded-full bg-black/30 text-white"
                        onClick={handleNextReel}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                    
                    {/* Play/Pause button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-16 w-16 rounded-full bg-black/40 text-white"
                        onClick={() => setIsReelPlaying(!isReelPlaying)}
                      >
                        {isReelPlaying ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8 ml-1" />
                        )}
                      </Button>
                    </div>
                    
                    {/* Reel info */}
                    <div className="absolute bottom-4 left-4 right-12">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={reels[currentReelIndex].creator.avatar} />
                          <AvatarFallback>{reels[currentReelIndex].creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center">
                          <p className="text-white text-sm font-medium">{reels[currentReelIndex].creator.name}</p>
                          {reels[currentReelIndex].creator.verified && (
                            <div className="ml-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-white text-sm mb-2">{reels[currentReelIndex].title}</p>
                      <div className="flex items-center space-x-3 text-white/80 text-xs">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{formatNumber(reels[currentReelIndex].views)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{formatNumber(reels[currentReelIndex].likes)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute right-4 bottom-4 flex flex-col space-y-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 rounded-full bg-black/30 text-white"
                        onClick={() => handleReelLike(reels[currentReelIndex].id)}
                      >
                        <Heart className={`h-5 w-5 ${reels[currentReelIndex].isLiked ? 'fill-current text-red-500' : ''}`} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 rounded-full bg-black/30 text-white"
                        onClick={() => toast.info('Comment feature coming soon')}
                      >
                        <MessageCircle className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 rounded-full bg-black/30 text-white"
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/reels/${reels[currentReelIndex].id}`);
                          toast.success('Reel link copied to clipboard');
                        }}
                      >
                        <Share className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="absolute top-4 left-4 right-4 flex space-x-1">
                      {reels.map((_, index) => (
                        <div 
                          key={index} 
                          className={`h-1 rounded-full flex-1 ${
                            index === currentReelIndex ? 'bg-white' : 'bg-white/30'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Reels List */}
                <div className="md:w-1/2 lg:w-1/3 space-y-4">
                  <h3 className="font-medium text-gray-900">More Reels</h3>
                  <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                    {reels.map((reel, index) => (
                      <div 
                        key={reel.id}
                        className={`cursor-pointer group ${currentReelIndex === index ? 'ring-2 ring-blue-500 rounded-xl' : ''}`}
                        onClick={() => setCurrentReelIndex(index)}
                      >
                        <div className="relative aspect-[9/16] rounded-xl overflow-hidden">
                          <img 
                            src={reel.thumbnail} 
                            alt={reel.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                          
                          {currentReelIndex !== index && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                          )}
                          
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white text-xs font-medium line-clamp-1">{reel.title}</p>
                            <p className="text-white/80 text-xs">{formatNumber(reel.views)} views</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Live tab */}
          <TabsContent value="live" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Radio className="w-5 h-5 mr-2 text-red-500" />
                Live Now
              </h2>
              
              {/* Featured Live Stream */}
              {liveVideos.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Featured Live Stream</h3>
                  <div className="relative rounded-lg overflow-hidden">
                    <img 
                      src={liveVideos[0].thumbnail} 
                      alt={liveVideos[0].title}
                      className="w-full h-[50vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                        LIVE
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        <Eye className="w-3 h-3 mr-1" />
                        {liveVideos[0].views.toLocaleString()} watching
                      </Badge>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Avatar className="h-10 w-10 border-2 border-white">
                          <AvatarImage src={liveVideos[0].creator.avatar} />
                          <AvatarFallback>{liveVideos[0].creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-white font-semibold">{liveVideos[0].title}</h4>
                          <p className="text-white/80 text-sm">{liveVideos[0].creator.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1"
                          onClick={() => handleVideoClick(liveVideos[0].id)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                        <Button 
                          variant="outline" 
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollow(liveVideos[0].creator.name, liveVideos[0].id, e);
                          }}
                        >
                          {liveVideos[0].creator.isFollowing ? 'Subscribed' : 'Subscribe'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Live Streams Grid */}
              <h3 className="text-lg font-medium mb-4">All Live Streams</h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {liveVideos.length > 0 ? (
                  liveVideos.map(renderVideoCard)
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Radio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No live streams</h3>
                    <p className="text-gray-500">Check back later for live content from your favorite creators</p>
                  </div>
                )}
              </div>
              
              {/* Live Categories */}
              {liveVideos.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Browse by Category</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Gaming', 'Music', 'News', 'Sports', 'Technology', 'Education', 'Entertainment', 'Talk Shows'].map(category => (
                      <Button 
                        key={category} 
                        variant="outline" 
                        className="h-auto py-6 flex flex-col items-center space-y-2"
                        onClick={() => {
                          setSelectedCategory(category);
                          setActiveTab('home');
                        }}
                      >
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                          <Radio className="w-5 h-5 text-red-500" />
                        </div>
                        <span>{category}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Upcoming Streams */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Upcoming Live Streams</h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map(i => (
                    <Card key={`upcoming-${i}`} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={MOCK_IMAGES.POSTS[i % MOCK_IMAGES.POSTS.length]}
                          alt={`Upcoming stream ${i}`}
                          className="w-full h-40 object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-blue-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          Scheduled
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Upcoming Live Event {i}</h4>
                        <p className="text-sm text-gray-600 mb-3">Starts in {i * 2} hours</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={MOCK_IMAGES.AVATARS[i % MOCK_IMAGES.AVATARS.length]} />
                              <AvatarFallback>C</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">Creator {i}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.success('Reminder set')}
                          >
                            Set Reminder
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
              
              {/* Subscribed channels */}
              <div className="flex space-x-4 overflow-x-auto pb-4 mb-6">
                {videos
                  .filter(v => v.creator.isFollowing)
                  .map(v => v.creator)
                  .filter((creator, index, self) => 
                    index === self.findIndex(c => c.name === creator.name)
                  )
                  .map(creator => (
                    <div 
                      key={creator.name} 
                      className="flex flex-col items-center space-y-2 min-w-[80px] cursor-pointer"
                      onClick={() => handleChannelClick(creator.name, {} as React.MouseEvent)}
                    >
                      <Avatar className="w-16 h-16 border-2 border-blue-500">
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium text-center">{creator.name}</p>
                    </div>
                  ))}
                
                <div className="flex flex-col items-center justify-center space-y-2 min-w-[80px]">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full h-16 w-16"
                    onClick={() => toast.info('Discover channels feature coming soon')}
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                  <p className="text-sm text-gray-500">Discover</p>
                </div>
              </div>
              
              {/* Videos from subscriptions */}
              <h3 className="text-lg font-semibold mb-4">Recent from subscriptions</h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videos
                  .filter(v => v.creator.isFollowing)
                  .slice(0, 8)
                  .map(renderVideoCard)}
              </div>
              
              {videos.filter(v => v.creator.isFollowing).length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No subscriptions yet</h3>
                  <p className="text-gray-500 mb-6">Subscribe to creators to see their latest videos here</p>
                  <Button onClick={() => setActiveTab('home')}>
                    <Play className="w-4 h-4 mr-2" />
                    Discover Videos
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* History tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  Watch History
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem('watchHistory');
                    setWatchHistory({});
                    toast.success('Watch history cleared');
                  }}
                >
                  Clear History
                </Button>
              </div>
              
              <div className="grid gap-6 grid-cols-1">
                {watchHistoryVideos.length > 0 ? (
                  watchHistoryVideos.map(renderListViewCard)
                ) : (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No watch history</h3>
                    <p className="text-gray-500 mb-6">Videos you watch will appear here</p>
                    <Button onClick={() => setActiveTab('home')}>
                      <Play className="w-4 h-4 mr-2" />
                      Browse Videos
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Watch;