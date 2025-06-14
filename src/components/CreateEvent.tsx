
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Image } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AccessibleButton from './AccessibleButton';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    privacy: 'Public'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventData.title || !eventData.date) {
      toast.error('Please fill in required fields');
      return;
    }
    
    console.log('Creating event:', eventData);
    toast.success('Event created successfully!');
    setEventData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      privacy: 'Public'
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          <span>Create Event</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Title *</label>
            <Input
              value={eventData.title}
              onChange={(e) => setEventData({...eventData, title: e.target.value})}
              placeholder="What's your event called?"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={eventData.description}
              onChange={(e) => setEventData({...eventData, description: e.target.value})}
              placeholder="Tell people more about your event"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <Input
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({...eventData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <Input
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData({...eventData, time: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={eventData.location}
                onChange={(e) => setEventData({...eventData, location: e.target.value})}
                placeholder="Where is your event?"
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <AccessibleButton
              type="button"
              variant="outline"
              onClick={() => setEventData({...eventData, privacy: eventData.privacy === 'Public' ? 'Private' : 'Public'})}
            >
              <Users className="w-4 h-4 mr-2" />
              {eventData.privacy}
            </AccessibleButton>
            
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Event
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateEvent;
