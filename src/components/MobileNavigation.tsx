
import React from 'react';
import { Home, Users, MessageCircle, Video, Store, Calendar, Bookmark, UsersRound } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AccessibleButton from './AccessibleButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'watch', icon: Video, label: 'Watch', path: '/watch' },
    { id: 'marketplace', icon: Store, label: 'Store', path: '/marketplace' },
    { id: 'groups', icon: UsersRound, label: 'Groups', path: '/groups' },
    { id: 'messages', icon: MessageCircle, label: 'Messages', path: '/messages' },
  ];

  const handleNavigation = (path: string, label: string) => {
    navigate(path);
    toast.success(`Navigated to ${label}`);
    console.log(`Mobile navigation: ${label} - ${path}`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <AccessibleButton
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg min-h-[44px] min-w-[44px] transition-colors ${
                isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => handleNavigation(item.path, item.label)}
              aria-label={item.label}
              aria-pressed={isActive}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </AccessibleButton>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
