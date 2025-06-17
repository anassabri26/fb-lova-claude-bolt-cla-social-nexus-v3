import React, { useState } from 'react';
import { Home, MessageCircle, Bell, Menu, Search, Plus, Video, Store, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationsDropdown from './NotificationsDropdown';
import { useIsMobile, useIsTablet } from '@/hooks/use-device';
import { ROUTES } from '@/lib/constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const navItems = [
    { id: 'home', icon: Home, path: ROUTES.HOME, label: 'Home' },
    { id: 'watch', icon: Video, path: ROUTES.WATCH, label: 'Watch' },
    { id: 'marketplace', icon: Store, path: ROUTES.MARKETPLACE, label: 'Marketplace' },
    { id: 'messages', icon: MessageCircle, path: ROUTES.MESSAGES, label: 'Messages' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    console.log(`Header navigation: ${path}`);
  };

  const handleProfileClick = () => {
    navigate(ROUTES.PROFILE);
    console.log('Profile clicked');
  };

  const handleNotificationsClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen) {
      navigate(ROUTES.NOTIFICATIONS);
    }
    console.log('Notifications toggled');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log(`Search query: ${searchQuery}`);
    }
  };

  const handleCreatePost = () => {
    navigate(ROUTES.HOME);
    console.log('Create post clicked');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 safe-area-top">
        <div className="container-responsive mx-auto">
          <div className="flex items-center justify-between h-8 px-2">
            {/* Left section - Logo */}
            <div className="flex items-center space-x-1 min-w-0 flex-shrink-0">
              <div 
                className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleNavigation(ROUTES.HOME)}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">f</span>
                </div>
                <span className="hide-mobile text-xs sm:text-sm font-bold text-blue-600">facebook</span>
              </div>
            </div>

            {/* Center section - Search */}
            <div className="flex-1 max-w-xs sm:max-w-lg mx-2">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={isMobile ? "Search" : "Search Facebook"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 bg-gray-100 border-none rounded-full text-xs h-6 py-0"
                  />
                </div>
              </form>
            </div>

            {/* Right section - Navigation + User actions */}
            <div className="flex items-center space-x-0.5 flex-shrink-0">
              {/* Navigation Icons - Show on all screen sizes */}
              <div className="flex items-center space-x-0.5">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button 
                      key={item.id}
                      variant="ghost" 
                      size="sm" 
                      className={`relative p-1 rounded-md transition-colors h-6 w-6 ${
                        isActive ? 'text-blue-600' : 'text-gray-600'
                      }`}
                      onClick={() => handleNavigation(item.path)}
                      aria-label={item.label}
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-blue-600 rounded-t-full"></div>
                      )}
                    </Button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 rounded-full hover:bg-gray-100 transition-colors h-6 w-6"
                onClick={handleCreatePost}
                aria-label="Create post"
              >
                <Plus className="w-3.5 h-3.5 text-gray-600" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative p-1 rounded-full hover:bg-gray-100 transition-colors h-6 w-6"
                onClick={handleNotificationsClick}
                aria-label="Notifications"
              >
                <Bell className="w-3.5 h-3.5 text-gray-600" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center leading-none">3</span>
              </Button>
              
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors h-6 w-6"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menu"
                >
                  <Menu className="w-3.5 h-3.5 text-gray-600" />
                </Button>
              )}
              
              <Avatar 
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:opacity-80 transition-opacity ml-0.5" 
                onClick={handleProfileClick}
              >
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                <AvatarFallback className="text-xs">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Mobile menu - Additional options */}
          {isMenuOpen && isMobile && (
            <div className="bg-white border-t border-gray-200 py-1">
              <div className="grid grid-cols-2 gap-1 px-2">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 p-1.5 rounded-lg text-left justify-start h-7"
                  onClick={() => {
                    handleNavigation(ROUTES.FRIENDS);
                    setIsMenuOpen(false);
                  }}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-xs">Friends</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 p-1.5 rounded-lg text-left justify-start h-7"
                  onClick={() => {
                    handleNavigation(ROUTES.GROUPS);
                    setIsMenuOpen(false);
                  }}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-xs">Groups</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 p-1.5 rounded-lg text-left justify-start h-7"
                  onClick={() => {
                    handleNavigation(ROUTES.EVENTS);
                    setIsMenuOpen(false);
                  }}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs">Events</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Notifications Dropdown */}
      <NotificationsDropdown 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </>
  );
};

export default Header;