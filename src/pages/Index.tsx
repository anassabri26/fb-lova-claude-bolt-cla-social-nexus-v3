
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VirtualizedNewsFeed from '../components/VirtualizedNewsFeed';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import ErrorBoundary from '../components/ErrorBoundary';
import PerformanceMetrics from '../components/PerformanceMetrics';
import usePerformanceMonitoring from '../hooks/usePerformanceMonitoring';

const Index = () => {
  const { trackRenderStart, trackRenderEnd } = usePerformanceMonitoring('Index');

  React.useEffect(() => {
    trackRenderStart();
    trackRenderEnd();
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
        <Header />
        <div className="flex max-w-7xl mx-auto">
          <Sidebar />
          <main className="flex-1 px-2 sm:px-4 py-6" role="main" aria-label="Main content">
            <ErrorBoundary fallback={
              <div className="text-center py-8">
                <p>Unable to load news feed. Please try again.</p>
              </div>
            }>
              <VirtualizedNewsFeed />
            </ErrorBoundary>
          </main>
          <RightSidebar />
        </div>
        <MobileNavigation />
        <PerformanceMetrics />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
