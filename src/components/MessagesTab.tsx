import React, { useState } from 'react';
import { Search, Phone, Video, MoreHorizontal, Send, Smile, Paperclip, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';
import { MOCK_IMAGES } from '@/lib/constants';

const MessagesTab = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: MOCK_IMAGES.AVATARS[0],
      lastMessage: 'Hey! How are you doing?',
      time: '2m',
      unread: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: MOCK_IMAGES.AVATARS[1],
      lastMessage: 'Thanks for sharing that article!',
      time: '1h',
      unread: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: MOCK_IMAGES.AVATARS[2],
      lastMessage: 'See you tomorrow!',
      time: '3h',
      unread: 1,
      isOnline: true
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      content: 'Hey! How are you doing?',
      time: '2:30 PM',
      isMine: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'I\'m doing great! Just working on some projects. How about you?',
      time: '2:32 PM',
      isMine: true
    },
    {
      id: '3',
      sender: 'Sarah Johnson',
      content: 'Same here! Really excited about the new features we\'re building.',
      time: '2:35 PM',
      isMine: false
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      toast.success('Message sent!');
      setMessageText('');
    }
  };

  const handleCall = () => {
    toast.info('Starting voice call...');
  };

  const handleVideoCall = () => {
    toast.info('Starting video call...');
  };

  return (
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <div className="max-w-6xl mx-auto h-[calc(100vh-200px)] flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search messages..." className="pl-10" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedChat?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                        <div className="flex items-center space-x-2 ml-2">
                          <span className="text-sm text-gray-500">{conversation.time}</span>
                          {conversation.unread > 0 && (
                            <Badge className="bg-blue-600 text-white text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${
                          conversation.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
                        }`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedChat.isOnline ? 'Active now' : 'Last seen 1h ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <AccessibleButton variant="outline" size="sm" onClick={handleCall}>
                      <Phone className="w-4 h-4" />
                    </AccessibleButton>
                    <AccessibleButton variant="outline" size="sm" onClick={handleVideoCall}>
                      <Video className="w-4 h-4" />
                    </AccessibleButton>
                    <AccessibleButton variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </AccessibleButton>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isMine
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isMine ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <AccessibleButton variant="outline" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </AccessibleButton>
                    <div className="flex-1 flex space-x-2">
                      <Input
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                      />
                      <AccessibleButton variant="outline" size="sm">
                        <Smile className="w-4 h-4" />
                      </AccessibleButton>
                    </div>
                    <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
                  <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;