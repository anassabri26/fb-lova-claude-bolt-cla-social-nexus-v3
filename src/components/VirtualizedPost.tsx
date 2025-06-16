import React, { memo } from 'react';
import { ListChildComponentProps } from 'react-window';
import { Post } from '@/hooks/usePosts';
import RealPost from './RealPost';

interface VirtualizedPostData {
  posts: Post[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

interface VirtualizedPostProps extends ListChildComponentProps<VirtualizedPostData> {}

const VirtualizedPost = memo<VirtualizedPostProps>(({ index, style, data }) => {
  const { posts, hasNextPage, isFetchingNextPage } = data;
  const post = posts[index];

  // Show loading skeleton for items that haven't loaded yet
  if (!post) {
    return (
      <div style={style} className="w-full">
        <div className="mx-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
            <div className="h-48 w-full bg-gray-200 rounded"></div>
            <div className="flex space-x-4">
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading indicator for the last item when fetching more
  if (index === posts.length && hasNextPage) {
    return (
      <div style={style} className="w-full">
        <div className="mx-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">
                {isFetchingNextPage ? 'Loading more posts...' : 'Scroll to load more'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={style} className="w-full">
      <div className="mx-4 mb-6 react-window-list-item">
        <RealPost post={post} />
      </div>
    </div>
  );
});

VirtualizedPost.displayName = 'VirtualizedPost';

export default VirtualizedPost;