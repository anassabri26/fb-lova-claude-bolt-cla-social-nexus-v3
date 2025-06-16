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
        
        <div className="main-layout">
          {/* Left Sidebar */}
          {showSidebars && !isMobile && <Sidebar />}
          
          {/* Main Content */}
          <main className={`${showSidebars && !isMobile ? "main-content" : "w-full"}`}>
            {children}
          </main>
          
          {/* Right Sidebar - Only shown on home page */}
          {showSidebars && !isMobile && showRightSidebar && <RightSidebar />}
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && <MobileNavigation />}
      </div>
    </ErrorBoundary>
  );
};

export default AppLayout;