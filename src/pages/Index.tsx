
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NewsFeed from '../components/NewsFeed';
import RightSidebar from '../components/RightSidebar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <NewsFeed />
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Index;
