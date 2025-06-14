
import React, { useState } from 'react';
import { Image, Video, Smile, MapPin, Users, Calendar, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const EnhancedCreatePost = () => {
  const [postText, setPostText] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [feeling, setFeeling] = useState('');
  const [location, setLocation] = useState('');
  const [taggedFriends, setTaggedFriends] = useState<string[]>([]);

  const handleImageUpload = () => {
    // Simulate image selection
    const mockImages = [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
    ];
    setSelectedImages([...selectedImages, mockImages[0]]);
    toast.success('Image added!');
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (!postText.trim() && selectedImages.length === 0) {
      toast.error('Please add some content to your post');
      return;
    }

    toast.success('Post created successfully!');
    setPostText('');
    setSelectedImages([]);
    setFeeling('');
    setLocation('');
    setTaggedFriends([]);
  };

  const addFeeling = () => {
    setFeeling('happy');
    toast.info('Feeling added!');
  };

  const addLocation = () => {
    setLocation('New York, NY');
    toast.info('Location added!');
  };

  const tagFriends = () => {
    setTaggedFriends(['Sarah Johnson']);
    toast.info('Friends tagged!');
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind, John?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="min-h-[100px] border-none resize-none focus:ring-0 text-lg placeholder:text-gray-500"
            />

            {/* Selected Images */}
            {selectedImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </AccessibleButton>
                  </div>
                ))}
              </div>
            )}

            {/* Post Additions */}
            {(feeling || location || taggedFriends.length > 0) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {feeling && (
                  <span className="text-blue-600 text-sm">— feeling {feeling}</span>
                )}
                {location && (
                  <span className="text-blue-600 text-sm">— at {location}</span>
                )}
                {taggedFriends.length > 0 && (
                  <span className="text-blue-600 text-sm">
                    — with {taggedFriends.join(', ')}
                  </span>
                )}
              </div>
            )}

            {/* Post Options */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  onClick={handleImageUpload}
                  className="flex items-center space-x-2 text-green-600 hover:bg-green-50"
                >
                  <Image className="w-5 h-5" />
                  <span>Photo</span>
                </AccessibleButton>
                
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-red-600 hover:bg-red-50"
                >
                  <Video className="w-5 h-5" />
                  <span>Video</span>
                </AccessibleButton>

                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  onClick={addFeeling}
                  className="flex items-center space-x-2 text-yellow-600 hover:bg-yellow-50"
                >
                  <Smile className="w-5 h-5" />
                  <span>Feeling</span>
                </AccessibleButton>

                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  onClick={addLocation}
                  className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Location</span>
                </AccessibleButton>

                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  onClick={tagFriends}
                  className="flex items-center space-x-2 text-purple-600 hover:bg-purple-50"
                >
                  <Users className="w-5 h-5" />
                  <span>Tag</span>
                </AccessibleButton>
              </div>

              <Button
                onClick={handlePost}
                disabled={!postText.trim() && selectedImages.length === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCreatePost;
