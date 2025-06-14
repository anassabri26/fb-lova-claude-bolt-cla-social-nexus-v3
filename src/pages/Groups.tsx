
import React, { useState } from 'react';
import { Search, Users, Globe, Lock, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';

interface Group {
  id: number;
  name: string;
  description: string;
  members: number;
  image: string;
  privacy: 'public' | 'private';
  joined: boolean;
  activity: string;
}

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const myGroups: Group[] = [
    {
      id: 1,
      name: 'React Developers',
      description: 'A community for React developers to share knowledge and help each other',
      members: 12500,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      privacy: 'public',
      joined: true,
      activity: '5 new posts today'
    },
    {
      id: 2,
      name: 'San Francisco Hikers',
      description: 'Join us for weekend hiking adventures around the Bay Area',
      members: 3200,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      privacy: 'public',
      joined: true,
      activity: 'Next hike: Saturday 9 AM'
    }
  ];

  const suggestedGroups: Group[] = [
    {
      id: 3,
      name: 'JavaScript Enthusiasts',
      description: 'Everything JavaScript - from beginner tips to advanced techniques',
      members: 8900,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
      privacy: 'public',
      joined: false,
      activity: '25 posts this week'
    },
    {
      id: 4,
      name: 'Photography Club',
      description: 'Share your best shots and learn from fellow photographers',
      members: 5600,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
      privacy: 'private',
      joined: false,
      activity: 'Very active'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="lg:w-80 space-y-4">
            <Card className="bg-white shadow-sm border-0 shadow-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search groups"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-100 border-none rounded-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start p-3 rounded-lg hover:bg-gray-100">
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">Your groups</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-3 rounded-lg hover:bg-gray-100">
                    <Plus className="w-5 h-5 mr-3 text-green-600" />
                    <span className="font-medium">Create group</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-3 rounded-lg hover:bg-gray-100">
                    <Settings className="w-5 h-5 mr-3 text-gray-600" />
                    <span className="font-medium">Manage groups</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* My Groups */}
            <Card className="bg-white shadow-sm border-0 shadow-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Your Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {myGroups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{group.name}</p>
                      <p className="text-sm text-gray-500 truncate">{group.activity}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Discover Groups</h1>
                <p className="text-gray-600 mt-1">Connect with people who share your interests</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>

            {/* Suggested Groups */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggested for you</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedGroups.map((group) => (
                  <Card key={group.id} className="bg-white shadow-sm border-0 shadow-gray-100 hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={group.image}
                        alt={group.name}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant={group.privacy === 'public' ? 'default' : 'secondary'} className="text-xs">
                          {group.privacy === 'public' ? (
                            <>
                              <Globe className="w-3 h-3 mr-1" />
                              Public
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 mr-1" />
                              Private
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{group.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{group.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <Users className="w-4 h-4" />
                          <span>{group.members.toLocaleString()} members</span>
                        </div>
                        <span className="text-sm text-gray-500">{group.activity}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <Avatar key={i} className="w-6 h-6 border-2 border-white">
                              <AvatarImage src={`https://images.unsplash.com/photo-${1580000000000 + i}?w=100&h=100&fit=crop&crop=face`} />
                              <AvatarFallback>F</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">+3 friends are members</span>
                      </div>

                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                        Join Group
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Technology', icon: '💻', count: 1234 },
                  { name: 'Photography', icon: '📸', count: 856 },
                  { name: 'Travel', icon: '✈️', count: 692 },
                  { name: 'Food & Cooking', icon: '🍳', count: 543 },
                  { name: 'Sports & Fitness', icon: '⚽', count: 789 },
                  { name: 'Music', icon: '🎵', count: 456 },
                  { name: 'Art & Design', icon: '🎨', count: 321 },
                  { name: 'Books', icon: '📚', count: 234 }
                ].map((category) => (
                  <Card key={category.name} className="bg-white shadow-sm border-0 shadow-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{category.count} groups</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
