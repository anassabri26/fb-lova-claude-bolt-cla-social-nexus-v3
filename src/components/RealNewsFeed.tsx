
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/hooks/usePosts';
import CreatePost from './CreatePost';
import RealPost from './RealPost';
import { Skeleton } from '@/components/ui/skeleton';

const RealNewsFeed = () => {
  const { user } = useAuth();
  const { data: posts, isLoading, error } = usePosts();

  console.log('RealNewsFeed - User:', user);
  console.log('RealNewsFeed - Posts:', posts);
  console.log('RealNewsFeed - Loading:', isLoading);
  console.log('RealNewsFeed - Error:', error);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-500">Please log in to see posts</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <CreatePost />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    console.error('Posts loading error:', error);
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <CreatePost />
        <div className="p-6 text-center">
          <p className="text-red-500 mb-4">Error loading posts. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost />
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <RealPost key={post.id} post={post} />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No posts yet. Be the first to share something!</p>
        </div>
      )}
    </div>
  );
};

export default RealNewsFeed;
