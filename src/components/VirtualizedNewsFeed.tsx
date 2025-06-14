
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import CreatePost from './CreatePost';
import Stories from './Stories';
import Post from './Post';
import { Skeleton } from '@/components/ui/skeleton';

interface PostData {
  id: number;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

const VirtualizedNewsFeed = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);

  // Mock data generator for demonstration
  const generateMockPosts = useCallback((startId: number, count: number): PostData[] => {
    const mockUsers = [
      { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face', verified: true },
      { name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face', verified: false },
      { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face', verified: true },
      { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face', verified: false },
    ];

    const mockContent = [
      'Just finished building an amazing React application! The satisfaction of seeing your code come to life is unmatched. 🚀 #ReactJS #WebDevelopment',
      'Beautiful sunset from my office window today. Sometimes you need to pause and appreciate the simple moments. 🌅',
      'Excited to share my latest project! Finally got it looking exactly how I envisioned it. What do you think?',
      'Working on some exciting new features. Can\'t wait to share them with you all! Stay tuned... 💪',
    ];

    const mockImages = [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
    ];

    return Array.from({ length: count }, (_, i) => {
      const id = startId + i;
      const user = mockUsers[i % mockUsers.length];
      const content = mockContent[i % mockContent.length];
      const hasImage = Math.random() > 0.4;
      
      return {
        id,
        author: user,
        content,
        image: hasImage ? mockImages[i % mockImages.length] : undefined,
        timestamp: `${Math.floor(Math.random() * 24)}h`,
        likes: Math.floor(Math.random() * 200) + 10,
        comments: Math.floor(Math.random() * 50) + 1,
        shares: Math.floor(Math.random() * 20) + 1,
      };
    });
  }, []);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(generateMockPosts(1, 20));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [generateMockPosts]);

  // Load more posts
  const loadMorePosts = useCallback(() => {
    if (!hasNextPage || loading) return;

    setLoading(true);
    setTimeout(() => {
      const newPosts = generateMockPosts(posts.length + 1, 10);
      setPosts(prev => [...prev, ...newPosts]);
      setLoading(false);
      
      // Simulate end of data after 100 posts
      if (posts.length >= 90) {
        setHasNextPage(false);
      }
    }, 500);
  }, [posts.length, hasNextPage, loading, generateMockPosts]);

  // Post item renderer for virtual list
  const PostItem = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const post = posts[index];
    
    // Load more when near the end
    if (index >= posts.length - 5 && hasNextPage && !loading) {
      loadMorePosts();
    }

    if (!post) {
      return (
        <div style={style} className="px-4 py-3">
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      );
    }

    return (
      <div style={style} className="px-4 py-3">
        <Post post={post} />
      </div>
    );
  }, [posts, hasNextPage, loading, loadMorePosts]);

  const itemCount = useMemo(() => {
    return hasNextPage ? posts.length + 3 : posts.length;
  }, [posts.length, hasNextPage]);

  if (loading && posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Stories />
        <CreatePost />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6 mb-6">
        <Stories />
        <CreatePost />
      </div>
      
      <div className="h-[calc(100vh-200px)]" role="feed" aria-label="News feed">
        <List
          height={window.innerHeight - 200}
          itemCount={itemCount}
          itemSize={400}
          overscanCount={2}
          className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          {PostItem}
        </List>
      </div>
      
      {!hasNextPage && (
        <div className="text-center py-8 text-gray-500">
          <p>You've reached the end of your feed</p>
        </div>
      )}
    </div>
  );
};

export default VirtualizedNewsFeed;
