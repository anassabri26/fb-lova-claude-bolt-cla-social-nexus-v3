
import React from 'react';
import { Check, X, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import AccessibleButton from './AccessibleButton';

interface FriendRequest {
  id: number;
  name: string;
  avatar: string;
  mutualFriends: number;
  timeAgo: string;
}

interface FriendRequestCardProps {
  request: FriendRequest;
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
}

const FriendRequestCard = ({ request, onAccept, onDecline }: FriendRequestCardProps) => {
  const handleAccept = () => {
    onAccept(request.id);
    toast.success(`You are now friends with ${request.name}!`);
  };

  const handleDecline = () => {
    onDecline(request.id);
    toast.info(`Friend request from ${request.name} declined`);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-16 h-16">
            <AvatarImage src={request.avatar} />
            <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{request.name}</h3>
            <p className="text-sm text-gray-500 mb-1">
              {request.mutualFriends} mutual friends
            </p>
            <p className="text-xs text-gray-400">{request.timeAgo}</p>
            
            <div className="flex space-x-2 mt-3">
              <AccessibleButton
                onClick={handleAccept}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <Check className="w-4 h-4 mr-1" />
                Confirm
              </AccessibleButton>
              <AccessibleButton
                onClick={handleDecline}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                <X className="w-4 h-4 mr-1" />
                Delete
              </AccessibleButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendRequestCard;
