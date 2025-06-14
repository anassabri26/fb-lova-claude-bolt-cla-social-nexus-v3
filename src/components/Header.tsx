
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
    console.log(`Navigating to ${path}`);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    console.log('Profile clicked');
  };

  const handleNotificationsClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
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
    toast.success('Create post modal opened');
    console.log('Create post clicked');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Left section - Logo */}
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
              <div 
                className="flex items-center space-x-1 sm:space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleNavigation('/')}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">f</span>
                </div>
                <span className="hidden sm:block text-lg sm:text-xl font-bold text-blue-600">facebook</span>
              </div>
            </div>

            {/* Center section - Search and Navigation */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 max-w-lg mx-2 sm:mx-4">
              <form onSubmit={handleSearch} className="hidden md:flex flex-1">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search Facebook"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-100 border-none rounded-full"
                  />
                </div>
              </form>
              
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button 
                      key={item.id}
                      variant="ghost" 
                      size="lg" 
                      className={`relative px-4 sm:px-6 py-2 sm:py-3 hover:bg-gray-100 rounded-xl transition-colors ${
                        isActive ? 'text-blue-600' : 'text-gray-600'
                      }`}
                      onClick={() => handleNavigation(item.path)}
                      aria-label={item.label}
                    >
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-1 bg-blue-600 rounded-t-full"></div>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Right section - User actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleCreatePost}
                aria-label="Create post"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleNotificationsClick}
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
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
          <div className="md:hidden px-2 pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search Facebook"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-100 border-none rounded-full"
                />
              </div>
            </form>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 py-4">
              <div className="grid grid-cols-2 gap-2 px-2 sm:px-4">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="flex items-center space-x-2 p-3 rounded-lg text-left justify-start"
                    onClick={() => {
                      handleNavigation(item.path);
                      setIsMenuOpen(false);
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
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
