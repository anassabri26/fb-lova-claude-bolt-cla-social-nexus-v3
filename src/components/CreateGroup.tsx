
import React, { useState } from 'react';
import { Users, Camera, Globe, Lock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import AccessibleButton from './AccessibleButton';

interface CreateGroupProps {
  onClose: () => void;
}

const CreateGroup = ({ onClose }: CreateGroupProps) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [category, setCategory] = useState('');

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast.error('Please enter a group name');
      return;
    }
    
    console.log('Creating group:', { groupName, description, privacy, category });
    toast.success('Group created successfully!');
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Create New Group</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 cursor-pointer hover:bg-gray-200">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">Add group photo</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Group Name *
          </label>
          <Input
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            placeholder="What's this group about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Privacy
          </label>
          <Select value={privacy} onValueChange={setPrivacy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <div>
                    <div className="font-medium">Public</div>
                    <div className="text-xs text-gray-500">Anyone can see the group</div>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="private">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <div>
                    <div className="font-medium">Private</div>
                    <div className="text-xs text-gray-500">Only members can see posts</div>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="hidden">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <div>
                    <div className="font-medium">Hidden</div>
                    <div className="text-xs text-gray-500">Only members can find the group</div>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="hobbies">Hobbies & Interests</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
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
            onClick={handleCreateGroup}
            disabled={!groupName.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Create Group
          </AccessibleButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateGroup;
