
import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AccessibleButton from './AccessibleButton';
import StoryViewer from './StoryViewer';
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
  isViewed: boolean;
}

const Stories = () => {
  const [stories] = useState<Story[]>([
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      content: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop'
      },
      timestamp: '2 hours ago',
      views: 127,
      isViewed: false
    },
    {
      id: '2',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      content: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop'
      },
      timestamp: '4 hours ago',
      views: 85,
      isViewed: true
    },
    {
      id: '3',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      content: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=600&fit=crop'
      },
      timestamp: '6 hours ago',
      views: 203,
      isViewed: false
    }
  ]);

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showStoryViewer, setShowStoryViewer] = useState(false);

  const handleCreateStory = () => {
    toast.success('Story creation feature coming soon!');
    console.log('Create story clicked');
  };

  const handleStoryClick = (storyIndex: number) => {
    setCurrentStoryIndex(storyIndex);
    setShowStoryViewer(true);
    console.log('Story clicked:', stories[storyIndex].user.name);
  };

  const handleCloseStoryViewer = () => {
    setShowStoryViewer(false);
  };

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      setShowStoryViewer(false);
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {/* Create Story Card */}
          <div className="flex-shrink-0">
            <Card 
              className="w-24 h-40 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden"
              onClick={handleCreateStory}
            >
              <div className="h-32 bg-gradient-to-b from-blue-500 to-blue-600"></div>
              <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <div className="p-2 text-center">
                <span className="text-xs font-medium text-gray-900">Create Story</span>
              </div>
            </Card>
          </div>

          {/* Story Cards */}
          {stories.map((story, index) => (
            <div key={story.id} className="flex-shrink-0">
              <Card 
                className="w-24 h-40 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden"
                onClick={() => handleStoryClick(index)}
              >
                <div className="relative h-full">
                  <img
                    src={story.content.url}
                    alt={`${story.user.name}'s story`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  
                  {/* User Avatar */}
                  <div className="absolute top-2 left-2">
                    <Avatar className={`w-8 h-8 ring-2 ${story.isViewed ? 'ring-gray-300' : 'ring-blue-500'}`}>
                      <AvatarImage src={story.user.avatar} />
                      <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="bg-white bg-opacity-90 rounded-full p-2">
                      <Play className="w-4 h-4 text-gray-800" />
                    </div>
                  </div>
                  
                  {/* User Name */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-white text-xs font-medium drop-shadow-lg line-clamp-2">
                      {story.user.name}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer */}
      <Dialog open={showStoryViewer} onOpenChange={setShowStoryViewer}>
        <DialogContent className="max-w-md h-[80vh] p-0">
          <StoryViewer
            stories={stories}
            currentIndex={currentStoryIndex}
            onClose={handleCloseStoryViewer}
            onNext={handleNextStory}
            onPrevious={handlePreviousStory}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Stories;
