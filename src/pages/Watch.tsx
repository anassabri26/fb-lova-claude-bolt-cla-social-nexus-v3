import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Share, 
  Eye, 
  Filter, 
  Search, 
  Settings, 
  Clock, 
  Bookmark, 
  Flag, 
  Upload, 
  List, 
  Users, 
  Plus, 
  TrendingUp, 
  Zap, 
  Grid, 
  Calendar,
  Radio,
  Tv,
  Flame,
  ChevronRight,
  ChevronLeft,
  X,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { formatNumber, formatTimeAgo } from '@/lib/utils';
import { MOCK_IMAGES } from '@/lib/constants';
import { useIsMobile, useIsTablet } from '@/hooks/use-device';

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

interface Reel {
  id: string;
  video: string;
  thumbnail: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

const Watch = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const reelsContainerRef = useRef<HTMLDivElement>(null);
  const currentReelRef = useRef<HTMLVideoElement>(null);
  
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
      title: 'Morning Routine for Productivity',
      creator: {
        name: 'Lifestyle Coach',
        avatar: MOCK_IMAGES.AVATARS[4],
        verified: true,
        isFollowing: false,
        subscribers: '750K'
      },
      thumbnail: MOCK_IMAGES.POSTS[4],
      duration: '12:30',
      views: 98000,
      likes: 7600,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Lifestyle',
      description: 'Start your day right with this effective morning routine.'
    },
    {
      id: '6',
      title: 'Top 10 Travel Destinations for 2024',
      creator: {
        name: 'Travel Guide',
        avatar: MOCK_IMAGES.AVATARS[5],
        verified: false,
        isFollowing: true,
        subscribers: '1.8M'
      },
      thumbnail: MOCK_IMAGES.POSTS[5],
      duration: '15:45',
      views: 215000,
      likes: 18900,
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Travel',
      description: 'Discover the most beautiful places to visit this year.'
    },
    {
      id: '7',
      title: 'Live: NBA Finals Game 7 - Commentary and Analysis',
      creator: {
        name: 'Sports Central',
        avatar: MOCK_IMAGES.AVATARS[6],
        verified: true,
        isFollowing: false,
        subscribers: '3.2M'
      },
      thumbnail: MOCK_IMAGES.POSTS[0],
      duration: 'LIVE',
      views: 125000,
      likes: 8900,
      timestamp: 'Started 1 hour ago',
      isLive: true,
      category: 'Sports',
      description: 'Live commentary and analysis of the NBA Finals Game 7.'
    },
    {
      id: '8',
      title: 'DIY Home Office Setup on a Budget',
      creator: {
        name: 'Home Design',
        avatar: MOCK_IMAGES.AVATARS[7],
        verified: false,
        isFollowing: false,
        subscribers: '450K'
      },
      thumbnail: MOCK_IMAGES.POSTS[1],
      duration: '18:20',
      views: 76000,
      likes: 5400,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'DIY',
      description: 'Create a productive home office without breaking the bank.'
    }
  ]);

  const [reels, setReels] = useState<Reel[]>([
    {
      id: 'reel1',
      video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: MOCK_IMAGES.POSTS[0],
      title: 'Amazing sunset at the beach 🌅',
      creator: {
        name: 'Nature Explorer',
        avatar: MOCK_IMAGES.AVATARS[0],
        verified: true
      },
      likes: 15400,
      comments: 342,
      shares: 89,
      isLiked: false
    },
    {
      id: 'reel2',
      video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: MOCK_IMAGES.POSTS[1],
      title: 'Quick coding tip for React developers! #programming',
      creator: {
        name: 'Code Master',
        avatar: MOCK_IMAGES.AVATARS[1],
        verified: true
      },
      likes: 8900,
      comments: 156,
      shares: 45,
      isLiked: false
    },
    {
      id: 'reel3',
      video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnail: MOCK_IMAGES.POSTS[2],
      title: '30-second workout you can do anywhere! 💪',
      creator: {
        name: 'Fitness Pro',
        avatar: MOCK_IMAGES.AVATARS[2],
        verified: false
      },
      likes: 23400,
      comments: 567,
      shares: 123,
      isLiked: true
    },
    {
      id: 'reel4',
      video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnail: MOCK_IMAGES.POSTS[3],
      title: 'This food hack will change your life! 🍕',
      creator: {
        name: 'Chef Maria',
        avatar: MOCK_IMAGES.AVATARS[3],
        verified: true
      },
      likes: 45600,
      comments: 890,
      shares: 234,
      isLiked: false
    },
    {
      id: 'reel5',
      video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      thumbnail: MOCK_IMAGES.POSTS[4],
      title: 'Wait for it... 😂',
      creator: {
        name: 'Comedy Central',
        avatar: MOCK_IMAGES.AVATARS[4],
        verified: true
      },
      likes: 78900,
      comments: 1234,
      shares: 456,
      isLiked: false
    }
  ]);

  const [liveStreams, setLiveStreams] = useState<Video[]>([
    {
      id: 'live1',
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
      id: 'live2',
      title: 'Live: NBA Finals Game 7 - Commentary and Analysis',
      creator: {
        name: 'Sports Central',
        avatar: MOCK_IMAGES.AVATARS[6],
        verified: true,
        isFollowing: false,
        subscribers: '3.2M'
      },
      thumbnail: MOCK_IMAGES.POSTS[0],
      duration: 'LIVE',
      views: 125000,
      likes: 8900,
      timestamp: 'Started 1 hour ago',
      isLive: true,
      category: 'Sports',
      description: 'Live commentary and analysis of the NBA Finals Game 7.'
    },
    {
      id: 'live3',
      title: 'Live: Cooking Show - Italian Pasta from Scratch',
      creator: {
        name: 'Chef Maria',
        avatar: MOCK_IMAGES.AVATARS[2],
        verified: false,
        isFollowing: false,
        subscribers: '156K'
      },
      thumbnail: MOCK_IMAGES.POSTS[2],
      duration: 'LIVE',
      views: 3200,
      likes: 450,
      timestamp: 'Started 15 min ago',
      isLive: true,
      category: 'Food',
      description: 'Join me as I make authentic Italian pasta from scratch!'
    },
    {
      id: 'live4',
      title: 'Live: Morning Meditation and Yoga Session',
      creator: {
        name: 'Mindful Living',
        avatar: MOCK_IMAGES.AVATARS[4],
        verified: true,
        isFollowing: false,
        subscribers: '750K'
      },
      thumbnail: MOCK_IMAGES.POSTS[4],
      duration: 'LIVE',
      views: 2800,
      likes: 340,
      timestamp: 'Started 45 min ago',
      isLive: true,
      category: 'Health',
      description: 'Start your day with a calming meditation and gentle yoga.'
    }
  ]);

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isReelPlaying, setIsReelPlaying] = useState(false);
  const [reelVolume, setReelVolume] = useState(0); // Start muted
  const [isReelMuted, setIsReelMuted] = useState(true);
  const [showReelControls, setShowReelControls] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [savedVideos, setSavedVideos] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [liveCategories, setLiveCategories] = useState<string[]>(['All', 'Gaming', 'Sports', 'News', 'Music', 'Education']);
  const [selectedLiveCategory, setSelectedLiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Nature', 'Food', 'Music', 'Gaming', 'Sports', 'Education', 'Health', 'Travel'];

  // Handle reel navigation
  const navigateReels = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentReelIndex(prev => (prev + 1) % reels.length);
    } else {
      setCurrentReelIndex(prev => (prev - 1 + reels.length) % reels.length);
    }
    setIsReelPlaying(false);
  };

  // Auto-play current reel when index changes
  useEffect(() => {
    if (activeTab === 'reels' && currentReelRef.current) {
      currentReelRef.current.currentTime = 0;
      const playPromise = currentReelRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsReelPlaying(true);
          })
          .catch(error => {
            console.error('Auto-play was prevented:', error);
            setIsReelPlaying(false);
          });
      }
    }
  }, [currentReelIndex, activeTab]);

  // Pause reel when tab changes
  useEffect(() => {
    if (activeTab !== 'reels' && currentReelRef.current) {
      currentReelRef.current.pause();
      setIsReelPlaying(false);
    }
  }, [activeTab]);

  // Handle reel volume change
  const handleReelVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setReelVolume(newVolume);
    
    if (currentReelRef.current) {
      currentReelRef.current.volume = newVolume;
      setIsReelMuted(newVolume === 0);
    }
  };

  // Toggle reel mute
  const toggleReelMute = () => {
    if (isReelMuted) {
      setIsReelMuted(false);
      setReelVolume(0.5);
      if (currentReelRef.current) {
        currentReelRef.current.volume = 0.5;
        currentReelRef.current.muted = false;
      }
    } else {
      setIsReelMuted(true);
      setReelVolume(0);
      if (currentReelRef.current) {
        currentReelRef.current.volume = 0;
        currentReelRef.current.muted = true;
      }
    }
  };

  // Toggle reel play/pause
  const toggleReelPlay = () => {
    if (currentReelRef.current) {
      if (isReelPlaying) {
        currentReelRef.current.pause();
      } else {
        currentReelRef.current.play().catch(error => {
          console.error('Play was prevented:', error);
        });
      }
      setIsReelPlaying(!isReelPlaying);
    }
  };

  // Handle reel like
  const handleReelLike = (reelId: string) => {
    setReels(prev => prev.map(reel => 
      reel.id === reelId 
        ? { 
            ...reel, 
            isLiked: !reel.isLiked,
            likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
          }
        : reel
    ));
    
    const reel = reels.find(r => r.id === reelId);
    if (reel) {
      toast.success(reel.isLiked ? 'Removed like' : 'Liked reel');
    }
  };

  // Scroll reels horizontally
  const scrollReels = (direction: 'left' | 'right') => {
    if (reelsContainerRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        reelsContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        reelsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

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
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { ...video, creator: { ...video.creator, isFollowing: !video.creator.isFollowing } }
        : video
    ));
    
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

  // Filter live streams by category
  const filteredLiveStreams = liveStreams.filter(stream => 
    selectedLiveCategory === 'All' || stream.category === selectedLiveCategory
  );

  const renderVideoCard = (video: Video) => (
    <Card 
      key={video.id} 
      className="cursor-pointer hover:shadow-md transition-all duration-200 group"
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

        {/* Watch progress */}
        {video.watchProgress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-red-600" 
              style={{ width: `${video.watchProgress}%` }}
            ></div>
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
            onClick={(e) => {
              e.stopPropagation();
              handleChannelClick(video.creator.name, e);
            }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleChannelClick(video.creator.name, e);
                }}
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

  const renderLiveCard = (stream: Video) => (
    <Card 
      key={stream.id} 
      className="cursor-pointer hover:shadow-md transition-all duration-200 group overflow-hidden"
      onClick={() => handleVideoClick(stream.id)}
    >
      <div className="relative">
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        <div className="absolute top-2 left-2">
          <Badge className="bg-red-500 text-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
            LIVE
          </Badge>
        </div>
        
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {formatNumber(stream.views)} watching
          </Badge>
        </div>

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-800 ml-1" />
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar 
            className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              handleChannelClick(stream.creator.name, e);
            }}
          >
            <AvatarImage src={stream.creator.avatar} />
            <AvatarFallback>{stream.creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight group-hover:text-blue-600 transition-colors">
              {stream.title}
            </h3>
            <div className="flex items-center space-x-1 mt-1">
              <p 
                className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChannelClick(stream.creator.name, e);
                }}
              >
                {stream.creator.name}
              </p>
              {stream.creator.verified && (
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
              <span>{stream.timestamp}</span>
              <span>•</span>
              <Badge variant="outline" className="text-xs">{stream.category}</Badge>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <Button
            size="sm"
            variant={stream.creator.isFollowing ? "outline" : "default"}
            onClick={(e) => handleFollow(stream.creator.name, stream.id, e)}
            className={`w-full ${!stream.creator.isFollowing ? "bg-red-600 hover:bg-red-700" : ""}`}
          >
            {stream.creator.isFollowing ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab list */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Home</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="reels" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
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
              <p className="text-gray-600 mb-6">The most popular videos on the platform right now</p>
              
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
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-orange-500" />
                  Trending Categories
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Gaming', 'Music', 'News', 'Sports'].map(category => (
                    <Card key={category} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          {category === 'Gaming' && <Gamepad2 className="w-6 h-6 text-purple-500" />}
                          {category === 'Music' && <Music className="w-6 h-6 text-pink-500" />}
                          {category === 'News' && <Newspaper className="w-6 h-6 text-blue-500" />}
                          {category === 'Sports' && <Trophy className="w-6 h-6 text-green-500" />}
                        </div>
                        <h4 className="font-medium">{category}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.floor(Math.random() * 100) + 10}K watching
                        </p>
                      </Card>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Reels tab */}
          <TabsContent value="reels" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-500" />
                  Reels
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.info('Create reel feature coming soon')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Reel
                </Button>
              </div>
              
              {/* Horizontal scrolling reels */}
              <div className="relative mb-8">
                <div 
                  className="flex space-x-4 overflow-x-auto scrollbar-thin pb-4"
                  ref={reelsContainerRef}
                >
                  {reels.map((reel, index) => (
                    <div 
                      key={reel.id}
                      className={`flex-shrink-0 w-40 cursor-pointer relative ${
                        currentReelIndex === index ? 'ring-2 ring-purple-500' : ''
                      }`}
                      onClick={() => setCurrentReelIndex(index)}
                    >
                      <img 
                        src={reel.thumbnail} 
                        alt={reel.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                        {currentReelIndex === index ? (
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <Play className="w-5 h-5 text-purple-600 ml-0.5" />
                          </div>
                        ) : null}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                        <p className="text-white text-sm font-medium truncate">{reel.creator.name}</p>
                        <p className="text-white text-xs truncate">{formatNumber(reel.likes)} likes</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Scroll buttons */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full h-8 w-8 p-0"
                  onClick={() => scrollReels('left')}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full h-8 w-8 p-0"
                  onClick={() => scrollReels('right')}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Current Reel Player */}
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ height: isMobile ? '70vh' : '80vh' }}>
                <video
                  ref={currentReelRef}
                  src={reels[currentReelIndex].video}
                  className="w-full h-full object-contain"
                  loop
                  muted={isReelMuted}
                  playsInline
                  onClick={toggleReelPlay}
                  onPlay={() => setIsReelPlaying(true)}
                  onPause={() => setIsReelPlaying(false)}
                  onEnded={() => navigateReels('next')}
                  onMouseEnter={() => setShowReelControls(true)}
                  onMouseLeave={() => setShowReelControls(false)}
                />
                
                {/* Play/Pause Overlay */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                    showReelControls || !isReelPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                  onClick={toggleReelPlay}
                >
                  <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    {isReelPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-black/30 hover:bg-black/50 text-white h-12 w-12 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateReels('prev');
                    }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                </div>
                
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-black/30 hover:bg-black/50 text-white h-12 w-12 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateReels('next');
                    }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
                
                {/* Controls Overlay */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity ${
                  showReelControls ? 'opacity-100' : 'opacity-0'
                }`}>
                  {/* Reel Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10 border-2 border-white">
                        <AvatarImage src={reels[currentReelIndex].creator.avatar} />
                        <AvatarFallback>{reels[currentReelIndex].creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{reels[currentReelIndex].creator.name}</p>
                        <p className="text-white/80 text-sm">{reels[currentReelIndex].title}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      Subscribe
                    </Button>
                  </div>
                  
                  {/* Volume Control */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleReelMute}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      {isReelMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    
                    <div className="relative flex-1 max-w-xs">
                      <Slider
                        value={[reelVolume]}
                        min={0}
                        max={1}
                        step={0.01}
                        onValueChange={handleReelVolumeChange}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReelLike(reels[currentReelIndex].id)}
                        className={`text-white hover:bg-white/20 flex flex-col items-center space-y-1 h-auto py-2 ${
                          reels[currentReelIndex].isLiked ? 'text-red-400' : ''
                        }`}
                      >
                        <Heart className={`w-6 h-6 ${reels[currentReelIndex].isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs">{formatNumber(reels[currentReelIndex].likes)}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 flex flex-col items-center space-y-1 h-auto py-2"
                        onClick={() => toast.info('Comments feature coming soon')}
                      >
                        <MessageCircle className="w-6 h-6" />
                        <span className="text-xs">{formatNumber(reels[currentReelIndex].comments)}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 flex flex-col items-center space-y-1 h-auto py-2"
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/reels/${reels[currentReelIndex].id}`);
                          toast.success('Reel link copied to clipboard');
                        }}
                      >
                        <Share className="w-6 h-6" />
                        <span className="text-xs">{formatNumber(reels[currentReelIndex].shares)}</span>
                      </Button>
                    </div>
                    
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 h-8 w-8 p-0"
                        onClick={() => toast.info('More options')}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Live tab */}
          <TabsContent value="live" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold flex items-center">
                    <Radio className="w-5 h-5 mr-2 text-red-500" />
                    Live Now
                  </h2>
                  <p className="text-gray-600">Watch live streams from your favorite creators</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive" className="animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                    {filteredLiveStreams.length} LIVE
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info('Go live feature coming soon')}
                  >
                    <Radio className="w-4 h-4 mr-2" />
                    Go Live
                  </Button>
                </div>
              </div>
              
              {/* Live categories */}
              <div className="flex space-x-2 overflow-x-auto scrollbar-thin mb-6">
                {liveCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedLiveCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLiveCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              {/* Featured Live Stream */}
              {filteredLiveStreams.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Featured Live Stream</h3>
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={filteredLiveStreams[0].thumbnail}
                      alt={filteredLiveStreams[0].title}
                      className="w-full h-[40vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12 border-2 border-white">
                          <AvatarImage src={filteredLiveStreams[0].creator.avatar} />
                          <AvatarFallback>{filteredLiveStreams[0].creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-white text-xl font-bold mb-1">{filteredLiveStreams[0].title}</h3>
                          <p className="text-white/80 mb-2">{filteredLiveStreams[0].creator.name}</p>
                          <div className="flex items-center space-x-3 text-white/80 text-sm">
                            <Badge className="bg-red-500 text-white animate-pulse">
                              <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                              LIVE
                            </Badge>
                            <span>{formatNumber(filteredLiveStreams[0].views)} watching</span>
                            <span>{filteredLiveStreams[0].timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3 mt-4">
                        <Button
                          onClick={() => handleVideoClick(filteredLiveStreams[0].id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollow(filteredLiveStreams[0].creator.name, filteredLiveStreams[0].id, e);
                          }}
                        >
                          {filteredLiveStreams[0].creator.isFollowing ? 'Subscribed' : 'Subscribe'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Live Streams Grid */}
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredLiveStreams.slice(1).map(renderLiveCard)}
              </div>
              
              {filteredLiveStreams.length === 0 && (
                <div className="text-center py-12">
                  <Radio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No live streams</h3>
                  <p className="text-gray-500">Check back later for live content from your favorite creators</p>
                </div>
              )}
              
              {/* Upcoming Live Streams */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Upcoming Live Streams</h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={`upcoming-${i}`} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar>
                            <AvatarImage src={MOCK_IMAGES.AVATARS[i + 1]} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Upcoming Stream {i}</p>
                            <p className="text-xs text-gray-500">Creator {i}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>Starting in {i * 2} hours</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3"
                          onClick={() => toast.success('Reminder set')}
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Set Reminder
                        </Button>
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
              
              {/* Subscribed Channels */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Channels You Subscribe To</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {videos
                    .filter(v => v.creator.isFollowing)
                    .map(video => (
                      <div 
                        key={`sub-${video.id}`}
                        className="text-center cursor-pointer"
                        onClick={(e) => handleChannelClick(video.creator.name, e)}
                      >
                        <Avatar className="w-16 h-16 mx-auto mb-2">
                          <AvatarImage src={video.creator.avatar} />
                          <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-sm truncate">{video.creator.name}</p>
                        <p className="text-xs text-gray-500">{video.creator.subscribers}</p>
                      </div>
                    ))}
                </div>
                
                {videos.filter(v => v.creator.isFollowing).length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No subscriptions yet</h3>
                    <p className="text-gray-500 mb-4">Subscribe to creators to see their content here</p>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Discover Creators
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Recent Videos from Subscriptions */}
              {videos.filter(v => v.creator.isFollowing).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Videos from Your Subscriptions</h3>
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {videos
                      .filter(v => v.creator.isFollowing)
                      .map(renderVideoCard)}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper components for icons
const Gamepad2 = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="6" y1="12" x2="10" y2="12"></line>
    <line x1="8" y1="10" x2="8" y2="14"></line>
    <line x1="15" y1="13" x2="15.01" y2="13"></line>
    <line x1="18" y1="11" x2="18.01" y2="11"></line>
    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
  </svg>
);

const Music = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
);

const Newspaper = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
    <path d="M18 14h-8"></path>
    <path d="M15 18h-5"></path>
    <path d="M10 6h8v4h-8V6Z"></path>
  </svg>
);

const Trophy = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

export default Watch;