
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Share, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const EventsTab = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const events = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      date: 'March 15, 2024',
      time: '9:00 AM - 6:00 PM',
      location: 'Convention Center, NYC',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
      organizer: {
        name: 'Tech Events Inc.',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
      },
      attendees: 245,
      interested: 892,
      price: 'Free',
      category: 'Technology',
      isInterested: false,
      isGoing: false
    },
    {
      id: '2',
      title: 'Local Food Festival',
      date: 'March 20, 2024',
      time: '11:00 AM - 8:00 PM',
      location: 'Central Park, NYC',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
      organizer: {
        name: 'NYC Food Events',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
      },
      attendees: 1200,
      interested: 3400,
      price: '$25',
      category: 'Food & Drink',
      isInterested: true,
      isGoing: false
    },
    {
      id: '3',
      title: 'Art Gallery Opening',
      date: 'March 25, 2024',
      time: '7:00 PM - 10:00 PM',
      location: 'Modern Art Gallery, Brooklyn',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      organizer: {
        name: 'Modern Art Gallery',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face'
      },
      attendees: 89,
      interested: 234,
      price: 'Free',
      category: 'Arts & Culture',
      isInterested: false,
      isGoing: true
    }
  ];

  const handleInterested = (eventId: string, title: string) => {
    toast.success(`Marked as interested in "${title}"`);
  };

  const handleGoing = (eventId: string, title: string) => {
    toast.success(`Marked as going to "${title}"`);
  };

  const handleShare = (title: string) => {
    toast.success(`Shared "${title}"`);
  };

  const handleSave = (title: string) => {
    toast.success(`Saved "${title}" to your list`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Create Event
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant={activeTab === 'upcoming' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('upcoming')}
          className="flex-1"
        >
          Upcoming
        </Button>
        <Button
          variant={activeTab === 'going' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('going')}
          className="flex-1"
        >
          Going
        </Button>
        <Button
          variant={activeTab === 'interested' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('interested')}
          className="flex-1"
        >
          Interested
        </Button>
        <Button
          variant={activeTab === 'hosting' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('hosting')}
          className="flex-1"
        >
          Hosting
        </Button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="flex">
                {/* Event Image */}
                <div className="w-1/3 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                  <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded px-2 py-1">
                    <span className="text-xs font-semibold text-blue-600">{event.category}</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 p-4 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-lg font-bold text-green-600">{event.price}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{event.attendees} going</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{event.interested} interested</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={event.organizer.avatar} />
                        <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">by {event.organizer.name}</span>
                    </div>

                    <div className="flex space-x-2">
                      <AccessibleButton
                        onClick={() => handleSave(event.title)}
                        variant="outline"
                        size="sm"
                      >
                        <Heart className="w-4 h-4" />
                      </AccessibleButton>
                      <AccessibleButton
                        onClick={() => handleShare(event.title)}
                        variant="outline"
                        size="sm"
                      >
                        <Share className="w-4 h-4" />
                      </AccessibleButton>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      onClick={() => handleInterested(event.id, event.title)}
                      variant={event.isInterested ? 'default' : 'outline'}
                      className="flex-1"
                    >
                      <Star className="w-4 h-4 mr-1" />
                      {event.isInterested ? 'Interested' : 'Interested'}
                    </Button>
                    <Button
                      onClick={() => handleGoing(event.id, event.title)}
                      variant={event.isGoing ? 'default' : 'outline'}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Users className="w-4 h-4 mr-1" />
                      {event.isGoing ? 'Going' : 'Going'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Discover events happening near you</p>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
            Explore Events
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventsTab;
