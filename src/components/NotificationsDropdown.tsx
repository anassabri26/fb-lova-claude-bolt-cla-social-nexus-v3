
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'friend_request' | 'mention' | 'memory';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
  postImage?: string;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ isOpen, onClose }) => {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      content: 'liked your post about web development',
      timestamp: '5m',
      read: false,
      postImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      content: 'commented on your photo',
      timestamp: '1h',
      read: false
    },
    {
      id: 3,
      type: 'friend_request',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      content: 'sent you a friend request',
      timestamp: '2h',
      read: true
    },
    {
      id: 4,
      type: 'memory',
      user: {
        name: 'Facebook',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      content: 'You have 3 memories to look back on today',
      timestamp: '1d',
      read: true
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute top-16 right-4 w-80">
        <Card className="bg-white shadow-lg border-0 shadow-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-gray-900">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                      notification.type === 'like' ? 'bg-blue-600' : 
                      notification.type === 'comment' ? 'bg-green-600' :
                      notification.type === 'friend_request' ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                      <span className="text-white text-xs">
                        {notification.type === 'like' ? '👍' : 
                         notification.type === 'comment' ? '💬' :
                         notification.type === 'friend_request' ? '👤' : '📅'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">{notification.user.name}</span>{' '}
                      {notification.content}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">{notification.timestamp}</p>
                  </div>
                  {notification.postImage && (
                    <img
                      src={notification.postImage}
                      alt="Post"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  {!notification.read && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
