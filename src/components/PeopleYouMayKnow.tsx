import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSendFriendRequest } from '@/hooks/useFriends';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, UserPlus } from 'lucide-react';

const PeopleYouMayKnow = () => {
  const sendRequestMutation = useSendFriendRequest();
  
  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['people-suggestions'],
    queryFn: async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return [];

      // Get users who are not already friends
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .neq('id', user.data.user.id)
        .limit(5);

      if (error) throw error;
      return data;
    }
  });

  const handleSendRequest = (addresseeId: string) => {
    sendRequestMutation.mutate({ addresseeId });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-base font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2" />
            <span>People You May Know</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <p className="text-gray-500 text-sm">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-base font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2" />
            <span>People You May Know</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <p className="text-gray-500 text-sm">No suggestions available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="p-3">
        <CardTitle className="text-base font-semibold flex items-center">
          <Users className="w-5 h-5 mr-2" />
          <span>People You May Know</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="space-y-2">
          {suggestions.map((person) => (
            <div key={person.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 min-w-0">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={person.avatar_url} />
                  <AvatarFallback>{person.full_name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">{person.full_name || 'Unknown User'}</p>
                  <p className="text-xs text-gray-500 truncate">Suggested friend</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => handleSendRequest(person.id)}
                disabled={sendRequestMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 h-8 flex-shrink-0"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                <span className="text-xs">Add</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PeopleYouMayKnow;