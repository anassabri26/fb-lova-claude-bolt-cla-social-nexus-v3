
import React, { useState } from 'react';
import { Camera, Edit, MapPin, Calendar, Briefcase, Heart, Users, Image, MoreHorizontal } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import MobileNavigation from '../components/MobileNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const userInfo = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Full-stack developer passionate about creating amazing web experiences. Love to share knowledge and connect with fellow developers.',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop',
    location: 'San Francisco, CA',
    joinDate: 'Joined March 2020',
    work: 'Software Engineer at Tech Corp',
    education: 'Computer Science, Stanford University',
    relationship: 'Single',
    followers: 1250,
    following: 890,
    friends: 456,
    posts: 127,
    verified: true
  };

  const userPosts = [
    {
      id: 1,
      author: {
        name: userInfo.name,
        avatar: userInfo.avatar,
        verified: userInfo.verified
      },
      content: 'Just shipped a new feature! The satisfaction of seeing your code come to life never gets old. 🚀 #WebDevelopment #React',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      timestamp: '2h',
      likes: 89,
      comments: 12,
      shares: 5
    },
    {
      id: 2,
      author: {
        name: userInfo.name,
        avatar: userInfo.avatar,
        verified: userInfo.verified
      },
      content: 'Beautiful sunset from my balcony today. Sometimes you need to pause and appreciate the simple moments in life. 🌅',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      timestamp: '1d',
      likes: 156,
      comments: 23,
      shares: 8
    }
  ];

  const photos = [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop'
  ];

  const friends = [
    { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face' },
    { name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face' },
    { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face' },
    { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face' },
    { name: 'Lisa Brown', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face' },
    { name: 'Alex Garcia', avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face' }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed user' : 'Following user');
  };

  const handleEditProfile = () => {
    toast.info('Edit profile feature coming soon!');
  };

  const handleSendMessage = () => {
    toast.info('Message feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          {/* Cover Photo & Profile */}
          <Card className="mb-6 overflow-hidden">
            <div className="relative">
              <img
                src={userInfo.coverPhoto}
                alt="Cover"
                className="w-full h-64 object-cover"
              />
              <AccessibleButton
                variant="outline"
                size="sm"
                className="absolute bottom-4 right-4 bg-white"
                onClick={() => toast.info('Change cover photo coming soon!')}
              >
                <Camera className="w-4 h-4 mr-2" />
                Edit Cover
              </AccessibleButton>
            </div>
            
            <CardContent className="relative">
              <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16 md:-mt-8">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white">
                    <AvatarImage src={userInfo.avatar} />
                    <AvatarFallback className="text-2xl">{userInfo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <AccessibleButton
                    variant="outline"
                    size="sm"
                    className="absolute bottom-2 right-2 w-8 h-8 p-0 bg-white rounded-full"
                    onClick={() => toast.info('Change profile picture coming soon!')}
                  >
                    <Camera className="w-4 h-4" />
                  </AccessibleButton>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
                    {userInfo.verified && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{userInfo.username}</p>
                  <p className="text-gray-700 mb-4">{userInfo.bio}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {userInfo.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {userInfo.work}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {userInfo.joinDate}
                    </div>
                  </div>
                  
                  <div className="flex space-x-6 mb-4">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{userInfo.posts}</div>
                      <div className="text-sm text-gray-600">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{userInfo.followers.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{userInfo.following}</div>
                      <div className="text-sm text-gray-600">Following</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{userInfo.friends}</div>
                      <div className="text-sm text-gray-600">Friends</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <AccessibleButton
                    onClick={handleEditProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </AccessibleButton>
                  <AccessibleButton
                    variant="outline"
                    onClick={handleSendMessage}
                  >
                    Message
                  </AccessibleButton>
                  <AccessibleButton
                    variant="outline"
                    size="sm"
                    className="px-3"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </AccessibleButton>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="space-y-6 mt-6">
              {userPosts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </TabsContent>
            
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Work</h3>
                    <p className="text-gray-700">{userInfo.work}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                    <p className="text-gray-700">{userInfo.education}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Lives in</h3>
                    <p className="text-gray-700">{userInfo.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Relationship</h3>
                    <p className="text-gray-700">{userInfo.relationship}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Joined</h3>
                    <p className="text-gray-700">{userInfo.joinDate}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="photos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Photos
                    <AccessibleButton variant="outline" size="sm">
                      <Image className="w-4 h-4 mr-2" />
                      Add Photos
                    </AccessibleButton>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => toast.info(`View photo ${index + 1}`)}
                      >
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
            </TabsContent>
            
            <TabsContent value="friends" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Friends ({userInfo.friends})
                    <AccessibleButton variant="outline" size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Find Friends
                    </AccessibleButton>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {friends.map((friend, index) => (
                      <div
                        key={index}
                        className="text-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                        onClick={() => toast.info(`View ${friend.name}'s profile`)}
                      >
                        <Avatar className="w-20 h-20 mx-auto mb-2">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-gray-900 text-sm">{friend.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Profile;
