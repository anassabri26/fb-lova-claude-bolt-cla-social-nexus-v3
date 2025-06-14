
import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, MoreHorizontal } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const EnhancedFriends = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const friendRequests = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 12,
      requestTime: '1w'
    },
    {
      id: '2',
      name: 'Jessica Park',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 8,
      requestTime: '3d'
    }
  ];

  const allFriends = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      isOnline: true,
      lastSeen: 'Active now'
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '2h ago'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      isOnline: true,
      lastSeen: 'Active now'
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '1d ago'
    }
  ];

  const suggestions = [
    {
      id: '1',
      name: 'Lisa Chang',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 5,
      reason: 'Mutual friends'
    },
    {
      id: '2',
      name: 'Robert Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 3,
      reason: 'Works at Tech Corp'
    }
  ];

  const handleAcceptRequest = (id: string, name: string) => {
    toast.success(`Accepted friend request from ${name}`);
  };

  const handleDeclineRequest = (id: string) => {
    toast.info('Friend request declined');
  };

  const handleAddFriend = (name: string) => {
    toast.success(`Friend request sent to ${name}`);
  };

  const handleMessage = (name: string) => {
    toast.info(`Opening conversation with ${name}`);
  };

  const filteredFriends = allFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Friends</h1>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Friends</TabsTrigger>
                <TabsTrigger value="requests">Friend Requests ({friendRequests.length})</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFriends.map((friend) => (
                    <Card key={friend.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={friend.avatar} />
                              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {friend.isOnline && (
                              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{friend.name}</h3>
                            <p className="text-sm text-gray-500">{friend.lastSeen}</p>
                          </div>
                          <AccessibleButton variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </AccessibleButton>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleMessage(friend.name)}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="requests" className="space-y-4">
                {friendRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{request.name}</h3>
                          <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
                          <p className="text-xs text-gray-400">{request.requestTime}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id, request.name)}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeclineRequest(request.id)}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {friendRequests.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No friend requests</h3>
                      <p className="text-gray-500">When people send you friend requests, they'll appear here.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestions.map((suggestion) => (
                    <Card key={suggestion.id}>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Avatar className="w-20 h-20 mx-auto mb-3">
                            <AvatarImage src={suggestion.avatar} />
                            <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-medium text-gray-900 mb-1">{suggestion.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{suggestion.mutualFriends} mutual friends</p>
                          <p className="text-xs text-blue-600 mb-4">{suggestion.reason}</p>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => handleAddFriend(suggestion.name)}
                            >
                              Add Friend
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default EnhancedFriends;
