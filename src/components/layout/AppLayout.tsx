import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
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
      <div className="min-h-screen bg-gray-100">
        <Header />
        
        <div className="flex">
          {/* Left Sidebar - Hidden on mobile */}
          {showSidebars && !isMobile && (
            <aside className="sidebar-responsive">
              <Sidebar />
            </aside>
          )}
          
          {/* Main Content */}
          <main className={`flex-1 ${!isMobile ? 'md:ml-[14rem] lg:ml-[16rem] xl:ml-[17rem] 2xl:ml-[18rem]' : ''} ${
            showRightSidebar && !isMobile ? 'md:mr-[14rem] lg:mr-[16rem] xl:mr-[17rem] 2xl:mr-[18rem]' : ''
          } transition-all duration-300`}>
            {children}
          </main>
          
          {/* Right Sidebar - Only shown on home page and not on mobile */}
          {showSidebars && !isMobile && showRightSidebar && (
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