
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/hooks/usePosts';
import CreatePost from './CreatePost';
import RealPost from './RealPost';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RealNewsFeed = () => {
  const { user } = useAuth();
  const { data: posts, isLoading, error, refetch } = usePosts();

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
        {Array.from({ length: 3 }).map((_, i) => (
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
      
      {posts && posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <RealPost key={post.id} post={post} />
          ))}
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
