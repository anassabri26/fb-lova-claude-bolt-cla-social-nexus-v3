
import React, { useState } from 'react';
import { Tv, TrendingUp, Users, Clock } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import VideoFeed from '../components/VideoFeed';
import LiveStreamCard from '../components/LiveStreamCard';
import AccessibleButton from '../components/AccessibleButton';

const Watch = () => {
  const [activeTab, setActiveTab] = useState('for-you');

  const tabs = [
    { id: 'for-you', label: 'For You', icon: Tv },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'live', label: 'Live', icon: Clock },
  ];

  const liveStreams = [
    {
      id: '1',
      title: 'Live Coding Session - Building a React App',
      streamer: {
        name: 'Code Master',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face'
      },
      viewers: 1247,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Gaming Stream - Latest RPG Adventure',
      streamer: {
        name: 'GamePlayer Pro',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      viewers: 3421,
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Watch Header */}
            <div className="flex items-center space-x-3 mb-6">
              <Tv className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Watch</h1>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <AccessibleButton
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      activeTab === tab.id ? 'bg-white shadow-sm' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </AccessibleButton>
                );
              })}
            </div>

            {/* Content */}
            <div className="space-y-6">
              {activeTab === 'live' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Live Now</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {liveStreams.map(stream => (
                      <LiveStreamCard key={stream.id} stream={stream} />
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {activeTab === 'for-you' && 'Recommended for You'}
                  {activeTab === 'trending' && 'Trending Videos'}
                  {activeTab === 'following' && 'From People You Follow'}
                  {activeTab === 'live' && 'Recent Videos'}
                </h2>
                <VideoFeed />
              </div>
            </div>
          </div>
        </main>
        <RightSidebar />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Watch;
