import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Home, Users, MessageCircle, Video, Store, Calendar, Bell, Settings } from 'lucide-react';
import RealNewsFeed from './RealNewsFeed';
import FriendsTab from './FriendsTab';
import MessagesTab from './MessagesTab';
import WatchTab from './WatchTab';
import MarketplaceTab from './MarketplaceTab';
import EventsTab from './EventsTab';
import NotificationsTab from './NotificationsTab';
import SettingsTab from './SettingsTab';
import { useIsMobile } from '@/hooks/use-device';

interface NavigationTabsProps {
  onTabChange?: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('home');
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  // Initialize with 'home' tab on first render
  useEffect(() => {
    if (onTabChange) {
      onTabChange('home');
    }
  }, [onTabChange]);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 bg-white border-b border-gray-200 rounded-none h-14 sticky top-0 z-10 overflow-x-auto scrollbar-thin">
        <TabsTrigger value="home" className="flex items-center space-x-2 min-w-[80px]">
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline">Home</span>
        </TabsTrigger>
        <TabsTrigger value="friends" className="flex items-center space-x-2 min-w-[80px]">
          <Users className="w-5 h-5" />
          <span className="hidden sm:inline">Friends</span>
        </TabsTrigger>
        <TabsTrigger value="messages" className="flex items-center space-x-2 min-w-[80px]">
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Messages</span>
        </TabsTrigger>
        <TabsTrigger value="watch" className="flex items-center space-x-2 min-w-[80px]">
          <Video className="w-5 h-5" />
          <span className="hidden sm:inline">Watch</span>
        </TabsTrigger>
        <TabsTrigger value="marketplace" className="flex items-center space-x-2 min-w-[80px]">
          <Store className="w-5 h-5" />
          <span className="hidden sm:inline">Store</span>
        </TabsTrigger>
        <TabsTrigger value="events" className="flex items-center space-x-2 min-w-[80px]">
          <Calendar className="w-5 h-5" />
          <span className="hidden sm:inline">Events</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center space-x-2 min-w-[80px]">
          <Bell className="w-5 h-5" />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center space-x-2 min-w-[80px]">
          <Settings className="w-5 h-5" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="home" className="mt-0 w-full">
        <RealNewsFeed />
      </TabsContent>
      
      <TabsContent value="friends" className="mt-0 w-full">
        <FriendsTab />
      </TabsContent>
      
      <TabsContent value="messages" className="mt-0 w-full">
        <MessagesTab />
      </TabsContent>
      
      <TabsContent value="watch" className="mt-0 w-full">
        <WatchTab />
      </TabsContent>
      
      <TabsContent value="marketplace" className="mt-0 w-full">
        <MarketplaceTab />
      </TabsContent>
      
      <TabsContent value="events" className="mt-0 w-full">
        <EventsTab />
      </TabsContent>
      
      <TabsContent value="notifications" className="mt-0 w-full">
        <NotificationsTab />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-0 w-full">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default NavigationTabs;