
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import AccessibleButton from './AccessibleButton';

interface CreateEventProps {
  onClose: () => void;
}

const CreateEvent = ({ onClose }: CreateEventProps) => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [privacy, setPrivacy] = useState('public');

  const handleCreateEvent = () => {
    if (!eventName.trim() || !date || !time) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    console.log('Creating event:', { eventName, description, date, time, location, category, privacy });
    toast.success('Event created successfully!');
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Create Event</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2 cursor-pointer hover:bg-gray-200">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">Add event cover</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name *
          </label>
          <Input
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            placeholder="What's this event about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time *
            </label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
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
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="meetup">Meetup</SelectItem>
              <SelectItem value="party">Party</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="art">Art & Culture</SelectItem>
              <SelectItem value="food">Food & Drink</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="public">Public - Anyone can join</SelectItem>
              <SelectItem value="private">Private - Invite only</SelectItem>
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
            onClick={handleCreateEvent}
            disabled={!eventName.trim() || !date || !time}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Create Event
          </AccessibleButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateEvent;
