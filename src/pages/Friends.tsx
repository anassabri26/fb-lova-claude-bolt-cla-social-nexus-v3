
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, MessageCircle, MoreHorizontal } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('all');

  const friends = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 12,
      status: 'online'
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 8,
      status: 'offline'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 15,
      status: 'online'
    }
  ];

  const friendRequests = [
    {
      id: 1,
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 5
    },
    {
      id: 2,
      name: 'Lisa Zhang',
      avatar: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 3
    }
  ];

  const handleAcceptRequest = (id: number, name: string) => {
    toast.success(`Accepted friend request from ${name}`);
  };

  const handleRejectRequest = (id: number, name: string) => {
    toast.info(`Rejected friend request from ${name}`);
  };

  const handleMessage = (name: string) => {
    toast.info(`Opening chat with ${name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Friends</h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Friends</TabsTrigger>
                <TabsTrigger value="requests">Friend Requests</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {friends.map((friend) => (
                    <Card key={friend.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={friend.avatar} />
                              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {friend.status === 'online' && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                            <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <AccessibleButton
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleMessage(friend.name)}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Message
                          </AccessibleButton>
                          <AccessibleButton
                            variant="ghost"
                            size="sm"
                            className="px-2"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </AccessibleButton>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="requests" className="mt-6">
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={request.avatar} />
                              <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-gray-900">{request.name}</h3>
                              <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <AccessibleButton
                              onClick={() => handleAcceptRequest(request.id, request.name)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Accept
                            </AccessibleButton>
                            <AccessibleButton
                              variant="outline"
                              onClick={() => handleRejectRequest(request.id, request.name)}
                            >
                              Decline
                            </AccessibleButton>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="suggestions" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {friendRequests.map((suggestion) => (
                    <Card key={suggestion.id}>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Avatar className="w-16 h-16 mx-auto mb-3">
                            <AvatarImage src={suggestion.avatar} />
                            <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-gray-900 mb-1">{suggestion.name}</h3>
                          <p className="text-sm text-gray-500 mb-3">{suggestion.mutualFriends} mutual friends</p>
                          <AccessibleButton
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => toast.success(`Sent friend request to ${suggestion.name}`)}
                          >
                            <UserPlus className="w-4 h-4 mr-1" />
                            Add Friend
                          </AccessibleButton>
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

export default Friends;
