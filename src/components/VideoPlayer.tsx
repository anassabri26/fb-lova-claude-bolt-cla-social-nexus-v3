import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, MoreHorizontal, Heart, MessageCircle, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
    creator: {
      name: string;
      avatar: string;
      verified: boolean;
    };
    thumbnail: string;
    duration: string;
    views: number;
    likes: number;
    timestamp: string;
    description: string;
  };
  autoPlay?: boolean;
  showControls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  video, 
  autoPlay = false, 
  showControls = true 
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className="overflow-hidden bg-black">
      <div 
        className="relative group"
        onMouseEnter={() => setShowControlsOverlay(true)}
        onMouseLeave={() => setShowControlsOverlay(false)}
      >
        <video
          ref={videoRef}
          className="w-full h-auto max-h-96 object-cover"
          poster={video.thumbnail}
          muted={isMuted}
          onClick={togglePlay}
        >
          <source src="#" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play/Pause Overlay */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity ${
            showControlsOverlay || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={togglePlay}
        >
          <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </div>
        </div>

        {/* Controls Overlay */}
        {showControls && (
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity ${
            showControlsOverlay ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/30 rounded-full mb-3">
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <CardContent className="p-4 bg-white">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={video.creator.avatar} />
            <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
            <div className="flex items-center space-x-1 mt-1">
              <p className="text-sm text-gray-600">{video.creator.name}</p>
              {video.creator.verified && (
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {video.views.toLocaleString()} views • {video.timestamp}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{video.likes + (isLiked ? 1 : 0)}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Comment</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-gray-600 hover:text-green-600"
            >
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;