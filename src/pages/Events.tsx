import React, { useState } from 'react';
import EventsTab from '@/components/EventsTab';
import EventCalendar from '@/components/EventCalendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, List } from 'lucide-react';

const Events = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <div className="flex justify-end mb-4">
          <Tabs value={view} onValueChange={(value) => setView(value as 'list' | 'calendar')}>
            <TabsList>
              <TabsTrigger value="list" className="flex items-center space-x-2">
                <List className="w-4 h-4" />
                <span>List</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Calendar</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {view === 'list' ? <EventsTab /> : <EventCalendar />}
      </div>
    </div>
  );
};

export default Events;