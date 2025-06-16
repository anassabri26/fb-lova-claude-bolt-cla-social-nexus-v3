import React, { memo } from 'react';
import { Post } from '@/hooks/usePosts';
import RealPost from './RealPost';

interface VirtualizedPostProps {
  index: number;
  style: React.CSSProperties;
  data: {
    posts: Post[];
    hasNextPage: boolean;
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
  };
}

const VirtualizedPost = memo(({ index, style, data }: VirtualizedPostProps) => {
  const { posts, hasNextPage, fetchNextPage, isFetchingNextPage } = data;
  const post = posts[index];

  // Trigger loading more posts when approaching the end
  React.useEffect(() => {
    if (
      index >= posts.length - 5 && // Load when 5 posts from the end
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [index, posts.length, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (!post) {
    return (
      <div style={style} className="flex items-center justify-center p-4">
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-64"></div>
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