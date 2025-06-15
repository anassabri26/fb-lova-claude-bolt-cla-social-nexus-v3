
import React, { useState } from 'react';
import { User, Bell, Shield, Eye, Smartphone, HelpCircle, LogOut, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const SettingsTab = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    comments: true,
    likes: true,
    friendRequests: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    postsVisible: true,
    friendsVisible: false,
    onlineStatus: true
  });

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software developer passionate about creating amazing experiences.',
    location: 'New York, NY'
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved!');
  };

  const handleSavePrivacy = () => {
    toast.success('Privacy settings updated!');
  };

  const handleLogout = () => {
    toast.info('Logging out...');
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion requested. This action cannot be undone.');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-2">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                <AccessibleButton
                  variant="ghost"
                  className="w-full justify-start text-left"
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </AccessibleButton>
                <AccessibleButton
                  variant="ghost"
                  className="w-full justify-start text-left"
                >
                  <Bell className="w-4 h-4 mr-3" />
                  Notifications
                </AccessibleButton>
                <AccessibleButton
                  variant="ghost"
                  className="w-full justify-start text-left"
                >
                  <Shield className="w-4 h-4 mr-3" />
                  Privacy & Security
                </AccessibleButton>
                <AccessibleButton
                  variant="ghost"
                  className="w-full justify-start text-left"
                >
                  <Smartphone className="w-4 h-4 mr-3" />
                  Mobile
                </AccessibleButton>
                <AccessibleButton
                  variant="ghost"
                  className="w-full justify-start text-left"
                >
                  <HelpCircle className="w-4 h-4 mr-3" />
                  Help & Support
                </AccessibleButton>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <Switch
                    id="email-notif"
                    checked={notifications.email}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, email: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notif">Push Notifications</Label>
                  <Switch
                    id="push-notif"
                    checked={notifications.push}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, push: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notif">SMS Notifications</Label>
                  <Switch
                    id="sms-notif"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, sms: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="comments-notif">Comments</Label>
                  <Switch
                    id="comments-notif"
                    checked={notifications.comments}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, comments: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="likes-notif">Likes</Label>
                  <Switch
                    id="likes-notif"
                    checked={notifications.likes}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, likes: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="friend-requests-notif">Friend Requests</Label>
                  <Switch
                    id="friend-requests-notif"
                    checked={notifications.friendRequests}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, friendRequests: checked})
                    }
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveNotifications} className="bg-blue-600 hover:bg-blue-700">
                Save Notifications
              </Button>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="profile-visible">Profile Visible to Everyone</Label>
                  <Switch
                    id="profile-visible"
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, profileVisible: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="posts-visible">Posts Visible to Everyone</Label>
                  <Switch
                    id="posts-visible"
                    checked={privacy.postsVisible}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, postsVisible: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="friends-visible">Friends List Visible</Label>
                  <Switch
                    id="friends-visible"
                    checked={privacy.friendsVisible}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, friendsVisible: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="online-status">Show Online Status</Label>
                  <Switch
                    id="online-status"
                    checked={privacy.onlineStatus}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, onlineStatus: checked})
                    }
                  />
                </div>
              </div>
              
              <Button onClick={handleSavePrivacy} className="bg-blue-600 hover:bg-blue-700">
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  variant="destructive"
                  className="w-full justify-start"
                >
                  Delete Account
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Account deletion is permanent and cannot be undone. All your data will be lost.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
