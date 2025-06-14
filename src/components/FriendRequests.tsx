
import React, { useState } from 'react';
import { UserPlus, X, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';

interface FriendRequest {
  id: number;
  name: string;
  avatar: string;
  mutualFriends: number;
  timeAgo: string;
}

const FriendRequests = () => {
  const [requests, setRequests] = useState<FriendRequest[]>([
    {
      id: 1,
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 5,
      timeAgo: '2d',
    },
    {
      id: 2,
      name: 'Jessica Martinez',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 3,
      timeAgo: '1w',
    },
  ]);

  const handleAccept = (id: number) => {
    setRequests(requests.filter(req => req.id !== id));
    // Add to friends list logic here
  };

  const handleDecline = (id: number) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  if (requests.length === 0) return null;

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <UserPlus className="w-5 h-5" />
          <span>Friend Requests</span>
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{requests.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={request.avatar} alt={`${request.name}'s profile`} />
                <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{request.name}</p>
                <p className="text-sm text-gray-500">
                  {request.mutualFriends} mutual friends • {request.timeAgo}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <AccessibleButton
                variant="default"
                size="sm"
                onClick={() => handleAccept(request.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                aria-label={`Accept friend request from ${request.name}`}
              >
                <Check className="w-4 h-4 mr-1" />
                Accept
              </AccessibleButton>
              <AccessibleButton
                variant="outline"
                size="sm"
                onClick={() => handleDecline(request.id)}
                className="px-4"
                aria-label={`Decline friend request from ${request.name}`}
              >
                <X className="w-4 h-4 mr-1" />
                Decline
              </AccessibleButton>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FriendRequests;
