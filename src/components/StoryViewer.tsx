
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Share } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: {
    type: 'image' | 'video' | 'text';
    url?: string;
    text?: string;
    backgroundColor?: string;
  };
  timestamp: string;
  views: number;
}

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StoryViewer = ({ stories, currentIndex, onClose, onNext, onPrevious }: StoryViewerProps) => {
  const [progress, setProgress] = useState(0);
  const story = stories[currentIndex];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          onNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex, onNext]);

  const handleReact = () => {
    toast.success('Reacted to story!');
  };

  const handleMessage = () => {
    toast.info('Message sent!');
  };

  const handleShare = () => {
    toast.success('Story shared!');
  };

  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex space-x-1">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-gray-600 rounded">
            <div 
              className="h-full bg-white rounded transition-all duration-100"
              style={{ 
                width: index < currentIndex ? '100%' : 
                       index === currentIndex ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Close button */}
      <AccessibleButton
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2"
      >
        <X className="w-6 h-6" />
      </AccessibleButton>

      {/* Navigation */}
      <AccessibleButton
        onClick={onPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </AccessibleButton>

      <AccessibleButton
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
        disabled={currentIndex === stories.length - 1}
      >
        <ChevronRight className="w-6 h-6" />
      </AccessibleButton>

      {/* Story content */}
      <div className="w-full max-w-md h-full relative">
        {story.content.type === 'image' && (
          <img 
            src={story.content.url} 
            alt="Story" 
            className="w-full h-full object-cover"
          />
        )}
        
        {story.content.type === 'text' && (
          <div 
            className="w-full h-full flex items-center justify-center text-white text-2xl font-bold p-8 text-center"
            style={{ backgroundColor: story.content.backgroundColor || '#1e40af' }}
          >
            {story.content.text}
          </div>
        )}

        {/* User info */}
        <div className="absolute top-16 left-4 flex items-center space-x-3">
          <Avatar className="w-10 h-10 border-2 border-white">
            <AvatarImage src={story.user.avatar} />
            <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-semibold">{story.user.name}</p>
            <p className="text-white text-sm opacity-75">{story.timestamp}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex space-x-4">
            <AccessibleButton onClick={handleReact} className="text-white">
              <Heart className="w-6 h-6" />
            </AccessibleButton>
            <AccessibleButton onClick={handleMessage} className="text-white">
              <MessageCircle className="w-6 h-6" />
            </AccessibleButton>
            <AccessibleButton onClick={handleShare} className="text-white">
              <Share className="w-6 h-6" />
            </AccessibleButton>
          </div>
          <span className="text-white text-sm">{story.views} views</span>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
