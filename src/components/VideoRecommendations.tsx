import React, { useState } from 'react';
import { Play, Clock, Eye, MoreHorizontal, Bookmark, Share, Flag } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatTimeAgo, formatNumber } from '@/lib/utils';
import { MOCK_IMAGES } from '@/lib/constants';

interface RecommendedVideo {
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
  category: string;
  isLive?: boolean;
  isPremium?: boolean;
}

interface VideoRecommendationsProps {
  currentVideoId: string;
  onVideoSelect: (videoId: string) => void;
}

const VideoRecommendations: React.FC<VideoRecommendationsProps> = ({ 
  currentVideoId, 
  onVideoSelect 
}) => {
  const [recommendations] = useState<RecommendedVideo[]>([
    {
      id: '2',
      title: 'Live: Tech Conference 2024 - Latest Innovations in AI and Machine Learning',
      creator: {
        name: 'Tech Today',
        avatar: MOCK_IMAGES.AVATARS[1],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[1],
      duration: 'LIVE',
      views: 5400,
      timestamp: 'Started 30 min ago',
      category: 'Technology',
      isLive: true
    },
    {
      id: '3',
      title: 'Quick Pasta Recipe - 5 Minute Cooking',
      creator: {
        name: 'Chef Maria',
        avatar: MOCK_IMAGES.AVATARS[2],
        verified: false
      },
      thumbnail: MOCK_IMAGES.POSTS[2],
      duration: '5:23',
      views: 8900,
      timestamp: '1 day ago',
      category: 'Food'
    },
    {
      id: '4',
      title: 'Mountain Hiking Adventure - Epic Trail Views',
      creator: {
        name: 'Adventure Seeker',
        avatar: MOCK_IMAGES.AVATARS[3],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[3],
      duration: '12:45',
      views: 15600,
      timestamp: '3 days ago',
      category: 'Travel',
      isPremium: true
    },
    {
      id: '5',
      title: 'JavaScript Tips and Tricks for Beginners',
      creator: {
        name: 'Code Academy',
        avatar: MOCK_IMAGES.AVATARS[4],
        verified: true
      },
      thumbnail: MOCK_IMAGES.POSTS[4],
      duration: '18:30',
      views: 23400,
      timestamp: '1 week ago',
      category: 'Education'
    },
    {
      id: '6',
      title: 'Relaxing Piano Music for Study and Work',
      creator: {
        name: 'Peaceful Sounds',
        avatar: MOCK_IMAGES.AVATARS[5],
        verified: false
      },
      thumbnail: MOCK_IMAGES.POSTS[5],
      duration: '2:15:30',
      views: 45600,
      timestamp: '2 weeks ago',
      category: 'Music'
    }
  ]);

  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  const handleVideoClick = (videoId: string) => {
    onVideoSelect(videoId);
  };

  const handleSave = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Saved video:', videoId);
  };

  const handleShare = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Shared video:', videoId);
  };

  const handleReport = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Reported video:', videoId);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Up next</h3>
      
      {recommendations.map((video) => (
        <Card 
          key={video.id}
          className="cursor-pointer hover:shadow-md transition-shadow group"
          onClick={() => handleVideoClick(video.id)}
          onMouseEnter={() => setHoveredVideo(video.id)}
          onMouseLeave={() => setHoveredVideo(null)}
        >
          <CardContent className="p-3">
            <div className="flex space-x-3">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-40 h-24 object-cover rounded-lg"
                />
                
                {/* Duration/Live Badge */}
                <div className="absolute bottom-1 right-1">
                  <Badge 
                    variant={video.isLive ? 'destructive' : 'secondary'}
                    className={`text-xs ${video.isLive ? 'animate-pulse' : ''}`}
                  >
                    {video.isLive && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-1"></div>
                    )}
                    {video.duration}
                  </Badge>
                </div>

                {/* Premium Badge */}
                {video.isPremium && (
                  <div className="absolute top-1 left-1">
                    <Badge className="bg-yellow-500 text-black text-xs">
                      Premium
                    </Badge>
                  </div>
                )}

                {/* Play Overlay */}
                {hoveredVideo === video.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-blue-600">
                  {video.title}
                </h4>
                
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-xs text-gray-600">{video.creator.name}</span>
                  {video.creator.verified && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{formatNumber(video.views)} views</span>
                  </div>
                  <span>•</span>
                  <span>{video.timestamp}</span>
                </div>

                <Badge variant="outline" className="text-xs">
                  {video.category}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleSave(video.id, e)}
                  className="h-8 w-8 p-0"
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleShare(video.id, e)}
                  className="h-8 w-8 p-0"
                >
                  <Share className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleReport(video.id, e)}
                  className="h-8 w-8 p-0"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Load More */}
      <Button variant="outline" className="w-full">
        Load more recommendations
      </Button>
    </div>
  );
};

export default VideoRecommendations;