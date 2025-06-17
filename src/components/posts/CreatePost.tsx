import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, Smile, MapPin, Users, Calendar, Video, Mic } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCreatePost } from '@/hooks/usePosts';
import { usePerformance } from '@/hooks/usePerformance';
import AccessibleButton from '@/components/AccessibleButton';
import { toast } from 'sonner';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const createPostMutation = useCreatePost();
  const { trackInteraction } = usePerformance('CreatePost');

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    const endInteraction = trackInteraction('create-post');
    
    try {
      await createPostMutation.mutateAsync({ content });
      setContent('');
      setIsExpanded(false);
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
    endInteraction();
  };

  const handleFeatureClick = (feature: string) => {
    toast.info(`${feature} feature coming soon!`);
  };

  if (!user) return null;

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
                <Textarea
                  placeholder={`What's on your mind, ${user.user_metadata?.full_name?.split(' ')[0] || 'there'}?`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border-0 resize-none focus:ring-0 text-responsive-base p-0 min-h-[80px] sm:min-h-[100px]"
                  autoFocus
                />
                
                {/* Enhanced Quick Actions */}
                <div className="flex flex-wrap gap-2 py-2 border-t border-gray-100">
                  <AccessibleButton 
                    variant="ghost" 
                    size="sm" 
                    className="text-green-600 h-auto py-2 px-3"
                    onClick={() => handleFeatureClick('Photo/Video')}
                  >
                    <Image className="w-4 h-4 mr-1" />
                    <span className="text-xs">Photo/Video</span>
                  </AccessibleButton>
                  <AccessibleButton 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 h-auto py-2 px-3"
                    onClick={() => handleFeatureClick('Tag People')}
                  >
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-xs">Tag People</span>
                  </AccessibleButton>
                  <AccessibleButton 
                    variant="ghost" 
                    size="sm" 
                    className="text-yellow-600 h-auto py-2 px-3"
                    onClick={() => handleFeatureClick('Feeling/Activity')}
                  >
                    <Smile className="w-4 h-4 mr-1" />
                    <span className="text-xs">Feeling</span>
                  </AccessibleButton>
                  <AccessibleButton 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 h-auto py-2 px-3"
                    onClick={() => handleFeatureClick('Check In')}
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-xs">Check In</span>
                  </AccessibleButton>
                  <AccessibleButton 
                    variant="ghost" 
                    size="sm" 
                    className="text-purple-600 h-auto py-2 px-3"
                    onClick={() => handleFeatureClick('Live Video')}
                  >
                    <Video className="w-4 h-4 mr-1" />
                    <span className="text-xs">Live</span>
                  </AccessibleButton>
                  <AccessibleButton 
                    variant="ghost" 
                    size="sm" 
                    className="text-orange-600 h-auto py-2 px-3"
                    onClick={() => handleFeatureClick('Create Event')}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-xs">Event</span>
                  </AccessibleButton>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex items-center space-x-2">
                    <AccessibleButton 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600"
                      onClick={() => handleFeatureClick('Voice Note')}
                    >
                      <Mic className="w-4 h-4 mr-1" />
                      <span className="text-xs">Voice Note</span>
                    </AccessibleButton>
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
                      disabled={!content.trim() || createPostMutation.isPending}
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
              <AccessibleButton 
                variant="ghost" 
                size="sm" 
                className="text-red-600 flex-1 sm:flex-none"
                onClick={() => handleFeatureClick('Live Video')}
              >
                <Video className="w-4 h-4 mr-1" />
                <span className="text-xs">Live video</span>
              </AccessibleButton>
              <AccessibleButton 
                variant="ghost" 
                size="sm" 
                className="text-green-600 flex-1 sm:flex-none"
                onClick={() => handleFeatureClick('Photo/Video')}
              >
                <Image className="w-4 h-4 mr-1" />
                <span className="text-xs">Photo/video</span>
              </AccessibleButton>
              <AccessibleButton 
                variant="ghost" 
                size="sm" 
                className="text-yellow-600 flex-1 sm:flex-none"
                onClick={() => handleFeatureClick('Feeling/Activity')}
              >
                <Smile className="w-4 h-4 mr-1" />
                <span className="text-xs">Feeling/activity</span>
              </AccessibleButton>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatePost;