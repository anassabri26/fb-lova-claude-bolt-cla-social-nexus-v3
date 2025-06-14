
import React from 'react';
import { Bell, Settings, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      },
      action: 'liked your post',
      time: '5m',
      unread: true,
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      },
      action: 'commented on your photo',
      time: '1h',
      unread: true,
    },
    {
      id: 3,
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      },
      action: 'shared your post',
      time: '3h',
      unread: false,
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
        aria-hidden="true"
      />
      <Card className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto z-50 bg-white shadow-lg border border-gray-200">
        <CardHeader className="pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Notifications</CardTitle>
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Notification settings"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </AccessibleButton>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-3 hover:bg-gray-50 cursor-pointer ${
                  notification.unread ? 'bg-blue-50' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={notification.user.avatar} alt={`${notification.user.name}'s profile`} />
                    <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {notification.unread && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{notification.user.name}</span>
                    {' '}
                    <span>{notification.action}</span>
                  </p>
                  <p className="text-xs text-blue-600 mt-1">{notification.time} ago</p>
                </div>
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="p-1 rounded-full hover:bg-gray-200"
                  aria-label="More options"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </AccessibleButton>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100">
            <AccessibleButton
              variant="ghost"
              className="w-full text-blue-600 hover:bg-blue-50 py-2"
            >
              See all notifications
            </AccessibleButton>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default NotificationsDropdown;
