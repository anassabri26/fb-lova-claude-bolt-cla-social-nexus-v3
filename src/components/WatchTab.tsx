
import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Share, MoreHorizontal, Volume2, VolumeX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const WatchTab = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  const videos = [
    {
      id: '1',
      title: 'Amazing Wildlife Documentary',
      author: 'Nature Channel',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
      views: '2.3M',
      likes: 15420,
      duration: '12:34',
      uploadTime: '2 days ago'
    },
    {
      id: '2',
      title: 'Tech Review: Latest Gadgets',
      author: 'Tech Insider',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      views: '856K',
      likes: 8930,
      duration: '18:22',
      uploadTime: '1 week ago'
    },
    {
      id: '3',
      title: 'Cooking Master Class',
      author: 'Chef Emma',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      views: '445K',
      likes: 12100,
      duration: '25:15',
      uploadTime: '3 days ago'
    }
  ];

  const liveStreams = [
    {
      id: 'live1',
      title: 'Live Gaming Session',
      author: 'GameMaster Pro',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
      viewers: '1.2K watching',
      isLive: true
    },
    {
      id: 'live2',
      title: 'Music Performance',
      author: 'Live Music Hub',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      viewers: '847 watching',
      isLive: true
    }
  ];

  const handlePlayVideo = (videoId) => {
    setPlayingVideo(videoId);
    toast.info('Video playing...');
  };

  const handleLike = (title) => {
    toast.success(`Liked "${title}"`);
  };

  const handleComment = (title) => {
    toast.info(`Opening comments for "${title}"`);
  };

  const handleShare = (title) => {
    toast.success(`Shared "${title}"`);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? 'Unmuted' : 'Muted');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Watch</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Live</Button>
          <Button variant="outline">Following</Button>
          <Button variant="outline">Saved</Button>
        </div>
      </div>

      {/* Live Streams */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Live Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveStreams.map((stream) => (
            <Card key={stream.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    LIVE
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {stream.viewers}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AccessibleButton
                      onClick={() => handlePlayVideo(stream.id)}
                      className="bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
                    >
                      <Play className="w-8 h-8 text-white" />
                    </AccessibleButton>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={stream.avatar} />
                      <AvatarFallback>{stream.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{stream.title}</h3>
                      <p className="text-sm text-gray-600">{stream.author}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Regular Videos */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
        <div className="space-y-4">
          {videos.map((video) => (
            <Card key={video.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-1 py-0.5 rounded text-xs">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AccessibleButton
                        onClick={() => handlePlayVideo(video.id)}
                        className="bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
                      >
                        <Play className="w-6 h-6 text-white" />
                      </AccessibleButton>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={video.avatar} />
                          <AvatarFallback>{video.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                          <p className="text-sm text-gray-600">{video.author}</p>
                          <p className="text-sm text-gray-500">{video.views} views • {video.uploadTime}</p>
                        </div>
                      </div>
                      <AccessibleButton variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </AccessibleButton>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(video.title)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{video.likes.toLocaleString()}</span>
                      </AccessibleButton>
                      
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleComment(video.title)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Comment</span>
                      </AccessibleButton>
                      
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(video.title)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                      >
                        <Share className="w-4 h-4" />
                        <span>Share</span>
                      </AccessibleButton>
                      
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </AccessibleButton>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchTab;
