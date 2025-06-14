
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Share, Heart, Calendar } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Memories = () => {
  const memories = [
    {
      id: 1,
      date: 'December 14, 2023',
      yearsAgo: 1,
      type: 'post',
      content: 'Had an amazing day at the React conference! Learned so much about the future of web development. 🚀',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      date: 'December 14, 2022',
      yearsAgo: 2,
      type: 'photo',
      content: 'Throwback to this beautiful sunset from our vacation 🌅',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
      likes: 45,
      comments: 12
    },
    {
      id: 3,
      date: 'December 14, 2021',
      yearsAgo: 3,
      type: 'milestone',
      content: 'Started my journey in web development today! Excited for what\'s ahead 💻',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      likes: 67,
      comments: 23
    }
  ];

  const handleShare = (memory: any) => {
    toast.success('Memory shared!');
  };

  const handleLike = (memory: any) => {
    toast.info('Liked memory');
  };

  const handleComment = (memory: any) => {
    toast.info('Opening comments for memory');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Memories</h1>
              <p className="text-gray-600">Look back on your posts, photos and experiences</p>
            </div>

            {/* Today's Memories Header */}
            <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8" />
                  <div>
                    <h2 className="text-xl font-bold">On This Day</h2>
                    <p className="text-blue-100">December 14th memories from previous years</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Memories List */}
            <div className="space-y-6">
              {memories.map((memory) => (
                <Card key={memory.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">John Doe</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{memory.date} • {memory.yearsAgo} year{memory.yearsAgo > 1 ? 's' : ''} ago</span>
                        </div>
                      </div>
                      <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {memory.yearsAgo} year{memory.yearsAgo > 1 ? 's' : ''} ago
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-900 mb-4">{memory.content}</p>
                    
                    {memory.image && (
                      <img
                        src={memory.image}
                        alt="Memory"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}

                    {/* Memory Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span>{memory.likes}</span>
                        </span>
                        <span>{memory.comments} comments</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-around border-t pt-3">
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        className="flex-1 flex items-center justify-center space-x-2 py-2"
                        onClick={() => handleLike(memory)}
                      >
                        <Heart className="w-5 h-5" />
                        <span>Like</span>
                      </AccessibleButton>
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        className="flex-1 flex items-center justify-center space-x-2 py-2"
                        onClick={() => handleComment(memory)}
                      >
                        <Clock className="w-5 h-5" />
                        <span>Comment</span>
                      </AccessibleButton>
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        className="flex-1 flex items-center justify-center space-x-2 py-2"
                        onClick={() => handleShare(memory)}
                      >
                        <Share className="w-5 h-5" />
                        <span>Share</span>
                      </AccessibleButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {memories.length === 0 && (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No memories today</h3>
                <p className="text-gray-600">Check back another day for memories from your past</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Memories;
