import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  media: string;
  type: 'image' | 'video' | 'text';
  timestamp: string;
  background?: string;
}

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const currentStory = stories[currentIndex];
  const storyDuration = currentStory?.type === 'video' ? 15000 : 5000; // 15s for video, 5s for others

  // Handle story progress
  useEffect(() => {
    if (!isOpen || isPaused) return;
    
    setProgress(0);
    const interval = 100; // Update every 100ms
    const increment = (interval / storyDuration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Auto-navigate to next story
          if (currentIndex < stories.length - 1) {
            onNavigate(currentIndex + 1);
          } else {
            onClose();
          }
          return 0;
        }
        return prev + increment;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [currentIndex, isOpen, isPaused, stories.length, storyDuration, onNavigate, onClose]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed like' : 'Liked story');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved' : 'Saved story');
  };

  const handleShare = () => {
    toast.success('Story shared');
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    toast.success(`Reply sent to ${currentStory.user.name}`);
    setReplyText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  if (!isOpen || !currentStory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 bg-black h-[90vh] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="sr-only">
            Story by {currentStory.user.name} - {currentStory.content}
          </DialogTitle>
        </DialogHeader>
        <div className="relative h-full flex flex-col">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 z-10 p-2 flex space-x-1">
            {stories.map((_, index) => (
              <div key={index} className="h-1 bg-white/30 rounded-full flex-1">
                {index === currentIndex ? (
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  ></div>
                ) : index < currentIndex ? (
                  <div className="h-full bg-white rounded-full w-full"></div>
                ) : null}
              </div>
            ))}
          </div>
          
          {/* Content */}
          <div 
            className="flex-1 flex items-center justify-center"
            onClick={() => setIsPaused(!isPaused)}
          >
            {currentStory.type === 'text' ? (
              <div 
                className={`w-full h-full ${currentStory.background || 'bg-gradient-to-br from-purple-500 to-pink-500'} flex items-center justify-center p-6`}
              >
                <p className="text-white text-xl font-medium text-center">
                  {currentStory.content}
                </p>
              </div>
            ) : currentStory.type === 'video' ? (
              <video
                src={currentStory.media}
                className="max-w-full max-h-full object-contain"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={currentStory.media}
                alt={currentStory.content}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
          
          {/* Navigation */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              disabled={currentIndex === 0}
              className="text-white bg-black/20 hover:bg-black/40 h-10 w-10 rounded-full ml-2"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              disabled={currentIndex === stories.length - 1}
              className="text-white bg-black/20 hover:bg-black/40 h-10 w-10 rounded-full mr-2"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 mt-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={currentStory.user.avatar} />
                <AvatarFallback>{currentStory.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium">{currentStory.user.name}</p>
                <p className="text-white/70 text-sm">{currentStory.timestamp}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-8 w-8 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Actions */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              className="bg-black/30 text-white hover:bg-black/50 h-10 w-10 rounded-full"
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              className="bg-black/30 text-white hover:bg-black/50 h-10 w-10 rounded-full"
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-white' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="bg-black/30 text-white hover:bg-black/50 h-10 w-10 rounded-full"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Reply Input */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-2">
            <Input
              placeholder={`Reply to ${currentStory.user.name}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-white/20 border-0 text-white placeholder:text-white/70 focus-visible:ring-white/50"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleSendReply();
              }}
              disabled={!replyText.trim()}
              className="bg-white/20 text-white hover:bg-white/30 h-10 w-10 rounded-full"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;