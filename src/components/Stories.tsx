import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StoryCreator from './StoryCreator';
import LiveVideoIndicator from './LiveVideoIndicator';

const Stories = () => {
  const stories = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop',
      isLive: false,
      viewerCount: 0
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop',
      isLive: true,
      viewerCount: 1247
    },
    {
      id: 3,
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=600&fit=crop',
      isLive: false,
      viewerCount: 0
    },
    {
      id: 4,
      user: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop',
      isLive: false,
      viewerCount: 0
    }
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {/* Create Story */}
      <div className="flex-shrink-0 w-32">
        <StoryCreator />
      </div>

      {/* Existing Stories */}
      {stories.map((story) => (
        <div key={story.id} className="flex-shrink-0 w-32">
          <Card className="overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105">
            <CardContent className="p-0">
              <div className="relative h-48">
                <img
                  src={story.image}
                  alt={`${story.user.name}'s story`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                
                {/* Live indicator */}
                <LiveVideoIndicator 
                  isLive={story.isLive} 
                  viewerCount={story.viewerCount} 
                />
                
                {/* User Avatar */}
                <div className="absolute top-3 left-3">
                  <Avatar className={`w-8 h-8 ring-2 ${story.isLive ? 'ring-red-500' : 'ring-blue-500'}`}>
                    <AvatarImage src={story.user.avatar} alt={`${story.user.name}'s profile`} />
                    <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                
                {/* User Name */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-lg">
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
