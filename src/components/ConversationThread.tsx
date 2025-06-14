
import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, Info, Smile, Paperclip, Image } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  type: 'text' | 'image';
  image?: string;
}

interface ConversationThreadProps {
  contact: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  onBack: () => void;
}

const ConversationThread = ({ contact, onBack }: ConversationThreadProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How are you doing?',
      sender: 'other',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: '2',
      text: 'I\'m doing great! Just finished working on a new project. How about you?',
      sender: 'me',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: '3',
      text: 'That sounds awesome! I\'d love to hear more about it.',
      sender: 'other',
      timestamp: '10:35 AM',
      type: 'text'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate response
    setTimeout(() => {
      const responses = [
        'That\'s interesting!',
        'I see what you mean.',
        'Sounds good to me!',
        'Let me think about that.',
        'Great idea!'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'other',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCall = () => {
    toast.info(`Calling ${contact.name}...`);
  };

  const handleVideoCall = () => {
    toast.info(`Starting video call with ${contact.name}...`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-3">
          <AccessibleButton
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="md:hidden"
          >
            ←
          </AccessibleButton>
          <Avatar className="w-10 h-10">
            <AvatarImage src={contact.avatar} />
            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
            <p className="text-sm text-gray-500">
              {contact.isOnline ? 'Active now' : 'Last seen 2 hours ago'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <AccessibleButton variant="ghost" size="sm" onClick={handleCall}>
            <Phone className="w-5 h-5 text-blue-600" />
          </AccessibleButton>
          <AccessibleButton variant="ghost" size="sm" onClick={handleVideoCall}>
            <Video className="w-5 h-5 text-blue-600" />
          </AccessibleButton>
          <AccessibleButton variant="ghost" size="sm">
            <Info className="w-5 h-5 text-blue-600" />
          </AccessibleButton>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.sender === 'me'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <AccessibleButton variant="ghost" size="sm">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </AccessibleButton>
          <AccessibleButton variant="ghost" size="sm">
            <Image className="w-5 h-5 text-gray-500" />
          </AccessibleButton>
          
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-12 rounded-full border-gray-300"
            />
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="w-5 h-5 text-gray-500" />
            </AccessibleButton>
          </div>
          
          <AccessibleButton
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="rounded-full w-10 h-10 p-0"
          >
            <Send className="w-5 h-5" />
          </AccessibleButton>
        </div>
      </div>
    </div>
  );
};

export default ConversationThread;
