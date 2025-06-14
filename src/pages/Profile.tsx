
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, MapPin, Calendar, Briefcase, GraduationCap, Heart, Edit3, Plus } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import Post from '../components/Post';
import { toast } from 'sonner';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const userInfo = {
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop',
    bio: 'Software Developer | React Enthusiast | Coffee Lover ☕',
    location: 'San Francisco, CA',
    joinDate: 'Joined March 2020',
    work: 'Software Engineer at Tech Corp',
    education: 'Computer Science at Stanford University',
    relationship: 'Single',
    friends: 1247,
    photos: 89
  };

  const userPosts = [
    {
      id: 1,
      author: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      content: 'Working on some exciting new React features! Can\'t wait to share them with the team. 🚀',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      timestamp: '3h',
      likes: 42,
      comments: 8,
      shares: 3
    }
  ];

  const friends = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 12
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      mutualFriends: 8
    }
  ];

  const photos = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop'
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed' : 'Following');
  };

  const handleEditProfile = () => {
    toast.info('Edit profile functionality coming soon!');
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
              <div className="relative">
                <img
                  src={userInfo.coverPhoto}
                  alt="Cover"
                  className="w-full h-64 object-cover"
                />
                <AccessibleButton
                  variant="ghost"
                  className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Edit Cover
                </AccessibleButton>
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-white">
                      <AvatarImage src={userInfo.avatar} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <AccessibleButton
                      variant="ghost"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border shadow-md p-1"
                    >
                      <Camera className="w-4 h-4" />
                    </AccessibleButton>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">{userInfo.name}</h1>
                    <p className="text-gray-600 mt-1">{userInfo.bio}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {userInfo.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {userInfo.joinDate}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <AccessibleButton
                      onClick={handleFollow}
                      className={isFollowing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isFollowing ? 'Following' : 'Follow'}
                    </AccessibleButton>
                    <AccessibleButton variant="outline" onClick={handleEditProfile}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </AccessibleButton>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-6">
                <div className="space-y-6">
                  {userPosts.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Work and Education</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Briefcase className="w-5 h-5 text-gray-400" />
                          <span>{userInfo.work}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="w-5 h-5 text-gray-400" />
                          <span>{userInfo.education}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Basic Info</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Heart className="w-5 h-5 text-gray-400" />
                          <span>{userInfo.relationship}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span>Lives in {userInfo.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="friends" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Friends ({userInfo.friends})</h3>
                      <AccessibleButton variant="outline" size="sm">
                        See All
                      </AccessibleButton>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {friends.map((friend) => (
                        <div key={friend.id} className="text-center">
                          <Avatar className="w-20 h-20 mx-auto mb-2">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h4 className="font-medium text-sm">{friend.name}</h4>
                          <p className="text-xs text-gray-500">{friend.mutualFriends} mutual</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="photos" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Photos ({userInfo.photos})</h3>
                      <AccessibleButton variant="outline" size="sm">
                        See All
                      </AccessibleButton>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Profile;
