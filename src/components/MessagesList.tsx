
import React, { useState } from 'react';
import { Search, Phone, VideoIcon, Info, Smile, Paperclip, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: 'me' | 'other';
  timestamp: string;
  type: 'text' | 'image';
}

const MessagesList = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Hey! How are you doing?',
      timestamp: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Thanks for the help earlier!',
      timestamp: '1h ago',
      unread: 0,
      online: false
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Let\'s meet up this weekend',
      timestamp: '3h ago',
      unread: 1,
      online: true
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      content: 'Hey! How are you doing?',
      sender: 'other',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: '2',
      content: 'I\'m doing great! Just finished working on a new React project.',
      sender: 'me',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: '3',
      content: 'That sounds awesome! Would love to see it.',
      sender: 'other',
      timestamp: '10:33 AM',
      type: 'text'
    },
    {
      id: '4',
      content: 'Sure! I\'ll share some screenshots soon.',
      sender: 'me',
      timestamp: '10:35 AM',
      type: 'text'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    toast.success('Message sent!');
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleCall = () => {
    toast.info(`Starting voice call with ${selectedConv?.name}`);
  };

  const handleVideoCall = () => {
    toast.info(`Starting video call with ${selectedConv?.name}`);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
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
              className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedConversation === conversation.id ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                
                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {conversation.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConv.avatar} />
                  <AvatarFallback>{selectedConv.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {selectedConv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{selectedConv.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedConv.online ? 'Active now' : 'Last seen 1h ago'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <AccessibleButton variant="ghost" size="sm" onClick={handleCall}>
                <Phone className="w-5 h-5" />
              </AccessibleButton>
              <AccessibleButton variant="ghost" size="sm" onClick={handleVideoCall}>
                <VideoIcon className="w-5 h-5" />
              </AccessibleButton>
              <AccessibleButton variant="ghost" size="sm">
                <Info className="w-5 h-5" />
              </AccessibleButton>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'me'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
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
              <AccessibleButton variant="ghost" size="sm">
                <Paperclip className="w-5 h-5" />
              </AccessibleButton>
              
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="pr-10"
                />
                <AccessibleButton 
                  variant="ghost" 
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Smile className="w-4 h-4" />
                </AccessibleButton>
              </div>
              
              <AccessibleButton 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
              >
                <Send className="w-4 h-4" />
              </AccessibleButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
            <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesList;
