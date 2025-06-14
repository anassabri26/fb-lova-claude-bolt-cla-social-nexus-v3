
import React, { useState } from 'react';
import { Send, Phone, Video, Minimize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface MessagingPanelProps {
  contact: {
    name: string;
    avatar: string;
    online: boolean;
  };
  onClose: () => void;
  onMinimize: () => void;
}

const MessagingPanel: React.FC<MessagingPanelProps> = ({ contact, onClose, onMinimize }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: contact.name,
      content: "Hey! How are you doing?",
      timestamp: "2h",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "I'm doing great! Just working on some projects. How about you?",
      timestamp: "2h",
      isOwn: true
    },
    {
      id: 3,
      sender: contact.name,
      content: "Same here! Working on a new app. Would love to show you sometime.",
      timestamp: "1h",
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
        timestamp: "now",
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <Card className="fixed bottom-0 right-4 w-80 h-96 bg-white shadow-lg border-0 shadow-gray-200 z-50">
      <CardHeader className="p-3 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {contact.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h4 className="font-medium text-sm">{contact.name}</h4>
              <p className="text-xs opacity-90">{contact.online ? 'Active now' : 'Last seen 2h ago'}</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6 text-white hover:bg-blue-700">
              <Phone className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6 text-white hover:bg-blue-700">
              <Video className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6 text-white hover:bg-blue-700" onClick={onMinimize}>
              <Minimize2 className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6 text-white hover:bg-blue-700" onClick={onClose}>
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex-1 p-3 overflow-y-auto space-y-3 max-h-64">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-2 rounded-lg ${
                message.isOwn 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-200">
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 text-sm"
            />
            <Button size="sm" onClick={handleSendMessage} className="px-3">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagingPanel;
