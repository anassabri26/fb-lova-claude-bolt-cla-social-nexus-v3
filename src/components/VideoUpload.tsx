
import React, { useState, useRef } from 'react';
import { Upload, Camera, Mic, Image, X, Play, Pause, Volume2, Settings, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface VideoUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [enableComments, setEnableComments] = useState(true);
  const [enableLikes, setEnableLikes] = useState(true);
  const [ageRestriction, setAgeRestriction] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Gaming', 'Music', 'Education', 'Entertainment', 'Sports', 
    'Technology', 'News', 'Comedy', 'Travel', 'Cooking', 'Health', 'Science'
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
        toast.success('Video file selected successfully!');
        console.log(`Video selected: ${file.name}, size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      } else {
        toast.error('Please select a valid video file');
      }
    }
  };

  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target?.result as string);
        toast.success('Thumbnail uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 10) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
      toast.success('Tag added!');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      toast.error('Please select a video file and enter a title');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Simulate successful upload
    setTimeout(() => {
      setIsUploading(false);
      toast.success('Video uploaded successfully!');
      console.log('Video upload completed:', {
        title,
        description,
        category,
        visibility,
        tags,
        enableComments,
        enableLikes,
        ageRestriction
      });
      onClose();
      resetForm();
    }, 500);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setThumbnail(null);
    setTitle('');
    setDescription('');
    setCategory('');
    setVisibility('public');
    setTags([]);
    setCurrentTag('');
    setUploadProgress(0);
    setIsUploading(false);
    setEnableComments(true);
    setEnableLikes(true);
    setAgeRestriction(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Upload Video</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload Section */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Video File</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!selectedFile ? (
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop video files to upload</p>
                      <p className="text-sm text-gray-500">Your videos will be private until you publish them.</p>
                      <Button className="mt-4">Select File</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                        <Play className="w-6 h-6 text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} />
                        </div>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </CardContent>
              </Card>

              {/* Thumbnail Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Image className="w-5 h-5" />
                    <span>Thumbnail</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => thumbnailInputRef.current?.click()}
                  >
                    {thumbnail ? (
                      <img src={thumbnail} alt="Thumbnail" className="w-full h-32 object-cover rounded" />
                    ) : (
                      <div className="text-center">
                        <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload thumbnail</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailSelect}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Video Details Section */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Video Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title*</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter video title..."
                      maxLength={100}
                    />
                    <p className="text-xs text-gray-500 mt-1">{title.length}/100</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell viewers about your video..."
                      maxLength={5000}
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">{description.length}/5000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Visibility</label>
                      <Select value={visibility} onValueChange={setVisibility}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">
                            <div className="flex items-center space-x-2">
                              <Eye className="w-4 h-4" />
                              <span>Public</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="unlisted">Unlisted</SelectItem>
                          <SelectItem value="private">
                            <div className="flex items-center space-x-2">
                              <EyeOff className="w-4 h-4" />
                              <span>Private</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add tag..."
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button onClick={addTag} disabled={tags.length >= 10}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{tag}</span>
                          <button onClick={() => removeTag(tag)}>
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Tags help people find your video</p>
                  </div>

                  {/* Advanced Settings */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">Settings</h4>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Allow comments</label>
                      <Switch checked={enableComments} onCheckedChange={setEnableComments} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Allow likes/dislikes</label>
                      <Switch checked={enableLikes} onCheckedChange={setEnableLikes} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Age restriction</label>
                      <Switch checked={ageRestriction} onCheckedChange={setAgeRestriction} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Actions */}
              <div className="flex space-x-3">
                <Button 
                  onClick={handleUpload} 
                  disabled={!selectedFile || !title.trim() || isUploading}
                  className="flex-1"
                >
                  {isUploading ? 'Uploading...' : 'Upload Video'}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
