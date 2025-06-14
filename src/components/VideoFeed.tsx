import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Share, MoreHorizontal, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import LiveStreamCard from './LiveStreamCard';
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
  timestamp: string;
  likes: number;
  comments: number;
  isLive?: boolean;
}

const VideoFeed = () => {
  const [videos] = useState<Video[]>([
    {
      id: '1',
      title: 'Building Amazing React Applications - Full Tutorial',
      creator: {
        name: 'Tech Academy',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop',
      duration: '45:32',
      views: 125000,
      timestamp: '2 days ago',
      likes: 4200,
      comments: 342,
      isLive: false
    },
    {
      id: '2',
      title: 'Live Coding Session: Building a Social Media App',
      creator: {
        name: 'Code with Sarah',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop',
      duration: '2:15:45',
      views: 8500,
      timestamp: 'Live now',
      likes: 890,
      comments: 156,
      isLive: true
    },
    {
      id: '3',
      title: 'Web Design Trends 2024 - What You Need to Know',
      creator: {
        name: 'Design Hub',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=450&fit=crop',
      duration: '28:15',
      views: 67000,
      timestamp: '1 week ago',
      likes: 2100,
      comments: 89,
      isLive: false
    }
  ]);

  const liveStreams = [
    {
      id: 'live1',
      title: 'React Live Coding - Building a Dashboard',
      streamer: {
        name: 'DevStreamer',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop',
      viewerCount: 2340,
      duration: '1:23:45',
      category: 'Programming'
    },
    {
      id: 'live2',
      title: 'UI/UX Design Process - Creating Mobile App',
      streamer: {
        name: 'DesignMaster',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=450&fit=crop',
      viewerCount: 1560,
      duration: '45:12',
      category: 'Design'
    }
  ];

  const handleVideoClick = (video: Video) => {
    toast.success(`Now playing: ${video.title}`);
  };

  const handleLike = (videoId: string) => {
    toast.success('Video liked!');
  };

  const handleComment = (videoId: string) => {
    toast.info('Comments feature coming soon!');
  };

  const handleShare = (videoId: string) => {
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      {/* Live Streams Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Live Now</h2>
          <AccessibleButton variant="ghost" className="text-blue-600">
            See All
          </AccessibleButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveStreams.map((stream) => (
            <LiveStreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </div>

      {/* Regular Videos */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
        <div className="space-y-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="md:flex">
                  {/* Video Thumbnail */}
                  <div className="relative md:w-80 cursor-pointer" onClick={() => handleVideoClick(video)}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    
                    {video.isLive ? (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        LIVE
                      </div>
                    ) : (
                      <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    )}
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-white bg-opacity-90 rounded-full p-4">
                        <Play className="w-8 h-8 text-black ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={video.creator.avatar} />
                        <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 cursor-pointer hover:text-blue-600" onClick={() => handleVideoClick(video)}>
                          {video.title}
                        </h3>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-gray-700">{video.creator.name}</span>
                          {video.creator.verified && (
                            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>{video.views.toLocaleString()} views</span>
                          <span>•</span>
                          <span>{video.timestamp}</span>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center space-x-6">
                          <AccessibleButton
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(video.id)}
                            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                          >
                            <Heart className="w-4 h-4" />
                            <span>{video.likes.toLocaleString()}</span>
                          </AccessibleButton>
                          
                          <AccessibleButton
                            variant="ghost"
                            size="sm"
                            onClick={() => handleComment(video.id)}
                            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{video.comments}</span>
                          </AccessibleButton>
                          
                          <AccessibleButton
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShare(video.id)}
                            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                          >
                            <Share className="w-4 h-4" />
                            <span>Share</span>
                          </AccessibleButton>
                          
                          <AccessibleButton
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-blue-600"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </AccessibleButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
