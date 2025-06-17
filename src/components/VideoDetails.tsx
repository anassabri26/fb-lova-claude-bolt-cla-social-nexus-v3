import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share, Download, Flag, Scissors, Plus, Bell, BellOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatNumber, formatTimeAgo } from '@/lib/utils';
import { MOCK_IMAGES } from '@/lib/constants';

interface VideoDetailsProps {
  video: {
    id: string;
    title: string;
    creator: {
      name: string;
      avatar: string;
      verified: boolean;
      subscribers: string;
      isSubscribed: boolean;
    };
    views: number;
    likes: number;
    dislikes: number;
    timestamp: string;
    description: string;
    category: string;
    tags: string[];
  };
  onLike: () => void;
  onDislike: () => void;
  onSubscribe: () => void;
  onShare: () => void;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({
  video,
  onLike,
  onDislike,
  onSubscribe,
  onShare
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setIsDisliked(false);
    onLike();
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    setIsLiked(false);
    onDislike();
  };

  const handleSubscribe = () => {
    onSubscribe();
    if (!video.creator.isSubscribed) {
      setIsNotificationEnabled(true);
    }
  };

  const handleNotificationToggle = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  const handleDownload = () => {
    console.log('Download video:', video.id);
  };

  const handleClip = () => {
    console.log('Create clip from video:', video.id);
  };

  const handleReport = () => {
    console.log('Report video:', video.id);
  };

  const truncatedDescription = video.description.length > 200 
    ? video.description.substring(0, 200) + '...'
    : video.description;

  return (
    <div className="space-y-4">
      {/* Video Title */}
      <h1 className="text-xl font-bold text-gray-900 leading-tight">
        {video.title}
      </h1>

      {/* Video Stats and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>{formatNumber(video.views)} views</span>
          <span>•</span>
          <span>{formatTimeAgo(video.timestamp)}</span>
          <Badge variant="outline">{video.category}</Badge>
        </div>

        <div className="flex items-center space-x-2">
          {/* Like/Dislike */}
          <div className="flex items-center bg-gray-100 rounded-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`rounded-l-full ${isLiked ? 'text-blue-600' : 'text-gray-600'}`}
            >
              <ThumbsUp className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span>{formatNumber(video.likes + (isLiked ? 1 : 0))}</span>
            </Button>
            <div className="w-px h-6 bg-gray-300"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDislike}
              className={`rounded-r-full ${isDisliked ? 'text-red-600' : 'text-gray-600'}`}
            >
              <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Share */}
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>

          {/* Download */}
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>

          {/* Clip */}
          <Button variant="outline" size="sm" onClick={handleClip}>
            <Scissors className="w-4 h-4 mr-1" />
            Clip
          </Button>

          {/* More Actions */}
          <Button variant="outline" size="sm" onClick={handleReport}>
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Creator Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={video.creator.avatar} />
              <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900">{video.creator.name}</h3>
                {video.creator.verified && (
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {video.creator.subscribers} subscribers
              </p>

              {/* Description */}
              <div className="text-sm text-gray-700">
                <p className="mb-2">
                  {showFullDescription ? video.description : truncatedDescription}
                </p>
                {video.description.length > 200 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="p-0 h-auto text-blue-600"
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </Button>
                )}
              </div>

              {/* Tags */}
              {video.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {video.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Subscribe Button */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleSubscribe}
                variant={video.creator.isSubscribed ? "outline" : "default"}
                className={video.creator.isSubscribed ? "bg-gray-100" : "bg-red-600 hover:bg-red-700"}
              >
                {video.creator.isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>

              {video.creator.isSubscribed && (
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoDetails;