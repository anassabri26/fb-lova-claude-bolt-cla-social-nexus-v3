
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Users, Plus, Search, Settings, Bell, Globe } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Groups = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');

  const yourGroups = [
    {
      id: 1,
      name: 'React Developers',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      members: '12.5K',
      privacy: 'Public',
      unreadPosts: 5,
      lastActivity: '2h ago'
    },
    {
      id: 2,
      name: 'Web Design Community',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
      members: '8.2K',
      privacy: 'Private',
      unreadPosts: 12,
      lastActivity: '1h ago'
    }
  ];

  const suggestedGroups = [
    {
      id: 3,
      name: 'JavaScript Enthusiasts',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
      members: '25K',
      privacy: 'Public',
      mutualFriends: 8
    },
    {
      id: 4,
      name: 'UI/UX Designers',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop',
      members: '15K',
      privacy: 'Public',
      mutualFriends: 3
    }
  ];

  const handleJoinGroup = (groupName: string) => {
    toast.success(`Joined ${groupName}`);
  };

  const handleCreateGroup = () => {
    toast.info('Group creation feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
              <AccessibleButton
                onClick={handleCreateGroup}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </AccessibleButton>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="your-groups">Your Groups</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
                <TabsTrigger value="manage">Manage</TabsTrigger>
              </TabsList>

              <TabsContent value="your-groups" className="mt-6">
                <div className="space-y-4">
                  {yourGroups.map((group) => (
                    <Card key={group.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={group.image}
                            alt={group.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{group.name}</h3>
                            <p className="text-sm text-gray-600">
                              {group.members} members • {group.privacy}
                            </p>
                            <p className="text-xs text-gray-500">Last activity: {group.lastActivity}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {group.unreadPosts > 0 && (
                              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                {group.unreadPosts} new
                              </span>
                            )}
                            <AccessibleButton variant="ghost" size="sm">
                              <Bell className="w-4 h-4" />
                            </AccessibleButton>
                            <AccessibleButton variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </AccessibleButton>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="discover" className="mt-6">
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search groups..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-32">
                        <img
                          src={group.image}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded flex items-center">
                            <Globe className="w-3 h-3 mr-1" />
                            {group.privacy}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{group.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {group.members} members
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          {group.mutualFriends} friends are members
                        </p>
                        <AccessibleButton
                          onClick={() => handleJoinGroup(group.name)}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Join Group
                        </AccessibleButton>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="manage" className="mt-6">
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Your Groups</h3>
                  <p className="text-gray-600 mb-4">View and manage groups you admin or moderate</p>
                  <AccessibleButton variant="outline">
                    View Admin Tools
                  </AccessibleButton>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Groups;
