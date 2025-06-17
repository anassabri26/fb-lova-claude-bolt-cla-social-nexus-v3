import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Share, Download, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_IMAGES } from '@/lib/constants';

interface Photo {
  id: string;
  url: string;
  caption?: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  likes: number;
  comments: Array<{
    id: string;
    user: string;
    avatar: string;
    text: string;
    timestamp: string;
  }>;
}

interface PhotoViewerProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentPhoto.caption || 'Photo',
        url: currentPhoto.url
      });
    } else {
      navigator.clipboard.writeText(currentPhoto.url);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentPhoto.url;
    link.download = `photo-${currentPhoto.id}.jpg`;
    link.click();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex">
      {/* Photo Display */}
      <div className="flex-1 flex items-center justify-center relative">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.caption}
          className="max-w-full max-h-full object-contain"
        />

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70 rounded-full p-3"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}

        {currentIndex < photos.length - 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70 rounded-full p-3"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        )}

        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70 rounded-full p-3"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Photo Counter */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} of {photos.length}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentPhoto.author.avatar} />
              <AvatarFallback>{currentPhoto.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{currentPhoto.author.name}</h3>
              <p className="text-sm text-gray-500">{currentPhoto.timestamp}</p>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Caption */}
        {currentPhoto.caption && (
          <div className="p-4 border-b">
            <p className="text-gray-900">{currentPhoto.caption}</p>
          </div>
        )}

        {/* Actions */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-2 ${isLiked ? 'text-red-600' : 'text-gray-600'}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{currentPhoto.likes + likes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-600"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{currentPhoto.comments.length}</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-600"
              >
                <Share className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="text-gray-600"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {currentPhoto.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <p className="font-semibold text-sm">{comment.user}</p>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={MOCK_IMAGES.AVATARS[1]} />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex space-x-2">
              <Input
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoViewer;