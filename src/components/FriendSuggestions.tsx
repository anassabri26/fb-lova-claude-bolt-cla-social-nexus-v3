
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSendFriendRequest } from "@/hooks/useFriends";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const FriendSuggestions = () => {
  const sendRequestMutation = useSendFriendRequest();

  const { data: suggestions, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["people-suggestions"],
    queryFn: async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return [];

      // Get profiles which are not the current user, not already a friend/request, and not in pending requests
      const { data: allUsers, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .neq("id", user.data.user.id);

      if (error) throw error;

      // Get current user's friends and pending friends
      const { data: friendships } = await supabase
        .from("friendships")
        .select("requester_id, addressee_id, status")
        .or(
          `requester_id.eq.${user.data.user.id},addressee_id.eq.${user.data.user.id}`
        );

      const connectedIds = new Set<string>();
      if (friendships) {
        friendships.forEach((f) => {
          if (
            f.status === "accepted" ||
            f.status === "pending"
          ) {
            connectedIds.add(f.requester_id);
            connectedIds.add(f.addressee_id);
          }
        });
      }
      connectedIds.add(user.data.user.id);

      // Show up to 10 suggestions
      return (
        allUsers?.filter((person) => !connectedIds.has(person.id)).slice(0, 10) ||
        []
      );
    },
  });

  const handleSendRequest = (addresseeId: string) => {
    sendRequestMutation.mutate({ addresseeId }, {
      onSuccess: () => refetch(),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>People You May Know</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading || isFetching ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </>
        ) : suggestions && suggestions.length > 0 ? (
          suggestions.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={person.avatar_url} />
                  <AvatarFallback>
                    {person.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{person.full_name || "Unknown User"}</p>
                  <p className="text-sm text-gray-500">Suggested friend</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => handleSendRequest(person.id)}
                disabled={sendRequestMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                {sendRequestMutation.isPending ? "Adding..." : "Add"}
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No suggestions available</p>
        )}
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => refetch()}
        >
          Find More Friends
        </Button>
      </CardContent>
    </Card>
  );
};

export default FriendSuggestions;
