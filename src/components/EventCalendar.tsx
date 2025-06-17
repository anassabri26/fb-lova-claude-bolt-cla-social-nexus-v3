import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, Filter, Search, Bell, Share, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_IMAGES } from '@/lib/constants';
import CreateEvent from './CreateEvent';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'personal' | 'public' | 'friend' | 'birthday' | 'reminder';
  color: string;
  attendees?: number;
  maxAttendees?: number;
  organizer?: {
    name: string;
    avatar: string;
  };
  description?: string;
  isGoing?: boolean;
  isInterested?: boolean;
  category?: string;
  price?: string;
}

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Tech Conference 2024',
      date: new Date(2024, 2, 15),
      time: '9:00 AM',
      location: 'Convention Center, San Francisco',
      type: 'public',
      color: 'bg-blue-500',
      attendees: 1250,
      maxAttendees: 2000,
      organizer: {
        name: 'Tech Events Inc',
        avatar: MOCK_IMAGES.AVATARS[0]
      },
      description: 'Join us for the biggest tech conference of the year featuring latest innovations in AI, blockchain, and more.',
      category: 'Technology',
      price: '$199'
    },
    {
      id: '2',
      title: 'Sarah\'s Birthday Party',
      date: new Date(2024, 2, 20),
      time: '7:00 PM',
      location: 'Sarah\'s House',
      type: 'birthday',
      color: 'bg-pink-500',
      attendees: 25,
      organizer: {
        name: 'Sarah Johnson',
        avatar: MOCK_IMAGES.AVATARS[1]
      },
      description: 'Come celebrate Sarah\'s 25th birthday! Food, drinks, and good vibes.',
      category: 'Birthday',
      price: 'Free'
    },
    {
      id: '3',
      title: 'Team Meeting',
      date: new Date(2024, 2, 22),
      time: '2:00 PM',
      location: 'Office Conference Room',
      type: 'friend',
      color: 'bg-purple-500',
      attendees: 12,
      organizer: {
        name: 'Work Team',
        avatar: MOCK_IMAGES.AVATARS[2]
      },
      description: 'Weekly team sync to discuss project progress and upcoming deadlines.',
      category: 'Work'
    },
    {
      id: '4',
      title: 'Community Garden Cleanup',
      date: new Date(2024, 2, 18),
      time: '10:00 AM',
      location: 'Central Community Garden',
      type: 'public',
      color: 'bg-green-500',
      attendees: 45,
      maxAttendees: 100,
      organizer: {
        name: 'Green Community',
        avatar: MOCK_IMAGES.AVATARS[3]
      },
      description: 'Help us clean and beautify our local community garden. Bring gloves and enthusiasm!',
      category: 'Community',
      price: 'Free'
    },
    {
      id: '5',
      title: 'Dentist Appointment',
      date: new Date(2024, 2, 25),
      time: '3:30 PM',
      location: 'Downtown Dental Clinic',
      type: 'reminder',
      color: 'bg-gray-500',
      category: 'Personal'
    }
  ]);

  const categories = ['all', 'Technology', 'Birthday', 'Work', 'Community', 'Personal', 'Entertainment', 'Sports'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleEventAction = (eventId: string, action: 'going' | 'interested' | 'share' | 'remind') => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    switch (action) {
      case 'going':
        setEvents(prev => prev.map(e => 
          e.id === eventId 
            ? { ...e, isGoing: !e.isGoing, isInterested: false }
            : e
        ));
        toast.success(event.isGoing ? 'Removed from going' : 'Marked as going');
        break;
      case 'interested':
        setEvents(prev => prev.map(e => 
          e.id === eventId 
            ? { ...e, isInterested: !e.isInterested, isGoing: false }
            : e
        ));
        toast.success(event.isInterested ? 'Removed from interested' : 'Marked as interested');
        break;
      case 'share':
        navigator.clipboard.writeText(`Check out this event: ${event.title}`);
        toast.success('Event link copied to clipboard');
        break;
      case 'remind':
        toast.success('Reminder set for this event');
        break;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date).filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
        return matchesSearch && matchesCategory;
      });
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-blue-50 border-blue-300' : ''
          } ${isSelected ? 'bg-blue-100 border-blue-400' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded text-white truncate cursor-pointer hover:opacity-80 ${event.color}`}
                title={`${event.title} - ${event.time}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDate(date);
                }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate).filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  // Get upcoming events (sorted by date)
  const upcomingEvents = [...filteredEvents]
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 border-b">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0">
              {renderCalendarDays()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Details */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {selectedDate 
                  ? selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : 'Select a date'
                }
              </CardTitle>
              <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Add Event
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        
                        {event.attendees && (
                          <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                            <Users className="w-3 h-3" />
                            <span>
                              {event.attendees} {event.maxAttendees ? `/ ${event.maxAttendees}` : ''} attending
                            </span>
                          </div>
                        )}
                        
                        {event.organizer && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src={event.organizer.avatar} />
                              <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-500">by {event.organizer.name}</span>
                          </div>
                        )}

                        {event.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{event.description}</p>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end space-y-1">
                        <Badge 
                          variant="outline" 
                          className={`${event.color} text-white border-transparent`}
                        >
                          {event.category}
                        </Badge>
                        {event.price && (
                          <Badge variant="secondary" className="text-xs">
                            {event.price}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {event.type !== 'reminder' && (
                      <div className="flex space-x-2 mt-3 pt-3 border-t">
                        <Button 
                          size="sm" 
                          variant={event.isGoing ? "default" : "outline"}
                          onClick={() => handleEventAction(event.id, 'going')}
                          className="flex-1"
                        >
                          {event.isGoing ? 'Going' : 'Join'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant={event.isInterested ? "default" : "outline"}
                          onClick={() => handleEventAction(event.id, 'interested')}
                          className="flex-1"
                        >
                          <Star className={`w-3 h-3 mr-1 ${event.isInterested ? 'fill-current' : ''}`} />
                          {event.isInterested ? 'Interested' : 'Maybe'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEventAction(event.id, 'share')}
                        >
                          <Share className="w-3 h-3" />
                        </Button>
                      </div>
                    )}

                    {event.type === 'reminder' && (
                      <div className="flex space-x-2 mt-3 pt-3 border-t">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEventAction(event.id, 'remind')}
                          className="flex-1"
                        >
                          <Bell className="w-3 h-3 mr-1" />
                          Set Reminder
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No events for this date</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Create Event
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-2">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => setSelectedDate(event.date)}
                  >
                    <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {event.date.toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                    {event.isGoing && (
                      <Badge variant="secondary" className="text-xs">Going</Badge>
                    )}
                    {event.isInterested && (
                      <Badge variant="outline" className="text-xs">Interested</Badge>
                    )}
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-2 text-blue-600">
                  View All Events
                </Button>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">No upcoming events</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Event Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-500 text-white border-transparent">
                Technology
              </Badge>
              <Badge variant="outline" className="bg-pink-500 text-white border-transparent">
                Birthday
              </Badge>
              <Badge variant="outline" className="bg-purple-500 text-white border-transparent">
                Work
              </Badge>
              <Badge variant="outline" className="bg-green-500 text-white border-transparent">
                Community
              </Badge>
              <Badge variant="outline" className="bg-gray-500 text-white border-transparent">
                Personal
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <CreateEvent 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default EventCalendar;