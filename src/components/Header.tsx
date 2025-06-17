import React, { useState } from 'react';
import { Home, MessageCircle, Bell, Menu, Search, Plus, Video, Store, Users } from 'lucide-react';
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
  };

  const handleProfileClick = () => {
    navigate(ROUTES.PROFILE);
  };

  const handleNotificationsClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen) {
      navigate(ROUTES.NOTIFICATIONS);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCreatePost = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 safe-area-top">
        <div className="container-responsive mx-auto">
          <div className="flex items-center justify-between h-14 px-4">
            {/* Left section - Logo */}
            <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
              <div 
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleNavigation(ROUTES.HOME)}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">f</span>
                </div>
                <span className="hide-mobile text-lg font-bold text-blue-600">facebook</span>
              </div>
            </div>

            {/* Center section - Search */}
            <div className="flex-1 max-w-xs sm:max-w-lg mx-4">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={isMobile ? "Search" : "Search Facebook"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-100 border-none rounded-full h-10"
                  />
                </div>
              </form>
            </div>

            {/* Right section - Navigation + User actions */}
            <div className="flex items-center space-x-1 flex-shrink-0">
              {/* Navigation Icons - Show on all screen sizes */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button 
                      key={item.id}
                      variant="ghost" 
                      size="sm" 
                      className={`relative p-2 rounded-md transition-colors h-10 w-10 ${
                        isActive ? 'text-blue-600' : 'text-gray-600'
                      }`}
                      onClick={() => handleNavigation(item.path)}
                      aria-label={item.label}
                    >
                      <item.icon className="w-5 h-5" />
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-blue-600 rounded-t-full"></div>
                      )}
                    </Button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors h-10 w-10"
                onClick={handleCreatePost}
                aria-label="Create post"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors h-10 w-10"
                onClick={handleNotificationsClick}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center leading-none">3</span>
              </Button>
              
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors h-10 w-10"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </Button>
              )}
              
              <Avatar 
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity ml-2" 
                onClick={handleProfileClick}
              >
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                <AvatarFallback className="text-sm">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Mobile menu - Additional options */}
          {isMenuOpen && isMobile && (
            <div className="bg-white border-t border-gray-200 py-2">
              <div className="grid grid-cols-2 gap-2 px-4">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 p-3 rounded-lg text-left justify-start h-12"
                  onClick={() => {
                    handleNavigation(ROUTES.FRIENDS);
                    setIsMenuOpen(false);
                  }}
                >
                  <Users className="w-5 h-5" />
                  <span>Friends</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 p-3 rounded-lg text-left justify-start h-12"
                  onClick={() => {
                    handleNavigation(ROUTES.GROUPS);
                    setIsMenuOpen(false);
                  }}
                >
                  <Users className="w-5 h-5" />
                  <span>Groups</span>
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