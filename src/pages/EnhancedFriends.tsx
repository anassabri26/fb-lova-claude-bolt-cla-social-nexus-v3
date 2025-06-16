import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, MoreHorizontal, Users, X, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AccessibleButton from '@/components/AccessibleButton';
import { toast } from 'sonner';
import { MOCK_IMAGES } from '@/lib/constants';

const EnhancedFriends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const friendRequests = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      avatar: MOCK_IMAGES.AVATARS[5],
      mutualFriends: 12,
      requestTime: '1w'
    },
    {
      id: '2',
      name: 'Jessica Park',
      avatar: MOCK_IMAGES.AVATARS[6],
      mutualFriends: 8,
      requestTime: '3d'
    }
  ];

  const allFriends = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: MOCK_IMAGES.AVATARS[0],
      isOnline: true,
      lastSeen: 'Active now'
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: MOCK_IMAGES.AVATARS[1],
      isOnline: false,
      lastSeen: '2h ago'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: MOCK_IMAGES.AVATARS[2],
      isOnline: true,
      lastSeen: 'Active now'
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: MOCK_IMAGES.AVATARS[3],
      isOnline: false,
      lastSeen: '1d ago'
    }
  ];

  const suggestions = [
    {
      id: '1',
      name: 'Lisa Chang',
      avatar: MOCK_IMAGES.AVATARS[4],
      mutualFriends: 5,
      reason: 'Mutual friends'
    },
    {
      id: '2',
      name: 'Robert Smith',
      avatar: MOCK_IMAGES.AVATARS[7],
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
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activeTab === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveTab('all')}
                className="text-sm"
              >
                All Friends ({allFriends.length})
              </Button>
              <Button 
                variant={activeTab === 'requests' ? 'default' : 'outline'}
                onClick={() => setActiveTab('requests')}
                className="text-sm"
              >
                Friend Requests ({friendRequests.length})
              </Button>
              <Button 
                variant={activeTab === 'suggestions' ? 'default' : 'outline'}
                onClick={() => setActiveTab('suggestions')}
                className="text-sm"
              >
                Suggestions
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="all" className="space-y-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {filteredFriends.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFriends.map((friend) => (
                    <Card key={friend.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={friend.avatar} />
                              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {friend.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{friend.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{friend.lastSeen}</p>
                          </div>
                          <AccessibleButton variant="ghost" size="sm" className="touch-target">
                            <MoreHorizontal className="w-4 h-4" />
                          </AccessibleButton>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="flex-1 h-9"
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
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No friends found</h3>
                    <p className="text-gray-500">
                      {searchQuery 
                        ? `No results for "${searchQuery}"`
                        : "You haven't added any friends yet."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="requests" className="space-y-4">
              {friendRequests.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {friendRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={request.avatar} />
                            <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900">{request.name}</h3>
                            <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
                            <p className="text-xs text-gray-400">{request.requestTime}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleAcceptRequest(request.id, request.name)}
                              className="min-w-[90px] h-9"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeclineRequest(request.id)}
                              className="min-w-[90px] h-9"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Avatar className="w-20 h-20 mx-auto mb-3">
                          <AvatarImage src={suggestion.avatar} />
                          <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium text-gray-900 mb-1">{suggestion.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{suggestion.mutualFriends} mutual friends</p>
                        <Badge variant="outline" className="mb-4">
                          {suggestion.reason}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="flex-1 h-9"
                            onClick={() => handleAddFriend(suggestion.name)}
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add Friend
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 h-9">
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
      </div>
    </div>
  );
};

export default EnhancedFriends;