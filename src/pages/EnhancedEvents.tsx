
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import EventsGrid from '../components/EventsGrid';

const EnhancedEvents = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <EventsGrid />
        </main>
        <RightSidebar />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default EnhancedEvents;
