
import React, { useState } from 'react';
import { Camera, Edit, MessageCircle, UserPlus, MoreHorizontal, MapPin, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '../components/Header';
import Post from '../components/Post';

const Profile = () => {
  const [isOwnProfile] = useState(true);
  
  const userInfo = {
    name: 'Jane Doe',
    bio: 'Software Developer | Travel Enthusiast | Coffee Lover ☕',
    location: 'San Francisco, CA',
    work: 'Software Engineer at Tech Corp',
    education: 'Stanford University',
    relationship: 'Single',
    joined: 'Joined May 2018',
    friends: 1247,
    photos: 342
  };

  const photos = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop'
  ];

  const posts = [
    {
      id: 1,
      author: {
        name: 'Jane Doe',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      content: 'Just finished an amazing hiking trip in Yosemite! The views were absolutely breathtaking. Nature never fails to inspire me. 🏔️',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      timestamp: '3h',
      likes: 89,
      comments: 12,
      shares: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto">
        {/* Cover Photo & Profile Section */}
        <Card className="bg-white shadow-sm border-0 shadow-gray-100 rounded-none md:rounded-lg md:mt-4">
          <div className="relative">
            {/* Cover Photo */}
            <div className="h-80 bg-gradient-to-r from-blue-400 to-purple-500 relative">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop"
                alt="Cover"
                className="w-full h-full object-cover"
              />
              {isOwnProfile && (
                <Button className="absolute bottom-4 right-4 bg-white text-gray-900 hover:bg-gray-100">
                  <Camera className="w-4 h-4 mr-2" />
                  Edit cover photo
                </Button>
              )}
            </div>
            
            {/* Profile Info */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-white">
                      <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    {isOwnProfile && (
                      <Button size="sm" className="absolute bottom-0 right-0 rounded-full p-2 bg-gray-100 text-gray-600 hover:bg-gray-200">
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">{userInfo.name}</h1>
                    <p className="text-gray-600 mt-1">{userInfo.friends} friends</p>
                    <div className="flex -space-x-2 mt-2 justify-center md:justify-start">
                      {[...Array(8)].map((_, i) => (
                        <Avatar key={i} className="w-8 h-8 border-2 border-white">
                          <AvatarImage src={`https://images.unsplash.com/photo-${1580000000000 + i}?w=100&h=100&fit=crop&crop=face`} />
                          <AvatarFallback>F</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4 md:mt-0">
                  {isOwnProfile ? (
                    <>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit profile
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add friend
                      </Button>
                      <Button variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 px-4 lg:px-0">
          {/* Left Sidebar - About */}
          <div className="space-y-4">
            <Card className="bg-white shadow-sm border-0 shadow-gray-100">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 mb-4">About</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Briefcase className="w-5 h-5" />
                    <span>{userInfo.work}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <GraduationCap className="w-5 h-5" />
                    <span>Studied at {userInfo.education}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>Lives in {userInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Heart className="w-5 h-5" />
                    <span>{userInfo.relationship}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-4 text-sm">{userInfo.joined}</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0 shadow-gray-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Photos</h3>
                  <Button variant="ghost" size="sm" className="text-blue-600">See all photos</Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {photos.slice(0, 9).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Posts */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="space-y-4 mt-4">
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </TabsContent>
              
              <TabsContent value="about" className="mt-4">
                <Card className="bg-white shadow-sm border-0 shadow-gray-100">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Bio</h3>
                    <p className="text-gray-700">{userInfo.bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="friends" className="mt-4">
                <Card className="bg-white shadow-sm border-0 shadow-gray-100">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Friends ({userInfo.friends})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="text-center">
                          <Avatar className="w-16 h-16 mx-auto">
                            <AvatarImage src={`https://images.unsplash.com/photo-${1580000000000 + i}?w=200&h=200&fit=crop&crop=face`} />
                            <AvatarFallback>F{i}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-medium text-gray-900 mt-2">Friend {i + 1}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="photos" className="mt-4">
                <Card className="bg-white shadow-sm border-0 shadow-gray-100">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Photos ({userInfo.photos})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
