import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile, useIsTablet } from '@/hooks/use-device';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import MobileNavigation from '@/components/MobileNavigation';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { ROUTES } from '@/lib/constants';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebars?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showSidebars = true 
}) => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const location = useLocation();
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  
  // Determine if we should show the right sidebar based on the current route
  useEffect(() => {
    // Only show right sidebar on home route
    setShowRightSidebar(location.pathname === ROUTES.HOME);
  }, [location.pathname]);

  if (!user) {
    return (
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        
        <div className="main-layout flex-grow">
          {/* Left Sidebar - Hidden on mobile */}
          {showSidebars && !isMobile && (
            <aside className="sidebar-responsive">
              <Sidebar />
            </aside>
          )}
          
          {/* Main Content */}
          <main className={`main-content ${!isMobile ? 'pt-4 pb-8' : 'pt-2 pb-20'}`}>
            {children}
          </main>
          
          {/* Right Sidebar - Only shown on home page and not on mobile/tablet */}
          {showSidebars && !isMobile && !isTablet && showRightSidebar && (
            <aside className="right-sidebar-responsive">
              <RightSidebar />
            </aside>
          )}
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && <MobileNavigation />}
      </div>
    </ErrorBoundary>
  );
};

export default AppLayout;