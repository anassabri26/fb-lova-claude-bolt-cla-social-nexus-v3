import React, { useMemo, useCallback, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { useAuth } from '@/contexts/AuthContext';
import { useInfinitePosts } from '@/hooks/usePosts';
import CreatePost from './CreatePost';
import VirtualizedPost from './VirtualizedPost';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, RefreshCw, MessageCircle, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RealNewsFeed = () => {
  const { user } = useAuth();
  const [listHeight, setListHeight] = useState(600);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfinitePosts(20);

  const allPosts = useMemo(() => {
    return data?.pages.flatMap(page => page.posts) ?? [];
  }, [data]);

  const itemCount = hasNextPage ? allPosts.length + 1 : allPosts.length;

  const isItemLoaded = useCallback((index: number) => {
    return !!allPosts[index];
  }, [allPosts]);

  const loadMoreItems = useCallback(async (startIndex: number, stopIndex: number) => {
    if (!isFetchingNextPage && hasNextPage) {
      try {
        console.log(`Loading items ${startIndex} to ${stopIndex}`);
        await fetchNextPage();
      } catch (error) {
        console.error('Error loading more posts:', error);
      }
    }
    return Promise.resolve();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  React.useEffect(() => {
    const updateHeight = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 64;
      const createPostHeight = 140;
      const padding = 120;
      const calculatedHeight = viewportHeight - headerHeight - createPostHeight - padding;
      setListHeight(Math.max(500, Math.min(800, calculatedHeight)));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center bg-white rounded-lg shadow-sm">
        <div className="py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome to Social Media</h2>
          <p className="text-gray-500">Please log in to see posts and connect with others</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <CreatePost />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4 space-y-4">
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
      <div className="max-w-2xl mx-auto space-y-6">
        <CreatePost />
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
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
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost />
      
      {allPosts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold text-gray-900">Your Feed</h2>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  {allPosts.length} posts
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {hasNextPage && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {isFetchingNextPage ? (
                      <>
                        <div className="w-3 h-3 border border-green-600 border-t-transparent rounded-full animate-spin mr-1"></div>
                        Loading...
                      </>
                    ) : (
                      'Scroll for more'
                    )}
                  </Badge>
                )}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div style={{ height: listHeight }} className="relative bg-gray-50">
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
              threshold={3}
              minimumBatchSize={10}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  ref={ref}
                  height={listHeight}
                  itemCount={itemCount}
                  itemSize={500}
                  onItemsRendered={onItemsRendered}
                  itemData={{
                    posts: allPosts,
                    hasNextPage: hasNextPage ?? false,
                    isFetchingNextPage
                  }}
                  overscanCount={2}
                  className="virtual-news-feed-list"
                  style={{ 
                    overflowX: 'hidden',
                    backgroundColor: 'rgb(249 250 251)',
                  }}
                >
                  {VirtualizedPost}
                </List>
              )}
            </InfiniteLoader>
          </div>
          
          {!hasNextPage && allPosts.length > 0 && (
            <div className="p-6 text-center border-t border-gray-100 bg-gray-50">
              <div className="text-gray-500">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">You're all caught up!</p>
                <p className="text-xs mt-1">Check back later for new posts from your friends.</p>
                <div className="mt-3 flex items-center justify-center space-x-4 text-xs">
                  <span>Total posts loaded: {allPosts.length}</span>
                  <span>•</span>
                  <span>Virtual scrolling active</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
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