
import React, { useState } from 'react';
import { Search, UserPlus, Users, MessageCircle, MoreHorizontal, Check, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const FriendsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('requests');

  const friendRequests = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 3,
      time: '2 hours ago'
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 7,
      time: '1 day ago'
    }
  ];

  const friends = [
    {
      id: '1',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      isOnline: true,
      lastSeen: 'Active now'
    },
    {
      id: '2',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '2 hours ago'
    }
  ];

  const suggestedFriends = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 5,
      workplace: 'Tech Corp'
    },
    {
      id: '2',
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 2,
      workplace: 'Design Studio'
    }
  ];

  const handleAcceptRequest = (id: string, name: string) => {
    toast.success(`Accepted friend request from ${name}`);
  };

  const handleDeclineRequest = (id: string, name: string) => {
    toast.info(`Declined friend request from ${name}`);
  };

  const handleAddFriend = (name: string) => {
    toast.success(`Friend request sent to ${name}`);
  };

  const handleMessage = (name: string) => {
    toast.info(`Opening chat with ${name}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
        <div className="flex space-x-2">
          <Button
            variant={activeSection === 'requests' ? 'default' : 'outline'}
            onClick={() => setActiveSection('requests')}
            className="text-sm"
          >
            Friend Requests ({friendRequests.length})
          </Button>
          <Button
            variant={activeSection === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveSection('all')}
            className="text-sm"
          >
            All Friends ({friends.length})
          </Button>
          <Button
            variant={activeSection === 'suggestions' ? 'default' : 'outline'}
            onClick={() => setActiveSection('suggestions')}
            className="text-sm"
          >
            Suggestions
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Friend Requests */}
      {activeSection === 'requests' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Friend Requests</h2>
          {friendRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={request.avatar} />
                    <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{request.name}</h3>
                    <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
                    <p className="text-xs text-gray-400">{request.time}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleAcceptRequest(request.id, request.name)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDeclineRequest(request.id, request.name)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Decline
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* All Friends */}
      {activeSection === 'all' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">All Friends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {friends.map((friend) => (
              <Card key={friend.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {friend.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{friend.name}</h3>
                      <p className="text-sm text-gray-500">{friend.lastSeen}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <AccessibleButton
                      variant="outline"
                      size="sm"
                      onClick={() => handleMessage(friend.name)}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </AccessibleButton>
                    <AccessibleButton variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </AccessibleButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {activeSection === 'suggestions' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">People You May Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedFriends.map((suggestion) => (
              <Card key={suggestion.id}>
                <CardContent className="p-4 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarImage src={suggestion.avatar} />
                    <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-1">{suggestion.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{suggestion.mutualFriends} mutual friends</p>
                  <p className="text-xs text-gray-400 mb-3">{suggestion.workplace}</p>
                  <Button
                    onClick={() => handleAddFriend(suggestion.name)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Add Friend
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsTab;
