
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  requester_profile?: {
    full_name: string;
    avatar_url?: string;
  };
  addressee_profile?: {
    full_name: string;
    avatar_url?: string;
  };
}

export const useFriendRequests = () => {
  return useQuery({
    queryKey: ['friend-requests'],
    queryFn: async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return [];

      const { data, error } = await supabase
        .from('friendships')
        .select(`
          *,
          requester_profile:profiles!friendships_requester_id_fkey (full_name, avatar_url)
        `)
        .eq('addressee_id', user.data.user.id)
        .eq('status', 'pending');

      if (error) throw error;
      return data as Friendship[];
    }
  });
};

export const useFriends = () => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return [];

      const { data, error } = await supabase
        .from('friendships')
        .select(`
          *,
          requester_profile:profiles!friendships_requester_id_fkey (full_name, avatar_url),
          addressee_profile:profiles!friendships_addressee_id_fkey (full_name, avatar_url)
        `)
        .or(`requester_id.eq.${user.data.user.id},addressee_id.eq.${user.data.user.id}`)
        .eq('status', 'accepted');

      if (error) throw error;
      return data as Friendship[];
    }
  });
};

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ addresseeId }: { addresseeId: string }) => {
      const user = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('friendships')
        .insert([
          {
            requester_id: user.data.user?.id,
            addressee_id: addresseeId,
            status: 'pending'
          }
        ]);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      toast.success('Friend request sent!');
    },
    onError: (error) => {
      toast.error('Failed to send friend request');
      console.error('Error sending friend request:', error);
    }
  });
};

export const useRespondToFriendRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ requestId, status }: { requestId: string; status: 'accepted' | 'declined' }) => {
      const { data, error } = await supabase
        .from('friendships')
        .update({ status })
        .eq('id', requestId);

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      toast.success(variables.status === 'accepted' ? 'Friend request accepted!' : 'Friend request declined');
    },
    onError: (error) => {
      toast.error('Failed to respond to friend request');
      console.error('Error responding to friend request:', error);
    }
  });
};
