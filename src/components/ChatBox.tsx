import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, X, Image as ImageIcon, Mic, GIF } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
  contact: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    lastActive?: string;
  };
}

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'contact';
  status: 'sending' | 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file' | 'audio';
    url: string;
    name?: string;
  }[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ isOpen, onClose, contact }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      sender: 'contact',
      status: 'read'
    },
    {
      id: '2',
      content: 'I\'m doing great! Just working on some projects.',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      sender: 'user',
      status: 'read'
    },
    {
      id: '3',
      content: 'That sounds interesting! What kind of projects?',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      sender: 'contact',
      status: 'read'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Simulate typing indicator
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      const timer = setTimeout(() => {
        setIsTyping(true);
        
        // Simulate response after typing
        const responseTimer = setTimeout(() => {
          setIsTyping(false);
          
          const responses = [
            "That's great to hear!",
            "Interesting! Tell me more.",
            "I've been thinking about that too.",
            "Have you seen the latest updates?",
            "What do you think about it?"
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          const newMsg: Message = {
            id: Date.now().toString(),
            content: randomResponse,
            timestamp: new Date(),
            sender: 'contact',
            status: 'sent'
          };
          
          setMessages(prev => [...prev, newMsg]);
        }, 3000);
        
        return () => clearTimeout(responseTimer);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      sender: 'user',
      status: 'sending'
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'sent' } : msg
        )
      );
      
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === message.id ? { ...msg, status: 'delivered' } : msg
          )
        );
        
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === message.id ? { ...msg, status: 'read' } : msg
            )
          );
        }, 2000);
      }, 1000);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <div className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-transparent animate-spin"></div>;
      case 'sent':
        return <div className="w-3 h-3 bg-gray-300 rounded-full"></div>;
      case 'delivered':
        return <div className="w-3 h-3 bg-gray-500 rounded-full"></div>;
      case 'read':
        return <div className="w-3 h-3 bg-blue-500 rounded-full"></div>;
      default:
        return null;
    }
  };

  const handleAttachment = () => {
    toast.info('Attachment feature coming soon');
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  // Common emojis
  const commonEmojis = ['👍', '❤️', '😊', '😂', '🎉', '👋', '🙏', '🔥', '👏', '😍'];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border z-50 flex flex-col h-96">
      {/* Header */}
      <CardHeader className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Avatar className="w-8 h-8">
              <AvatarImage src={contact.avatar} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {contact.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{contact.name}</h3>
            <p className="text-xs text-gray-500">
              {contact.isOnline ? 'Active now' : contact.lastActive || 'Offline'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      {/* Messages */}
      <CardContent className="p-0 flex-1 overflow-y-auto">
        <div className="p-3 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'contact' && (
                <Avatar className="w-6 h-6 mr-2 flex-shrink-0 self-end mb-1">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className="max-w-[70%]">
                <div
                  className={`px-3 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm break-words">{message.content}</p>
                </div>
                <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <span>{formatTime(message.timestamp)}</span>
                  {message.sender === 'user' && (
                    <div className="ml-1">
                      {getStatusIcon(message.status)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="w-6 h-6 mr-2 flex-shrink-0 self-end mb-1">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      {/* Input */}
      <div className="p-3 border-t relative">
        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-lg p-2 border">
            <div className="grid grid-cols-5 gap-1">
              {commonEmojis.map(emoji => (
                <button
                  key={emoji}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
                  onClick={() => handleEmojiSelect(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleAttachment}>
              <Paperclip className="w-4 h-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleAttachment}>
              <ImageIcon className="w-4 h-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleAttachment}>
              <Mic className="w-4 h-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleAttachment}>
              <GIF className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
          
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              placeholder="Aa"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full rounded-full border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
          
          <Button 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Add missing GIF icon component
const GIF = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <path d="M8 10v4" />
    <path d="M12 10v4" />
    <path d="M16 10v2" />
    <path d="M16 14v0" />
  </svg>
);

export default ChatBox;