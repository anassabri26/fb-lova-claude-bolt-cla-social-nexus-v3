
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
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
      // Get posts
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Get likes count and user's like status for each post
      const postsWithCounts = await Promise.all(
        (posts || []).map(async (post) => {
          const [likesResult, userLikeResult, profileResult] = await Promise.all([
            supabase
              .from('likes')
              .select('id', { count: 'exact' })
              .eq('post_id', post.id),
            supabase
              .from('likes')
              .select('id')
              .eq('post_id', post.id)
              .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
              .maybeSingle(),
            supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('id', post.user_id)
              .maybeSingle()
          ]);

          return {
            ...post,
            likes_count: likesResult.count || 0,
            user_has_liked: userLikeResult.data !== null,
            profiles: profileResult.data
          };
        })
      );

      return postsWithCounts as Post[];
    }
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ content, imageUrl }: { content: string; imageUrl?: string }) => {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            content,
            image_url: imageUrl,
            user_id: (await supabase.auth.getUser()).data.user?.id
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create post');
      console.error('Error creating post:', error);
    }
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
        
        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert([
            {
              post_id: postId,
              user_id: user.id
            }
          ]);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      toast.error('Failed to update like');
      console.error('Error updating like:', error);
    }
  });
};
