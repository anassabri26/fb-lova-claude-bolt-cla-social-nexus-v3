import React, { memo, useEffect } from 'react';
import { Post } from '@/hooks/usePosts';
import RealPost from './RealPost';

interface VirtualizedPostProps {
  index: number;
  style: React.CSSProperties;
  data: {
    posts: Post[];
    hasNextPage: boolean;
    fetchNextPage: () => Promise<any>;
    isFetchingNextPage: boolean;
  };
}

const VirtualizedPost = memo(({ index, style, data }: VirtualizedPostProps) => {
  const { posts, hasNextPage, fetchNextPage, isFetchingNextPage } = data;
  const post = posts[index];

  // Trigger loading more posts when approaching the end
  useEffect(() => {
    if (
      index >= posts.length - 5 && // Load when 5 posts from the end
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage().catch(console.error);
    }
  }, [index, posts.length, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (!post) {
    // Loading skeleton for posts that haven't loaded yet
    return (
      <div style={style} className="px-4 py-2">
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="h-20 w-full bg-gray-200 rounded"></div>
          <div className="flex space-x-4">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={style} className="px-4 py-2">
      <RealPost post={post} />
    </div>
  );
});

VirtualizedPost.displayName = 'VirtualizedPost';

export default VirtualizedPost;