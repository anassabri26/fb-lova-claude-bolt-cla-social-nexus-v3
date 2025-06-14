
import React, { useState } from 'react';
import { Plus, Camera, Type, Music } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import AccessibleButton from './AccessibleButton';

const StoryCreator = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCreateStory = () => {
    toast.success('Story creator opened!');
    console.log('Create story clicked');
  };

  const handleAddPhoto = () => {
    toast.info('Photo story feature coming soon!');
    console.log('Add photo to story clicked');
  };

  const handleAddText = () => {
    toast.info('Text story feature coming soon!');
    console.log('Add text to story clicked');
  };

  const handleAddMusic = () => {
    toast.info('Music story feature coming soon!');
    console.log('Add music to story clicked');
  };

  return (
    <Card 
      className="relative overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCreateStory}
    >
      <CardContent className="p-0">
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          
          {/* User Avatar */}
          <div className="absolute top-4 left-4">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>

          {/* Add Story Button */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="bg-white bg-opacity-90 hover:bg-opacity-100 text-blue-600 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                handleCreateStory();
              }}
              aria-label="Create story"
            >
              <Plus className="w-5 h-5" />
            </AccessibleButton>
          </div>

          {/* Story Options (visible on hover) */}
          {isHovered && (
            <div className="absolute top-4 right-4 space-y-2 animate-fade-in">
              <AccessibleButton
                variant="ghost"
                size="sm"
                className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddPhoto();
                }}
                aria-label="Add photo"
              >
                <Camera className="w-4 h-4" />
              </AccessibleButton>
              <AccessibleButton
                variant="ghost"
                size="sm"
                className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddText();
                }}
                aria-label="Add text"
              >
                <Type className="w-4 h-4" />
              </AccessibleButton>
              <AccessibleButton
                variant="ghost"
                size="sm"
                className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddMusic();
                }}
                aria-label="Add music"
              >
                <Music className="w-4 h-4" />
              </AccessibleButton>
            </div>
          )}
        </div>
        
        <div className="p-3 text-center">
          <span className="text-sm font-medium text-gray-900">Create story</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryCreator;
