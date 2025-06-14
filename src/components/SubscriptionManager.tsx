
import React, { useState } from 'react';
import { Bell, BellOff, Grid, List, Search, MoreHorizontal, Rss, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Subscription {
  id: string;
  channelName: string;
  channelAvatar: string;
  subscriberCount: string;
  isVerified: boolean;
  notificationsEnabled: boolean;
  subscribedAt: string;
  lastVideo: {
    title: string;
    thumbnail: string;
    publishedAt: string;
    views: number;
  } | null;
  category: string;
}

const SubscriptionManager: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      channelName: 'Tech Channel',
      channelAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      subscriberCount: '2.5M',
      isVerified: true,
      notificationsEnabled: true,
      subscribedAt: '6 months ago',
      lastVideo: {
        title: 'Revolutionary AI Technology Explained',
        thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
        publishedAt: '2 days ago',
        views: 156000
      },
      category: 'Technology'
    },
    {
      id: '2',
      channelName: 'Cooking Masters',
      channelAvatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      subscriberCount: '1.8M',
      isVerified: true,
      notificationsEnabled: false,
      subscribedAt: '3 months ago',
      lastVideo: {
        title: 'Perfect Pasta in 15 Minutes',
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
        publishedAt: '1 week ago',
        views: 89000
      },
      category: 'Food'
    },
    {
      id: '3',
      channelName: 'Nature Explorer',
      channelAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      subscriberCount: '890K',
      isVerified: false,
      notificationsEnabled: true,
      subscribedAt: '1 year ago',
      lastVideo: {
        title: 'Hidden Waterfalls of Costa Rica',
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
        publishedAt: '3 days ago',
        views: 234000
      },
      category: 'Travel'
    },
    {
      id: '4',
      channelName: 'GameStream Pro',
      channelAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
      subscriberCount: '3.2M',
      isVerified: true,
      notificationsEnabled: true,
      subscribedAt: '2 years ago',
      lastVideo: null,
      category: 'Gaming'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', 'Technology', 'Food', 'Travel', 'Gaming', 'Music', 'Education'];

  const toggleNotifications = (subscriptionId: string) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId 
        ? { ...sub, notificationsEnabled: !sub.notificationsEnabled }
        : sub
    ));
    
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    toast.success(
      `Notifications ${subscription?.notificationsEnabled ? 'disabled' : 'enabled'} for ${subscription?.channelName}`
    );
    console.log(`Toggled notifications for ${subscription?.channelName}`);
  };

  const unsubscribe = (subscriptionId: string) => {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    setSubscriptions(prev => prev.filter(sub => sub.id !== subscriptionId));
    toast.success(`Unsubscribed from ${subscription?.channelName}`);
    console.log(`Unsubscribed from ${subscription?.channelName}`);
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.channelName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || sub.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.channelName.localeCompare(b.channelName);
      case 'subscribers':
        return parseFloat(b.subscriberCount) - parseFloat(a.subscriberCount);
      case 'recent':
      default:
        return new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime();
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="text-gray-600">{subscriptions.length} channels you're subscribed to</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently subscribed</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
              <SelectItem value="subscribers">Most subscribers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Subscriptions Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSubscriptions.map((subscription) => (
            <Card key={subscription.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={subscription.channelAvatar} />
                    <AvatarFallback>{subscription.channelName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-semibold truncate">{subscription.channelName}</h3>
                      {subscription.isVerified && (
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{subscription.subscriberCount} subscribers</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {subscription.category}
                    </Badge>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toggleNotifications(subscription.id)}>
                        {subscription.notificationsEnabled ? (
                          <>
                            <BellOff className="w-4 h-4 mr-2" />
                            Turn off notifications
                          </>
                        ) : (
                          <>
                            <Bell className="w-4 h-4 mr-2" />
                            Turn on notifications
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => unsubscribe(subscription.id)} className="text-red-600">
                        <Rss className="w-4 h-4 mr-2" />
                        Unsubscribe
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {subscription.lastVideo && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Latest video</h4>
                    <div className="flex space-x-2">
                      <img
                        src={subscription.lastVideo.thumbnail}
                        alt={subscription.lastVideo.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{subscription.lastVideo.title}</p>
                        <p className="text-xs text-gray-500">
                          {subscription.lastVideo.views.toLocaleString()} views • {subscription.lastVideo.publishedAt}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={subscription.notificationsEnabled}
                      onCheckedChange={() => toggleNotifications(subscription.id)}
                    />
                    <span className="text-xs text-gray-500">Notifications</span>
                  </div>
                  <span className="text-xs text-gray-500">Subscribed {subscription.subscribedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {sortedSubscriptions.map((subscription) => (
            <Card key={subscription.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={subscription.channelAvatar} />
                    <AvatarFallback>{subscription.channelName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{subscription.channelName}</h3>
                      {subscription.isVerified && (
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" />
                        </div>
                      )}
                      <Badge variant="secondary">{subscription.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {subscription.subscriberCount} subscribers • Subscribed {subscription.subscribedAt}
                    </p>
                  </div>

                  {subscription.lastVideo && (
                    <div className="flex items-center space-x-3">
                      <img
                        src={subscription.lastVideo.thumbnail}
                        alt={subscription.lastVideo.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{subscription.lastVideo.title}</p>
                        <p className="text-xs text-gray-500">
                          {subscription.lastVideo.views.toLocaleString()} views • {subscription.lastVideo.publishedAt}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleNotifications(subscription.id)}
                    >
                      {subscription.notificationsEnabled ? (
                        <Bell className="w-4 h-4 text-blue-600" />
                      ) : (
                        <BellOff className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => unsubscribe(subscription.id)}
                      className="text-red-600"
                    >
                      Unsubscribe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {sortedSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <Rss className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchQuery ? 'No subscriptions found' : 'No subscriptions yet'}
          </h3>
          <p className="text-gray-500">
            {searchQuery 
              ? `No results for "${searchQuery}"`
              : 'Start following channels to see their latest videos here'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManager;
