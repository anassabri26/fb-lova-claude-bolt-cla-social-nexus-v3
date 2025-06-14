
import React from 'react';
import { Camera, Edit, MoreHorizontal, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import AccessibleButton from '../components/AccessibleButton';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-4xl mx-auto">
        {/* Cover Photo */}
        <div className="relative h-80 md:h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-b-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop"
            alt="Cover photo"
            className="w-full h-full object-cover"
          />
          <AccessibleButton
            variant="ghost"
            className="absolute bottom-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg"
          >
            <Camera className="w-4 h-4 mr-2" />
            Edit cover photo
          </AccessibleButton>
        </div>

        {/* Profile Info */}
        <div className="relative px-4 pb-4">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
            <div className="relative -mt-16 md:-mt-20">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white">
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <AccessibleButton
                variant="ghost"
                size="sm"
                className="absolute bottom-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
                aria-label="Update profile picture"
              >
                <Camera className="w-4 h-4" />
              </AccessibleButton>
            </div>

            <div className="flex-1 mt-4 md:mt-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">John Doe</h1>
              <p className="text-gray-600 mt-1">Software Developer at Tech Company</p>
              <p className="text-sm text-gray-500 mt-1">1,234 friends • 567 followers</p>
              
              <div className="flex items-center space-x-2 mt-4">
                <AccessibleButton className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to story
                </AccessibleButton>
                <AccessibleButton variant="outline" className="px-6 py-2">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit profile
                </AccessibleButton>
                <AccessibleButton variant="outline" size="sm" className="p-2">
                  <MoreHorizontal className="w-4 h-4" />
                </AccessibleButton>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">About</h2>
                <div className="space-y-3 text-sm">
                  <p>🏢 Works at Tech Company</p>
                  <p>🎓 Studied Computer Science at University</p>
                  <p>📍 Lives in San Francisco, CA</p>
                  <p>💼 Joined March 2020</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Posts */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Posts</h2>
                <div className="text-center py-8 text-gray-500">
                  <p>No posts to show</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Profile;
