import React, { useState, useEffect } from 'react';
import { Plus, Play, X, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_IMAGES } from '@/lib/constants';
import { toast } from 'sonner';
import StoryCreator from './StoryCreator';
import StoryViewer from './StoryViewer';

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  media: string;
  content: string;
  timestamp: string;
  isViewed: boolean;
  type: 'photo' | 'video' | 'text';
  background?: string;
}

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      type: 'photo',
      user: {
        name: 'Sarah Johnson',
        avatar: MOCK_IMAGES.AVATARS[0]
      },
      media: MOCK_IMAGES.POSTS[0],
      content: 'Amazing sunset today!',
      timestamp: '2h',
      isViewed: false
    },
    {
      id: '2',
      type: 'video',
      user: {
        name: 'Mike Chen',
        avatar: MOCK_IMAGES.AVATARS[1]
      },
      media: MOCK_IMAGES.POSTS[1],
      content: 'Check out this cool place!',
      timestamp: '4h',
      isViewed: true
    },
    {
      id: '3',
      type: 'text',
      user: {
        name: 'Emma Wilson',
        avatar: MOCK_IMAGES.AVATARS[2]
      },
      media: '',
      content: 'Having a great day! 🌟',
      timestamp: '6h',
      isViewed: false,
      background: 'bg-gradient-to-br from-purple-500 to-pink-500'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const handleCreateStory = () => {
    setIsCreateModalOpen(true);
  };

  const handleViewStory = (index: number) => {
    setSelectedStoryIndex(index);
    setViewerOpen(true);
    
    // Mark as viewed
    setStories(prev => prev.map((story, i) => 
      i === index ? { ...story, isViewed: true } : story
    ));
  };

  const handleCreateStorySubmit = (storyData: any) => {
    const newStory: Story = {
      id: `story_${Date.now()}`,
      type: storyData.type,
      user: {
        name: 'You',
        avatar: MOCK_IMAGES.AVATARS[7]
      },
      media: storyData.type === 'text' ? '' : storyData.media || '',
      content: storyData.content,
      timestamp: 'now',
      isViewed: false,
      background: storyData.type === 'text' ? storyData.background : undefined
    };

    setStories(prev => [newStory, ...prev]);
    toast.success('Story created successfully!');
  };

  const handleNavigateStory = (index: number) => {
    setSelectedStoryIndex(index);
    setStories(prev => prev.map((story, i) => 
      i === index ? { ...story, isViewed: true } : story
    ));
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex space-x-3 overflow-x-auto scrollbar-thin pb-2">
          {/* Create Story */}
          <Card className="flex-shrink-0 w-28 h-44 cursor-pointer hover:shadow-md transition-shadow" onClick={handleCreateStory}>
            <CardContent className="p-0 relative h-full">
              <div className="h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-lg flex items-center justify-center">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div className="p-2 text-center">
                <p className="text-xs font-medium text-gray-900 leading-tight">Create Story</p>
              </div>
            </CardContent>
          </Card>

          {/* Stories */}
          {stories.map((story, index) => (
            <Card 
              key={story.id} 
              className="flex-shrink-0 w-28 h-44 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden"
              onClick={() => handleViewStory(index)}
            >
              <CardContent className="p-0 relative h-full">
                {story.type === 'text' ? (
                  <div className={`w-full h-full ${story.background || 'bg-gradient-to-br from-purple-500 to-pink-500'} flex items-center justify-center p-2`}>
                    <p className="text-white text-xs font-medium text-center leading-tight">
                      {story.content}
                    </p>
                  </div>
                ) : (
                  <img
                    src={story.media}
                    alt={`${story.user.name}'s story`}
                    className="w-full h-full object-cover"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Avatar */}
                <div className={`absolute top-2 left-2 w-8 h-8 rounded-full border-2 ${story.isViewed ? 'border-gray-400' : 'border-blue-500'}`}>
                  <Avatar className="w-full h-full">
                    <AvatarImage src={story.user.avatar} />
                    <AvatarFallback className="text-xs">{story.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                {/* Story type indicator */}
                <div className="absolute top-2 right-2">
                  {story.type === 'video' && (
                    <div className="w-6 h-6 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-gray-800" />
                    </div>
                  )}
                  {story.type === 'text' && (
                    <div className="w-6 h-6 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                      <Type className="w-3 h-3 text-gray-800" />
                    </div>
                  )}
                </div>

                {/* User Name */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium truncate">{story.user.name}</p>
                  <p className="text-white text-xs opacity-75">{story.timestamp}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Story Creator Modal */}
      <StoryCreator
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateStory={handleCreateStorySubmit}
      />

      {/* Story Viewer */}
      <StoryViewer
        stories={stories}
        currentIndex={selectedStoryIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onNavigate={handleNavigateStory}
      />
    </>
  );
};

// Add missing Type icon component
const Type = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

export default Stories;