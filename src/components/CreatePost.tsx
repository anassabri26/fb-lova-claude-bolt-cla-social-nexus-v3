
import React from 'react';
import { Image, Smile, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const CreatePost = () => {
  return (
    <Card className="bg-white shadow-sm border-0 shadow-gray-100">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind, Jane?"
              className="border-none resize-none p-0 text-gray-700 placeholder-gray-500 text-lg focus:ring-0 focus:outline-none bg-transparent"
              rows={3}
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                <Image className="w-5 h-5 text-green-500" />
                <span className="hidden sm:inline">Photo/Video</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                <Smile className="w-5 h-5 text-yellow-500" />
                <span className="hidden sm:inline">Feeling</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="hidden sm:inline">Location</span>
              </Button>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
              Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
