import React, { useState } from 'react';
import { Home, Users, MessageCircle, Bell, Menu, Search, Plus, Video, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationsDropdown from './NotificationsDropdown';
import { toast } from 'sonner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', icon: Home, path: '/', label: 'Home' },
    { id: 'friends', icon: Users, path: '/friends', label: 'Friends' },
    { id: 'watch', icon: Video, path: '/watch', label: 'Watch' },
    { id: 'marketplace', icon: Store, path: '/marketplace', label: 'Marketplace' },
    { id: 'messages', icon: MessageCircle, path: '/messages', label: 'Messages' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    console.log(`Header navigation: ${path}`);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    console.log('Profile clicked');
  };

  const handleNotificationsClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen) {
      navigate('/notifications');
    }
    console.log('Notifications toggled');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`);
      console.log(`Search query: ${searchQuery}`);
    }
  };

  const handleCreatePost = () => {
    navigate('/');
    console.log('Create post clicked');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 safe-area-top">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Left section - Logo */}
            <div className="flex items-center space-x-1 min-w-0">
              <div 
                className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity touch-target"
                onClick={() => handleNavigation('/')}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-base sm:text-lg">f</span>
                </div>
                <span className="hide-mobile text-base sm:text-lg font-bold text-blue-600">facebook</span>
              </div>
            </div>

            {/* Center section - Search and Navigation */}
            <div className="flex items-center space-x-1 flex-1 max-w-lg mx-1 sm:mx-2">
              <form onSubmit={handleSearch} className="hide-mobile flex-1">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search Facebook"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-100 border-none rounded-full text-responsive-sm h-9"
                  />
                </div>
              </form>
              
              <div className="hide-mobile flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button 
                      key={item.id}
                      variant="ghost" 
                      size="sm" 
                      className={`relative p-2 rounded-xl transition-colors ${
                        isActive ? 'text-blue-600' : 'text-gray-600'
                      }`}
                      onClick={() => handleNavigation(item.path)}
                      aria-label={item.label}
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-1 bg-blue-600 rounded-t-full"></div>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Right section - User actions */}
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="touch-target p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleCreatePost}
                aria-label="Create post"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative touch-target p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleNotificationsClick}
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="show-mobile touch-target p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </Button>
              
              <Avatar 
                className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={handleProfileClick}
              >
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Mobile search */}
          <div className="show-mobile px-2 pb-2">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search Facebook"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-100 border-none rounded-full text-responsive-sm h-9"
                />
              </div>
            </form>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="show-mobile bg-white border-t border-gray-200 py-2">
              <div className="grid grid-cols-2 gap-2 px-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="flex items-center space-x-2 p-2 rounded-lg text-left justify-start"
                    onClick={() => {
                      handleNavigation(item.path);
                      setIsMenuOpen(false);
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-responsive-sm">{item.label}</span>
                  </Button>
                ))}
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