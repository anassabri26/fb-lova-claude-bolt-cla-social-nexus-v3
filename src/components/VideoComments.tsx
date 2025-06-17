import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, MoreHorizontal, Heart, Reply, Flag, Pin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatTimeAgo } from '@/lib/utils';
import { MOCK_IMAGES } from '@/lib/constants';

interface VideoComment {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified?: boolean;
    isCreator?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: VideoComment[];
  isPinned?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  isHearted?: boolean;
}

interface VideoCommentsProps {
  videoId: string;
  commentsCount: number;
}

const VideoComments: React.FC<VideoCommentsProps> = ({ videoId, commentsCount }) => {
  const [comments, setComments] = useState<VideoComment[]>([
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        avatar: MOCK_IMAGES.AVATARS[0],
        verified: true
      },
      content: 'This is absolutely amazing! The cinematography is breathtaking. How did you capture those aerial shots?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 234,
      dislikes: 3,
      replies: [
        {
          id: '1-1',
          user: {
            name: 'Nature Explorer',
            avatar: MOCK_IMAGES.AVATARS[1],
            isCreator: true
          },
          content: 'Thank you! I used a DJI drone for the aerial shots. The weather conditions were perfect that day!',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
          likes: 89,
          dislikes: 0,
          replies: [],
          isHearted: true
        }
      ],
      isPinned: true
    },
    {
      id: '2',
      user: {
        name: 'Mike Chen',
        avatar: MOCK_IMAGES.AVATARS[2]
      },
      content: 'First! Amazing content as always. Keep up the great work! 🔥',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      likes: 156,
      dislikes: 12,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'top' | 'newest'>('top');
  const [showReplies, setShowReplies] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          isDisliked: false,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      if (parentId && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId 
              ? {
                  ...reply,
                  isLiked: !reply.isLiked,
                  isDisliked: false,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                }
              : reply
          )
        };
      }
      return comment;
    }));
  };

  const handleDislike = (commentId: string, isReply = false, parentId?: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isDisliked: !comment.isDisliked,
          isLiked: false,
          dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes + 1
        };
      }
      if (parentId && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId 
              ? {
                  ...reply,
                  isDisliked: !reply.isDisliked,
                  isLiked: false,
                  dislikes: reply.isDisliked ? reply.dislikes - 1 : reply.dislikes + 1
                }
              : reply
          )
        };
      }
      return comment;
    }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: VideoComment = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        avatar: MOCK_IMAGES.AVATARS[0]
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;

    const reply: VideoComment = {
      id: `${parentId}-${Date.now()}`,
      user: {
        name: 'You',
        avatar: MOCK_IMAGES.AVATARS[0]
      },
      content: replyText,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: []
    };

    setComments(prev => prev.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyText('');
    setReplyingTo(null);
  };

  const toggleReplies = (commentId: string) => {
    setShowReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    if (sortBy === 'top') {
      return b.likes - a.likes;
    } else {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  const renderComment = (comment: VideoComment, isReply = false, parentId?: string) => (
    <div key={comment.id} className={`${isReply ? 'ml-12' : ''} mb-4`}>
      <div className="flex space-x-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={comment.user.avatar} />
          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm">{comment.user.name}</span>
            {comment.user.verified && (
              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            {comment.user.isCreator && (
              <Badge variant="secondary" className="text-xs">Creator</Badge>
            )}
            <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
            {comment.isPinned && (
              <Pin className="w-3 h-3 text-gray-500" />
            )}
          </div>
          
          <p className="text-sm text-gray-900 mb-2 break-words">{comment.content}</p>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(comment.id, isReply, parentId)}
                className={`h-8 px-2 ${comment.isLiked ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span className="text-xs">{comment.likes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDislike(comment.id, isReply, parentId)}
                className={`h-8 px-2 ${comment.isDisliked ? 'text-red-600' : 'text-gray-600'}`}
              >
                <ThumbsDown className="w-4 h-4 mr-1" />
                <span className="text-xs">{comment.dislikes}</span>
              </Button>
            </div>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(comment.id)}
                className="h-8 px-2 text-gray-600"
              >
                <Reply className="w-4 h-4 mr-1" />
                <span className="text-xs">Reply</span>
              </Button>
            )}
            
            {comment.isHearted && (
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            )}
            
            <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Reply Input */}
          {replyingTo === comment.id && (
            <div className="mt-3 flex space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={MOCK_IMAGES.AVATARS[0]} />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Add a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  size="sm" 
                  onClick={() => handleAddReply(comment.id)}
                  disabled={!replyText.trim()}
                >
                  Reply
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleReplies(comment.id)}
                className="text-blue-600 text-xs"
              >
                {showReplies.has(comment.id) ? 'Hide' : 'Show'} {comment.replies.length} replies
              </Button>
              
              {showReplies.has(comment.id) && (
                <div className="mt-2 space-y-3">
                  {comment.replies.map(reply => renderComment(reply, true, comment.id))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">{commentsCount.toLocaleString()} Comments</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant={sortBy === 'top' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('top')}
              >
                Top comments
              </Button>
              <Button
                variant={sortBy === 'newest' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('newest')}
              >
                Newest first
              </Button>
            </div>
          </div>
        </div>
        
        {/* Add Comment */}
        <div className="flex space-x-3 mb-6">
          <Avatar className="w-10 h-10">
            <AvatarImage src={MOCK_IMAGES.AVATARS[0]} />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex space-x-2">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
        
        {/* Comments List */}
        <div className="space-y-4">
          {sortedComments.map(comment => renderComment(comment))}
        </div>
        
        {comments.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoComments;