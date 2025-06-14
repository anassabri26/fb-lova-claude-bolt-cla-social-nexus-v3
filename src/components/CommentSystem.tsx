
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Reply, MoreHorizontal } from 'lucide-react';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Comment {
  id: number;
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
  postId: number;
  isVisible: boolean;
  onClose: () => void;
}

const CommentSystem: React.FC<CommentSystemProps> = ({ postId, isVisible, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      content: 'This is amazing! Love the creativity 👏',
      timestamp: '2h',
      likes: 5,
      isLiked: false,
      replies: [
        {
          id: 2,
          author: {
            name: 'Mike Chen',
            avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
          },
          content: 'Totally agree! Keep up the great work',
          timestamp: '1h',
          likes: 2,
          isLiked: true
        }
      ]
    }
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: {
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
        },
        content: newComment,
        timestamp: 'now',
        likes: 0,
        isLiked: false
      };
      setComments([...comments, comment]);
      setNewComment('');
      toast.success('Comment added!');
    }
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  if (!isVisible) return null;

  return (
    <div className="border-t border-gray-100 p-4 bg-gray-50">
      <div className="max-h-60 overflow-y-auto space-y-3 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-white rounded-lg px-3 py-2">
                  <p className="font-semibold text-sm">{comment.author.name}</p>
                  <p className="text-sm text-gray-900">{comment.content}</p>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    className={`p-0 h-auto ${comment.isLiked ? 'text-blue-600' : ''}`}
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    Like
                  </AccessibleButton>
                  <AccessibleButton variant="ghost" size="sm" className="p-0 h-auto">
                    Reply
                  </AccessibleButton>
                  <span>{comment.timestamp}</span>
                  {comment.likes > 0 && (
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1 text-red-500" />
                      {comment.likes}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Replies */}
            {comment.replies && comment.replies.map((reply) => (
              <div key={reply.id} className="ml-8 flex items-start space-x-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={reply.author.avatar} />
                  <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-white rounded-lg px-3 py-2">
                    <p className="font-semibold text-sm">{reply.author.name}</p>
                    <p className="text-sm text-gray-900">{reply.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>Like</span>
                    <span>Reply</span>
                    <span>{reply.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="flex items-center space-x-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex items-center space-x-2">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            className="flex-1"
          />
          <AccessibleButton 
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            size="sm"
          >
            Post
          </AccessibleButton>
        </div>
      </div>
    </div>
  );
};

export default CommentSystem;
