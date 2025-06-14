
import React, { useState } from 'react';
import { Search, Phone, Video, Info, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Conversation {
  id: string;
  participant: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
    sender: 'me' | 'them';
  };
  unreadCount: number;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'me' | 'them';
  type: 'text' | 'image' | 'emoji';
}

const MessagesList = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      participant: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: {
        text: 'Hey! How are you doing?',
        timestamp: '2 min ago',
        isRead: false,
        sender: 'them'
      },
      unreadCount: 2
    },
    {
      id: '2',
      participant: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        isOnline: false
      },
      lastMessage: {
        text: 'Thanks for sharing that article!',
        timestamp: '1h ago',
        isRead: true,
        sender: 'them'
      },
      unreadCount: 0
    },
    {
      id: '3',
      participant: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: {
        text: 'See you tomorrow!',
        timestamp: '3h ago',
        isRead: true,
        sender: 'me'
      },
      unreadCount: 0
    }
  ];

  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        text: 'Hey! How are you doing?',
        timestamp: '2:30 PM',
        sender: 'them',
        type: 'text'
      },
      {
        id: '2',
        text: 'I heard about your new project!',
        timestamp: '2:32 PM',
        sender: 'them',
        type: 'text'
      }
    ],
    '2': [
      {
        id: '3',
        text: 'Did you see that React article I sent?',
        timestamp: '1:15 PM',
        sender: 'them',
        type: 'text'
      },
      {
        id: '4',
        text: 'Yes! It was really helpful',
        timestamp: '1:20 PM',
        sender: 'me',
        type: 'text'
      },
      {
        id: '5',
        text: 'Thanks for sharing that article!',
        timestamp: '1:25 PM',
        sender: 'them',
        type: 'text'
      }
    ]
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = selectedConversation ? messages[selectedConversation] || [] : [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    toast.success('Message sent!');
    setNewMessage('');
  };

  const handleCall = () => {
    toast.info('Starting voice call...');
  };

  const handleVideoCall = () => {
    toast.info('Starting video call...');
  };

  return (
    <div className="flex h-full">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Messages</h2>
            <AccessibleButton variant="ghost" size="sm">
              <Plus className="w-5 h-5" />
            </AccessibleButton>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                selectedConversation === conversation.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.participant.avatar} />
                    <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversation.participant.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900 truncate">
                      {conversation.participant.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {conversation.lastMessage.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      conversation.lastMessage.isRead ? 'text-gray-500' : 'text-gray-900 font-medium'
                    }`}>
                      {conversation.lastMessage.text}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unreadCount}
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
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConv.participant.avatar} />
                  <AvatarFallback>{selectedConv.participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedConv.participant.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedConv.participant.isOnline ? 'Active now' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
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
              {conversationMessages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'me'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
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
                <AccessibleButton onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  Send
                </AccessibleButton>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesList;
