import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, Smile, MapPin, Users, Calendar, Video, Mic, X, Globe, Lock, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCreatePost } from '@/hooks/usePosts';
import { usePerformance } from '@/hooks/usePerformance';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [feeling, setFeeling] = useState('');
  const [location, setLocation] = useState('');
  const [taggedFriends, setTaggedFriends] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState('public');
  const [isLive, setIsLive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();
  const createPostMutation = useCreatePost();
  const { trackInteraction } = usePerformance('CreatePost');

  const feelings = [
    '😊 happy', '😢 sad', '😍 loved', '😎 cool', '🤔 thoughtful', 
    '🎉 excited', '😴 tired', '🍕 hungry', '☕ caffeinated', '🏖️ relaxed'
  ];

  const privacyOptions = [
    { value: 'public', label: 'Public', icon: Globe, description: 'Anyone on or off Facebook' },
    { value: 'friends', label: 'Friends', icon: Users, description: 'Your friends on Facebook' },
    { value: 'private', label: 'Only me', icon: Lock, description: 'Only you' },
    { value: 'custom', label: 'Custom', icon: UserCheck, description: 'Specific friends' }
  ];

  const handleSubmit = async () => {
    if (!content.trim() && selectedImages.length === 0) {
      toast.error('Please add some content or images');
      return;
    }
    
    const endInteraction = trackInteraction('create-post');
    
    try {
      const postData = {
        content: content.trim(),
        imageUrl: selectedImages[0], // For now, just use first image
        feeling,
        location,
        taggedFriends,
        privacy,
        isLive
      };
      
      await createPostMutation.mutateAsync(postData);
      
      // Reset form
      setContent('');
      setSelectedImages([]);
      setFeeling('');
      setLocation('');
      setTaggedFriends([]);
      setIsExpanded(false);
      setIsLive(false);
      
      toast.success('Post shared successfully!');
    } finally {
      endInteraction();
    }
  };

  const handleExpand = () => {
    const endInteraction = trackInteraction('expand-form');
    setIsExpanded(true);
    endInteraction();
  };

  const handleCancel = () => {
    const endInteraction = trackInteraction('cancel-post');
    setIsExpanded(false);
    setContent('');
    setSelectedImages([]);
    setFeeling('');
    setLocation('');
    setTaggedFriends([]);
    setIsLive(false);
    endInteraction();
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const mockImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setSelectedImages(prev => [...prev, randomImage]);
    toast.success('Image added!');
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleGoLive = () => {
    setIsLive(!isLive);
    toast.info(isLive ? 'Live mode disabled' : 'Live mode enabled');
  };

  const handleFeeling = (selectedFeeling: string) => {
    setFeeling(feeling === selectedFeeling ? '' : selectedFeeling);
  };

  const handleLocation = () => {
    const locations = ['San Francisco, CA', 'New York, NY', 'Los Angeles, CA', 'Seattle, WA'];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    setLocation(location === randomLocation ? '' : randomLocation);
    toast.success(`Location ${location === randomLocation ? 'removed' : 'added'}`);
  };

  const handleTagFriends = () => {
    const friends = ['Sarah Johnson', 'Mike Chen', 'Emma Wilson'];
    const randomFriend = friends[Math.floor(Math.random() * friends.length)];
    if (taggedFriends.includes(randomFriend)) {
      setTaggedFriends(prev => prev.filter(f => f !== randomFriend));
      toast.success(`${randomFriend} untagged`);
    } else {
      setTaggedFriends(prev => [...prev, randomFriend]);
      toast.success(`${randomFriend} tagged`);
    }
  };

  if (!user) return null;

  const selectedPrivacy = privacyOptions.find(option => option.value === privacy);

  return (
    <Card className="card-responsive bg-white shadow-sm border-0 shadow-gray-100 mb-4">
      <CardContent className="spacing-responsive">
        <div className="flex space-x-3">
          <Avatar className="avatar-responsive">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>{user.user_metadata?.full_name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {!isExpanded ? (
              <button
                onClick={handleExpand}
                className="w-full text-left p-2 sm:p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors text-responsive-sm touch-target"
              >
                What's on your mind, {user.user_metadata?.full_name?.split(' ')[0] || 'there'}?
              </button>
            ) : (
              <div className="space-y-3">
                {/* Privacy Selector */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Share to:</span>
                    <Select value={privacy} onValueChange={setPrivacy}>
                      <SelectTrigger className="w-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {privacyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center space-x-2">
                              <option.icon className="w-4 h-4" />
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs text-gray-500">{option.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {isLive && (
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                      LIVE
                    </Badge>
                  )}
                </div>

                <Textarea
                  placeholder={`What's on your mind, ${user.user_metadata?.full_name?.split(' ')[0] || 'there'}?`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border-0 resize-none focus:ring-0 text-responsive-base p-0 min-h-[80px] sm:min-h-[100px]"
                  autoFocus
                />

                {/* Active Tags Display */}
                {(feeling || location || taggedFriends.length > 0) && (
                  <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg">
                    {feeling && (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <span>feeling {feeling}</span>
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setFeeling('')} />
                      </Badge>
                    )}
                    {location && (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>at {location}</span>
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setLocation('')} />
                      </Badge>
                    )}
                    {taggedFriends.map((friend, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>with {friend}</span>
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => setTaggedFriends(prev => prev.filter(f => f !== friend))} 
                        />
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Image Preview */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Enhanced Quick Actions */}
                <div className="flex flex-wrap gap-2 py-2 border-t border-gray-100">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-green-600 h-auto py-2 px-3"
                    onClick={handleImageUpload}
                  >
                    <Image className="w-4 h-4 mr-1" />
                    <span className="text-xs">Photo/Video</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 h-auto py-2 px-3"
                    onClick={handleTagFriends}
                  >
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-xs">Tag People</span>
                  </Button>
                  
                  <div className="relative">
                    <Select value={feeling} onValueChange={handleFeeling}>
                      <SelectTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-yellow-600 h-auto py-2 px-3"
                        >
                          <Smile className="w-4 h-4 mr-1" />
                          <span className="text-xs">Feeling</span>
                        </Button>
                      </SelectTrigger>
                      <SelectContent>
                        {feelings.map((feel) => (
                          <SelectItem key={feel} value={feel}>
                            {feel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 h-auto py-2 px-3"
                    onClick={handleLocation}
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-xs">Check In</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-auto py-2 px-3 ${isLive ? 'text-red-600 bg-red-50' : 'text-purple-600'}`}
                    onClick={handleGoLive}
                  >
                    <Video className="w-4 h-4 mr-1" />
                    <span className="text-xs">Live Video</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-orange-600 h-auto py-2 px-3"
                    onClick={() => toast.info('Event creation coming soon!')}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-xs">Event</span>
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600"
                      onClick={() => toast.info('Voice note feature coming soon!')}
                    >
                      <Mic className="w-4 h-4 mr-1" />
                      <span className="text-xs">Voice Note</span>
                    </Button>
                    
                    {selectedPrivacy && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <selectedPrivacy.icon className="w-3 h-3" />
                        <span>{selectedPrivacy.label}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 self-end sm:self-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      className="h-8"
                      onClick={handleSubmit}
                      disabled={(!content.trim() && selectedImages.length === 0) || createPostMutation.isPending}
                    >
                      {createPostMutation.isPending ? 'Posting...' : 'Post'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions for collapsed state */}
        {!isExpanded && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex space-x-1 sm:space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-600 flex-1 sm:flex-none"
                onClick={handleGoLive}
              >
                <Video className="w-4 h-4 mr-1" />
                <span className="text-xs">Live video</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-600 flex-1 sm:flex-none"
                onClick={handleImageUpload}
              >
                <Image className="w-4 h-4 mr-1" />
                <span className="text-xs">Photo/video</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-yellow-600 flex-1 sm:flex-none"
                onClick={() => setIsExpanded(true)}
              >
                <Smile className="w-4 h-4 mr-1" />
                <span className="text-xs">Feeling/activity</span>
              </Button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
      </CardContent>
    </Card>
  );
};

export default CreatePost;