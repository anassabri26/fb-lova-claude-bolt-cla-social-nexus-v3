
import React, { useState } from 'react';
import { Plus, Play } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Story {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  viewed: boolean;
}

const Stories = () => {
  const [stories] = useState<Story[]>([
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop',
      viewed: false
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop',
      viewed: true
    },
    {
      id: 3,
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=600&fit=crop',
      viewed: false
    }
  ]);

  return (
    <Card className="bg-white shadow-sm border-0 shadow-gray-100 mb-6">
      <CardContent className="p-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {/* Create Story */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-32 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop&crop=face"
                alt="Your story"
                className="w-full h-20 object-cover"
              />
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <p className="text-xs font-medium text-gray-900 text-center">Create Story</p>
              </div>
            </div>
          </div>

          {/* Stories */}
          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0 relative group cursor-pointer">
              <div className={`w-24 h-32 rounded-lg overflow-hidden relative ${
                story.viewed ? 'ring-2 ring-gray-300' : 'ring-2 ring-blue-500'
              }`}>
                <img
                  src={story.image}
                  alt={`${story.user.name}'s story`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
                
                {/* Profile Picture */}
                <div className="absolute top-2 left-2">
                  <Avatar className={`w-8 h-8 ${story.viewed ? 'ring-2 ring-gray-300' : 'ring-2 ring-blue-500'}`}>
                    <AvatarImage src={story.user.avatar} />
                    <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 rounded-full p-2">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>

                {/* Name */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs font-medium text-white text-center leading-tight">
                    {story.user.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Stories;
