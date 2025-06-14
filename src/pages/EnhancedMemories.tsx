
import React, { useState } from 'react';
import { Calendar, Heart, MessageCircle, Share, Camera, Clock, MapPin } from 'lucide-react';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

interface Memory {
  id: string;
  type: 'photo' | 'post' | 'event';
  title: string;
  date: string;
  yearsAgo: number;
  images: string[];
  content?: string;
  location?: string;
  peopleTagged?: string[];
  interactions: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const EnhancedMemories = () => {
  const [memories] = useState<Memory[]>([
    {
      id: '1',
      type: 'photo',
      title: 'Trip to the Mountains',
      date: 'March 14, 2021',
      yearsAgo: 3,
      images: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=800&h=600&fit=crop'
      ],
      content: 'Amazing hiking trip with friends! The view from the top was absolutely breathtaking.',
      location: 'Yosemite National Park',
      peopleTagged: ['Sarah Johnson', 'Mike Chen'],
      interactions: {
        likes: 24,
        comments: 8,
        shares: 3
      }
    },
    {
      id: '2',
      type: 'post',
      title: 'First Day at New Job',
      date: 'March 14, 2020',
      yearsAgo: 4,
      images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop'],
      content: 'Excited to start this new chapter! Looking forward to the challenges ahead. 💻',
      interactions: {
        likes: 45,
        comments: 12,
        shares: 5
      }
    },
    {
      id: '3',
      type: 'event',
      title: 'College Graduation',
      date: 'March 14, 2019',
      yearsAgo: 5,
      images: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop'],
      content: 'Finally graduated! Four years of hard work paid off. Thank you to everyone who supported me.',
      location: 'University Campus',
      interactions: {
        likes: 89,
        comments: 25,
        shares: 8
      }
    }
  ]);

  const [selectedYear, setSelectedYear] = useState('All');

  const years = ['All', '1 year ago', '2 years ago', '3 years ago', '4 years ago', '5+ years ago'];

  const handleShare = (memoryTitle: string) => {
    toast.success(`Shared memory: ${memoryTitle}`);
  };

  const handleLike = (memoryId: string) => {
    toast.success('Liked memory!');
  };

  const handleComment = (memoryId: string) => {
    toast.info('Comment feature coming soon!');
  };

  const getMemoryIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="w-5 h-5 text-blue-500" />;
      case 'event': return <Calendar className="w-5 h-5 text-green-500" />;
      default: return <MessageCircle className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Memories</h1>
          <p className="text-gray-600">Look back on your favorite moments</p>
        </div>

        {/* Today's Date */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">March 14, 2024</h2>
            <p className="text-blue-100">See what happened on this day in previous years</p>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6 overflow-x-auto">
          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedYear(year)}
              className="whitespace-nowrap"
            >
              {year}
            </Button>
          ))}
        </div>

        {/* Memories Timeline */}
        <div className="space-y-6">
          {memories.map((memory) => (
            <Card key={memory.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {getMemoryIcon(memory.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{memory.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{memory.date} • {memory.yearsAgo} years ago</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {memory.yearsAgo} years ago
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {memory.content && (
                    <p className="text-gray-900 mb-4">{memory.content}</p>
                  )}

                  {/* Location */}
                  {memory.location && (
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{memory.location}</span>
                    </div>
                  )}

                  {/* Images */}
                  <div className={`grid gap-2 mb-4 ${
                    memory.images.length === 1 ? 'grid-cols-1' : 
                    memory.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                  }`}>
                    {memory.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Memory ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Tagged People */}
                  {memory.peopleTagged && memory.peopleTagged.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">With:</p>
                      <div className="flex flex-wrap gap-2">
                        {memory.peopleTagged.map((person, index) => (
                          <Badge key={index} variant="outline" className="text-blue-600">
                            {person}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>{memory.interactions.likes} likes</span>
                      <span>{memory.interactions.comments} comments</span>
                      <span>{memory.interactions.shares} shares</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(memory.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Heart className="w-4 h-4" />
                      </AccessibleButton>
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleComment(memory.id)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </AccessibleButton>
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(memory.title)}
                        className="text-gray-600 hover:text-green-600"
                      >
                        <Share className="w-4 h-4" />
                      </AccessibleButton>
                    </div>
                  </div>

                  {/* Share Memory Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button
                      onClick={() => handleShare(memory.title)}
                      variant="outline"
                      className="w-full"
                    >
                      Share this memory
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {memories.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No memories for this day</h3>
            <p className="text-gray-500">Check back on other days to see your memories.</p>
          </div>
        )}
      </div>
      <MobileNavigation />
    </div>
  );
};

export default EnhancedMemories;
