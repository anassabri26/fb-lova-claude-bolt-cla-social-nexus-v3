
import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Share, MoreHorizontal, Volume2, VolumeX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
  views: number;
  likes: number;
  duration: string;
  uploadTime: string;
}

const VideoFeed = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());

  const videos: Video[] = [
    {
      id: '1',
      title: 'Amazing React Tutorial - Build a Complete App',
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop',
      author: {
        name: 'Tech Channel',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      views: 12500,
      likes: 324,
      duration: '15:42',
      uploadTime: '2h ago'
    },
    {
      id: '2',
      title: 'Beautiful Nature Documentary - Wildlife Adventure',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop',
      author: {
        name: 'Nature World',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      views: 45600,
      likes: 1205,
      duration: '8:30',
      uploadTime: '5h ago'
    },
    {
      id: '3',
      title: 'Cooking Masterclass - Perfect Pasta Recipe',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop',
      author: {
        name: 'Chef Master',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      views: 8900,
      likes: 567,
      duration: '12:15',
      uploadTime: '1d ago'
    }
  ];

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
    toast.info('Video player simulation');
  };

  const handleLike = (videoId: string) => {
    toast.success('Video liked!');
  };

  const handleShare = (videoId: string) => {
    toast.success('Video shared!');
  };

  const toggleMute = (videoId: string) => {
    setMutedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <CardContent className="p-0">
            {/* Video Thumbnail/Player */}
            <div className="relative aspect-video bg-black">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AccessibleButton
                  size="lg"
                  className="w-16 h-16 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm"
                  onClick={() => handlePlayVideo(video.id)}
                >
                  <Play className="w-8 h-8 fill-current" />
                </AccessibleButton>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <span className="bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>

              <div className="absolute bottom-4 right-4">
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="bg-black/60 text-white hover:bg-black/80"
                  onClick={() => toggleMute(video.id)}
                >
                  {mutedVideos.has(video.id) ? 
                    <VolumeX className="w-4 h-4" /> : 
                    <Volume2 className="w-4 h-4" />
                  }
                </AccessibleButton>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={video.author.avatar} />
                  <AvatarFallback>{video.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {video.author.name} • {formatViews(video.views)} views • {video.uploadTime}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(video.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{video.likes}</span>
                    </AccessibleButton>
                    
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">Comment</span>
                    </AccessibleButton>
                    
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(video.id)}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <Share className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </AccessibleButton>
                  </div>
                </div>
                
                <AccessibleButton variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </AccessibleButton>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VideoFeed;
