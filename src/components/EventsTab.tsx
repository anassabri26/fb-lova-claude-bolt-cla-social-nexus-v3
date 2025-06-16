import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Share, Heart, Plus, Search, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';
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
    },
    {
      id: '3',
      title: 'Jazz Night at Blue Moon',
      description: 'An evening of smooth jazz featuring local artists. Great food, drinks, and music!',
      date: 'March 22, 2024',
      time: '7:00 PM',
      location: 'Blue Moon Jazz Club',
      organizer: {
        name: 'Blue Moon Events',
        avatar: MOCK_IMAGES.AVATARS[2]
      },
      attendees: 89,
      maxAttendees: 120,
      image: MOCK_IMAGES.POSTS[3],
      isGoing: false,
      isInterested: false,
      category: 'Music',
      price: '$25'
    },
    {
      id: '4',
      title: 'Startup Pitch Competition',
      description: 'Watch innovative startups pitch their ideas to investors and compete for funding.',
      date: 'April 5, 2024',
      time: '2:00 PM',
      location: 'Innovation Hub',
      organizer: {
        name: 'Startup Network',
        avatar: MOCK_IMAGES.AVATARS[3]
      },
      attendees: 175,
      maxAttendees: 200,
      image: MOCK_IMAGES.POSTS[4],
      isGoing: false,
      isInterested: true,
      category: 'Business',
      price: '$50'
    },
    {
      id: '5',
      title: 'Charity 5K Run',
      description: 'Run for a cause! All proceeds go to supporting local education initiatives.',
      date: 'April 12, 2024',
      time: '8:00 AM',
      location: 'City Park',
      organizer: {
        name: 'Community Foundation',
        avatar: MOCK_IMAGES.AVATARS[4]
      },
      attendees: 320,
      image: MOCK_IMAGES.POSTS[5],
      isGoing: true,
      isInterested: false,
      category: 'Sports',
      price: '$35'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Technology', 'Community', 'Music', 'Business', 'Sports', 'Food', 'Arts'];
  const filters = ['All', 'Going', 'Interested', 'This Week', 'Free'];

  const handleGoing = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isGoing: !event.isGoing, isInterested: false }
        : event
    ));
    const event = events.find(e => e.id === eventId);
    toast.success(event?.isGoing ? 'Removed from going' : 'Marked as going!');
  };

  const handleInterested = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isInterested: !event.isInterested, isGoing: false }
        : event
    ));
    const event = events.find(e => e.id === eventId);
    toast.success(event?.isInterested ? 'Removed from interested' : 'Marked as interested!');
  };

  const handleCreateEvent = () => {
    toast.info('Create event feature coming soon!');
  };

  const handleSaveEvent = (eventId: string) => {
    toast.success('Event saved to your calendar!');
  };

  const handleShareEvent = (eventId: string) => {
    toast.success('Event shared with your friends!');
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesFilter = selectedFilter === 'All' || 
                         (selectedFilter === 'Going' && event.isGoing) ||
                         (selectedFilter === 'Interested' && event.isInterested) ||
                         (selectedFilter === 'Free' && event.price === 'Free');
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  return (
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <Button onClick={handleCreateEvent} className="flex items-center space-x-2 sm:self-end">
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </Button>
        </div>

        {/* Search and Filters */}
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
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filters.map(filter => (
                <option key={filter} value={filter}>{filter}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Grid */}
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
                <div className="absolute top-3 left-3 flex space-x-2">
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSaveEvent(event.id)}
                    className="bg-white/90 rounded-full p-2 hover:bg-white"
                  >
                    <Heart className="w-4 h-4 text-red-500" />
                  </AccessibleButton>
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShareEvent(event.id)}
                    className="bg-white/90 rounded-full p-2 hover:bg-white"
                  >
                    <Share className="w-4 h-4 text-blue-500" />
                  </AccessibleButton>
                </div>
              </div>

              <CardContent className="p-4 flex-1 flex flex-col">
                {/* Event Header */}
                <div className="mb-3 flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {event.description}
                  </p>
                </div>

                {/* Event Details */}
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

                {/* Organizer */}
                <div className="flex items-center space-x-2 mb-4">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={event.organizer.avatar} />
                    <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">by {event.organizer.name}</span>
                </div>

                {/* Action Buttons */}
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

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters to find more events.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              )}
              {selectedCategory !== 'All' && (
                <Button variant="outline" onClick={() => setSelectedCategory('All')}>
                  Show All Categories
                </Button>
              )}
              {selectedFilter !== 'All' && (
                <Button variant="outline" onClick={() => setSelectedFilter('All')}>
                  Reset Filters
                </Button>
              )}
              <Button onClick={handleCreateEvent}>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsTab;