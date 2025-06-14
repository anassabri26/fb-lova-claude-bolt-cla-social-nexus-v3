
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, UserPlus, Calendar, Settings } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      action: 'liked your post',
      time: '5m',
      unread: true,
      icon: Heart
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      action: 'commented on your photo',
      time: '1h',
      unread: true,
      icon: MessageCircle
    },
    {
      id: 3,
      type: 'friend',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      action: 'accepted your friend request',
      time: '3h',
      unread: false,
      icon: UserPlus
    },
    {
      id: 4,
      type: 'event',
      user: {
        name: 'Tech Meetup Group',
        avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop'
      },
      action: 'invited you to React Workshop',
      time: '1d',
      unread: false,
      icon: Calendar
    }
  ];

  const handleNotificationClick = (notification: any) => {
    toast.info(`Opened notification from ${notification.user.name}`);
  };

  const handleMarkAllRead = () => {
    toast.success('All notifications marked as read');
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return notification.unread;
    return notification.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <div className="flex space-x-2">
                <AccessibleButton
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllRead}
                >
                  Mark all as read
                </AccessibleButton>
                <AccessibleButton variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </AccessibleButton>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="like">Likes</TabsTrigger>
                <TabsTrigger value="comment">Comments</TabsTrigger>
                <TabsTrigger value="friend">Friends</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-2">
                  {filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                        notification.unread ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={notification.user.avatar} />
                              <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                              <notification.icon className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              <span className="font-semibold">{notification.user.name}</span>
                              {' '}
                              <span>{notification.action}</span>
                            </p>
                            <p className="text-xs text-blue-600 mt-1">{notification.time} ago</p>
                          </div>
                          {notification.unread && (
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No notifications to show</p>
                    </div>
                  )}
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

export default Notifications;
