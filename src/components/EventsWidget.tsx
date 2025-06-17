import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_IMAGES } from '@/lib/constants';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  isGoing: boolean;
  organizer: {
    name: string;
    avatar: string;
  };
  image: string;
}

const EventsWidget = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Tech Meetup 2024',
      date: 'Mar 20',
      time: '7:00 PM',
      location: 'Downtown Conference Center',
      attendees: 45,
      isGoing: true,
      organizer: {
        name: 'Tech Community',
        avatar: MOCK_IMAGES.AVATARS[0]
      },
      image: MOCK_IMAGES.POSTS[0]
    },
    {
      id: '2',
      title: 'Photography Workshop',
      date: 'Mar 25',
      time: '2:00 PM',
      location: 'Art Studio',
      attendees: 12,
      isGoing: false,
      organizer: {
        name: 'Photo Club',
        avatar: MOCK_IMAGES.AVATARS[1]
      },
      image: MOCK_IMAGES.POSTS[1]
    }
  ]);

  const handleEventAction = (eventId: string, action: 'going' | 'interested') => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isGoing: action === 'going' ? !event.isGoing : event.isGoing }
        : event
    ));
  };

  return (
    <Card>
      <CardHeader className="p-3">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Upcoming Events</span>
          </div>
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
              <div className="flex space-x-3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 truncate">{event.title}</h4>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{event.attendees} going</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={event.organizer.avatar} />
                    <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600">{event.organizer.name}</span>
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant={event.isGoing ? "default" : "outline"}
                    onClick={() => handleEventAction(event.id, 'going')}
                    className="text-xs h-6 px-2"
                  >
                    {event.isGoing ? 'Going' : 'Join'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEventAction(event.id, 'interested')}
                    className="text-xs h-6 px-2"
                  >
                    Interested
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-3 text-blue-600">
          See all events
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventsWidget;