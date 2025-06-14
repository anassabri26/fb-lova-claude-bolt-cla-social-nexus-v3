
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Eye, Clock, Bookmark, Share, MoreHorizontal } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Watch = () => {
  const [activeTab, setActiveTab] = useState('foryou');

  const videos = [
    {
      id: 1,
      title: 'Amazing React Tutorial - Build a Full App',
      creator: {
        name: 'Tech Creator',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      duration: '12:34',
      views: '1.2M',
      uploadTime: '2d ago'
    },
    {
      id: 2,
      title: 'Beautiful Sunset Timelapse',
      creator: {
        name: 'Nature Explorer',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
      duration: '8:45',
      views: '850K',
      uploadTime: '1d ago'
    },
    {
      id: 3,
      title: 'Cooking the Perfect Pasta',
      creator: {
        name: 'Chef Maria',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop',
      duration: '15:20',
      views: '2.1M',
      uploadTime: '3d ago'
    }
  ];

  const liveVideos = [
    {
      id: 1,
      title: 'Live: JavaScript Q&A Session',
      creator: {
        name: 'Code Master',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      viewers: '1.2K',
      isLive: true
    }
  ];

  const handlePlayVideo = (video: any) => {
    toast.info(`Playing: ${video.title}`);
  };

  const handleSaveVideo = (video: any) => {
    toast.success(`Saved: ${video.title}`);
  };

  const handleShareVideo = (video: any) => {
    toast.success(`Shared: ${video.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Watch</h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="foryou">For You</TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
              
              <TabsContent value="foryou" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <AccessibleButton
                            variant="ghost"
                            size="lg"
                            className="text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-4"
                            onClick={() => handlePlayVideo(video)}
                          >
                            <Play className="w-8 h-8" />
                          </AccessibleButton>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={video.creator.avatar} />
                            <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                              {video.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">{video.creator.name}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {video.views} views
                              </span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {video.uploadTime}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <AccessibleButton
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSaveVideo(video)}
                            >
                              <Bookmark className="w-4 h-4" />
                            </AccessibleButton>
                            <AccessibleButton
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShareVideo(video)}
                            >
                              <Share className="w-4 h-4" />
                            </AccessibleButton>
                            <AccessibleButton variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </AccessibleButton>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="live" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {liveVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                          LIVE
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {video.viewers} watching
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <AccessibleButton
                            variant="ghost"
                            size="lg"
                            className="text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-4"
                            onClick={() => handlePlayVideo(video)}
                          >
                            <Play className="w-8 h-8" />
                          </AccessibleButton>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={video.creator.avatar} />
                            <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                              {video.title}
                            </h3>
                            <p className="text-sm text-gray-600">{video.creator.name}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="following" className="mt-6">
                <div className="text-center py-12">
                  <p className="text-gray-500">No videos from people you follow</p>
                </div>
              </TabsContent>
              
              <TabsContent value="saved" className="mt-6">
                <div className="text-center py-12">
                  <p className="text-gray-500">No saved videos</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Watch;
