
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import MessagesList from '../components/MessagesList';
import { Search, Plus, Settings, VideoIcon, Phone, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount: number;
  isTyping?: boolean;
}

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Hey! How are you doing?',
      timestamp: '2m',
      isOnline: true,
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Thanks for the help!',
      timestamp: '1h',
      isOnline: false,
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'See you tomorrow!',
      timestamp: '3h',
      isOnline: true,
      unreadCount: 1,
      isTyping: true
    }
  ];

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    toast.success(`Opened chat with ${contact.name}`);
    console.log('Selected contact:', contact.name);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching messages: ${searchQuery}`);
      console.log(`Message search: ${searchQuery}`);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedContact) {
      toast.success(`Message sent to ${selectedContact.name}`);
      console.log(`Message sent: ${newMessage}`);
      setNewMessage('');
    }
  };

  const handleVideoCall = () => {
    if (selectedContact) {
      toast.success(`Starting video call with ${selectedContact.name}`);
      console.log('Video call started');
    }
  };

  const handleVoiceCall = () => {
    if (selectedContact) {
      toast.success(`Starting voice call with ${selectedContact.name}`);
      console.log('Voice call started');
    }
  };

  const handleNewMessage = () => {
    toast.success('New message composer opened');
    console.log('New message clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 h-[calc(100vh-64px)]">
          <div className="flex h-full">
            {/* Messages List */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
              {/* Messages Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold text-gray-900">Messages</h1>
                  <div className="flex space-x-2">
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={handleNewMessage}
                      aria-label="New message"
                    >
                      <Plus className="w-5 h-5" />
                    </AccessibleButton>
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info('Settings opened')}
                      aria-label="Settings"
                    >
                      <Settings className="w-5 h-5" />
                    </AccessibleButton>
                  </div>
                </div>
                
                {/* Search */}
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-100 border-none"
                    />
                  </div>
                </form>
              </div>

              {/* Contacts List */}
              <div className="flex-1 overflow-y-auto">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors ${
                      selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleSelectContact(contact)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500">{contact.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {contact.isTyping ? (
                              <span className="text-blue-600 italic">Typing...</span>
                            ) : (
                              contact.lastMessage
                            )}
                          </p>
                          {contact.unreadCount > 0 && (
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              {contact.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedContact.avatar} />
                        <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold text-gray-900">{selectedContact.name}</h2>
                        <p className="text-sm text-gray-500">
                          {selectedContact.isOnline ? 'Active now' : 'Last seen 2h ago'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={handleVoiceCall}
                        aria-label="Voice call"
                      >
                        <Phone className="w-5 h-5" />
                      </AccessibleButton>
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={handleVideoCall}
                        aria-label="Video call"
                      >
                        <VideoIcon className="w-5 h-5" />
                      </AccessibleButton>
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => toast.info('Chat info opened')}
                        aria-label="More options"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </AccessibleButton>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex">
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarImage src={selectedContact.avatar} />
                          <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="bg-white p-3 rounded-lg max-w-xs">
                          <p className="text-sm">{selectedContact.lastMessage}</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                          <p className="text-sm">That sounds great! Let me know if you need anything else.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 bg-white border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!newMessage.trim()}>
                        Send
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose from your existing conversations or start a new one</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Messages;
