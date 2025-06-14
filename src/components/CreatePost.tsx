
import React, { useState } from 'react';
import { Image, Smile, MapPin, Users, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AccessibleButton from './AccessibleButton';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (postContent.trim()) {
      console.log('Posting:', postContent);
      setPostContent('');
      setIsExpanded(false);
    }
  };

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
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="border-none resize-none focus:ring-0 p-0 text-base placeholder-gray-500 bg-transparent"
              rows={isExpanded ? 3 : 1}
              aria-label="Create a new post"
            />
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">Add to your post</span>
              <div className="flex space-x-2">
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="p-2 text-green-600 hover:bg-green-50"
                  aria-label="Add photo"
                >
                  <Image className="w-5 h-5" />
                </AccessibleButton>
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="p-2 text-yellow-600 hover:bg-yellow-50"
                  aria-label="Add feeling"
                >
                  <Smile className="w-5 h-5" />
                </AccessibleButton>
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="p-2 text-red-600 hover:bg-red-50"
                  aria-label="Add location"
                >
                  <MapPin className="w-5 h-5" />
                </AccessibleButton>
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="p-2 text-blue-600 hover:bg-blue-50"
                  aria-label="Tag people"
                >
                  <Users className="w-5 h-5" />
                </AccessibleButton>
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="p-2 text-gray-600 hover:bg-gray-50"
                  aria-label="More options"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </AccessibleButton>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">Public</span>
              </div>
              <AccessibleButton
                onClick={handleSubmit}
                disabled={!postContent.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </AccessibleButton>
            </div>
          </div>
        )}

        {!isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between">
              <AccessibleButton
                variant="ghost"
                size="sm"
                className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 rounded-lg"
                aria-label="Add photo or video"
              >
                <Image className="w-5 h-5 text-green-600" />
                <span className="text-gray-600 font-medium">Photo/Video</span>
              </AccessibleButton>
              <AccessibleButton
                variant="ghost"
                size="sm"
                className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 rounded-lg"
                aria-label="Add feeling or activity"
              >
                <Smile className="w-5 h-5 text-yellow-600" />
                <span className="text-gray-600 font-medium">Feeling/Activity</span>
              </AccessibleButton>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatePost;
