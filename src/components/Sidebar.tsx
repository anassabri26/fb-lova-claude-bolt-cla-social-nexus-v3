import React, { useState } from 'react';
import { Home, Users, Bookmark, Clock, Calendar, Store, Video, MessageCircle, Flag, ChevronDown, UsersRound, Settings, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import AccessibleButton from './AccessibleButton';
import { ROUTES, MOCK_IMAGES } from '@/lib/constants';

const Sidebar = () => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: ROUTES.HOME },
    { icon: Users, label: 'Friends', path: ROUTES.FRIENDS, count: 3 },
    { icon: MessageCircle, label: 'Messenger', path: ROUTES.MESSAGES, count: 2 },
    { icon: Video, label: 'Watch', path: ROUTES.WATCH },
    { icon: Store, label: 'Marketplace', path: ROUTES.MARKETPLACE },
    { icon: UsersRound, label: 'Groups', path: ROUTES.GROUPS },
    { icon: Bookmark, label: 'Saved', path: ROUTES.SAVED },
    { icon: Calendar, label: 'Events', path: ROUTES.EVENTS },
    { icon: Clock, label: 'Memories', path: ROUTES.MEMORIES },
    { icon: Flag, label: 'Pages', path: '/pages' },
    { icon: TrendingUp, label: 'Most Recent', path: '/recent' },
    { icon: Settings, label: 'Settings', path: ROUTES.SETTINGS },
  ];

  const shortcuts = [
    { 
      name: 'React Developers', 
      image: MOCK_IMAGES.POSTS[0], 
      path: '/groups/react-developers',
      members: '12.5k'
    },
    { 
      name: 'Web Design Community', 
      image: MOCK_IMAGES.POSTS[1], 
      path: '/groups/web-design',
      members: '8.2k'
    },
    { 
      name: 'JavaScript Enthusiasts', 
      image: MOCK_IMAGES.POSTS[2], 
      path: '/groups/javascript',
      members: '15.7k'
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    console.log(`Sidebar navigation: ${path}`);
  };

  const handleProfileClick = () => {
    navigate(ROUTES.PROFILE);
    console.log('Profile clicked from sidebar');
  };

  const handleShortcutEdit = () => {
    console.log('Edit shortcuts clicked');
  };

  const visibleItems = showMore ? menuItems : menuItems.slice(0, 8);

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-thin">
      <div className="p-4 space-y-4">
        {/* User Profile */}
        <div 
          className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
          onClick={handleProfileClick}
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src={MOCK_IMAGES.AVATARS[0]} />
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
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left font-normal transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleNavigation(item.path)}
                aria-label={item.label}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.count && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
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
          className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => {
            setShowMore(!showMore);
          }}
          aria-expanded={showMore}
        >
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
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
              className="text-blue-600 text-sm hover:bg-blue-50 transition-colors"
              onClick={handleShortcutEdit}
            >
              Edit
            </AccessibleButton>
          </div>
          
          {shortcuts.map((shortcut) => (
            <AccessibleButton
              key={shortcut.name}
              variant="ghost"
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-100 transition-colors"
              onClick={() => handleNavigation(shortcut.path)}
            >
              <img
                src={shortcut.image}
                alt={shortcut.name}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-medium truncate">{shortcut.name}</p>
                <p className="text-xs text-gray-500">{shortcut.members} members</p>
              </div>
            </AccessibleButton>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-gray-500 font-medium text-sm">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <AccessibleButton
              variant="outline"
              size="sm"
              className="flex flex-col items-center space-y-1 p-3 h-auto"
              onClick={() => {
                navigate('/');
                console.log('Quick action: Create post');
              }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs">Post</span>
            </AccessibleButton>
            <AccessibleButton
              variant="outline"
              size="sm"
              className="flex flex-col items-center space-y-1 p-3 h-auto"
              onClick={() => {
                navigate(ROUTES.EVENTS);
                console.log('Quick action: Create event');
              }}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Event</span>
            </AccessibleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;