
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plus, Search, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

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

const EnhancedEvents = () => {
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
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      attendees: 1250,
      maxAttendees: 2000,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
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
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
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
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      attendees: 89,
      maxAttendees: 120,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      isGoing: false,
      isInterested: false,
      category: 'Music',
      price: '$25'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Technology', 'Community', 'Music', 'Sports', 'Food', 'Arts'];
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
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <Button className="flex items-center space-x-2">
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
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
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
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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

              <CardContent className="p-4">
                {/* Event Header */}
                <div className="mb-3">
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
                <div className="flex space-x-2">
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
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find more events.</p>
          </div>
        )}
      </div>
      <MobileNavigation />
    </div>
  );
};

export default EnhancedEvents;
