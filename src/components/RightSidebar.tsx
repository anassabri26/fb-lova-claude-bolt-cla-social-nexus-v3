
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, TrendingUp, Gamepad2, ShoppingBag } from 'lucide-react';
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
      <div className="p-3 space-y-3">
        {/* Friend Requests */}
        <FriendRequestsPanel />
        
        {/* People You May Know */}
        <PeopleYouMayKnow />

        {/* Online Friends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 text-gray-600" />
              <span>Contacts ({friends?.length || 0})</span>
            </h3>
          </div>
          <div className="p-1">
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
          </div>
        </div>

        {/* Your Pages and Profiles */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Your Pages and profiles</h3>
          </div>
          <div className="p-1">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">YP</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Your Page</span>
            </div>
          </div>
        </div>

        {/* Group conversations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Group conversations</h3>
          </div>
          <div className="p-1">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
