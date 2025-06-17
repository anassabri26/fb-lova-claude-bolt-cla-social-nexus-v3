import React, { useState } from 'react';
import { Play, Users, Video, Calendar, Bell, BellOff, Share, Flag, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatNumber, formatTimeAgo } from '@/lib/utils';
import { MOCK_IMAGES } from '@/lib/constants';

interface ChannelData {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  verified: boolean;
  subscribers: number;
  totalViews: number;
  joinDate: string;
  description: string;
  location: string;
  links: string[];
  isSubscribed: boolean;
  videosCount: number;
}

interface ChannelVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  timestamp: string;
  isLive?: boolean;
  isPremium?: boolean;
}

const ChannelPage = () => {
  const [channel] = useState<ChannelData>({
    id: 'nature-explorer',
    name: 'Nature Explorer',
    handle: '@natureexplorer',
    avatar: MOCK_IMAGES.AVATARS[0],
    banner: MOCK_IMAGES.POSTS[0],
    verified: true,
    subscribers: 890000,
    totalViews: 45600000,
    joinDate: 'Mar 15, 2018',
    description: `Welcome to Nature Explorer! 🌿

Join me on incredible journeys through the world's most beautiful landscapes. From breathtaking sunsets to wildlife encounters, I capture the raw beauty of our planet.

New videos every Tuesday and Friday!

📧 Business inquiries: contact@natureexplorer.com
📍 Based in California, USA`,
    location: 'California, USA',
    links: ['https://natureexplorer.com', 'https://instagram.com/natureexplorer'],
    isSubscribed: false,
    videosCount: 234
  });

  const [videos] = useState<ChannelVideo[]>([
    {
      id: '1',
      title: 'Amazing Sunset Timelapse from Mount Wilson',
      thumbnail: MOCK_IMAGES.POSTS[0],
      duration: '3:45',
      views: 125000,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      title: 'Wildlife Photography Tips for Beginners',
      thumbnail: MOCK_IMAGES.POSTS[1],
      duration: '12:30',
      views: 89000,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      title: 'Live: Morning Bird Watching Session',
      thumbnail: MOCK_IMAGES.POSTS[2],
      duration: 'LIVE',
      views: 2400,
      timestamp: 'Started 15 min ago',
      isLive: true
    },
    {
      id: '4',
      title: 'Behind the Scenes: How I Plan Nature Shoots',
      thumbnail: MOCK_IMAGES.POSTS[3],
      duration: '8:15',
      views: 67000,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      isPremium: true
    }
  ]);

  const [playlists] = useState([
    {
      id: '1',
      title: 'Sunset Timelapses',
      videoCount: 15,
      thumbnail: MOCK_IMAGES.POSTS[0],
      totalViews: 890000
    },
    {
      id: '2',
      title: 'Wildlife Photography',
      videoCount: 23,
      thumbnail: MOCK_IMAGES.POSTS[1],
      totalViews: 1200000
    },
    {
      id: '3',
      title: 'Camera Gear Reviews',
      videoCount: 8,
      thumbnail: MOCK_IMAGES.POSTS[2],
      totalViews: 450000
    }
  ]);

  const [isSubscribed, setIsSubscribed] = useState(channel.isSubscribed);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      setIsNotificationEnabled(true);
    }
  };

  const handleNotificationToggle = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log('Channel link copied to clipboard');
  };

  const handleReport = () => {
    console.log('Report channel');
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'oldest':
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      default: // newest
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Channel Banner */}
      <div className="relative h-32 sm:h-48 md:h-64 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
        <img
          src={channel.banner}
          alt="Channel banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Channel Header */}
        <div className="relative -mt-16 sm:-mt-20 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white shadow-lg">
              <AvatarImage src={channel.avatar} />
              <AvatarFallback className="text-2xl">{channel.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 bg-white rounded-lg p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">{channel.name}</h1>
                    {channel.verified && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{channel.handle}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatNumber(channel.subscribers)} subscribers</span>
                    <span>•</span>
                    <span>{channel.videosCount} videos</span>
                    <span>•</span>
                    <span>{formatNumber(channel.totalViews)} total views</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleSubscribe}
                    variant={isSubscribed ? "outline" : "default"}
                    className={isSubscribed ? "bg-gray-100" : "bg-red-600 hover:bg-red-700"}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </Button>

                  {isSubscribed && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNotificationToggle}
                      className={isNotificationEnabled ? "bg-gray-100" : ""}
                    >
                      {isNotificationEnabled ? (
                        <Bell className="w-4 h-4" />
                      ) : (
                        <BellOff className="w-4 h-4" />
                      )}
                    </Button>
                  )}

                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share className="w-4 h-4" />
                  </Button>

                  <Button variant="outline" size="sm" onClick={handleReport}>
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Channel Content */}
        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search channel videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    
                    {video.isLive && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-500 text-white animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                          LIVE
                        </Badge>
                      </div>
                    )}

                    {video.isPremium && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-500 text-black">Premium</Badge>
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary">{video.duration}</Badge>
                    </div>

                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 mb-2">{video.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatNumber(video.views)} views</span>
                      <span>{formatTimeAgo(video.timestamp)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Playlists Tab */}
          <TabsContent value="playlists" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <Card key={playlist.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={playlist.thumbnail}
                      alt={playlist.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Play className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">{playlist.videoCount} videos</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm mb-1">{playlist.title}</h3>
                    <p className="text-xs text-gray-500">{formatNumber(playlist.totalViews)} total views</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Posts</h3>
              <p className="text-gray-500">This channel hasn't posted to the community tab yet.</p>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Description</h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-line">{channel.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Channel Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Joined:</span>
                          <span>{channel.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total views:</span>
                          <span>{formatNumber(channel.totalViews)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span>{channel.location}</span>
                        </div>
                      </div>
                    </div>

                    {channel.links.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Links</h4>
                        <div className="space-y-1">
                          {channel.links.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-blue-600 hover:underline text-sm"
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChannelPage;