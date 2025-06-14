
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import FriendRequestsPanel from './FriendRequestsPanel';
import PeopleYouMayKnow from './PeopleYouMayKnow';
import { useFriends } from '@/hooks/useFriends';

const RightSidebar = () => {
  const { data: friends } = useFriends();

  const onlineFriends = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      isOnline: true
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "/placeholder.svg",
      isOnline: true
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: "/placeholder.svg",
      isOnline: false
    }
  ];

  return (
    <div className="w-80 bg-gray-50 h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Friend Requests */}
        <FriendRequestsPanel />
        
        {/* People You May Know */}
        <PeopleYouMayKnow />

        {/* Online Friends */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base font-semibold flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-600" />
              <span>Contacts ({friends?.length || 0})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            {onlineFriends.map((friend) => (
              <div key={friend.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="text-xs">{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {friend.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900">{friend.name}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Your Pages and Profiles */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base font-semibold">Your Pages and profiles</CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">YP</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Your Page</span>
            </div>
          </CardContent>
        </Card>

        {/* Group conversations */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base font-semibold">Group conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Design Team</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Weekend Plans</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RightSidebar;
