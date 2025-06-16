import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import RealNewsFeed from '@/components/RealNewsFeed';
import MobileNavigation from '@/components/MobileNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const EnhancedIndex = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-responsive-base">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="flex max-w-full">
        {/* Left Sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-10">
            <Sidebar />
          </div>
        )}
        
        {/* Main Content */}
        <main className={`flex-1 ${!isMobile ? 'ml-80 mr-80' : ''} max-w-full mx-auto container-responsive`}>
          <RealNewsFeed />
        </main>
        
        {/* Right Sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 fixed right-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-10">
            <RightSidebar />
          </div>
        )}
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && <MobileNavigation />}
    </div>
  );
};

export default EnhancedIndex;