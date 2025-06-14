
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import MarketplaceGrid from '../components/MarketplaceGrid';
import CreateMarketplaceItem from '../components/CreateMarketplaceItem';
import { Plus } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';

const Marketplace = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Marketplace</h1>
              <p className="text-gray-600">Buy and sell items in your community</p>
            </div>
            <AccessibleButton 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Sell Something
            </AccessibleButton>
          </div>
          
          <MarketplaceGrid />
        </main>
      </div>
      <MobileNavigation />
      
      <CreateMarketplaceItem 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Marketplace;
