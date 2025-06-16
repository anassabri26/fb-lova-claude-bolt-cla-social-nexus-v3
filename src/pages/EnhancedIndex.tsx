import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NewsFeed from '@/components/posts/NewsFeed';
import { usePerformance } from '@/hooks/usePerformance';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const EnhancedIndex = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { trackInteraction } = usePerformance('EnhancedIndex');

  useEffect(() => {
    const endInteraction = trackInteraction('page-load');
    
    if (!loading && !user) {
      navigate('/auth');
    }
    
    return endInteraction;
  }, [user, loading, navigate, trackInteraction]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 text-responsive-base">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <NewsFeed />;
};

export default EnhancedIndex;