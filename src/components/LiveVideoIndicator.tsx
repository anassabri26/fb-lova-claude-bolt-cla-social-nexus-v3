
import React from 'react';
import { Video, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LiveVideoIndicatorProps {
  viewerCount: number;
  isLive: boolean;
}

const LiveVideoIndicator: React.FC<LiveVideoIndicatorProps> = ({ viewerCount, isLive }) => {
  if (!isLive) return null;

  return (
    <div className="absolute top-2 left-2 flex items-center space-x-2 z-10">
      <Badge className="bg-red-500 text-white text-xs px-2 py-1 flex items-center space-x-1 animate-pulse">
        <Video className="w-3 h-3" />
        <span>LIVE</span>
      </Badge>
      <Badge variant="secondary" className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 flex items-center space-x-1">
        <Users className="w-3 h-3" />
        <span>{viewerCount.toLocaleString()}</span>
      </Badge>
    </div>
  );
};

export default LiveVideoIndicator;
