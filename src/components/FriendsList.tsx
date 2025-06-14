
import React, { useState } from 'react';
import { UserPlus, UserCheck, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';

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
  ]);

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Friends</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between">
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
              <div>
                <p className="font-medium text-gray-900">{friend.name}</p>
                <p className="text-sm text-gray-500">
                  {friend.isOnline ? 'Active now' : friend.lastSeen} • {friend.mutualFriends} mutual friends
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <AccessibleButton
                variant="outline"
                size="sm"
                className="px-3"
                aria-label={`Message ${friend.name}`}
              >
                <MessageCircle className="w-4 h-4" />
              </AccessibleButton>
              <AccessibleButton
                variant="outline"
                size="sm"
                className="px-3"
                aria-label={`View ${friend.name}'s profile`}
              >
                <UserCheck className="w-4 h-4" />
              </AccessibleButton>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FriendsList;
