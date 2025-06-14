
import React from 'react';
import { Bell, Heart, MessageCircle, Users, Calendar, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDropdown = ({ isOpen, onClose }: NotificationsDropdownProps) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      content: 'liked your post',
      time: '5m ago',
      read: false
    },
    {
      id: '2',
      type: 'comment',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      content: 'commented on your post: "Great work!"',
      time: '1h ago',
      read: false
    },
    {
      id: '3',
      type: 'friend_request',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      content: 'sent you a friend request',
      time: '2h ago',
      read: true
    },
    {
      id: '4',
      type: 'event',
      user: {
        name: 'Tech Meetup',
        avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop'
      },
      content: 'invited you to React Developer Meetup',
      time: '1d ago',
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" fill="currentColor" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'friend_request':
        return <Users className="w-4 h-4 text-green-500" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleNotificationClick = (notification: any) => {
    toast.info(`Opened ${notification.type} from ${notification.user.name}`);
    console.log('Notification clicked:', notification);
  };

  const handleMarkAllRead = () => {
    toast.success('All notifications marked as read');
    console.log('Mark all as read');
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <div className="flex items-center space-x-2">
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              className="text-blue-600 text-sm"
            >
              Mark all as read
            </AccessibleButton>
            <AccessibleButton variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </AccessibleButton>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
              !notification.read ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
            }`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={notification.user.avatar} />
                  <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900">
                  <span className="font-medium">{notification.user.name}</span>
                  {' '}{notification.content}
                </div>
                <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
              </div>
              
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-200">
        <AccessibleButton
          variant="ghost"
          className="w-full text-blue-600 text-sm"
          onClick={() => {
            toast.info('Opening all notifications page');
            onClose();
          }}
        >
          See all notifications
        </AccessibleButton>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
