
import React, { useState } from 'react';
import { Users, Image, Globe, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AccessibleButton from './AccessibleButton';

const CreateGroup = () => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    privacy: 'Public',
    category: 'General'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupData.name) {
      toast.error('Please enter a group name');
      return;
    }
    
    console.log('Creating group:', groupData);
    toast.success('Group created successfully!');
    setGroupData({
      name: '',
      description: '',
      privacy: 'Public',
      category: 'General'
    });
  };

  const categories = ['General', 'Technology', 'Gaming', 'Sports', 'Music', 'Photography', 'Travel', 'Food'];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-blue-600" />
          <span>Create Group</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Group Name *</label>
            <Input
              value={groupData.name}
              onChange={(e) => setGroupData({...groupData, name: e.target.value})}
              placeholder="Choose a name for your group"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={groupData.description}
              onChange={(e) => setGroupData({...groupData, description: e.target.value})}
              placeholder="What's your group about?"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={groupData.category}
              onChange={(e) => setGroupData({...groupData, category: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Privacy</label>
            <div className="grid grid-cols-2 gap-2">
              <AccessibleButton
                type="button"
                variant={groupData.privacy === 'Public' ? 'default' : 'outline'}
                onClick={() => setGroupData({...groupData, privacy: 'Public'})}
                className="flex items-center justify-center space-x-2 p-3"
              >
                <Globe className="w-4 h-4" />
                <span>Public</span>
              </AccessibleButton>
              <AccessibleButton
                type="button"
                variant={groupData.privacy === 'Private' ? 'default' : 'outline'}
                onClick={() => setGroupData({...groupData, privacy: 'Private'})}
                className="flex items-center justify-center space-x-2 p-3"
              >
                <Lock className="w-4 h-4" />
                <span>Private</span>
              </AccessibleButton>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <AccessibleButton
              type="button"
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Image className="w-4 h-4" />
              <span>Add Cover Photo</span>
            </AccessibleButton>
            
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Group
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateGroup;
