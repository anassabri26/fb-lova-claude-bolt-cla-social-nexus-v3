
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useFriendRequests, useRespondToFriendRequest } from '@/hooks/useFriends';
import { UserPlus, Check, X } from 'lucide-react';

const FriendRequestsPanel = () => {
  const { data: requests, isLoading } = useFriendRequests();
  const respondMutation = useRespondToFriendRequest();

  const handleAccept = (requestId: string) => {
    respondMutation.mutate({ requestId, status: 'accepted' });
  };

  const handleDecline = (requestId: string) => {
    respondMutation.mutate({ requestId, status: 'declined' });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Friend Requests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Friend Requests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No pending friend requests</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus className="w-5 h-5" />
          <span>Friend Requests ({requests.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={request.requester_profile?.avatar_url} />
                <AvatarFallback>
                  {request.requester_profile?.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">
                  {request.requester_profile?.full_name || 'Unknown User'}
                </p>
                <p className="text-sm text-gray-500">wants to be friends</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => handleAccept(request.id)}
                disabled={respondMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDecline(request.id)}
                disabled={respondMutation.isPending}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FriendRequestsPanel;
