
import React, { useState } from 'react';
import { Image, Smile, MapPin, Users, MoreHorizontal, Camera, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import AccessibleButton from './AccessibleButton';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [privacy, setPrivacy] = useState('Public');

  const handleSubmit = () => {
    if (postContent.trim()) {
      console.log('Posting:', postContent);
      toast.success('Post created successfully!');
      setPostContent('');
      setIsExpanded(false);
    } else {
      toast.error('Please write something before posting');
    }
  };

  const handleAddPhoto = () => {
    toast.info('Photo/Video feature coming soon!');
    console.log('Add photo/video clicked');
  };

  const handleAddFeeling = () => {
    toast.info('Feeling/Activity feature coming soon!');
    console.log('Add feeling clicked');
  };

  const handleAddLocation = () => {
    toast.info('Location feature coming soon!');
    console.log('Add location clicked');
  };

  const handleTagPeople = () => {
    toast.info('Tag people feature coming soon!');
    console.log('Tag people clicked');
  };

  const handleMoreOptions = () => {
    toast.info('More options coming soon!');
    console.log('More options clicked');
  };

  const handlePrivacyChange = () => {
    const privacyOptions = ['Public', 'Friends', 'Only me'];
    const currentIndex = privacyOptions.indexOf(privacy);
    const nextIndex = (currentIndex + 1) % privacyOptions.length;
    setPrivacy(privacyOptions[nextIndex]);
    toast.info(`Privacy changed to ${privacyOptions[nextIndex]}`);
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
              className="min-h-[50px] border-none resize-none focus:ring-0 focus:border-none p-0 text-lg placeholder:text-gray-500"
            />
            
            {isExpanded && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Post to:</span>
                  <AccessibleButton
                    variant="outline"
                    size="sm"
                    onClick={handlePrivacyChange}
                    className="text-blue-600 border-blue-600"
                  >
                    {privacy}
                  </AccessibleButton>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <AccessibleButton
                    variant="ghost"
                    className="flex items-center justify-center space-x-2 p-3 hover:bg-gray-50 rounded-lg"
                    onClick={handleAddPhoto}
                  >
                    <Camera className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Photo/Video</span>
                  </AccessibleButton>
                  
                  <AccessibleButton
                    variant="ghost"
                    className="flex items-center justify-center space-x-2 p-3 hover:bg-gray-50 rounded-lg"
                    onClick={handleTagPeople}
                  >
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Tag People</span>
                  </AccessibleButton>
                  
                  <AccessibleButton
                    variant="ghost"
                    className="flex items-center justify-center space-x-2 p-3 hover:bg-gray-50 rounded-lg"
                    onClick={handleAddFeeling}
                  >
                    <Smile className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-700">Feeling</span>
                  </AccessibleButton>
                  
                  <AccessibleButton
                    variant="ghost"
                    className="flex items-center justify-center space-x-2 p-3 hover:bg-gray-50 rounded-lg"
                    onClick={handleAddLocation}
                  >
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">Location</span>
                  </AccessibleButton>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t">
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={handleMoreOptions}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </AccessibleButton>
                  
                  <AccessibleButton
                    onClick={handleSubmit}
                    disabled={!postContent.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    Post
                  </AccessibleButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
