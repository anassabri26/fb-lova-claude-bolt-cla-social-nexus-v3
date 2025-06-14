
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Video {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    followers: string;
  };
  thumbnail: string;
  videoUrl?: string;
  views: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  description: string;
}

const VideoFeed = () => {
  const [videos] = useState<Video[]>([
    {
      id: '1',
      title: 'Amazing React Tips and Tricks',
      creator: {
        name: 'Tech Channel',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        followers: '125K'
      },
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      views: '45K',
      timestamp: '2 hours ago',
      likes: 1234,
      comments: 89,
      shares: 45,
      description: 'Learn the latest React development techniques and best practices!'
    },
    {
      id: '2',
      title: 'Beautiful Nature Documentary',
      creator: {
        name: 'Nature World',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        followers: '890K'
      },
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      views: '123K',
      timestamp: '5 hours ago',
      likes: 2567,
      comments: 234,
      shares: 123,
      description: 'Explore the wonders of nature in this stunning documentary series.'
    },
    {
      id: '3',
      title: 'Cooking Masterclass',
      creator: {
        name: 'Chef Masters',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
        followers: '567K'
      },
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
      views: '78K',
      timestamp: '1 day ago',
      likes: 1890,
      comments: 156,
      shares: 67,
      description: 'Learn professional cooking techniques from world-class chefs.'
    }
  ]);

  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
    toast.info(playingVideo === videoId ? 'Video paused' : 'Video playing');
  };

  const handleLikeVideo = (videoId: string) => {
    const newLiked = new Set(likedVideos);
    if (likedVideos.has(videoId)) {
      newLiked.delete(videoId);
      toast.info('Removed like');
    } else {
      newLiked.add(videoId);
      toast.success('Video liked!');
    }
    setLikedVideos(newLiked);
  };

  const handleComment = (videoId: string) => {
    toast.info('Comment feature coming soon!');
  };

  const handleShare = (videoId: string) => {
    toast.success('Video shared!');
  };

  const handleFollow = (creatorName: string) => {
    toast.success(`Now following ${creatorName}!`);
  };

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
                variant="outline"
                size="sm"
                onClick={() => handleFollow(video.creator.name)}
              >
                Follow
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
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                {video.views} views
              </div>
              <div className="flex items-center space-x-2">
                <AccessibleButton className="text-white bg-black bg-opacity-50 p-2 rounded">
                  <Volume2 className="w-5 h-5" />
                </AccessibleButton>
              </div>
            </div>
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
                <span>{video.likes + (likedVideos.has(video.id) ? 1 : 0)}</span>
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
