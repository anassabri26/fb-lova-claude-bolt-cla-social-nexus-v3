
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
      
      try {
        // Get comments first
        const { data: comments, error: commentsError } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', postId)
          .order('created_at', { ascending: true });

        if (commentsError) {
          console.error('Error fetching comments:', commentsError);
          throw commentsError;
        }

        if (!comments || comments.length === 0) {
          return [];
        }

        // Get user profiles separately
        const userIds = [...new Set(comments.map(comment => comment.user_id))];
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          // Continue with comments but without profile data
        }

        // Combine comments with profile data
        const commentsWithProfiles = comments.map(comment => ({
          ...comment,
          profiles: profiles?.find(profile => profile.id === comment.user_id) || {
            full_name: 'Anonymous User',
            avatar_url: null
          }
        }));

        console.log('Comments with profiles:', commentsWithProfiles);
        return commentsWithProfiles as Comment[];
      } catch (error) {
        console.error('Error in useComments:', error);
        return [];
      }
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
        .select('*')
        .single();

      if (error) {
        console.error('Error creating comment:', error);
        throw error;
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single();

      return {
        ...data,
        profiles: profile || { full_name: 'Anonymous User', avatar_url: null }
      } as Comment;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.post_id] });
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
        .eq('user_id', user.id);

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
