
import React from 'react';
import FriendRequests from './FriendRequests';
import FriendsList from './FriendsList';

const RightSidebar = () => {
  return (
    <aside className="hidden xl:block w-80 p-4 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      <div className="space-y-6">
        <FriendRequests />
        <FriendsList />
      </div>
    </aside>
  );
};

export default RightSidebar;
