import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Comment } from '@/types';
import { handleError } from '@/lib/utils';
import { MOCK_IMAGES } from '@/lib/constants';

// Mock comments data
const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: 'comment_1',
      post_id: '1',
      user_id: 'user_4',
      content: "This looks amazing! Great work on the React app! 🔥",
      created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      profiles: {
        id: 'user_4',
        full_name: 'David Kim',
        avatar_url: MOCK_IMAGES.AVATARS[3]
      }
    },
    {
      id: 'comment_2',
      post_id: '1',
      user_id: 'user_5',
      content: "Would love to see the code! Is it open source?",
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      profiles: {
        id: 'user_5',
        full_name: 'Lisa Wang',
        avatar_url: MOCK_IMAGES.AVATARS[4]
      }
    }
  ],
  '2': [
    {
      id: 'comment_3',
      post_id: '2',
      user_id: 'user_6',
      content: 'Beautiful shot! Where was this taken?',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      profiles: {
        id: 'user_6',
        full_name: 'Alex Rodriguez',
        avatar_url: MOCK_IMAGES.AVATARS[5]
      }
    }
  ]
};

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      console.log('Fetching mock comments for post:', postId);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockComments[postId] || [];
    },
    enabled: !!postId,
    staleTime: 30000,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newComment: Comment = {
        id: `comment_${Date.now()}`,
        post_id: postId,
        user_id: 'current_user',
        content: content.trim(),
        created_at: new Date().toISOString(),
        profiles: {
          id: 'current_user',
          full_name: 'John Doe',
          avatar_url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
        }
      };

      return newComment;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.post_id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Comment added!');
    },
    onError: (error) => {
      handleError(error, 'createComment');
      toast.error('Failed to add comment. Please try again.');
    }
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ commentId, postId }: { commentId: string; postId: string }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log(`Mock delete comment ${commentId} from post ${postId}`);
      return { commentId, postId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Comment deleted!');
    },
    onError: (error) => {
      handleError(error, 'deleteComment');
      toast.error('Failed to delete comment. Please try again.');
    }
  });
};