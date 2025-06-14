
import React, { useState } from 'react';
import { UserPlus, UserCheck, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  timestamp: string;
}

const FriendRequests = () => {
  const [requests, setRequests] = useState<FriendRequest[]>([
    {
      id: '1',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 5,
      timestamp: '2d'
    },
    {
      id: '2',
      name: 'Jessica Chen',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 12,
      timestamp: '1w'
    }
  ]);

  const handleAccept = (requestId: string, name: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast.success(`You are now friends with ${name}!`);
  };

  const handleDecline = (requestId: string, name: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast.info(`Friend request from ${name} declined`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Friend Requests</h2>
      
      {requests.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No friend requests</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={request.avatar}
                    alt={request.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{request.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {request.mutualFriends} mutual friends • {request.timestamp}
                  </p>
                  <div className="flex space-x-2">
                    <AccessibleButton
                      onClick={() => handleAccept(request.id, request.name)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Accept
                    </AccessibleButton>
                    <AccessibleButton
                      variant="outline"
                      onClick={() => handleDecline(request.id, request.name)}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Decline
                    </AccessibleButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
