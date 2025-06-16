import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Post, InfiniteQueryPage } from '@/types';
import { APP_CONFIG, MOCK_IMAGES } from '@/lib/constants';
import { handleError } from '@/lib/utils';

// COMPLETELY REWRITTEN: Simple and reliable mock data generator
const generateMockPosts = (page: number, pageSize: number): InfiniteQueryPage<Post> => {
  const posts: Post[] = [];
  const startIndex = page * pageSize;
  
  const profiles = [
    {
      id: 'user_1',
      full_name: 'Sarah Johnson',
      avatar_url: MOCK_IMAGES.AVATARS[0]
    },
    {
      id: 'user_2',
      full_name: 'Mike Chen',
      avatar_url: MOCK_IMAGES.AVATARS[1]
    },
    {
      id: 'user_3',
      full_name: 'Emma Wilson',
      avatar_url: MOCK_IMAGES.AVATARS[2]
    },
    {
      id: 'user_4',
      full_name: 'David Kim',
      avatar_url: MOCK_IMAGES.AVATARS[3]
    },
    {
      id: 'user_5',
      full_name: 'Lisa Wang',
      avatar_url: MOCK_IMAGES.AVATARS[4]
    },
    {
      id: 'user_6',
      full_name: 'Alex Rodriguez',
      avatar_url: MOCK_IMAGES.AVATARS[5]
    },
    {
      id: 'user_7',
      full_name: 'Jessica Park',
      avatar_url: MOCK_IMAGES.AVATARS[6]
    },
    {
      id: 'user_8',
      full_name: 'Robert Smith',
      avatar_url: MOCK_IMAGES.AVATARS[7]
    }
  ];

  const contents = [
    'Just finished building an amazing React application! The satisfaction of seeing your code come to life is unmatched. 🚀 #ReactJS #WebDevelopment',
    'Beautiful sunset from my evening walk. Sometimes you need to step away from the screen and enjoy nature! 🌅',
    'Excited to share my latest project! Working on a social media platform with some amazing features. Can\'t wait to show you all what we\'ve been building! 💻✨',
    'Had an incredible day at the tech conference! So many inspiring talks and amazing people. The future of technology looks bright! 🌟',
    'Weekend coding session complete! There\'s something magical about solving complex problems with elegant code. #CodeLife #Programming',
    'Just discovered this amazing new library that makes development so much easier. Love how the tech community constantly innovates! 🔧',
    'Reflecting on the journey so far. Every challenge has been a learning opportunity. Grateful for this amazing community! 🙏',
    'Late night debugging session turned into a breakthrough moment. Sometimes the best solutions come when you least expect them! 💡',
    'Coffee and code - the perfect combination for a productive morning! ☕️ What\'s your favorite coding fuel?',
    'Deployed my first full-stack application today! The feeling of seeing your work live on the internet is incredible! 🌐',
    'Learning something new every day in this field. Today it was about advanced React patterns and I\'m mind blown! 🤯',
    'Team collaboration at its finest! Just wrapped up an amazing sprint with the most talented developers. 👥',
    'Open source contribution feels so rewarding. Giving back to the community that has given me so much! 🌍',
    'Debugging is like being a detective in a crime movie where you are also the murderer. But when you find the bug... 🕵️‍♂️',
    'The best part about being a developer? Every day brings new challenges and opportunities to grow! 📈'
  ];

  // Generate exactly the requested number of posts
  for (let i = 0; i < pageSize; i++) {
    const postIndex = startIndex + i;
    const profile = profiles[postIndex % profiles.length];
    const content = contents[postIndex % contents.length];
    const hasImage = Math.random() > 0.4; // 60% chance of having an image
    const image = hasImage ? MOCK_IMAGES.POSTS[postIndex % MOCK_IMAGES.POSTS.length] : undefined;

    posts.push({
      id: `post_${postIndex + 1}`, // Start from 1 for better UX
      user_id: profile.id,
      content: `${content} (Post #${postIndex + 1})`,
      image_url: image,
      created_at: new Date(Date.now() - (postIndex * 15 * 60 * 1000)).toISOString(), // 15 minutes apart
      updated_at: new Date(Date.now() - (postIndex * 15 * 60 * 1000)).toISOString(),
      profiles: profile,
      likes_count: Math.floor(Math.random() * 500) + 10,
      comments_count: Math.floor(Math.random() * 100) + 2,
      user_has_liked: Math.random() > 0.7
    });
  }

  // Generate 500 pages total (5000+ posts)
  return {
    posts,
    nextCursor: page < 499 ? `page_${page + 1}` : undefined,
    hasMore: page < 499
  };
};

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching mock posts...');
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockData = generateMockPosts(0, 20);
      return mockData.posts;
    },
    staleTime: 30000,
    retry: 1,
  });
};

export const useInfinitePosts = (pageSize: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite', pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      console.log(`Fetching posts page ${pageParam} with ${pageSize} items...`);
      
      // Fast loading for better UX
      await new Promise(resolve => setTimeout(resolve, Math.random() * 150 + 50));
      
      const result = generateMockPosts(pageParam, pageSize);
      console.log(`Generated ${result.posts.length} posts for page ${pageParam}`);
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ content, imageUrl }: { content: string; imageUrl?: string }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost: Post = {
        id: `post_${Date.now()}`,
        user_id: 'current_user',
        content: content.trim(),
        image_url: imageUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        profiles: {
          id: 'current_user',
          full_name: 'John Doe',
          avatar_url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
        },
        likes_count: 0,
        comments_count: 0,
        user_has_liked: false
      };

      return newPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });
      toast.success('Post created successfully!');
    },
    onError: (error) => {
      handleError(error, 'createPost');
      toast.error('Failed to create post. Please try again.');
    }
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log(`Mock ${isLiked ? 'unlike' : 'like'} for post ${postId}`);
      return { postId, isLiked: !isLiked };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });
    },
    onError: (error) => {
      handleError(error, 'likePost');
      toast.error('Failed to update like. Please try again.');
    }
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Mock delete for post ${postId}`);
      return postId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });
      toast.success('Post deleted successfully!');
    },
    onError: (error) => {
      handleError(error, 'deletePost');
      toast.error('Failed to delete post. Please try again.');
    }
  });
};