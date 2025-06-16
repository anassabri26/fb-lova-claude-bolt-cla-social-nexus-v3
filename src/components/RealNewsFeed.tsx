import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useInfinitePosts } from '@/hooks/usePosts';
import CreatePost from './posts/CreatePost';
import PostCard from './posts/PostCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/lib/constants';
import { useIsMobile, useIsTablet } from '@/hooks/use-device';

const RealNewsFeed = () => {
  const { user } = useAuth();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfinitePosts(APP_CONFIG.POSTS_PER_PAGE);

  // Flatten all pages into a single array of posts
  const allPosts = useMemo(() => {
    return data?.pages.flatMap(page => page.posts) ?? [];
  }, [data]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!APP_CONFIG.FEATURES.INFINITE_SCROLL) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage && !isLoadingMore) {
          setIsLoadingMore(true);
          fetchNextPage().finally(() => {
            setIsLoadingMore(false);
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: `${APP_CONFIG.INFINITE_SCROLL_THRESHOLD}px`
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, isLoadingMore, fetchNextPage]);

  const containerClasses = useMemo(() => {
    let classes = "mx-auto px-4 py-4 space-y-4";
    
    // Adjust max-width based on device
    if (isMobile) {
      classes += " max-w-full";
    } else if (isTablet) {
      classes += " max-w-2xl";
    } else {
      classes += " max-w-xl";
    }
    
    return classes;
  }, [isMobile, isTablet]);

  if (!user) {
    return (
      <div className={containerClasses}>
        <div className="text-center bg-white rounded-lg shadow-sm card-responsive">
          <div className="py-8">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome to Social Media</h2>
            <p className="text-gray-500">Please log in to see posts and connect with others</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <CreatePost />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm card-responsive">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-48 w-full bg-gray-200 rounded animate-pulse mb-4" />
            <div className="flex space-x-4">
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    console.error('Posts loading error:', error);
    return (
      <div className={containerClasses}>
        <CreatePost />
        <div className="bg-white rounded-lg shadow-sm card-responsive text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to load posts</h3>
          <p className="text-gray-600 mb-4">There was an error loading the posts. Please try again.</p>
          <Button 
            onClick={() => refetch()} 
            variant="outline"
            className="inline-flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <CreatePost />
      
      {allPosts.length > 0 ? (
        <div className="space-y-4">
          {/* Posts List */}
          <div className="space-y-4">
            {allPosts.map((post, index) => (
              <div key={`${post.id}-${index}`} className="w-full">
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {/* Loading Trigger */}
          <div ref={loadingRef} className="w-full">
            {(isFetchingNextPage || isLoadingMore) && (
              <div className="bg-white rounded-lg shadow-sm card-responsive text-center p-4">
                <div className="flex items-center justify-center space-x-3">
                  <LoadingSpinner size="sm" />
                  <span className="text-gray-600 text-responsive-sm">Loading more posts...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* End of feed indicator */}
          {!hasNextPage && allPosts.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm card-responsive text-center border-gray-100 bg-gray-50 p-4">
              <div className="text-gray-500">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-responsive-sm font-medium">You're all caught up!</p>
                <p className="text-xs mt-1">Check back later for new posts from your friends.</p>
                <div className="mt-3 flex items-center justify-center space-x-4 text-xs">
                  <span>Total posts loaded: {allPosts.length}</span>
                  <span>•</span>
                  <span>Infinite scroll active</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm card-responsive text-center p-6">
          <div className="py-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-4">Be the first to share something with your community!</p>
            <p className="text-sm text-gray-500">Share your thoughts, photos, or experiences to get the conversation started.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealNewsFeed;