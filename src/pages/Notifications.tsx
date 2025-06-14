
import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, Users, Calendar, Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'friend_request' | 'event' | 'group';
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  time: string;
  isRead: boolean;
  actionable?: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'friend_request',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      message: 'sent you a friend request',
      time: '2 minutes ago',
      isRead: false,
      actionable: true
    },
    {
      id: '2',
      type: 'like',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      message: 'liked your post',
      time: '1 hour ago',
      isRead: false
    },
    {
      id: '3',
      type: 'comment',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      message: 'commented on your photo',
      time: '3 hours ago',
      isRead: true
    },
    {
      id: '4',
      type: 'event',
      user: {
        name: 'Tech Meetup',
        avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop'
      },
      message: 'event is happening tomorrow',
      time: '6 hours ago',
      isRead: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return Heart;
      case 'comment': return MessageCircle;
      case 'friend_request': return Users;
      case 'event': return Calendar;
      case 'group': return Users;
      default: return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like': return 'text-red-500';
      case 'comment': return 'text-blue-500';
      case 'friend_request': return 'text-green-500';
      case 'event': return 'text-purple-500';
      case 'group': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
  };

  const acceptFriendRequest = (notificationId: string) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
    toast.success('Friend request accepted!');
  };

  const declineFriendRequest = (notificationId: string) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
    toast.success('Friend request declined');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    toast.success('All notifications marked as read');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Bell className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              </div>
              <AccessibleButton
                variant="outline"
                onClick={markAllAsRead}
                className="text-blue-600"
              >
                Mark all as read
              </AccessibleButton>
            </div>
            
            <div className="space-y-2">
              {notifications.map((notification) => {
                const Icon = getIcon(notification.type);
                const iconColor = getIconColor(notification.type);
                
                return (
                  <Card 
                    key={notification.id} 
                    className={`cursor-pointer transition-colors ${
                      notification.isRead ? 'bg-white' : 'bg-blue-50 border-blue-200'
                    }`}
                    onClick={() => !notification.isRead && markAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-white flex items-center justify-center ${iconColor}`}>
                            <Icon className="w-3 h-3" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-gray-900">
                            <span className="font-medium">{notification.user.name}</span>
                            {' '}{notification.message}
                          </p>
                          <p className="text-sm text-blue-600 mt-1">{notification.time}</p>
                          
                          {notification.actionable && notification.type === 'friend_request' && (
                            <div className="flex space-x-2 mt-3">
                              <AccessibleButton
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  acceptFriendRequest(notification.id);
                                }}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Accept
                              </AccessibleButton>
                              <AccessibleButton
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  declineFriendRequest(notification.id);
                                }}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Decline
                              </AccessibleButton>
                            </div>
                          )}
                        </div>
                        
                        {!notification.isRead && (
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
        <RightSidebar />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Notifications;
