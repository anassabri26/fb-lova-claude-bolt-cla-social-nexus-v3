
import React, { useState } from 'react';
import { Send, Heart, MoreHorizontal, Reply } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentSystemProps {
  postId: string;
  commentCount: number;
}

const CommentSystem = ({ postId, commentCount }: CommentSystemProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      content: 'This is amazing! Thanks for sharing.',
      timestamp: '2h',
      likes: 5,
      isLiked: false,
      replies: [
        {
          id: '1-1',
          author: {
            name: 'Mike Chen',
            avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
          },
          content: 'I totally agree! Really inspiring.',
          timestamp: '1h',
          likes: 2,
          isLiked: true
        }
      ]
    },
    {
      id: '2',
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      content: 'Great work! Looking forward to more content like this.',
      timestamp: '1h',
      likes: 8,
      isLiked: true
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      content: newComment,
      timestamp: 'now',
      likes: 0,
      isLiked: false
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
    toast.success('Comment added!');
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                isLiked: !reply.isLiked,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
              };
            }
            return reply;
          })
        };
      }
      return comment;
    }));
  };

  const handleReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      content: replyText,
      timestamp: 'now',
      likes: 0,
      isLiked: false
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyText('');
    setReplyingTo(null);
    toast.success('Reply added!');
  };

  return (
    <div className="space-y-4">
      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            {/* Main comment */}
            <div className="flex space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm">{comment.author.name}</span>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-900">{comment.content}</p>
                </div>
                
                <div className="flex items-center space-x-4 mt-1 ml-3">
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeComment(comment.id)}
                    className={`text-xs ${comment.isLiked ? 'text-blue-600' : 'text-gray-500'}`}
                  >
                    <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
                    {comment.likes > 0 && comment.likes}
                  </AccessibleButton>
                  
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-xs text-gray-500"
                  >
                    <Reply className="w-3 h-3 mr-1" />
                    Reply
                  </AccessibleButton>
                  
                  <AccessibleButton variant="ghost" size="sm" className="text-xs text-gray-500">
                    <MoreHorizontal className="w-3 h-3" />
                  </AccessibleButton>
                </div>
              </div>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-11 space-y-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex space-x-3">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={reply.author.avatar} />
                      <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">{reply.author.name}</span>
                          <span className="text-xs text-gray-500">{reply.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-900">{reply.content}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-1 ml-3">
                        <AccessibleButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeComment(reply.id)}
                          className={`text-xs ${reply.isLiked ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                          <Heart className={`w-3 h-3 mr-1 ${reply.isLiked ? 'fill-current' : ''}`} />
                          {reply.likes > 0 && reply.likes}
                        </AccessibleButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply input */}
            {replyingTo === comment.id && (
              <div className="ml-11 flex space-x-2">
                <Avatar className="w-7 h-7">
                  <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleReply(comment.id);
                      }
                    }}
                    className="text-sm"
                  />
                  <AccessibleButton
                    onClick={() => handleReply(comment.id)}
                    disabled={!replyText.trim()}
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </AccessibleButton>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add comment */}
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex space-x-2">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddComment();
              }
            }}
          />
          <AccessibleButton
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Send className="w-4 h-4" />
          </AccessibleButton>
        </div>
      </div>
    </div>
  );
};

export default CommentSystem;
