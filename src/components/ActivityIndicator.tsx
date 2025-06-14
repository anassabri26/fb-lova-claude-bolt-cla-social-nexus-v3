
import React from 'react';
import { Circle } from 'lucide-react';

interface ActivityIndicatorProps {
  isActive: boolean;
  lastSeen?: string;
  className?: string;
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ 
  isActive, 
  lastSeen, 
  className = "" 
}) => {
  if (isActive) {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        <Circle className="w-2 h-2 fill-green-500 text-green-500" />
        <span className="text-xs text-green-600">Active now</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <Circle className="w-2 h-2 fill-gray-400 text-gray-400" />
      <span className="text-xs text-gray-500">{lastSeen || 'Offline'}</span>
    </div>
  );
};

export default ActivityIndicator;
