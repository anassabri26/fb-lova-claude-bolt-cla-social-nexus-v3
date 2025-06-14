
import React from 'react';
import { Plus, Play } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const Stories = () => {
  const stories = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop',
      hasNew: true
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop',
      hasNew: true
    },
    {
      id: 3,
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=600&fit=crop',
      hasNew: false
    }
  ];

  const handleCreateStory = () => {
    toast.info('Create story feature coming soon!');
  };

  const handleViewStory = (user: any) => {
    toast.info(`Viewing ${user.name}'s story`);
  };

  return (
    <div className="flex space-x-3 p-4 overflow-x-auto">
      {/* Create Story */}
      <div className="flex-shrink-0">
        <Card className="w-28 h-44 cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden">
          <CardContent className="p-0 h-full">
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop&crop=face"
                alt="Your story"
                className="w-full h-3/4 object-cover"
              />
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <AccessibleButton
                  size="sm"
                  className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 p-0"
                  onClick={handleCreateStory}
                >
                  <Plus className="w-4 h-4" />
                </AccessibleButton>
              </div>
              <div className="h-1/4 bg-white flex items-center justify-center">
                <span className="text-xs font-medium text-center px-1">Create Story</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Story Items */}
      {stories.map((story) => (
        <div key={story.id} className="flex-shrink-0">
          <Card className="w-28 h-44 cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden">
            <CardContent className="p-0 h-full" onClick={() => handleViewStory(story.user)}>
              <div className="relative h-full">
                <img
                  src={story.image}
                  alt={`${story.user.name}'s story`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-2 left-2">
                  <Avatar className={`w-8 h-8 border-2 ${story.hasNew ? 'border-blue-500' : 'border-gray-300'}`}>
                    <AvatarImage src={story.user.avatar} />
                    <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium truncate">
                    {story.user.name}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Stories;
