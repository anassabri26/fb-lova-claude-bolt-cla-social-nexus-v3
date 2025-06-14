
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import FriendRequests from '../components/FriendRequests';
import FriendsList from '../components/FriendsList';
import FriendSuggestions from "../components/FriendSuggestions";
import { Users, UserPlus, UserCheck, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Friends = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'all' | 'suggestions'>('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  // State for tab counts
  const [requestsCount, setRequestsCount] = useState(0);
  const [allFriendsCount, setAllFriendsCount] = useState(0);
  const [suggestionsCount, setSuggestionsCount] = useState(0);

  // Fetch request, friends, and suggestion counts
  React.useEffect(() => {
    const fetchCounts = async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      // Requests count
      const { data: reqs } = await supabase
        .from("friendships")
        .select("id")
        .eq("addressee_id", user.data.user.id)
        .eq("status", "pending");
      setRequestsCount(reqs?.length || 0);

      // Friends count
      const { data: frns } = await supabase
        .from("friendships")
        .select("id")
        .or(
          `requester_id.eq.${user.data.user.id},addressee_id.eq.${user.data.user.id}`
        )
        .eq("status", "accepted");
      setAllFriendsCount(frns?.length || 0);

      // Suggestions count
      const { data: allUsers } = await supabase
        .from("profiles")
        .select("id")
        .neq("id", user.data.user.id);

      const { data: friendships } = await supabase
        .from("friendships")
        .select("requester_id, addressee_id, status")
        .or(
          `requester_id.eq.${user.data.user.id},addressee_id.eq.${user.data.user.id}`
        );

      const connectedIds = new Set<string>();
      if (friendships) {
        friendships.forEach((f) => {
          if (f.status === "accepted" || f.status === "pending") {
            connectedIds.add(f.requester_id);
            connectedIds.add(f.addressee_id);
          }
        });
      }
      connectedIds.add(user.data.user.id);

      setSuggestionsCount(
        (allUsers?.filter((person) => !connectedIds.has(person.id)).length || 0)
      );
    };
    fetchCounts();
  }, [activeTab]);

  const tabs = [
    { id: 'requests', label: 'Friend Requests', icon: UserPlus, count: requestsCount },
    { id: 'all', label: 'All Friends', icon: Users, count: allFriendsCount },
    { id: 'suggestions', label: 'Suggestions', icon: UserCheck, count: suggestionsCount },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as 'requests' | 'all' | 'suggestions');
    toast.success(`Switched to ${tabs.find(t => t.id === tabId)?.label}`);
    console.log(`Tab changed to: ${tabId}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching friends: ${searchQuery}`);
      console.log(`Friend search: ${searchQuery}`);
    }
  };

  const handleFilter = () => {
    setFilterActive(!filterActive);
    toast.info(filterActive ? 'Filter disabled' : 'Filter enabled');
    console.log(`Filter toggled: ${!filterActive}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'requests':
        return <FriendRequests />;
      case 'all':
        return <FriendsList />;
      case 'suggestions':
        return <FriendSuggestions />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <div className="hidden lg:block w-80 fixed left-0 top-16 h-full overflow-y-auto">
          <Sidebar />
        </div>
        
        <main className="flex-1 lg:ml-80 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Friends</h1>
              <p className="text-gray-600">Connect with friends and discover new people</p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <form onSubmit={handleSearch} className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" variant="outline">
                  Search
                </Button>
                <AccessibleButton
                  variant="outline"
                  onClick={handleFilter}
                  className={filterActive ? 'bg-blue-50 text-blue-600' : ''}
                >
                  <Filter className="w-4 h-4" />
                </AccessibleButton>
              </form>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
              {tabs.map((tab) => (
                <AccessibleButton
                  key={tab.id}
                  variant="ghost"
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                  aria-current={activeTab === tab.id}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {typeof tab.count === "number" && tab.count > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.id 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </AccessibleButton>
              ))}
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </main>
      </div>
      
      <div className="lg:hidden">
        <MobileNavigation />
      </div>
    </div>
  );
};

export default Friends;
