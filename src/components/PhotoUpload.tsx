
import React, { useState, useRef } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import AccessibleButton from './AccessibleButton';

interface PhotoUploadProps {
  onPhotoSelect: (photos: File[]) => void;
  onClose: () => void;
  maxPhotos?: number;
}

const PhotoUpload = ({ onPhotoSelect, onClose, maxPhotos = 10 }: PhotoUploadProps) => {
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (selectedPhotos.length + files.length > maxPhotos) {
      toast.error(`You can only select up to ${maxPhotos} photos`);
      return;
    }

    const newPhotos = [...selectedPhotos, ...files];
    setSelectedPhotos(newPhotos);

    // Create preview URLs
    const newUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newUrls]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = selectedPhotos.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedPhotos(newPhotos);
    setPreviewUrls(newUrls);
  };

  const handleSubmit = () => {
    if (selectedPhotos.length === 0) {
      toast.error('Please select at least one photo');
      return;
    }
    onPhotoSelect(selectedPhotos);
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Photos/Videos</h3>
          <AccessibleButton
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="w-4 h-4" />
          </AccessibleButton>
        </div>

        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-1">Click to upload photos or videos</p>
            <p className="text-sm text-gray-500">or drag and drop</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Preview Grid */}
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </AccessibleButton>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <AccessibleButton
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </AccessibleButton>
            <AccessibleButton
              onClick={handleSubmit}
              disabled={selectedPhotos.length === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Add Photos ({selectedPhotos.length})
            </AccessibleButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;
