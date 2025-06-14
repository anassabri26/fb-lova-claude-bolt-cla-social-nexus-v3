
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import Post from '../components/Post';
import { Camera, Edit, MapPin, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'photos'>('posts');

  const userPosts = [
    {
      id: 1,
      author: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      content: 'Just completed my latest React project! Feeling proud of the progress I\'ve made this year. 🚀',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      timestamp: '2h',
      likes: 24,
      comments: 5,
      shares: 2
    },
    {
      id: 2,
      author: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      content: 'Weekend hiking adventure! The view from the top was absolutely breathtaking.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      timestamp: '1d',
      likes: 45,
      comments: 12,
      shares: 8
    }
  ];

  const photos = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
  ];

  const handleEditProfile = () => {
    toast.info('Edit profile feature coming soon!');
  };

  const handleAddPhoto = () => {
    toast.info('Photo upload feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Cover Photo and Profile Info */}
            <Card className="mb-6 overflow-hidden">
              <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-400 to-purple-500">
                <AccessibleButton
                  variant="ghost"
                  className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  onClick={handleAddPhoto}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Add Cover Photo
                </AccessibleButton>
              </div>
              
              <CardContent className="relative px-6 pt-0 pb-6">
                <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
                  <div className="relative -mt-16 mb-4 md:mb-0">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                      <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <AccessibleButton
                      size="sm"
                      className="absolute bottom-2 right-2 w-8 h-8 rounded-full p-0 bg-gray-100 hover:bg-gray-200 text-gray-600"
                      onClick={handleAddPhoto}
                    >
                      <Camera className="w-4 h-4" />
                    </AccessibleButton>
                  </div>
                  
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                    <p className="text-gray-600 mb-2">1,234 friends</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                  
                  <AccessibleButton onClick={handleEditProfile} className="self-start md:self-end">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </AccessibleButton>
                </div>
              </CardContent>
            </Card>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
              {[
                { id: 'posts', label: 'Posts' },
                { id: 'about', label: 'About' },
                { id: 'photos', label: 'Photos' },
              ].map((tab) => (
                <AccessibleButton
                  key={tab.id}
                  variant="ghost"
                  className={`flex-1 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(tab.id as 'posts' | 'about' | 'photos')}
                >
                  {tab.label}
                </AccessibleButton>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {userPosts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">About</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Software Engineer at Tech Corp</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Computer Science at Stanford University</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Single</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Lives in San Francisco, CA</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'photos' && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Photos</h3>
                    <AccessibleButton variant="ghost" onClick={handleAddPhoto}>
                      Add Photos
                    </AccessibleButton>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Profile;
