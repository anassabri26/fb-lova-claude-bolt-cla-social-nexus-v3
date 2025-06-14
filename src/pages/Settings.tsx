
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    messages: true,
    comments: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    messageRequests: 'friends',
    activityStatus: true
  });

  const handleNotificationChange = (type: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [type]: value }));
    toast.success(`${type} notifications ${value ? 'enabled' : 'disabled'}`);
    console.log(`Notification setting changed: ${type} = ${value}`);
  };

  const handlePrivacyChange = (type: string, value: any) => {
    setPrivacy(prev => ({ ...prev, [type]: value }));
    toast.success(`Privacy setting updated: ${type}`);
    console.log(`Privacy setting changed: ${type} = ${value}`);
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
    console.log('Settings saved:', { notifications, privacy });
  };

  const handleResetSettings = () => {
    setNotifications({ email: true, push: false, messages: true, comments: true });
    setPrivacy({ profileVisibility: 'public', messageRequests: 'friends', activityStatus: true });
    toast.success('Settings reset to defaults');
    console.log('Settings reset to defaults');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-2 sm:px-4 py-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg text-white p-6 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <SettingsIcon className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <p className="text-lg opacity-90">
              Manage your account preferences and privacy settings
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about yourself..." />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(value) => handleNotificationChange('email', value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(value) => handleNotificationChange('push', value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Message Notifications</Label>
                    <p className="text-sm text-gray-500">Get notified of new messages</p>
                  </div>
                  <Switch
                    checked={notifications.messages}
                    onCheckedChange={(value) => handleNotificationChange('messages', value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Comment Notifications</Label>
                    <p className="text-sm text-gray-500">Get notified of comments on your posts</p>
                  </div>
                  <Switch
                    checked={notifications.comments}
                    onCheckedChange={(value) => handleNotificationChange('comments', value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Profile Visibility</Label>
                  <Select 
                    value={privacy.profileVisibility} 
                    onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Message Requests</Label>
                  <Select 
                    value={privacy.messageRequests} 
                    onValueChange={(value) => handlePrivacyChange('messageRequests', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="everyone">Everyone</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="none">No One</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Activity Status</Label>
                    <p className="text-sm text-gray-500">Let others see when you're online</p>
                  </div>
                  <Switch
                    checked={privacy.activityStatus}
                    onCheckedChange={(value) => handlePrivacyChange('activityStatus', value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleSaveSettings} className="flex-1">
                Save Settings
              </Button>
              <Button variant="outline" onClick={handleResetSettings} className="flex-1">
                Reset to Defaults
              </Button>
            </div>
          </div>
        </main>
        <RightSidebar />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Settings;
