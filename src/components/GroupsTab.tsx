import React, { useState } from 'react';
import { Users, Plus, Search, Globe, Lock, Eye, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateGroup from './CreateGroup';
import { MOCK_IMAGES } from '@/lib/constants';

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

const GroupsTab = () => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'React Developers Community',
      description: 'A community for React developers to share knowledge and help each other.',
      image: MOCK_IMAGES.POSTS[0],
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
      image: MOCK_IMAGES.POSTS[2],
      members: 890,
      privacy: 'public',
      isJoined: false,
      category: 'Photography',
      lastActivity: '5 hours ago'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const categories = ['All', 'Technology', 'Photography', 'Business', 'Design', 'Sports', 'Food', 'Travel'];

  const handleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: !group.isJoined }
        : group
    ));
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
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
            <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center space-x-2">
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
              className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All Groups</TabsTrigger>
              <TabsTrigger value="joined">Your Groups ({joinedGroups.length})</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {filteredGroups.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                      <div className="relative h-32 sm:h-36">
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
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{group.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{group.members.toLocaleString()} members</span>
                            </div>
                            <span>{group.lastActivity}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleJoinGroup(group.id)}
                          variant={group.isJoined ? "outline" : "default"}
                          className="w-full mt-auto"
                        >
                          {group.isJoined ? 'Leave Group' : 'Join Group'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No groups found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm 
                      ? `No results for "${searchTerm}"`
                      : "Try selecting a different category or create your own group."}
                  </p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Group
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="joined" className="space-y-6">
              {joinedGroups.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {joinedGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={group.image}
                            alt={group.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{group.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{group.members.toLocaleString()} members</p>
                          </div>
                          <Button variant="ghost" size="sm" className="touch-target">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 h-9">View Group</Button>
                          <Button size="sm" variant="outline" className="flex-1 h-9">Post</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">You haven't joined any groups yet</h3>
                  <p className="text-gray-500 mb-6">Join groups to connect with people who share your interests.</p>
                  <Button onClick={() => setActiveTab('discover')}>
                    Discover Groups
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="discover" className="space-y-6">
              {suggestedGroups.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-24">
                        <img
                          src={group.image}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2 line-clamp-1">{group.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                            <span>{group.members.toLocaleString()} members</span>
                            <Badge variant="outline">{group.category}</Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleJoinGroup(group.id)}
                          size="sm"
                          className="w-full mt-auto"
                        >
                          Join Group
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No suggested groups</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm 
                      ? `No results for "${searchTerm}"`
                      : "We'll show you group suggestions based on your interests."}
                  </p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Group
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <CreateGroup 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default GroupsTab;