
import React from 'react';
import { Calendar, Heart, MessageCircle, Share } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Memory {
  id: string;
  type: 'post' | 'photo' | 'friendship';
  content?: string;
  image?: string;
  yearsAgo: number;
  date: string;
  interactions: {
    likes: number;
    comments: number;
  };
}

interface MemoryCardProps {
  memory: Memory;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
  const handleShare = () => {
    toast.success('Memory shared to your timeline!');
  };

  const handleLike = () => {
    toast.success('Memory liked!');
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Memory Header */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {memory.yearsAgo} {memory.yearsAgo === 1 ? 'year' : 'years'} ago
              </h3>
              <p className="text-sm text-gray-600">{memory.date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-900">John Doe</span>
          </div>
        </div>

        {/* Memory Content */}
        <div className="p-4">
          {memory.content && (
            <p className="text-gray-900 mb-3">{memory.content}</p>
          )}
          
          {memory.image && (
            <div className="mb-4">
              <img
                src={memory.image}
                alt="Memory"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Interaction Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3 pt-3 border-t">
            <div className="flex items-center space-x-4">
              <span>{memory.interactions.likes} likes</span>
              <span>{memory.interactions.comments} comments</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
            >
              <Heart className="w-4 h-4" />
              <span>Like</span>
            </AccessibleButton>
            
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-600"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Comment</span>
            </AccessibleButton>
            
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50"
            >
              <Share className="w-4 h-4" />
              <span>Share Memory</span>
            </AccessibleButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemoryCard;
