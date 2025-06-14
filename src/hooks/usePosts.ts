
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string;
    avatar_url?: string;
  } | null;
  likes_count?: number;
  comments_count?: number;
  user_has_liked?: boolean;
}

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching posts...');
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('User not authenticated:', userError);
        throw new Error('User not authenticated');
      }

      // Get posts with profiles
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        throw postsError;
      }

      console.log('Raw posts data:', posts);

      if (!posts || posts.length === 0) {
        console.log('No posts found');
        return [];
      }

      // Get likes and comments counts for each post
      const postsWithCounts = await Promise.all(
        posts.map(async (post) => {
          try {
            // Get likes count and user's like status
            const [likesResult, userLikeResult, commentsResult] = await Promise.all([
              supabase
                .from('likes')
                .select('id', { count: 'exact' })
                .eq('post_id', post.id),
              supabase
                .from('likes')
                .select('id')
                .eq('post_id', post.id)
                .eq('user_id', user.id)
                .maybeSingle(),
              supabase
                .from('comments')
                .select('id', { count: 'exact' })
                .eq('post_id', post.id)
            ]);

            return {
              ...post,
              likes_count: likesResult.count || 0,
              comments_count: commentsResult.count || 0,
              user_has_liked: userLikeResult.data !== null,
            };
          } catch (error) {
            console.error('Error getting post counts:', error);
            return {
              ...post,
              likes_count: 0,
              comments_count: 0,
              user_has_liked: false,
            };
          }
        })
      );

      console.log('Posts with counts:', postsWithCounts);
      return postsWithCounts as Post[];
    },
    staleTime: 30000, // Consider data fresh for 30 seconds
    retry: 3,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ content, imageUrl }: { content: string; imageUrl?: string }) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            content: content.trim(),
            image_url: imageUrl,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully!');
    },
    onError: (error) => {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    }
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('User not authenticated');
      }
      
      if (isLiked) {
        // Unlike - remove the like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error removing like:', error);
          throw error;
        }
      } else {
        // Like - add the like
        const { error } = await supabase
          .from('likes')
          .insert([
            {
              post_id: postId,
              user_id: user.id
            }
          ]);
        
        if (error) {
          console.error('Error adding like:', error);
          throw error;
        }
      }
    },
    onSuccess: () => {
      // Invalidate and refetch posts to update counts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Error updating like:', error);
      toast.error('Failed to update like. Please try again.');
    }
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postId: string) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', user.id); // Ensure user can only delete their own posts

      if (error) {
        console.error('Error deleting post:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post. Please try again.');
    }
  });
};
