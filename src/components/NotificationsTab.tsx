import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Calendar, CheckCircle, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';
import { MOCK_IMAGES } from '@/lib/constants';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'friend_request' | 'event' | 'marketplace' | 'tag';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  image?: string;
}

const NotificationsTab = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar: MOCK_IMAGES.AVATARS[0]
      },
      content: 'liked your photo',
      timestamp: '5m',
      isRead: false,
      image: MOCK_IMAGES.POSTS[0]
    },
    {
      id: '2',
      type: 'comment',
      user: {
        name: 'Mike Chen',
        avatar: MOCK_IMAGES.AVATARS[1]
      },
      content: 'commented on your post: "Great work on this project!"',
      timestamp: '15m',
      isRead: false,
      image: MOCK_IMAGES.POSTS[1]
    },
    {
      id: '3',
      type: 'friend_request',
      user: {
        name: 'Emma Wilson',
        avatar: MOCK_IMAGES.AVATARS[2]
      },
      content: 'sent you a friend request',
      timestamp: '1h',
      isRead: false
    },
    {
      id: '4',
      type: 'event',
      user: {
        name: 'David Kim',
        avatar: MOCK_IMAGES.AVATARS[3]
      },
      content: 'invited you to Tech Conference 2024',
      timestamp: '2h',
      isRead: true
    },
    {
      id: '5',
      type: 'marketplace',
      user: {
        name: 'Alex Rodriguez',
        avatar: MOCK_IMAGES.AVATARS[5]
      },
      content: 'is interested in your "MacBook Pro" listing',
      timestamp: '3h',
      isRead: true,
      image: MOCK_IMAGES.POSTS[0]
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment': return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'friend_request': return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'event': return <Calendar className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
    toast.success('Marked as read');
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast.success('Notification removed');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleAcceptFriendRequest = (id: string, name: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast.success(`Friend request from ${name} accepted!`);
  };

  const handleDeclineFriendRequest = (id: string, name: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast.info(`Friend request from ${name} declined`);
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(notif => !notif.isRead)
    : notifications;

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
              )}
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm" className="sm:self-end">
                Mark all as read
              </Button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-4 mb-6">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              onClick={() => setFilter('all')}
              className="flex items-center space-x-2"
            >
              <span>All</span>
              <Badge variant="secondary">{notifications.length}</Badge>
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'ghost'}
              onClick={() => setFilter('unread')}
              className="flex items-center space-x-2"
            >
              <span>Unread</span>
              {unreadCount > 0 && <Badge variant="destructive">{unreadCount}</Badge>}
            </Button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                  </h3>
                  <p className="text-gray-500">
                    {filter === 'unread' 
                      ? 'You\'re all caught up! Check back later for new notifications.'
                      : 'When you have notifications, they\'ll appear here.'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-colors ${
                    !notification.isRead ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              <span className="font-semibold">{notification.user.name}</span>
                              {' '}{notification.content}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                          </div>
                          
                          {notification.image && (
                            <img
                              src={notification.image}
                              alt="Notification content"
                              className="w-12 h-12 object-cover rounded ml-3 flex-shrink-0"
                            />
                          )}
                          
                          <div className="flex items-center space-x-2 ml-2">
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                            <AccessibleButton
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-4 h-4" />
                            </AccessibleButton>
                          </div>
                        </div>

                        {/* Action buttons for specific notification types */}
                        {notification.type === 'friend_request' && !notification.isRead && (
                          <div className="flex space-x-2 mt-3">
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAcceptFriendRequest(notification.id, notification.user.name);
                              }}
                            >
                              Accept
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeclineFriendRequest(notification.id, notification.user.name);
                              }}
                            >
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;