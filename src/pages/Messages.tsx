
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Phone, Video, Info, Search } from 'lucide-react';
import AccessibleButton from '../components/AccessibleButton';
import { toast } from 'sonner';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Hey! How are you doing?',
      timestamp: '2m',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Thanks for the help yesterday!',
      timestamp: '1h',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'See you at the meeting tomorrow',
      timestamp: '3h',
      unread: 1,
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 2,
      text: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      senderId: 1,
      text: 'I\'m doing great! Just working on some new projects.',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      senderId: 2,
      text: 'That sounds exciting! What kind of projects?',
      timestamp: '10:33 AM',
      isOwn: false
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast.success('Message sent!');
      setNewMessage('');
    }
  };

  const handleCall = () => {
    toast.info('Starting voice call...');
  };

  const handleVideoCall = () => {
    toast.info('Starting video call...');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="h-[calc(100vh-8rem)] flex bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Conversations List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search messages..." className="pl-10" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer ${
                      selectedChat === conversation.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                    }`}
                    onClick={() => setSelectedChat(conversation.id)}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation && (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedConversation.avatar} />
                        <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.online ? 'Active now' : 'Last seen 1h ago'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <AccessibleButton variant="ghost" size="sm" onClick={handleCall}>
                        <Phone className="w-5 h-5" />
                      </AccessibleButton>
                      <AccessibleButton variant="ghost" size="sm" onClick={handleVideoCall}>
                        <Video className="w-5 h-5" />
                      </AccessibleButton>
                      <AccessibleButton variant="ghost" size="sm">
                        <Info className="w-5 h-5" />
                      </AccessibleButton>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <AccessibleButton onClick={handleSendMessage} className="px-4">
                        <Send className="w-4 h-4" />
                      </AccessibleButton>
                    </div>
                  </div>
                </>
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
