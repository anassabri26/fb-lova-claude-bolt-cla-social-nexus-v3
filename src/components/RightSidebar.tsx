
import React from 'react';
import FriendRequests from './FriendRequests';
import FriendsList from './FriendsList';
import { Calendar, TrendingUp, Users, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AccessibleButton from './AccessibleButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RightSidebar = () => {
  const navigate = useNavigate();

  const sponsoredAds = [
    {
      id: 1,
      title: 'Learn React Development',
      description: 'Master modern React with our comprehensive course',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      sponsor: 'TechEdu',
      url: 'https://example.com/react-course'
    },
    {
      id: 2,
      title: 'Premium Design Tools',
      description: 'Create stunning designs with our professional toolkit',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop',
      sponsor: 'DesignPro',
      url: 'https://example.com/design-tools'
    }
  ];

  const birthdayFriends = [
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'React Meetup',
      date: 'Tomorrow',
      attendees: 45
    },
    {
      id: 2,
      title: 'Design Workshop',
      date: 'This Weekend',
      attendees: 23
    }
  ];

  const handleAdClick = (ad: any) => {
    toast.success(`Opening ${ad.title}`);
    console.log('Ad clicked:', ad.title, 'URL:', ad.url);
    // In a real app, this would open the ad URL
  };

  const handleBirthdayWish = (friend: any) => {
    toast.success(`Birthday wish sent to ${friend.name}!`);
    console.log('Birthday wish sent to:', friend.name);
  };

  const handleEventInterest = (event: any) => {
    toast.success(`Marked interested in ${event.title}`);
    console.log('Event interest:', event.title);
  };

  const handleCreateEvent = () => {
    navigate('/events');
    toast.success('Navigate to Events page');
    console.log('Create event clicked - navigating to events');
  };

  const handleTrendingClick = (topic: string) => {
    navigate('/trending');
    toast.success(`Exploring ${topic}`);
    console.log('Trending topic clicked:', topic);
  };

  const handleFindFriends = () => {
    navigate('/friends');
    toast.success('Navigate to Friends page');
    console.log('Quick action: Find friends');
  };

  const handleStartMessage = () => {
    navigate('/messages');
    toast.success('Navigate to Messages');
    console.log('Quick action: Start conversation');
  };

  return (
    <aside className="hidden xl:block w-72 2xl:w-80 p-2 lg:p-4 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-y-auto sticky top-14 sm:top-16">
      <div className="space-y-4 lg:space-y-6">
        <FriendRequests />
        <FriendsList />
        
        {/* Sponsored */}
        <div className="bg-white rounded-lg shadow-sm p-3 lg:p-4">
          <h3 className="font-semibold text-gray-900 mb-2 lg:mb-3 text-sm lg:text-base">Sponsored</h3>
          <div className="space-y-3 lg:space-y-4">
            {sponsoredAds.map((ad) => (
              <div 
                key={ad.id}
                className="flex space-x-2 lg:space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={() => handleAdClick(ad)}
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs lg:text-sm font-medium text-gray-900 truncate">{ad.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ad.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Sponsored by {ad.sponsor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Birthdays */}
        <div className="bg-white rounded-lg shadow-sm p-3 lg:p-4">
          <div className="flex items-center space-x-2 mb-2 lg:mb-3">
            <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Birthdays</h3>
          </div>
          <div className="space-y-2 lg:space-y-3">
            {birthdayFriends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <Avatar className="w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs lg:text-sm text-gray-900 truncate">{friend.name}'s birthday</span>
                </div>
                <AccessibleButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleBirthdayWish(friend)}
                  className="text-xs flex-shrink-0 ml-2"
                >
                  Wish
                </AccessibleButton>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-3 lg:p-4">
          <div className="flex items-center justify-between mb-2 lg:mb-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Upcoming Events</h3>
            </div>
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={handleCreateEvent}
              className="text-blue-600 text-xs"
            >
              Create
            </AccessibleButton>
          </div>
          <div className="space-y-2 lg:space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-2 lg:p-3 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs lg:text-sm font-medium text-gray-900 truncate">{event.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{event.date}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.attendees} attending</p>
                  </div>
                </div>
                <AccessibleButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleEventInterest(event)}
                  className="w-full mt-2 text-xs"
                >
                  Interested
                </AccessibleButton>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-white rounded-lg shadow-sm p-3 lg:p-4">
          <div className="flex items-center space-x-2 mb-2 lg:mb-3">
            <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Trending</h3>
          </div>
          <div className="space-y-1 lg:space-y-2">
            {['#ReactJS', '#WebDevelopment', '#TechNews', '#Design', '#Programming'].map((topic, index) => (
              <AccessibleButton
                key={index}
                variant="ghost"
                className="w-full justify-start text-xs lg:text-sm text-blue-600 hover:bg-blue-50"
                onClick={() => handleTrendingClick(topic)}
              >
                {topic}
              </AccessibleButton>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-3 lg:p-4">
          <h3 className="font-semibold text-gray-900 mb-2 lg:mb-3 text-sm lg:text-base">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-1 lg:gap-2">
            <AccessibleButton
              variant="outline"
              size="sm"
              className="flex flex-col items-center space-y-1 p-2 lg:p-3 h-auto"
              onClick={handleFindFriends}
            >
              <Users className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="text-xs">Find Friends</span>
            </AccessibleButton>
            <AccessibleButton
              variant="outline"
              size="sm"
              className="flex flex-col items-center space-y-1 p-2 lg:p-3 h-auto"
              onClick={handleStartMessage}
            >
              <MessageSquare className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="text-xs">Message</span>
            </AccessibleButton>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
