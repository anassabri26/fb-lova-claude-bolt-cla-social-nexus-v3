
import React, { useState } from 'react';
import { Calendar, Plus, Search, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import CreateEvent from '../components/CreateEvent';
import AccessibleButton from '../components/AccessibleButton';

interface Event {
  id: number;
  name: string;
  image: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  isAttending: boolean;
  organizer: string;
}

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');

  const events: Event[] = [
    {
      id: 1,
      name: 'React Conference 2024',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      date: 'March 15, 2024',
      time: '9:00 AM',
      location: 'San Francisco, CA',
      attendees: 250,
      category: 'Technology',
      isAttending: true,
      organizer: 'Tech Community'
    },
    {
      id: 2,
      name: 'Web Design Workshop',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
      date: 'March 20, 2024',
      time: '2:00 PM',
      location: 'Online',
      attendees: 150,
      category: 'Design',
      isAttending: false,
      organizer: 'Design Academy'
    },
    {
      id: 3,
      name: 'Startup Networking Event',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      date: 'March 25, 2024',
      time: '6:00 PM',
      location: 'New York, NY',
      attendees: 100,
      category: 'Business',
      isAttending: true,
      organizer: 'Startup Hub'
    }
  ];

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAttendEvent = (eventId: number) => {
    console.log('Attending event:', eventId);
    // Handle attend event logic
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Events</span>
                  <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                    <DialogTrigger asChild>
                      <AccessibleButton size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create
                      </AccessibleButton>
                    </DialogTrigger>
                    <DialogContent>
                      <CreateEvent onClose={() => setShowCreateDialog(false)} />
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <AccessibleButton
                    variant={activeTab === 'upcoming' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('upcoming')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Upcoming Events
                  </AccessibleButton>
                  <AccessibleButton
                    variant={activeTab === 'attending' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('attending')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Events I'm Attending
                  </AccessibleButton>
                  <AccessibleButton
                    variant={activeTab === 'discover' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('discover')}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Discover
                  </AccessibleButton>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{event.name}</h3>
                          <p className="text-sm text-gray-600">by {event.organizer}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {event.category}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
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
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        {event.isAttending ? (
                          <AccessibleButton
                            variant="outline"
                            className="flex-1"
                            onClick={() => console.log('View event:', event.id)}
                          >
                            Going
                          </AccessibleButton>
                        ) : (
                          <AccessibleButton
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleAttendEvent(event.id)}
                          >
                            Attend
                          </AccessibleButton>
                        )}
                        <AccessibleButton
                          variant="outline"
                          onClick={() => console.log('Share event:', event.id)}
                        >
                          Share
                        </AccessibleButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your search or create a new event</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Events;
