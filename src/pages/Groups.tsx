
import React, { useState } from 'react';
import { Users, Plus, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import CreateGroup from '../components/CreateGroup';
import AccessibleButton from '../components/AccessibleButton';

interface Group {
  id: string;
  name: string;
  members: number;
  image: string;
  description: string;
  isJoined: boolean;
}

const Groups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'React Developers',
      members: 15420,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      description: 'A community for React developers to share knowledge and help each other',
      isJoined: true
    },
    {
      id: '2',
      name: 'Web Design Community',
      members: 8750,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
      description: 'Share your designs, get feedback, and learn from other designers',
      isJoined: false
    },
    {
      id: '3',
      name: 'Photography Enthusiasts',
      members: 12340,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      description: 'Capture and share amazing moments with fellow photographers',
      isJoined: true
    }
  ]);

  const toggleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: !group.isJoined, members: group.isJoined ? group.members - 1 : group.members + 1 }
        : group
    ));
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showCreateGroup) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
        <Header />
        <div className="flex max-w-7xl mx-auto">
          <Sidebar />
          <main className="flex-1 px-4 py-6">
            <div className="mb-4">
              <AccessibleButton
                variant="ghost"
                onClick={() => setShowCreateGroup(false)}
                className="text-blue-600"
              >
                ← Back to Groups
              </AccessibleButton>
            </div>
            <CreateGroup />
          </main>
          <RightSidebar />
        </div>
        <MobileNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
              </div>
              <Button 
                onClick={() => setShowCreateGroup(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={group.image} />
                          <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{group.name}</h3>
                          <p className="text-sm text-gray-600">{group.members.toLocaleString()} members</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-4">{group.description}</p>
                      
                      <AccessibleButton
                        onClick={() => toggleJoinGroup(group.id)}
                        className={`w-full ${
                          group.isJoined 
                            ? 'bg-gray-600 hover:bg-gray-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {group.isJoined ? 'Leave Group' : 'Join Group'}
                      </AccessibleButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <RightSidebar />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Groups;
