
import React from 'react';
import { Clock, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AccessibleButton from './AccessibleButton';

interface Memory {
  id: string;
  date: string;
  year: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

interface MemoryCardProps {
  memory: Memory;
}

const MemoryCard = ({ memory }: MemoryCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-medium">On this day</span>
          </div>
          <p className="text-sm opacity-90">{memory.date}</p>
        </div>
        
        <div className="p-4">
          <div className="flex items-start space-x-3 mb-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">{memory.year}</p>
            </div>
          </div>
          
          <p className="text-gray-800 mb-3">{memory.content}</p>
          
          {memory.image && (
            <img
              src={memory.image}
              alt="Memory"
              className="w-full h-64 object-cover rounded-lg mb-3"
            />
          )}
          
          <div className="flex items-center space-x-4 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-1 text-gray-600">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{memory.likes}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{memory.comments}</span>
            </div>
          </div>
          
          <div className="mt-3">
            <AccessibleButton className="w-full bg-blue-600 hover:bg-blue-700">
              Share Memory
            </AccessibleButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemoryCard;
