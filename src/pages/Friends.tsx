
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import FriendRequests from '../components/FriendRequests';
import FriendsList from '../components/FriendsList';
import { Users, UserPlus } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';

const Friends = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'all'>('requests');

  const tabs = [
    { id: 'requests', label: 'Friend Requests', icon: UserPlus },
    { id: 'all', label: 'All Friends', icon: Users },
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
                  onClick={() => setActiveTab(tab.id as 'requests' | 'all')}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </AccessibleButton>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'requests' && <FriendRequests />}
            {activeTab === 'all' && <FriendsList />}
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Friends;
