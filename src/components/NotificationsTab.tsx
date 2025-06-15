
import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Calendar, CheckCircle, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const NotificationsTab = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      message: 'liked your post',
      time: '5 minutes ago',
      isRead: false,
      postImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      type: 'comment',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      message: 'commented on your post: "This is amazing! Great work."',
      time: '15 minutes ago',
      isRead: false,
      postImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop'
    },
    {
      id: '3',
      type: 'friend_request',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      message: 'sent you a friend request',
      time: '1 hour ago',
      isRead: true
    },
    {
      id: '4',
      type: 'event',
      user: {
        name: 'Tech Events Inc.',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face'
      },
      message: 'invited you to Tech Conference 2024',
      time: '2 hours ago',
      isRead: true
    },
    {
      id: '5',
      type: 'like',
      user: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      },
      message: 'and 3 others liked your comment',
      time: '3 hours ago',
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'friend_request':
        return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    toast.success('Marked as read');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    toast.success('All notifications marked as read');
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast.success('Notification deleted');
  };

  const handleAcceptFriendRequest = (userName: string) => {
    toast.success(`Accepted friend request from ${userName}`);
  };

  const handleDeclineFriendRequest = (userName: string) => {
    toast.info(`Declined friend request from ${userName}`);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.isRead;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600">{unreadCount} unread notifications</p>
          )}
        </div>
        <Button
          onClick={handleMarkAllAsRead}
          variant="outline"
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All' },
          { id: 'unread', label: 'Unread' },
          { id: 'like', label: 'Likes' },
          { id: 'comment', label: 'Comments' },
          { id: 'friend_request', label: 'Friend Requests' },
          { id: 'event', label: 'Events' }
        ].map((filterOption) => (
          <Button
            key={filterOption.id}
            variant={filter === filterOption.id ? 'default' : 'outline'}
            onClick={() => setFilter(filterOption.id)}
            className="whitespace-nowrap"
          >
            {filterOption.label}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              !notification.isRead ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                {/* Avatar and Icon */}
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={notification.user.avatar} />
                    <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{notification.user.name}</span>
                        {' '}
                        <span>{notification.message}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>

                    {/* Post Image */}
                    {notification.postImage && (
                      <img
                        src={notification.postImage}
                        alt="Post"
                        className="w-12 h-12 object-cover rounded ml-3"
                      />
                    )}
                  </div>

                  {/* Action Buttons for Friend Requests */}
                  {notification.type === 'friend_request' && (
                    <div className="flex space-x-2 mt-3">
                      <Button
                        onClick={() => handleAcceptFriendRequest(notification.user.name)}
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleDeclineFriendRequest(notification.user.name)}
                        variant="outline"
                        size="sm"
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-1">
                  {!notification.isRead && (
                    <AccessibleButton
                      onClick={() => handleMarkAsRead(notification.id)}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </AccessibleButton>
                  )}
                  <AccessibleButton
                    onClick={() => handleDeleteNotification(notification.id)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </AccessibleButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-500">
            {filter === 'unread' 
              ? 'All caught up! No unread notifications.' 
              : 'You\'ll see notifications here when you get them.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsTab;
