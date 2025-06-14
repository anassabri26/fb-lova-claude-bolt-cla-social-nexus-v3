
import React, { useState } from 'react';
import { Users, Plus, Search, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import CreateGroup from '../components/CreateGroup';
import AccessibleButton from '../components/AccessibleButton';

interface Group {
  id: number;
  name: string;
  image: string;
  members: number;
  category: string;
  privacy: 'public' | 'private' | 'hidden';
  isJoined: boolean;
  lastActivity: string;
}

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('your-groups');

  const yourGroups: Group[] = [
    {
      id: 1,
      name: 'React Developers',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      members: 15234,
      category: 'Technology',
      privacy: 'public',
      isJoined: true,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Web Design Community',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
      members: 8765,
      category: 'Business',
      privacy: 'public',
      isJoined: true,
      lastActivity: '1 day ago'
    }
  ];

  const suggestedGroups: Group[] = [
    {
      id: 3,
      name: 'JavaScript Masters',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
      members: 23456,
      category: 'Technology',
      privacy: 'public',
      isJoined: false,
      lastActivity: '3 hours ago'
    },
    {
      id: 4,
      name: 'Startup Founders',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop',
      members: 12890,
      category: 'Business',
      privacy: 'private',
      isJoined: false,
      lastActivity: '5 hours ago'
    }
  ];

  const currentGroups = activeTab === 'your-groups' ? yourGroups : suggestedGroups;
  
  const filteredGroups = currentGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinGroup = (groupId: number) => {
    console.log('Joining group:', groupId);
    // Handle join group logic
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Groups</span>
                  <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                    <DialogTrigger asChild>
                      <AccessibleButton size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create
                      </AccessibleButton>
                    </DialogTrigger>
                    <DialogContent>
                      <CreateGroup onClose={() => setShowCreateDialog(false)} />
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <AccessibleButton
                    variant={activeTab === 'your-groups' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('your-groups')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Your Groups
                  </AccessibleButton>
                  <AccessibleButton
                    variant={activeTab === 'discover' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('discover')}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Discover
                  </AccessibleButton>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search groups"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>{group.members.toLocaleString()} members</p>
                        <p>Category: {group.category}</p>
                        <p>Last activity: {group.lastActivity}</p>
                        <div className="flex items-center space-x-1">
                          <span className={`w-2 h-2 rounded-full ${
                            group.privacy === 'public' ? 'bg-green-500' : 
                            group.privacy === 'private' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span className="capitalize">{group.privacy}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        {group.isJoined ? (
                          <AccessibleButton
                            variant="outline"
                            className="w-full"
                            onClick={() => console.log('View group:', group.id)}
                          >
                            View Group
                          </AccessibleButton>
                        ) : (
                          <AccessibleButton
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleJoinGroup(group.id)}
                          >
                            Join Group
                          </AccessibleButton>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No groups found</h3>
                <p className="text-gray-500">Try adjusting your search or create a new group</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Groups;
