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
                onClick={() => setIsExpanded(true)}
                className="w-full text-left p-2 sm:p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors text-responsive-sm"
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex flex-wrap gap-2">
                    <AccessibleButton variant="ghost" size="sm" className="text-green-600 h-auto py-1">
                      <Image className="w-4 h-4 mr-1" />
                      <span className="text-xs">Photo</span>
                    </AccessibleButton>
                    <AccessibleButton variant="ghost" size="sm" className="text-yellow-600 h-auto py-1">
                      <Smile className="w-4 h-4 mr-1" />
                      <span className="text-xs">Feeling</span>
                    </AccessibleButton>
                    <AccessibleButton variant="ghost" size="sm" className="text-red-600 h-auto py-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-xs">Check In</span>
                    </AccessibleButton>
                  </div>
                  <div className="flex space-x-2 self-end sm:self-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8"
                      onClick={() => {
                        setIsExpanded(false);
                        setContent('');
                      }}
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
      </CardContent>
    </Card>
  );
};

export default CreatePost;