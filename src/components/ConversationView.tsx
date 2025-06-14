
import React, { useState } from 'react';
import { Send, Phone, Video, Info, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import AccessibleButton from './AccessibleButton';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface ConversationViewProps {
  contact: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
}

const ConversationView = ({ contact }: ConversationViewProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: contact.name,
      content: "Hey! How are you doing?",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "I'm doing great! Thanks for asking. How about you?",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: contact.name,
      content: "I'm good too! Are we still on for dinner tonight?",
      timestamp: "10:35 AM",
      isOwn: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
      toast.success('Message sent!');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {contact.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
              <p className="text-sm text-gray-500">
                {contact.isOnline ? 'Active now' : 'Last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => toast.info('Voice call feature coming soon!')}
            >
              <Phone className="w-5 h-5 text-blue-600" />
            </AccessibleButton>
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => toast.info('Video call feature coming soon!')}
            >
              <Video className="w-5 h-5 text-blue-600" />
            </AccessibleButton>
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => toast.info('Contact info feature coming soon!')}
            >
              <Info className="w-5 h-5 text-blue-600" />
            </AccessibleButton>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isOwn
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <div className="border-t bg-white p-4">
        <div className="flex items-center space-x-2">
          <AccessibleButton
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => toast.info('Emoji picker coming soon!')}
          >
            <Smile className="w-5 h-5 text-gray-500" />
          </AccessibleButton>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <AccessibleButton
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
          >
            <Send className="w-4 h-4" />
          </AccessibleButton>
        </div>
      </div>
    </Card>
  );
};

export default ConversationView;
