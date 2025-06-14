
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

  const upcomingEvents = [
    {
      id: 1,
      title: "Team Meeting",
      date: "Today at 3:00 PM",
      attendees: 12
    },
    {
      id: 2,
      title: "Birthday Party",
      date: "Tomorrow at 7:00 PM",
      attendees: 25
    }
  ];

  const trendingTopics = [
    { id: 1, topic: "#TechNews", posts: "2.3k posts" },
    { id: 2, topic: "#Photography", posts: "1.8k posts" },
    { id: 3, topic: "#Travel", posts: "1.2k posts" },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Friend Requests */}
      <FriendRequestsPanel />
      
      {/* People You May Know */}
      <PeopleYouMayKnow />

      {/* Online Friends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Online Friends ({friends?.length || 0})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {onlineFriends.map((friend) => (
            <div key={friend.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
              <div className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {friend.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <span className="text-sm font-medium">{friend.name}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Upcoming Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900">{event.title}</h4>
              <p className="text-sm text-blue-700">{event.date}</p>
              <p className="text-xs text-blue-600">{event.attendees} attending</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Trending</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {trendingTopics.map((trend) => (
            <div key={trend.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
              <div>
                <p className="font-semibold text-blue-600">{trend.topic}</p>
                <p className="text-xs text-gray-500">{trend.posts}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Games */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gamepad2 className="w-5 h-5" />
            <span>Games</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">Word Puzzle</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">Candy Crush</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSidebar;
