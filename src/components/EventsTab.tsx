import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Share, Heart, Plus, Search, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CreateEvent from './CreateEvent';
import { MOCK_IMAGES } from '@/lib/constants';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: {
    name: string;
    avatar: string;
  };
  attendees: number;
  maxAttendees?: number;
  image: string;
  isGoing: boolean;
  isInterested: boolean;
  category: string;
  price?: string;
}

const EventsTab = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Tech Conference 2024',
      description: 'Join us for the biggest tech conference of the year featuring latest innovations in AI, blockchain, and more.',
      date: 'March 15, 2024',
      time: '9:00 AM',
      location: 'San Francisco Convention Center',
      organizer: {
        name: 'Tech Events Inc',
        avatar: MOCK_IMAGES.AVATARS[0]
      },
      attendees: 1250,
      maxAttendees: 2000,
      image: MOCK_IMAGES.POSTS[0],
      isGoing: false,
      isInterested: true,
      category: 'Technology',
      price: '$199'
    },
    {
      id: '2',
      title: 'Community Garden Cleanup',
      description: 'Help us clean and beautify our local community garden. Bring gloves and enthusiasm!',
      date: 'March 20, 2024',
      time: '10:00 AM',
      location: 'Central Community Garden',
      organizer: {
        name: 'Green Community',
        avatar: MOCK_IMAGES.AVATARS[1]
      },
      attendees: 45,
      image: MOCK_IMAGES.POSTS[2],
      isGoing: true,
      isInterested: false,
      category: 'Community',
      price: 'Free'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const categories = ['All', 'Technology', 'Community', 'Music', 'Business', 'Sports', 'Food', 'Arts'];

  const handleGoing = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isGoing: !event.isGoing, isInterested: false }
        : event
    ));
  };

  const handleInterested = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isInterested: !event.isInterested, isGoing: false }
        : event
    ));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90">
                    {event.price}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.description}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>
                      {event.attendees} going
                      {event.maxAttendees && ` (${event.maxAttendees} max)`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={event.organizer.avatar} />
                    <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">by {event.organizer.name}</span>
                </div>

                <div className="flex space-x-2 mt-auto">
                  <Button
                    size="sm"
                    variant={event.isGoing ? 'default' : 'outline'}
                    onClick={() => handleGoing(event.id)}
                    className="flex-1"
                  >
                    {event.isGoing ? 'Going' : 'Join'}
                  </Button>
                  <Button
                    size="sm"
                    variant={event.isInterested ? 'default' : 'outline'}
                    onClick={() => handleInterested(event.id)}
                    className="flex-1"
                  >
                    {event.isInterested ? 'Interested' : 'Maybe'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters to find more events.</p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        )}
      </div>
      
      <CreateEvent 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default EventsTab;