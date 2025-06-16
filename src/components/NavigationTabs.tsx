import React from 'react';
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

const NavigationTabs = () => {
  return (
    <Tabs defaultValue="home" className="w-full">
      <TabsList className="grid w-full grid-cols-8 bg-white border-b border-gray-200 rounded-none h-14">
        <TabsTrigger value="home" className="flex items-center space-x-2">
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline">Home</span>
        </TabsTrigger>
        <TabsTrigger value="friends" className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span className="hidden sm:inline">Friends</span>
        </TabsTrigger>
        <TabsTrigger value="messages" className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Messages</span>
        </TabsTrigger>
        <TabsTrigger value="watch" className="flex items-center space-x-2">
          <Video className="w-5 h-5" />
          <span className="hidden sm:inline">Watch</span>
        </TabsTrigger>
        <TabsTrigger value="marketplace" className="flex items-center space-x-2">
          <Store className="w-5 h-5" />
          <span className="hidden sm:inline">Store</span>
        </TabsTrigger>
        <TabsTrigger value="events" className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span className="hidden sm:inline">Events</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="home" className="mt-0">
        <RealNewsFeed />
      </TabsContent>
      
      <TabsContent value="friends" className="mt-0">
        <FriendsTab />
      </TabsContent>
      
      <TabsContent value="messages" className="mt-0">
        <MessagesTab />
      </TabsContent>
      
      <TabsContent value="watch" className="mt-0">
        <WatchTab />
      </TabsContent>
      
      <TabsContent value="marketplace" className="mt-0">
        <MarketplaceTab />
      </TabsContent>
      
      <TabsContent value="events" className="mt-0">
        <EventsTab />
      </TabsContent>
      
      <TabsContent value="notifications" className="mt-0">
        <NotificationsTab />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-0">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default NavigationTabs;