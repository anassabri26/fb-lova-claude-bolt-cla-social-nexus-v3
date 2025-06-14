
import React, { useState } from 'react';
import { Play, Users, Heart, MessageCircle, Share } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface LiveStream {
  id: string;
  title: string;
  streamer: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  viewerCount: number;
  duration: string;
  category: string;
}

interface LiveStreamCardProps {
  stream: LiveStream;
}

const LiveStreamCard = ({ stream }: LiveStreamCardProps) => {
  const [isWatching, setIsWatching] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 500) + 50);
  const [isLiked, setIsLiked] = useState(false);

  const handleWatch = () => {
    setIsWatching(true);
    toast.success(`Now watching ${stream.title}`);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    toast.info('Comments feature coming soon!');
  };

  const handleShare = () => {
    toast.success('Link copied to clipboard!');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={stream.thumbnail}
            alt={stream.title}
            className="w-full h-48 object-cover"
          />
          
          {/* Live indicator */}
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            LIVE
          </div>
          
          {/* Viewer count */}
          <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span className="text-xs">{stream.viewerCount.toLocaleString()}</span>
          </div>
          
          {/* Play button overlay */}
          {!isWatching && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <AccessibleButton
                onClick={handleWatch}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full w-16 h-16"
              >
                <Play className="w-8 h-8 ml-1" />
              </AccessibleButton>
            </div>
          )}
          
          {/* Duration */}
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {stream.duration}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start space-x-3 mb-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={stream.streamer.avatar} />
              <AvatarFallback>{stream.streamer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">{stream.title}</h3>
              <p className="text-sm text-gray-600">{stream.streamer.name}</p>
              <p className="text-xs text-gray-500">{stream.category}</p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? 'text-red-600' : 'text-gray-600'}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likes}</span>
            </AccessibleButton>
            
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleComment}
              className="flex items-center space-x-1 text-gray-600"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Comment</span>
            </AccessibleButton>
            
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-1 text-gray-600"
            >
              <Share className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </AccessibleButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveStreamCard;
