
import React from 'react';
import { Search, Plus, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import AccessibleButton from '../components/AccessibleButton';

const Groups = () => {
  const groups = [
    {
      id: 1,
      name: 'React Developers',
      members: '245K',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      posts: '5 new posts today',
    },
    {
      id: 2,
      name: 'Web Design Community',
      members: '89K',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
      posts: '12 new posts today',
    },
    {
      id: 3,
      name: 'JavaScript Enthusiasts',
      members: '156K',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      posts: '8 new posts today',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Groups</h1>
          <div className="flex space-x-3">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search groups"
                className="pl-10 bg-white"
              />
            </div>
            <AccessibleButton className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create
            </AccessibleButton>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative h-40 overflow-hidden rounded-t-lg">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{group.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{group.members} members</p>
                <p className="text-sm text-gray-600 mb-4">{group.posts}</p>
                <div className="flex space-x-2">
                  <AccessibleButton
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Visit
                  </AccessibleButton>
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    className="p-2"
                    aria-label="Group settings"
                  >
                    <Settings className="w-4 h-4" />
                  </AccessibleButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Suggested Groups */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggested for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Group Name {i}</h4>
                      <p className="text-sm text-gray-500">50K members</p>
                    </div>
                    <AccessibleButton
                      variant="outline"
                      size="sm"
                    >
                      Join
                    </AccessibleButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Groups;
