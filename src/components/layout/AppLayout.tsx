import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import MobileNavigation from '@/components/MobileNavigation';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

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
          {showSidebars && <Sidebar />}
          
          {/* Main Content */}
          <main className={showSidebars ? "main-content" : "w-full"}>
            {children}
          </main>
          
          {/* Right Sidebar */}
          {showSidebars && <RightSidebar />}
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && <MobileNavigation />}
      </div>
    </ErrorBoundary>
  );
};

export default AppLayout;