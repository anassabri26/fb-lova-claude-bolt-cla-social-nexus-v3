
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RightSidebar = () => {
  const contacts = [
    { name: 'Alex Rodriguez', avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face', online: true },
    { name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face', online: true },
    { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face', online: false },
    { name: 'Lisa Park', avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&crop=face', online: true },
  ];

  const events = [
    { title: 'Tech Meetup 2024', date: 'Tomorrow at 6:00 PM', attendees: 45 },
    { title: 'Weekend Hiking', date: 'Saturday at 8:00 AM', attendees: 12 },
  ];

  return (
    <aside className="hidden xl:block w-80 p-4 space-y-4">
      {/* Friend Requests */}
      <Card className="bg-white shadow-sm border-0 shadow-gray-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900">Friend Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">John Lee</p>
                <p className="text-sm text-gray-500">2 mutual friends</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Confirm
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contacts */}
      <Card className="bg-white shadow-sm border-0 shadow-gray-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900">Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <span className="text-gray-900 font-medium">{contact.name}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="bg-white shadow-sm border-0 shadow-gray-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium text-gray-900">{event.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{event.date}</p>
              <p className="text-sm text-blue-600 mt-1">{event.attendees} people interested</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
};

export default RightSidebar;
