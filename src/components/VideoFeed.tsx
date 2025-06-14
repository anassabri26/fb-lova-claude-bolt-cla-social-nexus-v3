
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, MoreHorizontal, ThumbsUp, MessageCircle, Share } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  timestamp: string;
  description: string;
}

const VideoFeed = () => {
  const [videos] = useState<Video[]>([
    {
      id: '1',
      title: 'Amazing React Tutorial - Building a Complete App',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      duration: '15:32',
      views: 125000,
      likes: 3200,
      creator: {
        name: 'Tech Tutorials',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      timestamp: '2 days ago',
      description: 'Learn how to build a complete React application from scratch with modern best practices.'
    },
    {
      id: '2',
      title: 'Funny Cat Compilation 2024',
      thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
      duration: '8:45',
      views: 890000,
      likes: 45000,
      creator: {
        name: 'Pet Videos',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      timestamp: '1 week ago',
      description: 'The funniest cat moments that will make your day!'
    },
    {
      id: '3',
      title: 'Beautiful Nature Documentary',
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
      duration: '45:20',
      views: 2100000,
      likes: 78000,
      creator: {
        name: 'Nature Films',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      timestamp: '3 days ago',
      description: 'Explore the wonders of our natural world in stunning 4K quality.'
    }
  ]);

  const handleLike = (video: Video) => {
    toast.success(`Liked ${video.title}`);
  };

  const handleComment = (video: Video) => {
    toast.info(`Opening comments for ${video.title}`);
  };

  const handleShare = (video: Video) => {
    toast.success(`Shared ${video.title}`);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="space-y-6">
      {videos.map(video => (
        <Card key={video.id} className="overflow-hidden">
          <CardContent className="p-0">
            {/* Video Thumbnail */}
            <div className="relative group cursor-pointer">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={video.creator.avatar} />
                  <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                        {video.title}
                      </h3>
                      <div className="flex items-center space-x-1 mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {video.creator.name}
                        </span>
                        {video.creator.verified && (
                          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {formatViews(video.views)} views • {video.timestamp}
                      </p>
                    </div>
                    <AccessibleButton variant="ghost" size="sm">
                      <MoreHorizontal className="w-5 h-5" />
                    </AccessibleButton>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(video)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{formatViews(video.likes)}</span>
                  </AccessibleButton>
                  
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleComment(video)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Comment</span>
                  </AccessibleButton>
                  
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(video)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                  >
                    <Share className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </AccessibleButton>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VideoFeed;
