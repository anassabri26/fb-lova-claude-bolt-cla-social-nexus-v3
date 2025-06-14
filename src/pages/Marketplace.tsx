
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import MarketplaceGrid from '../components/MarketplaceGrid';
import CreateMarketplaceItem from '../components/CreateMarketplaceItem';

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
              <CreateMarketplaceItem />
            </div>
            <MarketplaceGrid />
          </div>
        </main>
        <RightSidebar />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Marketplace;
