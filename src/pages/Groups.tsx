
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import GroupsGrid from '../components/GroupsGrid';
import { Users, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';

const Groups = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'discover' | 'your-groups'>('your-groups');

  const tabs = [
    { id: 'your-groups', label: 'Your Groups', icon: Users },
    { id: 'discover', label: 'Discover', icon: TrendingUp },
    { id: 'feed', label: 'Feed', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
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
                  onClick={() => setActiveTab(tab.id as 'feed' | 'discover' | 'your-groups')}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </AccessibleButton>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'your-groups' && <GroupsGrid />}
            {activeTab === 'discover' && (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Discover New Groups</h3>
                <p className="text-gray-500">Find groups based on your interests and location</p>
              </div>
            )}
            {activeTab === 'feed' && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Group Feed</h3>
                <p className="text-gray-500">See posts from all your groups in one place</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Groups;
