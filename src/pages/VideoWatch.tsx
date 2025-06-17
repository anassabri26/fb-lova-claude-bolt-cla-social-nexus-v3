import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '@/components/VideoPlayer';
import VideoDetails from '@/components/VideoDetails';
import VideoComments from '@/components/VideoComments';
import VideoRecommendations from '@/components/VideoRecommendations';
import { MOCK_IMAGES } from '@/lib/constants';

interface VideoData {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
    subscribers: string;
    isSubscribed: boolean;
  };
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  timestamp: string;
  description: string;
  category: string;
  tags: string[];
  isLive?: boolean;
  commentsCount: number;
}

const VideoWatch = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  
  const [video, setVideo] = useState<VideoData>({
    id: videoId || '1',
    title: 'Amazing Sunset Timelapse from Mount Wilson Observatory',
    creator: {
      name: 'Nature Explorer',
      avatar: MOCK_IMAGES.AVATARS[0],
      verified: true,
      subscribers: '890K',
      isSubscribed: false
    },
    thumbnail: MOCK_IMAGES.POSTS[0],
    duration: '3:45',
    views: 125000,
    likes: 8900,
    dislikes: 234,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    description: `Watch this breathtaking sunset timelapse captured from Mount Wilson Observatory. This 4K footage showcases the natural beauty of the golden hour as the sun sets behind the mountains.

Shot with:
- Canon EOS R5
- 24-70mm f/2.8 lens
- Intervalometer for timelapse
- Neutral density filters

The location offers one of the best vantage points for sunset photography in Southern California. The clear mountain air and elevated position provide stunning views of the surrounding landscape.

Don't forget to like and subscribe for more nature content!

#sunset #timelapse #nature #photography #mountains #california #4k`,
    category: 'Nature',
    tags: ['sunset', 'timelapse', 'nature', 'photography', 'mountains', 'california', '4k'],
    commentsCount: 1247
  });

  const handleLike = () => {
    setVideo(prev => ({
      ...prev,
      likes: prev.likes + 1
    }));
  };

  const handleDislike = () => {
    setVideo(prev => ({
      ...prev,
      dislikes: prev.dislikes + 1
    }));
  };

  const handleSubscribe = () => {
    setVideo(prev => ({
      ...prev,
      creator: {
        ...prev.creator,
        isSubscribed: !prev.creator.isSubscribed
      }
    }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log('Video link copied to clipboard');
  };

  const handleVideoSelect = (newVideoId: string) => {
    navigate(`/watch/${newVideoId}`);
  };

  const handleTimeUpdate = (currentTime: number) => {
    // Track watch time for analytics
    console.log('Video time:', currentTime);
  };

  const handleVideoEnded = () => {
    console.log('Video ended');
    // Auto-play next video or show end screen
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <VideoPlayer
              video={video}
              autoPlay={true}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
            />

            {/* Video Details */}
            <VideoDetails
              video={video}
              onLike={handleLike}
              onDislike={handleDislike}
              onSubscribe={handleSubscribe}
              onShare={handleShare}
            />

            {/* Comments */}
            <VideoComments
              videoId={video.id}
              commentsCount={video.commentsCount}
            />
          </div>

          {/* Sidebar - Recommendations */}
          <div className="lg:col-span-1">
            <VideoRecommendations
              currentVideoId={video.id}
              onVideoSelect={handleVideoSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoWatch;