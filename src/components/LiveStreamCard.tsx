
import React from 'react';
import { Play, Eye, Heart, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AccessibleButton from './AccessibleButton';

interface LiveStream {
  id: string;
  streamer: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  title: string;
  thumbnail: string;
  viewers: number;
  duration: string;
  category: string;
}

interface LiveStreamCardProps {
  stream: LiveStream;
  onClick?: () => void;
}

const LiveStreamCard = ({ stream, onClick }: LiveStreamCardProps) => {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={stream.thumbnail}
            alt={stream.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Play className="w-12 h-12 text-white" />
          </div>
          <Badge className="absolute top-2 left-2 bg-red-600 text-white">
            LIVE
          </Badge>
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {stream.duration}
          </div>
          <div className="absolute bottom-2 right-2 flex items-center bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            <Eye className="w-3 h-3 mr-1" />
            {stream.viewers.toLocaleString()}
          </div>
        </div>
        
        <div className="p-3">
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={stream.streamer.avatar} />
              <AvatarFallback>{stream.streamer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                {stream.title}
              </h3>
              <div className="flex items-center space-x-1 mt-1">
                <p className="text-sm text-gray-600">{stream.streamer.name}</p>
                {stream.streamer.verified && (
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">{stream.category}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex space-x-4">
              <AccessibleButton
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
              >
                <Heart className="w-4 h-4" />
                <span className="text-xs">Like</span>
              </AccessibleButton>
              <AccessibleButton
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">Chat</span>
              </AccessibleButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveStreamCard;
