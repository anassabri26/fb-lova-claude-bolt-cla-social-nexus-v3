
import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  timestamp: string;
  duration: number;
}

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  currentStoryIndex: number;
}

const StoryModal = ({ isOpen, onClose, stories, currentStoryIndex }: StoryModalProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(currentStoryIndex);

  if (!isOpen) return null;

  const currentStory = stories[currentIndex];

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleReaction = () => {
    toast.success('Reaction sent!');
  };

  const handleShare = () => {
    toast.success('Story shared!');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md h-full bg-black">
        {/* Story Progress Bars */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
          {stories.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full ${
                index <= currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Story Header */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10 pt-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src={currentStory?.user.avatar} />
              <AvatarFallback>{currentStory?.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-medium">{currentStory?.user.name}</h3>
              <p className="text-white/80 text-sm">{currentStory?.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </AccessibleButton>
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </AccessibleButton>
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="text-white"
            >
              <MoreHorizontal className="w-5 h-5" />
            </AccessibleButton>
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white"
            >
              <X className="w-5 h-5" />
            </AccessibleButton>
          </div>
        </div>

        {/* Story Image */}
        <img
          src={currentStory?.image}
          alt={`${currentStory?.user.name}'s story`}
          className="w-full h-full object-cover"
        />

        {/* Navigation Areas */}
        <div className="absolute inset-0 flex">
          <div 
            className="w-1/2 h-full cursor-pointer"
            onClick={goToPrevious}
          />
          <div 
            className="w-1/2 h-full cursor-pointer"
            onClick={goToNext}
          />
        </div>

        {/* Story Actions */}
        <div className="absolute bottom-8 left-4 right-4 flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReaction}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            ❤️ React
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
