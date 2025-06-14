
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import EnhancedMessagesList from '../components/EnhancedMessagesList';

const EnhancedMessages = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1">
          <div className="h-[calc(100vh-64px)]">
            <EnhancedMessagesList />
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default EnhancedMessages;
