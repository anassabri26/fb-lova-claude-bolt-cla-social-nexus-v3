
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import GroupsGrid from '../components/GroupsGrid';
import { Users, TrendingUp, MessageSquare, Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Groups = () => {
  const [activeTab, setActiveTab] = useState<'your-groups' | 'discover' | 'feed'>('your-groups');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'your-groups', label: 'Your Groups', icon: Users, count: 8 },
    { id: 'discover', label: 'Discover', icon: TrendingUp, count: 0 },
    { id: 'feed', label: 'Feed', icon: MessageSquare, count: 0 },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as 'your-groups' | 'discover' | 'feed');
    toast.success(`Switched to ${tabs.find(t => t.id === tabId)?.label}`);
    console.log(`Groups tab changed to: ${tabId}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching groups: ${searchQuery}`);
      console.log(`Group search: ${searchQuery}`);
    }
  };

  const handleCreateGroup = () => {
    toast.success('Create group modal opened');
    console.log('Create group clicked');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'your-groups':
        return <GroupsGrid />;
      case 'discover':
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <TrendingUp className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Discover New Groups</h3>
              <p className="text-gray-500 mb-4">Find groups based on your interests and location</p>
              <Button onClick={() => toast.info('Loading group suggestions...')}>
                Browse Recommendations
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sample group suggestions */}
              {[
                { name: 'Photography Enthusiasts', members: '15.2k', image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop' },
                { name: 'Local Food Lovers', members: '8.7k', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop' },
                { name: 'Tech Startups', members: '22.1k', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop' },
              ].map((group, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img src={group.image} alt={group.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{group.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">{group.members} members</p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => toast.success(`Joined ${group.name}!`)}
                    >
                      Join Group
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'feed':
        return (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Group Feed</h3>
            <p className="text-gray-500 mb-4">See posts from all your groups in one place</p>
            <Button onClick={() => toast.info('Loading group feed...')}>
              Refresh Feed
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Groups</h1>
                <p className="text-gray-600">Connect with communities that share your interests</p>
              </div>
              <Button onClick={handleCreateGroup} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <form onSubmit={handleSearch} className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search groups..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" variant="outline">
                  Search
                </Button>
              </form>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
              {tabs.map((tab) => (
                <AccessibleButton
                  key={tab.id}
                  variant="ghost"
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.id 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </AccessibleButton>
              ))}
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Groups;
