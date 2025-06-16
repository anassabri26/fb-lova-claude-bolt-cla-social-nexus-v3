import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useInfinitePosts } from '@/hooks/usePosts';
import CreatePost from './CreatePost';
import RealPost from './RealPost';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RealNewsFeed = () => {
  const { user } = useAuth();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfinitePosts(10);

  // Flatten all pages into a single array of posts
  const allPosts = useMemo(() => {
    return data?.pages.flatMap(page => page.posts) ?? [];
  }, [data]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
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
        rootMargin: '100px'
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

  if (!user) {
    return (
      <div className="news-feed-container">
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
      <div className="news-feed-container space-y-4">
        <CreatePost />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm card-responsive space-y-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex space-x-4">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    console.error('Posts loading error:', error);
    return (
      <div className="news-feed-container space-y-4">
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
    <div className="news-feed-container space-y-4">
      <CreatePost />
      
      {allPosts.length > 0 ? (
        <div className="space-y-4">
          {/* Posts List */}
          <div className="space-y-4">
            {allPosts.map((post, index) => (
              <div key={`${post.id}-${index}`} className="w-full">
                <RealPost post={post} />
              </div>
            ))}
          </div>

          {/* Loading Trigger */}
          <div ref={loadingRef} className="w-full">
            {(isFetchingNextPage || isLoadingMore) && (
              <div className="bg-white rounded-lg shadow-sm card-responsive text-center">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600 text-responsive-sm">Loading more posts...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* End of feed indicator */}
          {!hasNextPage && allPosts.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm card-responsive text-center border-gray-100 bg-gray-50">
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
        <div className="bg-white rounded-lg shadow-sm card-responsive text-center">
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