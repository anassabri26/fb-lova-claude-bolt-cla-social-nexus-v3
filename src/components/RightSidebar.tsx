import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import FriendRequestsPanel from './FriendRequestsPanel';
import PeopleYouMayKnow from './PeopleYouMayKnow';
import { useFriends } from '@/hooks/useFriends';

const RightSidebar = () => {
  const { data: friends } = useFriends();

  const onlineFriends = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face",
      isOnline: true
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face",
      isOnline: true
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face",
      isOnline: false
    }
  ];

  return (
    <div className="right-sidebar-responsive">
      <div className="right-sidebar-content">
        {/* Friend Requests */}
        <div className="right-sidebar-panel">
          <FriendRequestsPanel />
        </div>
        
        {/* People You May Know */}
        <div className="right-sidebar-panel">
          <PeopleYouMayKnow />
        </div>

        {/* Online Friends */}
        <Card className="right-sidebar-card">
          <CardHeader className="right-sidebar-card-header">
            <CardTitle className="right-sidebar-card-title">
              <Users className="right-sidebar-icon" />
              <span>Contacts ({friends?.length || 0})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="right-sidebar-card-content">
            {onlineFriends.map((friend) => (
              <div key={friend.id} className="right-sidebar-friend-item">
                <div className="right-sidebar-friend-avatar-container">
                  <Avatar className="right-sidebar-friend-avatar">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="text-xs">{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {friend.isOnline && (
                    <div className="right-sidebar-online-indicator"></div>
                  )}
                </div>
                <span className="right-sidebar-friend-name">{friend.name}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Your Pages and Profiles */}
        <Card className="right-sidebar-card">
          <CardHeader className="right-sidebar-card-header">
            <CardTitle className="right-sidebar-card-title">Your Pages and profiles</CardTitle>
          </CardHeader>
          <CardContent className="right-sidebar-card-content">
            <div className="right-sidebar-page-item">
              <div className="right-sidebar-page-icon">
                <span className="right-sidebar-page-icon-text">YP</span>
              </div>
              <span className="right-sidebar-page-name">Your Page</span>
            </div>
          </CardContent>
        </Card>

        {/* Group conversations */}
        <Card className="right-sidebar-card">
          <CardHeader className="right-sidebar-card-header">
            <CardTitle className="right-sidebar-card-title">Group conversations</CardTitle>
          </CardHeader>
          <CardContent className="right-sidebar-card-content">
            <div className="right-sidebar-group-item">
              <div className="right-sidebar-group-icon right-sidebar-group-icon-purple">
                <Users className="right-sidebar-group-icon-svg" />
              </div>
              <span className="right-sidebar-group-name">Design Team</span>
            </div>
            <div className="right-sidebar-group-item">
              <div className="right-sidebar-group-icon right-sidebar-group-icon-green">
                <Users className="right-sidebar-group-icon-svg" />
              </div>
              <span className="right-sidebar-group-name">Weekend Plans</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RightSidebar;