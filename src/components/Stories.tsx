import React, { useState, useEffect } from 'react';
import { Plus, Play, X, Camera, Video, Type, Smile, Music } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_IMAGES } from '@/lib/constants';
import { toast } from 'sonner';

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
      content: 'Having a great day! 🌟'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [storyType, setStoryType] = useState<'photo' | 'video' | 'text'>('photo');
  const [storyContent, setStoryContent] = useState('');
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

  const handleCreateStorySubmit = () => {
    const newStory: Story = {
      id: `story_${Date.now()}`,
      type: storyType,
      user: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      image: storyType === 'text' ? '' : MOCK_IMAGES.POSTS[Math.floor(Math.random() * MOCK_IMAGES.POSTS.length)],
      timestamp: 'now',
      isViewed: false,
      content: storyType === 'text' ? storyContent : undefined
    };

    setStories(prev => [newStory, ...prev]);
    setIsCreateModalOpen(false);
    setStoryContent('');
    toast.success('Story created successfully!');
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
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-2">
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

      {/* Create Story Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Story</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button
                variant={storyType === 'photo' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStoryType('photo')}
                className="flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                Photo
              </Button>
              <Button
                variant={storyType === 'video' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStoryType('video')}
                className="flex-1"
              >
                <Video className="w-4 h-4 mr-2" />
                Video
              </Button>
              <Button
                variant={storyType === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStoryType('text')}
                className="flex-1"
              >
                <Type className="w-4 h-4 mr-2" />
                Text
              </Button>
            </div>

            {storyType === 'text' && (
              <div>
                <Textarea
                  placeholder="What's on your mind?"
                  value={storyContent}
                  onChange={(e) => setStoryContent(e.target.value)}
                  rows={4}
                />
              </div>
            )}

            {(storyType === 'photo' || storyType === 'video') && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="space-y-2">
                  {storyType === 'photo' ? (
                    <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                  ) : (
                    <Video className="w-12 h-12 text-gray-400 mx-auto" />
                  )}
                  <p className="text-gray-600">
                    {storyType === 'photo' ? 'Add a photo to your story' : 'Add a video to your story'}
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>
            )}

            <div className="flex space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreateStorySubmit} className="flex-1">
                Share Story
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="max-w-md p-0 bg-black">
            <div className="relative h-96">
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
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-6">
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
                  <Input
                    placeholder={`Reply to ${selectedStory.user.name}...`}
                    className="bg-white/20 backdrop-blur-sm border-0 text-white placeholder:text-white/70"
                  />
                  <Button variant="ghost" className="text-white bg-white/20">
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

export default Stories;