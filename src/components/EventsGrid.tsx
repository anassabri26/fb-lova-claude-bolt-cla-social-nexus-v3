
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plus, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees?: number;
  image: string;
  isAttending: boolean;
  organizer: {
    name: string;
    avatar: string;
  };
  category: string;
}

const EventsGrid = () => {
  const [filter, setFilter] = useState('all');
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'React Developer Meetup',
      description: 'Join us for an evening of React best practices and networking with fellow developers.',
      date: 'Dec 15, 2024',
      time: '6:00 PM',
      location: 'Tech Hub, San Francisco',
      attendees: 45,
      maxAttendees: 100,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop',
      isAttending: true,
      organizer: {
        name: 'Tech Community SF',
        avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face'
      },
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Local Coffee Meetup',
      description: 'Casual coffee meetup for professionals and entrepreneurs in the area.',
      date: 'Dec 18, 2024',
      time: '10:00 AM',
      location: 'Blue Bottle Coffee, Mission',
      attendees: 12,
      maxAttendees: 20,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      isAttending: false,
      organizer: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      category: 'Social'
    },
    {
      id: '3',
      title: 'Photography Workshop',
      description: 'Learn street photography techniques with professional photographers.',
      date: 'Dec 20, 2024',
      time: '2:00 PM',
      location: 'Golden Gate Park',
      attendees: 28,
      maxAttendees: 30,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
      isAttending: false,
      organizer: {
        name: 'Photo Club SF',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      category: 'Arts'
    }
  ]);

  const categories = ['all', 'Technology', 'Social', 'Arts', 'Sports', 'Business'];

  const filteredEvents = events.filter(event => 
    filter === 'all' || event.category === filter
  );

  const handleAttendEvent = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isAttending: !event.isAttending,
            attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1
          }
        : event
    ));
    
    const event = events.find(e => e.id === eventId);
    if (event) {
      toast.success(event.isAttending ? 'Removed from event' : 'Added to event');
    }
  };

  const handleCreateEvent = () => {
    toast.info('Create event functionality coming soon!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <AccessibleButton onClick={handleCreateEvent} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </AccessibleButton>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
        {categories.map((category) => (
          <AccessibleButton
            key={category}
            variant={filter === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(category)}
            className="whitespace-nowrap"
          >
            {category === 'all' ? 'All Events' : category}
          </AccessibleButton>
        ))}
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
              <Badge 
                variant="secondary" 
                className="absolute top-3 left-3 bg-white/90 text-gray-900"
              >
                {event.category}
              </Badge>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>
                    {event.attendees} 
                    {event.maxAttendees && ` / ${event.maxAttendees}`} attending
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-gray-500">
                  by {event.organizer.name}
                </div>
                <AccessibleButton
                  variant={event.isAttending ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => handleAttendEvent(event.id)}
                  className={event.isAttending ? 'text-blue-600 border-blue-600' : ''}
                >
                  {event.isAttending ? 'Going' : 'Join'}
                </AccessibleButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No events found for the selected category.</p>
        </div>
      )}
    </div>
  );
};

export default EventsGrid;
