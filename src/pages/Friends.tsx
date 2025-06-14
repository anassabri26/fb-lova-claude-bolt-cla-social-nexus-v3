import React, { useState } from 'react';
import { UserPlus, Users, Search, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import FriendRequestCard from '../components/FriendRequestCard';
import AccessibleButton from '../components/AccessibleButton';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [searchQuery, setSearchQuery] = useState('');
  const [friendRequests, setFriendRequests] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 5,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      name: 'Bob Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 3,
      timeAgo: '1 day ago'
    },
    {
      id: 3,
      name: 'Carol Davis',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5cd?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 8,
      timeAgo: '3 days ago'
    }
  ]);

  const tabs = [
    { id: 'suggestions', label: 'Suggestions', count: null },
    { id: 'requests', label: 'Friend Requests', count: friendRequests.length },
    { id: 'all', label: 'All Friends', count: null },
  ];

  const suggestions = [
    {
      id: 1,
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 12,
      workplace: 'Works at Google'
    },
    {
      id: 2,
      name: 'Daniel Lee',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00d56c3f6955?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 7,
      workplace: 'Works at Microsoft'
    },
    {
      id: 3,
      name: 'Olivia Brown',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 9,
      workplace: 'Works at Amazon'
    }
  ];

  const allFriends = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      isOnline: true
    },
    {
      id: 2,
      name: 'David Miller',
      avatar: 'https://images.unsplash.com/photo-1534528741702-a0cfae57f6ca?w=400&h=400&fit=crop&crop=face',
      isOnline: false
    },
    {
      id: 3,
      name: 'Emily Wilson',
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop&crop=face',
      isOnline: true
    }
  ];

  const handleAcceptRequest = (id: number) => {
    setFriendRequests(prev => prev.filter(req => req.id !== id));
  };

  const handleDeclineRequest = (id: number) => {
    setFriendRequests(prev => prev.filter(req => req.id !== id));
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFriends = allFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Friends</h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-6 shadow-sm">
          {tabs.map((tab) => (
            <AccessibleButton
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`flex-1 relative ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count !== null && tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {tab.count}
                </span>
              )}
            </AccessibleButton>
          ))}
        </div>

        {/* Search */}
        {(activeTab === 'suggestions' || activeTab === 'all') && (
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={`Search ${activeTab === 'suggestions' ? 'suggestions' : 'friends'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        )}

        {/* Content */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {friendRequests.length > 0 ? (
              friendRequests.map((request) => (
                <FriendRequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAcceptRequest}
                  onDecline={handleDeclineRequest}
                />
              ))
            ) : (
              <Card className="bg-white">
                <CardContent className="p-8 text-center">
                  <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No friend requests</h3>
                  <p className="text-gray-600">When people send you friend requests, they'll appear here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={suggestion.avatar} />
                      <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{suggestion.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">{suggestion.mutualFriends} mutual friends</p>
                      <p className="text-xs text-gray-400">{suggestion.workplace}</p>
                      <div className="flex space-x-2 mt-3">
                        <AccessibleButton
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Add Friend
                        </AccessibleButton>
                        <AccessibleButton
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          Remove
                        </AccessibleButton>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFriends.map((friend) => (
              <Card key={friend.id} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {friend.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                      <p className="text-sm text-gray-500">
                        {friend.isOnline ? 'Active now' : 'Last seen recently'}
                      </p>
                    </div>
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      className="p-2"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </AccessibleButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Friends;
