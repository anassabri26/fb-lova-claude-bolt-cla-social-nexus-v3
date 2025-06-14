
import React, { useState } from 'react';
import { Users, Plus, Search, Settings, Globe, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Group {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
  privacy: 'public' | 'private';
  isJoined: boolean;
  recentActivity: string;
}

const GroupsGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'React Developers Community',
      description: 'A place for React developers to share knowledge and help each other',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      memberCount: 15420,
      privacy: 'public',
      isJoined: true,
      recentActivity: '23 new posts today'
    },
    {
      id: '2',
      name: 'Web Design Inspiration',
      description: 'Beautiful web designs and UI/UX inspiration',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop',
      memberCount: 8920,
      privacy: 'public',
      isJoined: false,
      recentActivity: '15 new posts today'
    },
    {
      id: '3',
      name: 'Local Photography Club',
      description: 'Share your photography and get feedback from fellow photographers',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
      memberCount: 342,
      privacy: 'private',
      isJoined: true,
      recentActivity: '5 new posts today'
    }
  ]);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinGroup = (groupId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: !group.isJoined, memberCount: group.isJoined ? group.memberCount - 1 : group.memberCount + 1 }
        : group
    ));
    const group = groups.find(g => g.id === groupId);
    if (group) {
      toast.success(group.isJoined ? `Left ${group.name}` : `Joined ${group.name}!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Groups</h2>
          <p className="text-gray-600">Connect with communities that interest you</p>
        </div>
        <AccessibleButton className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </AccessibleButton>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search groups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  {group.privacy === 'private' ? (
                    <Lock className="w-5 h-5 text-white bg-black bg-opacity-50 rounded-full p-1" />
                  ) : (
                    <Globe className="w-5 h-5 text-white bg-black bg-opacity-50 rounded-full p-1" />
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{group.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{group.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{group.memberCount.toLocaleString()} members</span>
                  </div>
                  <span className="text-xs text-gray-500">{group.recentActivity}</span>
                </div>
                
                <div className="flex space-x-2">
                  <AccessibleButton
                    onClick={() => handleJoinGroup(group.id)}
                    className={`flex-1 ${
                      group.isJoined 
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {group.isJoined ? 'Joined' : 'Join Group'}
                  </AccessibleButton>
                  <AccessibleButton variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </AccessibleButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupsGrid;
