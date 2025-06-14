
import React, { useState } from 'react';
import { Users, Plus, Search, Globe, Lock, Eye, MoreHorizontal } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

interface Group {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  privacy: 'public' | 'private';
  isJoined: boolean;
  category: string;
  lastActivity: string;
}

const EnhancedGroups = () => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'React Developers Community',
      description: 'A community for React developers to share knowledge and help each other.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      members: 15420,
      privacy: 'public',
      isJoined: true,
      category: 'Technology',
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Local Photography Club',
      description: 'Share your best shots and learn from fellow photographers in our area.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      members: 890,
      privacy: 'public',
      isJoined: false,
      category: 'Photography',
      lastActivity: '5 hours ago'
    },
    {
      id: '3',
      name: 'Startup Founders Network',
      description: 'Private group for startup founders to discuss business strategies.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop',
      members: 542,
      privacy: 'private',
      isJoined: true,
      category: 'Business',
      lastActivity: '1 day ago'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Photography', 'Business', 'Sports', 'Food', 'Travel'];

  const handleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: !group.isJoined }
        : group
    ));
    const group = groups.find(g => g.id === groupId);
    toast.success(group?.isJoined ? 'Left group' : 'Joined group!');
  };

  const handleCreateGroup = () => {
    toast.info('Group creation feature coming soon!');
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const joinedGroups = groups.filter(group => group.isJoined);
  const suggestedGroups = groups.filter(group => !group.isJoined);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
              <Button onClick={handleCreateGroup} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Group</span>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Groups</TabsTrigger>
                <TabsTrigger value="joined">Your Groups ({joinedGroups.length})</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-32">
                        <img
                          src={group.image}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          {group.privacy === 'private' ? (
                            <Badge variant="secondary" className="bg-black/70 text-white">
                              <Lock className="w-3 h-3 mr-1" />
                              Private
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-black/70 text-white">
                              <Globe className="w-3 h-3 mr-1" />
                              Public
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{group.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{group.members.toLocaleString()} members</span>
                          </div>
                          <span>{group.lastActivity}</span>
                        </div>
                        <Button
                          onClick={() => handleJoinGroup(group.id)}
                          variant={group.isJoined ? "outline" : "default"}
                          className="w-full"
                        >
                          {group.isJoined ? 'Leave Group' : 'Join Group'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="joined" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {joinedGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={group.image}
                            alt={group.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{group.name}</h3>
                            <p className="text-sm text-gray-500">{group.members.toLocaleString()} members</p>
                          </div>
                          <AccessibleButton variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </AccessibleButton>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">View Group</Button>
                          <Button size="sm" variant="outline" className="flex-1">Post</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="discover" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden">
                      <div className="h-24">
                        <img
                          src={group.image}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{group.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>{group.members.toLocaleString()} members</span>
                          <Badge variant="outline">{group.category}</Badge>
                        </div>
                        <Button
                          onClick={() => handleJoinGroup(group.id)}
                          size="sm"
                          className="w-full"
                        >
                          Join Group
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
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

export default EnhancedGroups;
