
import React, { useState } from 'react';
import { Home, Users, Bookmark, Clock, Calendar, Store, Video, MessageCircle, Flag, ChevronDown, UsersRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import AccessibleButton from './AccessibleButton';

const Sidebar = () => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', active: true },
    { icon: Users, label: 'Friends', path: '/friends', count: 3 },
    { icon: MessageCircle, label: 'Messenger', path: '/messages' },
    { icon: Video, label: 'Watch', path: '/watch' },
    { icon: Store, label: 'Marketplace', path: '/marketplace' },
    { icon: UsersRound, label: 'Groups', path: '/groups' },
    { icon: Bookmark, label: 'Saved', path: '/saved' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Clock, label: 'Memories', path: '/memories' },
    { icon: Flag, label: 'Pages', path: '/pages' },
  ];

  const shortcuts = [
    { name: 'React Developers', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop', path: '/groups/1' },
    { name: 'Web Design Community', image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop', path: '/groups/2' },
  ];

  const handleNavigation = (path: string) => {
    if (path === '/' || path === '/profile' || path === '/friends' || path === '/messages' || path === '/watch' || path === '/marketplace' || path === '/saved' || path === '/events' || path === '/memories' || path === '/groups') {
      navigate(path);
    } else {
      // For routes that don't exist yet, show in console
      console.log(`Feature coming soon: ${path}`);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const visibleItems = showMore ? menuItems : menuItems.slice(0, 6);

  return (
    <aside className="hidden md:block w-80 p-4 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      <div className="space-y-6">
        {/* User Profile */}
        <div 
          className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          onClick={handleProfileClick}
        >
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="font-medium text-gray-900">John Doe</span>
        </div>

        {/* Main Menu */}
        <nav className="space-y-1">
          {visibleItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <AccessibleButton
                key={item.label}
                variant="ghost"
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left font-normal ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleNavigation(item.path)}
                aria-label={item.label}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </AccessibleButton>
            );
          })}
        </nav>

        {/* See More Button */}
        <AccessibleButton
          variant="ghost"
          className="w-full flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => setShowMore(!showMore)}
          aria-expanded={showMore}
        >
          <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
            <ChevronDown className={`w-3 h-3 transition-transform ${showMore ? 'rotate-180' : ''}`} />
          </div>
          <span>{showMore ? 'See less' : 'See more'}</span>
        </AccessibleButton>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Shortcuts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium text-sm">Your shortcuts</h3>
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="text-blue-600 text-sm hover:bg-blue-50"
              onClick={() => console.log('Edit shortcuts clicked')}
            >
              Edit
            </AccessibleButton>
          </div>
          
          {shortcuts.map((shortcut) => (
            <AccessibleButton
              key={shortcut.name}
              variant="ghost"
              className="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-gray-100"
              onClick={() => handleNavigation(shortcut.path)}
            >
              <img
                src={shortcut.image}
                alt={shortcut.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-gray-900">{shortcut.name}</span>
            </AccessibleButton>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
