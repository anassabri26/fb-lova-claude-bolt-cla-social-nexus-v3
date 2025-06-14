
import React, { useState } from 'react';
import { UserPlus, UserCheck, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import ActivityIndicator from './ActivityIndicator';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  mutualFriends: number;
  isOnline: boolean;
  lastSeen?: string;
}

const FriendsList = () => {
  const [friends] = useState<Friend[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 12,
      isOnline: true,
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 8,
      isOnline: false,
      lastSeen: '2h ago',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 15,
      isOnline: true,
    },
    {
      id: 4,
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 7,
      isOnline: false,
      lastSeen: '1d ago',
    },
  ]);

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>Friends</span>
          <span className="text-sm font-normal text-gray-500">
            {friends.filter(f => f.isOnline).length} online
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={friend.avatar} alt={`${friend.name}'s profile`} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {friend.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{friend.name}</p>
                <div className="flex items-center space-x-2">
                  <ActivityIndicator 
                    isActive={friend.isOnline} 
                    lastSeen={friend.lastSeen}
                  />
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{friend.mutualFriends} mutual</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-1">
              <AccessibleButton
                variant="ghost"
                size="sm"
                className="p-2 rounded-full hover:bg-gray-200"
                aria-label={`Message ${friend.name}`}
              >
                <MessageCircle className="w-4 h-4 text-gray-600" />
              </AccessibleButton>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FriendsList;
