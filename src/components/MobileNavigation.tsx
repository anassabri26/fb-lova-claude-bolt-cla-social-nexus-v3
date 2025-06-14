
import React, { useState } from 'react';
import { Home, Users, MessageCircle, Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import AccessibleButton from './AccessibleButton';

const MobileNavigation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'friends', icon: Users, label: 'Friends', path: '/friends' },
    { id: 'messages', icon: MessageCircle, label: 'Messages', path: '/messages' },
    { id: 'notifications', icon: Bell, label: 'Notifications', path: '/notifications' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => (
          <AccessibleButton
            key={item.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg min-h-[44px] min-w-[44px] ${
              activeTab === item.id ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab(item.id)}
            aria-label={item.label}
            aria-pressed={activeTab === item.id}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </AccessibleButton>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
