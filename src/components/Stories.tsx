import React, { useState } from 'react';
import { Plus, Play, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_IMAGES } from '@/lib/constants';

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  timestamp: string;
  isViewed: boolean;
}

const Stories = () => {
  const [stories] = useState<Story[]>([
    {
      id: '1',
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
      user: {
        name: 'Emma Wilson',
        avatar: MOCK_IMAGES.AVATARS[2]
      },
      image: MOCK_IMAGES.POSTS[2],
      timestamp: '6h',
      isViewed: false
    }
  ]);

  const handleCreateStory = () => {
    // Create story functionality
  };

  const handleViewStory = (story: Story) => {
    // View story functionality
  };

  return (
    <div className="mb-6">
      <div className="flex space-x-3 overflow-x-auto scrollbar-thin pb-2">
        {/* Create Story */}
        <Card className="flex-shrink-0 w-28 h-44 cursor-pointer hover:shadow-md transition-shadow" onClick={handleCreateStory}>
          <CardContent className="p-0 relative h-full">
            <div className="h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-lg flex items-center justify-center">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <div className="p-2 text-center">
              <p className="text-xs font-medium text-gray-900">Create Story</p>
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
              <img
                src={story.image}
                alt={`${story.user.name}'s story`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Avatar */}
              <div className={`absolute top-2 left-2 w-8 h-8 rounded-full border-2 ${story.isViewed ? 'border-gray-400' : 'border-blue-500'}`}>
                <Avatar className="w-full h-full">
                  <AvatarImage src={story.user.avatar} />
                  <AvatarFallback className="text-xs">{story.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              {/* Play Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-gray-800 ml-0.5" />
                </div>
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
  );
};

export default Stories;