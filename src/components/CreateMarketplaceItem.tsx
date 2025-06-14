
import React, { useState } from 'react';
import { Camera, MapPin, DollarSign, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import AccessibleButton from './AccessibleButton';

interface CreateMarketplaceItemProps {
  onClose: () => void;
}

const CreateMarketplaceItem = ({ onClose }: CreateMarketplaceItemProps) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');

  const handleCreateItem = () => {
    if (!title.trim() || !price.trim() || !category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    console.log('Creating marketplace item:', { title, price, description, category, condition, location });
    toast.success('Item listed successfully!');
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Create Listing</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2 cursor-pointer hover:bg-gray-200">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">Add photos</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <Input
            placeholder="What are you selling?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="pl-10"
              type="number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing & Accessories</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
              <SelectItem value="vehicles">Vehicles</SelectItem>
              <SelectItem value="hobbies">Hobbies & Leisure</SelectItem>
              <SelectItem value="books">Books & Media</SelectItem>
              <SelectItem value="sports">Sports & Outdoors</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Condition
          </label>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="like-new">Like New</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            placeholder="Describe your item..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <AccessibleButton
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </AccessibleButton>
          <AccessibleButton
            onClick={handleCreateItem}
            disabled={!title.trim() || !price.trim() || !category}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            List Item
          </AccessibleButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateMarketplaceItem;
