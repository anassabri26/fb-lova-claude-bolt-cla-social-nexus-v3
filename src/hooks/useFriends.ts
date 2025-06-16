import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

// Mock friend requests data
const mockFriendRequests: Friendship[] = [
  {
    id: 'req_1',
    requester_id: 'user_7',
    addressee_id: 'current_user',
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    requester_profile: {
      full_name: 'Alex Rodriguez',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    }
  },
  {
    id: 'req_2',
    requester_id: 'user_8',
    addressee_id: 'current_user',
    status: 'pending',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    requester_profile: {
      full_name: 'Jessica Park',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    }
  }
];

// Mock friends data
const mockFriends: Friendship[] = [
  {
    id: 'friend_1',
    requester_id: 'current_user',
    addressee_id: 'user_1',
    status: 'accepted',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    addressee_profile: {
      full_name: 'Sarah Johnson',
      avatar_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
    }
  },
  {
    id: 'friend_2',
    requester_id: 'user_2',
    addressee_id: 'current_user',
    status: 'accepted',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    requester_profile: {
      full_name: 'Mike Chen',
      avatar_url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
    }
  }
];

export const useFriendRequests = () => {
  return useQuery({
    queryKey: ['friend-requests'],
    queryFn: async () => {
      console.log('Fetching mock friend requests...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockFriendRequests;
    }
  });
};

export const useFriends = () => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      console.log('Fetching mock friends...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockFriends;
    }
  });
};

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ addresseeId }: { addresseeId: string }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Mock friend request sent to ${addresseeId}`);
      return { addresseeId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      toast.success('Friend request sent! (Mock mode)');
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Mock friend request ${requestId} ${status}`);
      return { requestId, status };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      toast.success(variables.status === 'accepted' ? 'Friend request accepted! (Mock mode)' : 'Friend request declined (Mock mode)');
    },
    onError: (error) => {
      toast.error('Failed to respond to friend request');
      console.error('Error responding to friend request:', error);
    }
  });
};