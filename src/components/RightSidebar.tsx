import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageCircle } from 'lucide-react';
import FriendRequestsPanel from './FriendRequestsPanel';
import PeopleYouMayKnow from './PeopleYouMayKnow';
import ActivityFeed from './ActivityFeed';
import TrendingTopics from './TrendingTopics';
import QuickActions from './QuickActions';
import LiveChat from './LiveChat';
import { useFriends } from '@/hooks/useFriends';
import { MOCK_IMAGES } from '@/lib/constants';

const RightSidebar = () => {
  const { data: friends } = useFriends();
  const [activeChatContact, setActiveChatContact] = useState<any>(null);

  const onlineFriends = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: MOCK_IMAGES.AVATARS[0],
      isOnline: true
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: MOCK_IMAGES.AVATARS[1],
      isOnline: true
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: MOCK_IMAGES.AVATARS[2],
      isOnline: false
    }
  ];

  const handleStartChat = (friend: any) => {
    setActiveChatContact(friend);
  };

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-thin">
      <div className="p-4 space-y-4">
        {/* Friend Requests */}
        <div className="mb-4">
          <FriendRequestsPanel />
        </div>
        
        {/* People You May Know */}
        <div className="mb-4">
          <PeopleYouMayKnow />
        </div>

        {/* Quick Actions */}
        <div className="mb-4">
          <QuickActions />
        </div>

        {/* Trending Topics */}
        <div className="mb-4">
          <TrendingTopics />
        </div>

        {/* Activity Feed */}
        <div className="mb-4">
          <ActivityFeed />
        </div>

        {/* Online Friends */}
        <Card className="mb-4">
          <CardHeader className="p-3">
            <CardTitle className="text-base font-semibold flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-600" />
              <span>Contacts ({friends?.length || 0})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            {onlineFriends.map((friend) => (
              <div 
                key={friend.id} 
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleStartChat(friend)}
              >
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="text-xs">{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {friend.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900 truncate flex-1">{friend.name}</span>
                <MessageCircle className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Your Pages and Profiles */}
        <Card className="mb-4">
          <CardHeader className="p-3">
            <CardTitle className="text-base font-semibold">Your Pages and profiles</CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">YP</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Your Page</span>
            </div>
          </CardContent>
        </Card>

        {/* Group conversations */}
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-base font-semibold">Group conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Design Team</span>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Weekend Plans</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Chat */}
      {activeChatContact && (
        <LiveChat
          isOpen={!!activeChatContact}
          onClose={() => setActiveChatContact(null)}
          contact={activeChatContact}
        />
      )}
    </div>
  );
};

export default RightSidebar;