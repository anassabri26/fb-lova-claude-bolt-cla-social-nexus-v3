
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Clock, Plus } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Events = () => {
  const [activeTab, setActiveTab] = useState('discover');

  const events = [
    {
      id: 1,
      title: 'React Meetup 2024',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      date: 'Dec 15, 2024',
      time: '6:00 PM',
      location: 'San Francisco, CA',
      attendees: 45,
      interested: 120,
      host: {
        name: 'Tech Community',
        avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop'
      }
    },
    {
      id: 2,
      title: 'Holiday Party 2024',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
      date: 'Dec 20, 2024',
      time: '7:00 PM',
      location: 'Downtown SF',
      attendees: 78,
      interested: 200,
      host: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      }
    }
  ];

  const handleCreateEvent = () => {
    toast.info('Create event feature coming soon!');
  };

  const handleJoinEvent = (eventTitle: string) => {
    toast.success(`Joined: ${eventTitle}`);
  };

  const handleInterestedEvent = (eventTitle: string) => {
    toast.info(`Marked interested: ${eventTitle}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Events</h1>
              <AccessibleButton
                onClick={handleCreateEvent}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </AccessibleButton>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="discover">Discover</TabsTrigger>
                <TabsTrigger value="your-events">Your Events</TabsTrigger>
                <TabsTrigger value="hosting">Hosting</TabsTrigger>
              </TabsList>

              <TabsContent value="discover" className="mt-6">
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="flex">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-48 h-32 object-cover"
                        />
                        <CardContent className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                {event.title}
                              </h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {event.date} at {event.time}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  {event.location}
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-2" />
                                  {event.attendees} going, {event.interested} interested
                                </div>
                              </div>
                              <div className="flex items-center mt-3">
                                <Avatar className="w-6 h-6 mr-2">
                                  <AvatarImage src={event.host.avatar} />
                                  <AvatarFallback>{event.host.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-gray-600">
                                  Hosted by {event.host.name}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2 ml-4">
                              <AccessibleButton
                                onClick={() => handleJoinEvent(event.title)}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Join
                              </AccessibleButton>
                              <AccessibleButton
                                variant="outline"
                                onClick={() => handleInterestedEvent(event.title)}
                              >
                                Interested
                              </AccessibleButton>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="your-events" className="mt-6">
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming events</h3>
                  <p className="text-gray-600">Events you're attending will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="hosting" className="mt-6">
                <div className="text-center py-12">
                  <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Start hosting</h3>
                  <p className="text-gray-600 mb-4">Create an event to bring people together</p>
                  <AccessibleButton
                    onClick={handleCreateEvent}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create Event
                  </AccessibleButton>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Events;
