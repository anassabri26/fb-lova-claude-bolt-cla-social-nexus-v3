import React, { useState } from 'react';
import { Search, UserPlus, Users, MessageCircle, MoreHorizontal, Check, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MOCK_IMAGES } from '@/lib/constants';

const FriendsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('requests');

  const friendRequests = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: MOCK_IMAGES.AVATARS[0],
      mutualFriends: 3,
      time: '2 hours ago'
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: MOCK_IMAGES.AVATARS[1],
      mutualFriends: 7,
      time: '1 day ago'
    }
  ];

  const friends = [
    {
      id: '1',
      name: 'Emma Wilson',
      avatar: MOCK_IMAGES.AVATARS[2],
      isOnline: true,
      lastSeen: 'Active now'
    },
    {
      id: '2',
      name: 'David Kim',
      avatar: MOCK_IMAGES.AVATARS[3],
      isOnline: false,
      lastSeen: '2 hours ago'
    }
  ];

  const suggestedFriends = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      avatar: MOCK_IMAGES.AVATARS[5],
      mutualFriends: 5,
      workplace: 'Tech Corp'
    },
    {
      id: '2',
      name: 'Lisa Wang',
      avatar: MOCK_IMAGES.AVATARS[4],
      mutualFriends: 2,
      workplace: 'Design Studio'
    }
  ];

  const handleAcceptRequest = (id: string, name: string) => {
    console.log(`Accepted friend request from ${name}`);
  };

  const handleDeclineRequest = (id: string, name: string) => {
    console.log(`Declined friend request from ${name}`);
  };

  const handleAddFriend = (name: string) => {
    console.log(`Friend request sent to ${name}`);
  };

  const handleMessage = (name: string) => {
    console.log(`Opening chat with ${name}`);
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRequests = friendRequests.filter(request => 
    request.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSuggestions = suggestedFriends.filter(suggestion => 
    suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
            <div className="flex flex-wrap gap-2">
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

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsContent value="requests" className="space-y-4">
              <h2 className="text-lg font-semibold">Friend Requests</h2>
              {filteredRequests.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={request.avatar} />
                            <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold">{request.name}</h3>
                            <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
                            <p className="text-xs text-gray-400">{request.time}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 justify-end">
                            <Button
                              onClick={() => handleAcceptRequest(request.id, request.name)}
                              className="min-w-[90px] h-9"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleDeclineRequest(request.id, request.name)}
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
                    <p className="text-gray-500">
                      {searchTerm ? `No results for "${searchTerm}"` : "When people send you friend requests, they'll appear here."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <h2 className="text-lg font-semibold">All Friends</h2>
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
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{friend.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{friend.lastSeen}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="touch-target">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
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
                      {searchTerm ? `No results for "${searchTerm}"` : "You haven't added any friends yet."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              <h2 className="text-lg font-semibold">People You May Know</h2>
              {filteredSuggestions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSuggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 text-center">
                        <Avatar className="w-20 h-20 mx-auto mb-3">
                          <AvatarImage src={suggestion.avatar} />
                          <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold mb-1">{suggestion.name}</h3>
                        <p className="text-sm text-gray-500 mb-1">{suggestion.mutualFriends} mutual friends</p>
                        <Badge variant="outline" className="mb-4">
                          {suggestion.workplace}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleAddFriend(suggestion.name)}
                            className="flex-1 h-9"
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add Friend
                          </Button>
                          <Button variant="outline" className="flex-1 h-9">
                            Remove
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
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions found</h3>
                    <p className="text-gray-500">
                      {searchTerm ? `No results for "${searchTerm}"` : "We'll show you friend suggestions here."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FriendsTab;