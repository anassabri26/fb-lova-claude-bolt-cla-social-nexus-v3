
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import VideoFeed from '../components/VideoFeed';

const Watch = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <VideoFeed />
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Watch;
