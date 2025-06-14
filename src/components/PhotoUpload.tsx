
import React, { useState, useCallback } from 'react';
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface PhotoUploadProps {
  onPhotoSelect: (photos: File[]) => void;
  onClose: () => void;
  maxPhotos?: number;
}

const PhotoUpload = ({ onPhotoSelect, onClose, maxPhotos = 10 }: PhotoUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    const totalFiles = selectedFiles.length + validFiles.length;
    if (totalFiles > maxPhotos) {
      toast.error(`You can only upload up to ${maxPhotos} photos`);
      return;
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
  }, [selectedFiles, maxPhotos]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one photo');
      return;
    }

    onPhotoSelect(selectedFiles);
    setSelectedFiles([]);
    onClose();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Add Photos/Videos</h2>
        <AccessibleButton variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </AccessibleButton>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Add photos/videos
            </h3>
            <p className="text-gray-500 mb-4">
              or drag and drop
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <label htmlFor="photo-upload">
              <AccessibleButton
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Select Photos
              </AccessibleButton>
            </label>
            
            <AccessibleButton
              variant="outline"
              onClick={() => toast.info('Camera feature coming soon!')}
            >
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </AccessibleButton>
          </div>
        </div>
      </div>

      <input
        id="photo-upload"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Selected Photos Preview */}
      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">
            Selected Photos ({selectedFiles.length}/{maxPhotos})
          </h3>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white hover:bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-4 h-4" />
                </AccessibleButton>
                <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                  {(file.size / 1024 / 1024).toFixed(1)}MB
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <AccessibleButton
              onClick={handleUpload}
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
            >
              Add to Post
            </AccessibleButton>
            <AccessibleButton
              variant="outline"
              onClick={() => setSelectedFiles([])}
            >
              Clear All
            </AccessibleButton>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>• Images must be less than 10MB</p>
        <p>• Supported formats: JPG, PNG, GIF</p>
        <p>• You can upload up to {maxPhotos} photos at once</p>
      </div>
    </div>
  );
};

export default PhotoUpload;
