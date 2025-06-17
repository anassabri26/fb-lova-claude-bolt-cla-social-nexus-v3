import React, { useState, useEffect } from 'react';
import { Video, Users, Heart, MessageCircle, Share, Settings, Maximize, Minimize } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MOCK_IMAGES } from '@/lib/constants';

interface LiveStreamProps {
  streamId: string;
  title: string;
  streamer: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  viewerCount: number;
  isLive: boolean;
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
}

const LiveStream: React.FC<LiveStreamProps> = ({
  streamId,
  title,
  streamer,
  viewerCount,
  isLive
}) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Sarah Johnson',
      avatar: MOCK_IMAGES.AVATARS[0],
      message: 'Great stream! 🔥',
      timestamp: '2m'
    },
    {
      id: '2',
      user: 'Mike Chen',
      avatar: MOCK_IMAGES.AVATARS[1],
      message: 'This is amazing content!',
      timestamp: '1m'
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(234);
  const [isLiked, setIsLiked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentViewers, setCurrentViewers] = useState(viewerCount);

  // Simulate live viewer count changes
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setCurrentViewers(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(0, prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Simulate live comments
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const randomComments = [
        'Amazing content!',
        'Love this stream! ❤️',
        'Keep it up!',
        'This is so cool!',
        'Great work! 👏'
      ];
      
      const randomUsers = [
        { name: 'Alex Rodriguez', avatar: MOCK_IMAGES.AVATARS[5] },
        { name: 'Emma Wilson', avatar: MOCK_IMAGES.AVATARS[2] },
        { name: 'David Kim', avatar: MOCK_IMAGES.AVATARS[3] }
      ];

      if (Math.random() > 0.7) {
        const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
        const randomComment = randomComments[Math.floor(Math.random() * randomComments.length)];
        
        const newComment: Comment = {
          id: Date.now().toString(),
          user: randomUser.name,
          avatar: randomUser.avatar,
          message: randomComment,
          timestamp: 'now'
        };

        setComments(prev => [newComment, ...prev.slice(0, 19)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'You',
        avatar: MOCK_IMAGES.AVATARS[1],
        message: newComment,
        timestamp: 'now'
      };
      
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Watch ${streamer.name}'s live stream`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'max-w-4xl mx-auto'}`}>
      <Card className={`overflow-hidden ${isFullscreen ? 'h-full rounded-none' : ''}`}>
        <div className="relative">
          {/* Video Player */}
          <div className={`bg-black relative ${isFullscreen ? 'h-3/4' : 'h-64 md:h-96'}`}>
            <img
              src={MOCK_IMAGES.POSTS[0]}
              alt="Live stream"
              className="w-full h-full object-cover"
            />
            
            {/* Live Indicator */}
            {isLive && (
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <Badge className="bg-red-500 text-white animate-pulse">
                  <Video className="w-3 h-3 mr-1" />
                  LIVE
                </Badge>
                <Badge variant="secondary" className="bg-black bg-opacity-60 text-white">
                  <Users className="w-3 h-3 mr-1" />
                  {currentViewers.toLocaleString()}
                </Badge>
              </div>
            )}

            {/* Stream Controls */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stream Info */}
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={streamer.avatar} />
                  <AvatarFallback>{streamer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{streamer.name}</h3>
                    {streamer.verified && (
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{title}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-2 ${isLiked ? 'text-red-600' : 'text-gray-600'}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-600"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{comments.length}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center space-x-2 text-gray-600"
              >
                <Share className="w-5 h-5" />
                <span>Share</span>
              </Button>
            </div>

            {/* Live Comments */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Live Comments</h4>
              
              {/* Comment Input */}
              <div className="flex space-x-2 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={MOCK_IMAGES.AVATARS[1]} />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                  />
                  <Button onClick={handleSendComment} disabled={!newComment.trim()}>
                    Send
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <p className="text-sm font-medium">{comment.user}</p>
                        <p className="text-sm">{comment.message}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default LiveStream;