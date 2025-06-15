import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url?: string;
  } | null;
}

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      console.log('Fetching comments for post:', postId);
      
      // Get comments with profile information
      const { data: comments, error } = await supabase
        .from('comments')
        .select(`
          id,
          post_id,
          user_id,
          content,
          created_at,
          profiles!user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }

      console.log('Comments fetched:', comments);
      return (comments || []) as Comment[];
    },
    enabled: !!postId,
    staleTime: 30000,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            content: content.trim(),
            user_id: user.id
          }
        ])
        .select(`
          id,
          post_id,
          user_id,
          content,
          created_at,
          profiles!user_id (
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) {
        console.error('Error creating comment:', error);
        throw error;
      }

      return data as Comment;
    },
    onSuccess: (data) => {
      // Invalidate comments for this specific post
      queryClient.invalidateQueries({ queryKey: ['comments', data.post_id] });
      // Also invalidate posts to update comment counts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Comment added!');
    },
    onError: (error) => {
      console.error('Error creating comment:', error);
      toast.error('Failed to add comment. Please try again.');
    }
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ commentId, postId }: { commentId: string; postId: string }) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id); // Ensure user can only delete their own comments

      if (error) {
        console.error('Error deleting comment:', error);
        throw error;
      }

      return { commentId, postId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Comment deleted!');
    },
    onError: (error) => {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment. Please try again.');
    }
  });
};
