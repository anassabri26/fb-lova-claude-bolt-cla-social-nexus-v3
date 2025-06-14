
import React from 'react';
import { Home, Users, Bookmark, Clock, Flag, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: Home, label: 'Home', active: true, path: '/' },
    { icon: Users, label: 'Friends', path: '/friends' },
    { icon: Users, label: 'Groups', path: '/groups' },
    { icon: Bookmark, label: 'Saved', path: '/saved' },
    { icon: Clock, label: 'Memories', path: '/memories' },
    { icon: Flag, label: 'Pages', path: '/pages' },
    { icon: Star, label: 'Favorites', path: '/favorites' },
  ];

  return (
    <aside className="hidden lg:block w-80 p-4 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      <div className="space-y-2">
        {/* User Profile */}
        <div 
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
          onClick={() => navigate('/profile')}
        >
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="font-medium text-gray-900">Jane Doe</span>
        </div>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
              item.active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
            }`}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="w-6 h-6" />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}

        {/* Shortcuts */}
        <div className="pt-4">
          <h3 className="text-gray-500 font-semibold text-sm mb-2 px-2">Your shortcuts</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">WD</span>
              </div>
              <span className="text-gray-900">Web Development</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">JS</span>
              </div>
              <span className="text-gray-900">JavaScript Tips</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
