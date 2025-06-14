
import React, { useState } from 'react';
import { Send, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  postId: number;
  isVisible: boolean;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId, isVisible }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: 'Alice Smith',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      content: 'This looks amazing! Great work on the project.',
      timestamp: '2h',
      likes: 3,
      replies: [
        {
          id: 11,
          author: {
            name: 'Bob Johnson',
            avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
          },
          content: 'I totally agree! The UI is fantastic.',
          timestamp: '1h',
          likes: 1
        }
      ]
    },
    {
      id: 2,
      author: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face'
      },
      content: 'Would love to see the code behind this. Any chance you could share?',
      timestamp: '3h',
      likes: 5
    }
  ]);
  
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: {
          name: 'Jane Doe',
          avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
        },
        content: newComment,
        timestamp: 'now',
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="border-t border-gray-200 p-4">
      {/* Comments List */}
      <div className="space-y-3 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-start space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <p className="font-semibold text-sm text-gray-900">{comment.author.name}</p>
                  <p className="text-sm text-gray-800">{comment.content}</p>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                  <button className="hover:underline flex items-center space-x-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>Like</span>
                  </button>
                  <button className="hover:underline">Reply</button>
                  <span>{comment.timestamp}</span>
                  {comment.likes > 0 && (
                    <span className="text-blue-600">{comment.likes} likes</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Replies */}
            {comment.replies && (
              <div className="ml-10 space-y-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start space-x-2">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={reply.author.avatar} />
                      <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <p className="font-semibold text-sm text-gray-900">{reply.author.name}</p>
                        <p className="text-sm text-gray-800">{reply.content}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <button className="hover:underline flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>Like</span>
                        </button>
                        <button className="hover:underline">Reply</button>
                        <span>{reply.timestamp}</span>
                        {reply.likes > 0 && (
                          <span className="text-blue-600">{reply.likes} likes</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            className="flex-1 rounded-full bg-gray-100 border-none"
          />
          <Button size="sm" onClick={handleAddComment} className="rounded-full px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
