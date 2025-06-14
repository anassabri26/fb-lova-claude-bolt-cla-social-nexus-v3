import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share, MoreHorizontal, Maximize, Settings, SkipBack, SkipForward } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Video {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    followers: string;
    isFollowing: boolean;
  };
  thumbnail: string;
  videoUrl?: string;
  views: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  description: string;
  duration: number; // in seconds
}

const VideoFeed = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Amazing React Tips and Tricks',
      creator: {
        name: 'Tech Channel',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        followers: '125K',
        isFollowing: false
      },
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      views: '45K',
      timestamp: '2 hours ago',
      likes: 1234,
      comments: 89,
      shares: 45,
      description: 'Learn the latest React development techniques and best practices!',
      duration: 185 // 3:05
    },
    {
      id: '2',
      title: 'Beautiful Nature Documentary',
      creator: {
        name: 'Nature World',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        followers: '890K',
        isFollowing: false
      },
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      views: '123K',
      timestamp: '5 hours ago',
      likes: 2567,
      comments: 234,
      shares: 123,
      description: 'Explore the wonders of nature in this stunning documentary series.',
      duration: 120 // 2:00
    },
    {
      id: '3',
      title: 'Cooking Masterclass',
      creator: {
        name: 'Chef Masters',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
        followers: '567K',
        isFollowing: false
      },
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
      views: '78K',
      timestamp: '1 day ago',
      likes: 1890,
      comments: 156,
      shares: 67,
      description: 'Learn professional cooking techniques from world-class chefs.',
      duration: 150 // 2:30
    }
  ]);

  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [followedCreators, setFollowedCreators] = useState<Set<string>>(new Set());
  const [currentTime, setCurrentTime] = useState<Record<string, number>>({});
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handlePlayVideo = (videoId: string) => {
    const wasPlaying = playingVideo === videoId;
    setPlayingVideo(wasPlaying ? null : videoId);
    
    const video = videos.find(v => v.id === videoId);
    toast.info(wasPlaying ? 'Video paused' : 'Video playing');
    console.log(`Video ${videoId}: ${wasPlaying ? 'paused' : 'playing'} - ${video?.title}`);
  };

  const handleLikeVideo = (videoId: string) => {
    const newLiked = new Set(likedVideos);
    const video = videos.find(v => v.id === videoId);
    
    if (likedVideos.has(videoId)) {
      newLiked.delete(videoId);
      setVideos(prev => prev.map(v => 
        v.id === videoId ? { ...v, likes: v.likes - 1 } : v
      ));
      toast.info('Removed like');
    } else {
      newLiked.add(videoId);
      setVideos(prev => prev.map(v => 
        v.id === videoId ? { ...v, likes: v.likes + 1 } : v
      ));
      toast.success('Video liked!');
    }
    setLikedVideos(newLiked);
    console.log(`Video ${videoId} ${likedVideos.has(videoId) ? 'unliked' : 'liked'} by user`);
  };

  const handleComment = (videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    toast.info('Comments section opened');
    console.log(`Opening comments for: ${video?.title}`);
  };

  const handleShare = (videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    navigator.clipboard.writeText(`${window.location.origin}/watch/${videoId}`);
    setVideos(prev => prev.map(v => 
      v.id === videoId ? { ...v, shares: v.shares + 1 } : v
    ));
    toast.success('Video link copied!');
    console.log(`Shared video: ${video?.title}`);
  };

  const handleFollow = (creatorName: string, videoId: string) => {
    const newFollowed = new Set(followedCreators);
    
    if (followedCreators.has(creatorName)) {
      newFollowed.delete(creatorName);
      toast.info(`Unfollowed ${creatorName}`);
    } else {
      newFollowed.add(creatorName);
      toast.success(`Now following ${creatorName}!`);
    }
    
    setFollowedCreators(newFollowed);
    setVideos(prev => prev.map(v => 
      v.id === videoId 
        ? { ...v, creator: { ...v.creator, isFollowing: !v.creator.isFollowing } }
        : v
    ));
    console.log(`${followedCreators.has(creatorName) ? 'Unfollowed' : 'Followed'} ${creatorName}`);
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? 'Sound on' : 'Sound off');
  };

  const handleSkip = (videoId: string, direction: 'forward' | 'backward') => {
    const skipAmount = 10; // seconds
    const current = currentTime[videoId] || 0;
    const newTime = direction === 'forward' 
      ? Math.min(current + skipAmount, videos.find(v => v.id === videoId)?.duration || 0)
      : Math.max(current - skipAmount, 0);
    
    setCurrentTime(prev => ({ ...prev, [videoId]: newTime }));
    toast.info(`Skipped ${direction} ${skipAmount}s`);
  };

  const handleFullscreen = (videoId: string) => {
    toast.info('Entering fullscreen mode');
    console.log(`Fullscreen requested for video ${videoId}`);
  };

  const handleSettings = (videoId: string) => {
    toast.info('Video settings opened');
    console.log(`Settings opened for video ${videoId}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate video time progression
  useEffect(() => {
    const interval = setInterval(() => {
      if (playingVideo) {
        setCurrentTime(prev => {
          const current = prev[playingVideo] || 0;
          const video = videos.find(v => v.id === playingVideo);
          const maxDuration = video?.duration || 0;
          
          if (current >= maxDuration) {
            setPlayingVideo(null);
            toast.info('Video ended');
            return prev;
          }
          
          return { ...prev, [playingVideo]: current + 1 };
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playingVideo, videos]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Watch</h1>
        <p className="text-gray-600">Discover videos from creators you follow and explore new content</p>
      </div>

      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Video Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={video.creator.avatar} />
                <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{video.creator.name}</h3>
                <p className="text-sm text-gray-500">{video.creator.followers} followers • {video.timestamp}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={video.creator.isFollowing ? "secondary" : "outline"}
                size="sm"
                onClick={() => handleFollow(video.creator.name, video.id)}
              >
                {video.creator.isFollowing ? 'Following' : 'Follow'}
              </Button>
              <AccessibleButton variant="ghost" size="sm">
                <MoreHorizontal className="w-5 h-5" />
              </AccessibleButton>
            </div>
          </div>

          {/* Video Title and Description */}
          <div className="px-4 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h2>
            <p className="text-gray-600">{video.description}</p>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            
            {/* Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AccessibleButton
                onClick={() => handlePlayVideo(video.id)}
                className="bg-black bg-opacity-70 text-white rounded-full p-4 hover:bg-opacity-80 transition-all"
              >
                {playingVideo === video.id ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8" />
                )}
              </AccessibleButton>
            </div>
            
            {/* Video Controls */}
            {playingVideo === video.id && (
              <>
                {/* Progress Bar */}
                <div className="absolute bottom-16 left-4 right-4">
                  <Progress 
                    value={(currentTime[video.id] || 0) / video.duration * 100} 
                    className="h-1 bg-white bg-opacity-30"
                  />
                  <div className="flex justify-between text-white text-xs mt-1">
                    <span>{formatTime(currentTime[video.id] || 0)}</span>
                    <span>{formatDuration(video.duration)}</span>
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AccessibleButton
                      onClick={() => handleSkip(video.id, 'backward')}
                      className="text-white bg-black bg-opacity-50 p-2 rounded"
                    >
                      <SkipBack className="w-5 h-5" />
                    </AccessibleButton>
                    <AccessibleButton
                      onClick={() => handleSkip(video.id, 'forward')}
                      className="text-white bg-black bg-opacity-50 p-2 rounded"
                    >
                      <SkipForward className="w-5 h-5" />
                    </AccessibleButton>
                    <AccessibleButton 
                      onClick={handleVolumeToggle}
                      className="text-white bg-black bg-opacity-50 p-2 rounded"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </AccessibleButton>
                  </div>
                  <div className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                    {video.views} views
                  </div>
                  <div className="flex items-center space-x-2">
                    <AccessibleButton
                      onClick={() => handleSettings(video.id)}
                      className="text-white bg-black bg-opacity-50 p-2 rounded"
                    >
                      <Settings className="w-5 h-5" />
                    </AccessibleButton>
                    <AccessibleButton
                      onClick={() => handleFullscreen(video.id)}
                      className="text-white bg-black bg-opacity-50 p-2 rounded"
                    >
                      <Maximize className="w-5 h-5" />
                    </AccessibleButton>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Video Actions */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <AccessibleButton
                variant="ghost"
                className={`flex items-center space-x-2 ${
                  likedVideos.has(video.id) ? 'text-red-500' : 'text-gray-600'
                }`}
                onClick={() => handleLikeVideo(video.id)}
              >
                <Heart className={`w-5 h-5 ${likedVideos.has(video.id) ? 'fill-current' : ''}`} />
                <span>{video.likes}</span>
              </AccessibleButton>
              
              <AccessibleButton
                variant="ghost"
                className="flex items-center space-x-2 text-gray-600"
                onClick={() => handleComment(video.id)}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{video.comments}</span>
              </AccessibleButton>
              
              <AccessibleButton
                variant="ghost"
                className="flex items-center space-x-2 text-gray-600"
                onClick={() => handleShare(video.id)}
              >
                <Share className="w-5 h-5" />
                <span>{video.shares}</span>
              </AccessibleButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
