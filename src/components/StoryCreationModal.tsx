
import React, { useState } from 'react';
import { Camera, Type, Smile, X, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface StoryCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoryCreationModal = ({ isOpen, onClose }: StoryCreationModalProps) => {
  const [storyType, setStoryType] = useState<'photo' | 'text'>('photo');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#4267B2');

  const backgroundColors = [
    '#4267B2', '#42B883', '#E1306C', '#FF6B6B', '#4ECDC4', 
    '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateStory = () => {
    if (storyType === 'photo' && !selectedImage) {
      toast.error('Please select an image for your story');
      return;
    }
    if (storyType === 'text' && !text.trim()) {
      toast.error('Please add some text to your story');
      return;
    }

    toast.success('Story created successfully!');
    console.log('Story created:', { type: storyType, image: selectedImage, text, backgroundColor });
    onClose();
    setText('');
    setSelectedImage(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Story</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Story Type Selection */}
          <div className="flex space-x-2">
            <AccessibleButton
              variant={storyType === 'photo' ? 'default' : 'outline'}
              onClick={() => setStoryType('photo')}
              className="flex-1"
            >
              <Camera className="w-4 h-4 mr-2" />
              Photo
            </AccessibleButton>
            <AccessibleButton
              variant={storyType === 'text' ? 'default' : 'outline'}
              onClick={() => setStoryType('text')}
              className="flex-1"
            >
              <Type className="w-4 h-4 mr-2" />
              Text
            </AccessibleButton>
          </div>

          {/* Photo Story */}
          {storyType === 'photo' && (
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="story-image-upload"
              />
              <label htmlFor="story-image-upload">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Story preview" className="max-h-32 mx-auto rounded" />
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Click to upload image</p>
                    </div>
                  )}
                </div>
              </label>
              <Textarea
                placeholder="Add a caption..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="resize-none"
                rows={2}
              />
            </div>
          )}

          {/* Text Story */}
          {storyType === 'text' && (
            <div className="space-y-3">
              <div 
                className="rounded-lg p-6 text-white text-center min-h-[200px] flex items-center justify-center"
                style={{ backgroundColor }}
              >
                <Textarea
                  placeholder="What's on your mind?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="bg-transparent border-none text-white placeholder-white resize-none text-lg text-center"
                  rows={4}
                />
              </div>
              
              {/* Background Color Selection */}
              <div className="flex space-x-2 overflow-x-auto">
                {backgroundColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 flex-shrink-0 ${
                      backgroundColor === color ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBackgroundColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <AccessibleButton variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </AccessibleButton>
            <AccessibleButton onClick={handleCreateStory} className="flex-1">
              Share Story
            </AccessibleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryCreationModal;
