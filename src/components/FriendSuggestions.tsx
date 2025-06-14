
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
    <div className="space-y-4">
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : suggestions && suggestions.length > 0 ? (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              People You May Know
            </h2>
            <p className="text-sm text-gray-600">Connect with people you might know</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((person) => (
              <Card key={person.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    <Avatar className="w-16 h-16 mx-auto">
                      <AvatarImage src={person.avatar_url} />
                      <AvatarFallback className="text-lg">
                        {person.full_name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{person.full_name || "Unknown User"}</h3>
                      <p className="text-sm text-gray-500">Suggested friend</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSendRequest(person.id)}
                      disabled={sendRequestMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {sendRequestMutation.isPending ? "Adding..." : "Add Friend"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center pt-4">
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
              className="px-6"
            >
              {isFetching ? "Loading..." : "Find More Friends"}
            </Button>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions available</h3>
            <p className="text-gray-500 mb-4">We couldn't find any people you might know right now.</p>
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Try Again"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FriendSuggestions;
