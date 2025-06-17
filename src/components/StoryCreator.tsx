import React, { useState } from 'react';
import { Camera, Video, Type, X, Image as ImageIcon, Smile, Palette, Sliders } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface StoryCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateStory: (storyData: any) => void;
}

const StoryCreator: React.FC<StoryCreatorProps> = ({ isOpen, onClose, onCreateStory }) => {
  const [storyType, setStoryType] = useState<'photo' | 'video' | 'text'>('photo');
  const [storyContent, setStoryContent] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('gradient-1');
  const [textColor, setTextColor] = useState('white');
  const [fontSize, setFontSize] = useState([16]);
  const [textAlignment, setTextAlignment] = useState('center');
  const [selectedImage, setSelectedImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const backgrounds = [
    { id: 'gradient-1', name: 'Blue to Purple', class: 'bg-gradient-to-br from-blue-500 to-purple-600' },
    { id: 'gradient-2', name: 'Green to Blue', class: 'bg-gradient-to-br from-green-400 to-blue-500' },
    { id: 'gradient-3', name: 'Red to Orange', class: 'bg-gradient-to-br from-red-500 to-orange-500' },
    { id: 'gradient-4', name: 'Purple to Pink', class: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 'solid-1', name: 'Blue', class: 'bg-blue-600' },
    { id: 'solid-2', name: 'Green', class: 'bg-green-600' },
    { id: 'solid-3', name: 'Red', class: 'bg-red-600' },
    { id: 'solid-4', name: 'Black', class: 'bg-black' },
  ];

  const colors = [
    { id: 'white', name: 'White', class: 'text-white' },
    { id: 'black', name: 'Black', class: 'text-black' },
    { id: 'yellow', name: 'Yellow', class: 'text-yellow-400' },
    { id: 'blue', name: 'Blue', class: 'text-blue-400' },
    { id: 'green', name: 'Green', class: 'text-green-400' },
    { id: 'red', name: 'Red', class: 'text-red-400' },
  ];

  const alignments = [
    { id: 'left', name: 'Left', class: 'text-left' },
    { id: 'center', name: 'Center', class: 'text-center' },
    { id: 'right', name: 'Right', class: 'text-right' },
  ];

  const handleCreateStory = () => {
    if (storyType === 'text' && !storyContent.trim()) {
      toast.error('Please add some text to your story');
      return;
    }

    if ((storyType === 'photo' || storyType === 'video') && !selectedImage) {
      toast.error(`Please select a ${storyType} for your story`);
      return;
    }

    const storyData = {
      type: storyType,
      content: storyContent,
      background: selectedBackground,
      textColor,
      fontSize: fontSize[0],
      textAlignment,
      media: selectedImage,
      timestamp: new Date().toISOString(),
    };

    onCreateStory(storyData);
    resetForm();
    onClose();
    toast.success('Story created successfully!');
  };

  const resetForm = () => {
    setStoryType('photo');
    setStoryContent('');
    setSelectedBackground('gradient-1');
    setTextColor('white');
    setFontSize([16]);
    setTextAlignment('center');
    setSelectedImage('');
  };

  const simulateImageUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const mockImages = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
      ];
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
      setSelectedImage(randomImage);
      setIsUploading(false);
      toast.success(`${storyType === 'photo' ? 'Photo' : 'Video'} uploaded successfully!`);
    }, 1500);
  };

  const getBackgroundClass = (bgId: string) => {
    return backgrounds.find(bg => bg.id === bgId)?.class || 'bg-gray-900';
  };

  const getTextColorClass = (colorId: string) => {
    return colors.find(c => c.id === colorId)?.class || 'text-white';
  };

  const getAlignmentClass = (alignId: string) => {
    return alignments.find(a => a.id === alignId)?.class || 'text-center';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Create Story</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh]">
          {/* Preview Panel */}
          <div className="relative bg-black flex items-center justify-center">
            {storyType === 'text' ? (
              <div 
                className={`w-full h-full ${getBackgroundClass(selectedBackground)} flex items-center justify-center p-6`}
              >
                <p 
                  className={`${getTextColorClass(textColor)} ${getAlignmentClass(textAlignment)}`}
                  style={{ fontSize: `${fontSize[0]}px` }}
                >
                  {storyContent || 'Your story text will appear here'}
                </p>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {selectedImage ? (
                  <img 
                    src={selectedImage} 
                    alt="Story preview" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Select a {storyType} to preview</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Editor Panel */}
          <div className="bg-white p-4 overflow-y-auto">
            <Tabs defaultValue={storyType} onValueChange={(value) => setStoryType(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="photo" className="flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>Photo</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>Video</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span>Text</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="photo" className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto"></div>
                      <p className="text-gray-600">Uploading photo...</p>
                    </div>
                  ) : selectedImage ? (
                    <div className="space-y-2">
                      <img 
                        src={selectedImage} 
                        alt="Selected" 
                        className="max-h-40 mx-auto object-contain"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedImage('')}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Add a photo to your story</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={simulateImageUpload}
                      >
                        Choose Photo
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Caption (Optional)</label>
                  <Textarea
                    placeholder="Add a caption to your story..."
                    value={storyContent}
                    onChange={(e) => setStoryContent(e.target.value)}
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto"></div>
                      <p className="text-gray-600">Uploading video...</p>
                    </div>
                  ) : selectedImage ? (
                    <div className="space-y-2">
                      <div className="relative max-h-40 mx-auto">
                        <img 
                          src={selectedImage} 
                          alt="Video thumbnail" 
                          className="max-h-40 mx-auto object-contain"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedImage('')}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Video className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Add a video to your story</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={simulateImageUpload}
                      >
                        Choose Video
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Caption (Optional)</label>
                  <Textarea
                    placeholder="Add a caption to your story..."
                    value={storyContent}
                    onChange={(e) => setStoryContent(e.target.value)}
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Story Text</label>
                  <Textarea
                    placeholder="What's on your mind?"
                    value={storyContent}
                    onChange={(e) => setStoryContent(e.target.value)}
                    rows={5}
                    className="mb-4"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <Palette className="w-4 h-4 mr-2" />
                      Background
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {backgrounds.map((bg) => (
                        <div
                          key={bg.id}
                          className={`h-10 rounded-md cursor-pointer ${bg.class} ${
                            selectedBackground === bg.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => setSelectedBackground(bg.id)}
                          title={bg.name}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <Type className="w-4 h-4 mr-2" />
                      Text Color
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {colors.map((color) => (
                        <div
                          key={color.id}
                          className={`h-8 rounded-md cursor-pointer border ${
                            color.id === 'white' ? 'border-gray-300' : 'border-transparent'
                          } ${
                            textColor === color.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          style={{ backgroundColor: color.id }}
                          onClick={() => setTextColor(color.id)}
                          title={color.name}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <Sliders className="w-4 h-4 mr-2" />
                      Font Size
                    </label>
                    <Slider
                      value={fontSize}
                      onValueChange={setFontSize}
                      min={12}
                      max={32}
                      step={1}
                      className="py-4"
                    />
                    <div className="text-right text-sm text-gray-500">{fontSize[0]}px</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Text Alignment</label>
                    <div className="flex space-x-2">
                      {alignments.map((align) => (
                        <Button
                          key={align.id}
                          variant={textAlignment === align.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTextAlignment(align.id)}
                          className="flex-1"
                        >
                          {align.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleCreateStory}>
                Share to Story
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add missing Play icon component
const Play = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default StoryCreator;