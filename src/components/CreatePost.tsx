import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, Smile, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCreatePost } from '@/hooks/usePosts';
import AccessibleButton from './AccessibleButton';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const createPostMutation = useCreatePost();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    await createPostMutation.mutateAsync({ content });
    setContent('');
    setIsExpanded(false);
  };

  if (!user) return null;

  return (
    <Card className="card-responsive bg-white shadow-sm border-0 shadow-gray-100 mb-6">
      <CardContent className="spacing-responsive">
        <div className="flex space-x-3">
          <Avatar className="avatar-responsive">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>{user.user_metadata?.full_name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {!isExpanded ? (
              <button
                onClick={() => setIsExpanded(true)}
                className="w-full text-left button-responsive bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors text-responsive-base"
              >
                What's on your mind, {user.user_metadata?.full_name?.split(' ')[0] || 'there'}?
              </button>
            ) : (
              <div className="space-y-3">
                <Textarea
                  placeholder={`What's on your mind, ${user.user_metadata?.full_name?.split(' ')[0] || 'there'}?`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border-0 resize-none focus:ring-0 text-responsive-lg p-0 min-h-[100px]"
                  autoFocus
                />
                <div className="flex items-center justify-between">
                  <div className="flex-stack-responsive">
                    <AccessibleButton variant="ghost" size="sm" className="text-green-600">
                      <Image className="w-5 h-5 mr-2" />
                      <span className="text-responsive-sm">Photo/Video</span>
                    </AccessibleButton>
                    <AccessibleButton variant="ghost" size="sm" className="text-yellow-600">
                      <Smile className="w-5 h-5 mr-2" />
                      <span className="text-responsive-sm">Feeling/Activity</span>
                    </AccessibleButton>
                    <AccessibleButton variant="ghost" size="sm" className="text-red-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-responsive-sm">Check In</span>
                    </AccessibleButton>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="button-responsive"
                      onClick={() => {
                        setIsExpanded(false);
                        setContent('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      className="button-responsive"
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
      </CardContent>
    </Card>
  );
};

export default CreatePost;