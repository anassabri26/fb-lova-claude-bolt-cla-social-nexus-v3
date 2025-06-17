import React, { useState, useEffect } from 'react';
import { Plus, Play, X, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MOCK_IMAGES } from '@/lib/constants';
import { toast } from 'sonner';
import StoryCreator from './StoryCreator';

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  timestamp: string;
  isViewed: boolean;
  type: 'photo' | 'video' | 'text';
  content?: string;
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
      image: MOCK_IMAGES.POSTS[0],
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
      image: MOCK_IMAGES.POSTS[1],
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
      image: MOCK_IMAGES.POSTS[2],
      timestamp: '6h',
      isViewed: false,
      content: 'Having a great day! 🌟',
      background: 'bg-gradient-to-br from-purple-500 to-pink-500'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);

  // Handle story progress
  useEffect(() => {
    if (selectedStory) {
      const duration = selectedStory.type === 'video' ? 15000 : 5000; // 15s for video, 5s for others
      const interval = 100; // Update every 100ms
      const increment = (interval / duration) * 100;
      
      const timer = setInterval(() => {
        setStoryProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            // Auto-close or move to next story
            setTimeout(() => setSelectedStory(null), 500);
            return 0;
          }
          return prev + increment;
        });
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [selectedStory]);

  const handleCreateStory = () => {
    setIsCreateModalOpen(true);
  };

  const handleViewStory = (story: Story) => {
    setSelectedStory(story);
    setStoryProgress(0);
    
    // Mark as viewed
    setStories(prev => prev.map(s => 
      s.id === story.id ? { ...s, isViewed: true } : s
    ));
  };

  const handleCreateStorySubmit = (storyData: any) => {
    const newStory: Story = {
      id: `story_${Date.now()}`,
      type: storyData.type,
      user: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      image: storyData.media || '',
      timestamp: 'now',
      isViewed: false,
      content: storyData.content,
      background: storyData.background
    };

    setStories(prev => [newStory, ...prev]);
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
          {stories.map((story) => (
            <Card 
              key={story.id} 
              className="flex-shrink-0 w-28 h-44 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden"
              onClick={() => handleViewStory(story)}
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
                    src={story.image}
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

      {/* Story Viewer Modal */}
      {selectedStory && (
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="max-w-md p-0 bg-black">
            <div className="relative h-[80vh]">
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 z-10 p-2">
                <div className="w-full h-1 bg-white/30 rounded-full">
                  <div 
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${storyProgress}%` }}
                  ></div>
                </div>
              </div>
              
              {selectedStory.type === 'text' ? (
                <div className={`w-full h-full ${selectedStory.background || 'bg-gradient-to-br from-purple-500 to-pink-500'} flex items-center justify-center p-6`}>
                  <p className="text-white text-lg font-medium text-center">
                    {selectedStory.content}
                  </p>
                </div>
              ) : (
                <img
                  src={selectedStory.image}
                  alt={`${selectedStory.user.name}'s story`}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedStory.user.avatar} />
                    <AvatarFallback>{selectedStory.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium text-sm">{selectedStory.user.name}</p>
                    <p className="text-white text-xs opacity-75">{selectedStory.timestamp}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedStory(null)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Reply Input */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex space-x-2">
                  <input
                    placeholder={`Reply to ${selectedStory.user.name}...`}
                    className="w-full bg-white/20 backdrop-blur-sm border-0 text-white placeholder:text-white/70 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button variant="ghost" className="text-white bg-white/20 rounded-full">
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
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