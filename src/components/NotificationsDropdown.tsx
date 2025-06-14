
import React, { useState } from 'react';
import { Bell, X, Settings, Heart, MessageCircle, Users, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'friend_request' | 'mention' | 'video';
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  read: boolean;
  actionable?: boolean;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      message: 'liked your post about React development',
      timestamp: '5m',
      read: false
    },
    {
      id: '2',
      type: 'friend_request',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      message: 'sent you a friend request',
      timestamp: '1h',
      read: false,
      actionable: true
    },
    {
      id: '3',
      type: 'comment',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      message: 'commented on your photo',
      timestamp: '2h',
      read: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return Heart;
      case 'comment': return MessageCircle;
      case 'friend_request': return Users;
      case 'video': return Video;
      default: return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like': return 'text-red-500';
      case 'comment': return 'text-blue-500';
      case 'friend_request': return 'text-green-500';
      case 'video': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    toast.success(`Opening ${notification.type} from ${notification.user.name}`);
    console.log('Notification clicked:', notification);
  };

  const handleAcceptFriend = (notificationId: string) => {
    toast.success('Friend request accepted!');
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleDeclineFriend = (notificationId: string) => {
    toast.info('Friend request declined');
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-20" onClick={onClose}>
      <div className="absolute top-16 right-4 w-96">
        <Card className="shadow-xl border-0" onClick={(e) => e.stopPropagation()}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Notifications</h3>
              <div className="flex items-center space-x-2">
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  onClick={() => toast.info('Settings coming soon!')}
                >
                  <Settings className="w-4 h-4" />
                </AccessibleButton>
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </AccessibleButton>
              </div>
            </div>
            {unreadCount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{unreadCount} new notifications</span>
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllRead}
                  className="text-blue-600 text-sm"
                >
                  Mark all as read
                </AccessibleButton>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="space-y-1">
                {notifications.map((notification) => {
                  const IconComponent = getIcon(notification.type);
                  const iconColor = getIconColor(notification.type);
                  
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                        notification.read ? 'border-transparent' : 'border-blue-500 bg-blue-50'
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border-2 border-white`}>
                            <IconComponent className={`w-3 h-3 ${iconColor}`} />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{notification.user.name}</span>{' '}
                            {notification.message}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">{notification.timestamp}</p>
                          
                          {notification.actionable && notification.type === 'friend_request' && (
                            <div className="flex space-x-2 mt-3">
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAcceptFriend(notification.id);
                                }}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeclineFriend(notification.id);
                                }}
                              >
                                Decline
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {!notification.read && (
                          <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>You're all caught up!</p>
                <p className="text-sm">No new notifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
