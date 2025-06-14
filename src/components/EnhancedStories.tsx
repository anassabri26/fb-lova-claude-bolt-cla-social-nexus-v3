
import React, { useState } from 'react';
import { Plus, Play } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import StoryCreationModal from './StoryCreationModal';
import StoryModal from './StoryModal';
import { toast } from 'sonner';

const EnhancedStories = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const stories = [
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop',
      timestamp: '2h ago',
      duration: 15
    },
    {
      id: '2',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop',
      timestamp: '4h ago',
      duration: 10
    },
    {
      id: '3',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop',
      timestamp: '6h ago',
      duration: 12
    }
  ];

  const handleStoryClick = (story: any, index: number) => {
    setSelectedStoryIndex(index);
    setIsStoryModalOpen(true);
    console.log('Story clicked:', story);
  };

  return (
    <>
      <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
        {/* Create Story Card */}
        <Card className="flex-shrink-0 w-28 h-44 cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-0 h-full relative">
            <div 
              className="h-32 bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="p-2 text-center">
              <p className="text-xs font-medium text-gray-900">Create Story</p>
            </div>
          </CardContent>
        </Card>

        {/* Story Cards */}
        {stories.map((story, index) => (
          <Card 
            key={story.id} 
            className="flex-shrink-0 w-28 h-44 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden"
            onClick={() => handleStoryClick(story, index)}
          >
            <CardContent className="p-0 h-full relative">
              <div className="absolute inset-0">
                <img
                  src={story.image}
                  alt={`${story.user.name}'s story`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
              </div>
              
              {/* User Avatar */}
              <div className="absolute top-2 left-2">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={story.user.avatar} />
                  <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              {/* Play Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-4 h-4 text-white fill-current" />
                </div>
              </div>

              {/* User Name */}
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs font-medium text-white truncate">
                  {story.user.name}
                </p>
                <p className="text-xs text-white/80">
                  {story.timestamp}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <StoryCreationModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        stories={stories}
        currentStoryIndex={selectedStoryIndex}
      />
    </>
  );
};

export default EnhancedStories;
