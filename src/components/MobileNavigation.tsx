import React from 'react';
import { Home, Users, MessageCircle, Video, Store } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-device';

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'watch', icon: Video, label: 'Watch', path: '/watch' },
    { id: 'marketplace', icon: Store, label: 'Store', path: '/marketplace' },
    { id: 'friends', icon: Users, label: 'Friends', path: '/friends' },
    { id: 'messages', icon: MessageCircle, label: 'Messages', path: '/messages' },
  ];

  const handleNavigation = (path: string) => {
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    navigate(path);
  };

  return (
    <nav className="nav-responsive safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around px-1 py-1 max-w-sm mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-0.5 py-2 px-2 rounded-lg touch-target transition-all duration-200 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50 transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
              onClick={() => handleNavigation(item.path)}
              aria-label={item.label}
              aria-pressed={isActive}
            >
              <item.icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;