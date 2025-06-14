
import React, { useState } from 'react';
import { Home, Users, MessageCircle, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NotificationsDropdown from './NotificationsDropdown';
import SearchDropdown from './SearchDropdown';
import EnhancedSearch from './EnhancedSearch';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left section - Logo and Search */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">f</span>
                </div>
                <span className="hidden sm:block text-xl font-bold text-blue-600">facebook</span>
              </div>
              <div className="hidden md:block relative max-w-xs">
                <EnhancedSearch />
              </div>
            </div>

            {/* Center section - Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="lg" className="relative px-6 py-3 hover:bg-gray-100 rounded-xl">
                <Home className="w-6 h-6 text-blue-600" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full"></div>
              </Button>
              <Button variant="ghost" size="lg" className="px-6 py-3 hover:bg-gray-100 rounded-xl">
                <Users className="w-6 h-6 text-gray-600" />
              </Button>
              <Button variant="ghost" size="lg" className="px-6 py-3 hover:bg-gray-100 rounded-xl">
                <MessageCircle className="w-6 h-6 text-gray-600" />
              </Button>
            </div>

            {/* Right section - User actions */}
            <div className="flex items-center space-x-2 flex-1 justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative p-2 rounded-full hover:bg-gray-100"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden p-2 rounded-full hover:bg-gray-100">
                <Menu className="w-5 h-5 text-gray-600" />
              </Button>
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <EnhancedSearch />
        </div>
      </header>

      {/* Dropdowns */}
      <NotificationsDropdown 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </>
  );
};

export default Header;
