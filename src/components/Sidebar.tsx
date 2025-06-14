
import React, { useState } from 'react';
import { Home, Users, Bookmark, Clock, Calendar, Store, Video, MessageCircle, Flag, ChevronDown, UsersRound, Settings, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const Sidebar = () => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Friends', path: '/friends', count: 3 },
    { icon: MessageCircle, label: 'Messenger', path: '/messages', count: 2 },
    { icon: Video, label: 'Watch', path: '/watch' },
    { icon: Store, label: 'Marketplace', path: '/marketplace' },
    { icon: UsersRound, label: 'Groups', path: '/groups' },
    { icon: Bookmark, label: 'Saved', path: '/saved' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Clock, label: 'Memories', path: '/memories' },
    { icon: Flag, label: 'Pages', path: '/pages' },
    { icon: TrendingUp, label: 'Most Recent', path: '/recent' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const shortcuts = [
    { 
      name: 'React Developers', 
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop', 
      path: '/groups/react-developers',
      members: '12.5k'
    },
    { 
      name: 'Web Design Community', 
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop', 
      path: '/groups/web-design',
      members: '8.2k'
    },
    { 
      name: 'JavaScript Enthusiasts', 
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop', 
      path: '/groups/javascript',
      members: '15.7k'
    },
  ];

  const handleNavigation = (path: string, label: string) => {
    if (path.startsWith('/')) {
      navigate(path);
      toast.success(`Navigated to ${label}`);
      console.log(`Sidebar navigation: ${label} - ${path}`);
    } else {
      toast.info(`${label} feature coming soon!`);
      console.log(`Feature coming soon: ${path}`);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
    toast.success('Navigated to Profile');
    console.log('Profile clicked from sidebar');
  };

  const handleShortcutEdit = () => {
    toast.info('Shortcut editing coming soon!');
    console.log('Edit shortcuts clicked');
  };

  const visibleItems = showMore ? menuItems : menuItems.slice(0, 8);

  return (
    <aside className="hidden md:block w-80 p-4 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      <div className="space-y-6">
        {/* User Profile */}
        <div 
          className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
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
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left font-normal transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleNavigation(item.path, item.label)}
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
          className="w-full flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => {
            setShowMore(!showMore);
            toast.info(showMore ? 'Showing fewer options' : 'Showing more options');
          }}
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
              className="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-gray-100 transition-colors"
              onClick={() => handleNavigation(shortcut.path, shortcut.name)}
            >
              <img
                src={shortcut.image}
                alt={shortcut.name}
                className="w-8 h-8 rounded-lg object-cover"
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
                toast.success('Create post opened');
                console.log('Quick action: Create post');
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">Post</span>
            </AccessibleButton>
            <AccessibleButton
              variant="outline"
              size="sm"
              className="flex flex-col items-center space-y-1 p-3 h-auto"
              onClick={() => {
                toast.success('Create event opened');
                console.log('Quick action: Create event');
              }}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-xs">Event</span>
            </AccessibleButton>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
