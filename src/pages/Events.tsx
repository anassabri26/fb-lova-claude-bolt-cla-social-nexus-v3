
import React, { useState } from 'react';
import { Calendar, Plus, MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import CreateEvent from '../components/CreateEvent';
import AccessibleButton from '../components/AccessibleButton';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  isGoing: boolean;
}

const Events = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Tech Meetup 2024',
      date: '2024-06-20',
      time: '18:00',
      location: 'Downtown Conference Center',
      attendees: 156,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop',
      isGoing: true
    },
    {
      id: '2',
      title: 'Photography Workshop',
      date: '2024-06-25',
      time: '14:00',
      location: 'City Park',
      attendees: 43,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop',
      isGoing: false
    }
  ]);

  const toggleAttendance = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isGoing: !event.isGoing, attendees: event.isGoing ? event.attendees - 1 : event.attendees + 1 }
        : event
    ));
  };

  if (showCreateEvent) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
        <Header />
        <div className="flex max-w-7xl mx-auto">
          <Sidebar />
          <main className="flex-1 px-4 py-6">
            <div className="mb-4">
              <AccessibleButton
                variant="ghost"
                onClick={() => setShowCreateEvent(false)}
                className="text-blue-600"
              >
                ← Back to Events
              </AccessibleButton>
            </div>
            <CreateEvent />
          </main>
          <RightSidebar />
        </div>
        <MobileNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Events</h1>
              </div>
              <Button 
                onClick={() => setShowCreateEvent(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                          <Clock className="w-4 h-4 ml-2" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{event.attendees} attending</span>
                        </div>
                      </div>
                      
                      <AccessibleButton
                        onClick={() => toggleAttendance(event.id)}
                        className={`w-full ${
                          event.isGoing 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {event.isGoing ? 'Going' : 'Join Event'}
                      </AccessibleButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <RightSidebar />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Events;
