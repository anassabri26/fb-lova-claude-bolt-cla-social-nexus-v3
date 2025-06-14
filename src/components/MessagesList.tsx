
import React, { useState } from 'react';
import { Search, Edit, MoreHorizontal, Phone, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AccessibleButton from './AccessibleButton';
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

interface MessagesListProps {
  onSelectContact: (contact: Contact) => void;
  selectedContactId?: string;
}

const MessagesList = ({ onSelectContact, selectedContactId }: MessagesListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'That sounds awesome! I\'d love to hear more about it.',
      timestamp: '2m',
      isOnline: true,
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'See you tomorrow!',
      timestamp: '1h',
      isOnline: false,
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Thanks for your help with the project',
      timestamp: '3h',
      isOnline: true,
      unreadCount: 1,
      isTyping: true
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Let\'s catch up soon',
      timestamp: '1d',
      isOnline: false,
      unreadCount: 0
    },
    {
      id: '5',
      name: 'Tech Team',
      avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      lastMessage: 'Meeting scheduled for 3 PM',
      timestamp: '2d',
      isOnline: true,
      unreadCount: 5
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewMessage = () => {
    toast.info('New message feature coming soon!');
  };

  const handleVideoCall = (contact: Contact, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info(`Starting video call with ${contact.name}...`);
  };

  const handleVoiceCall = (contact: Contact, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info(`Calling ${contact.name}...`);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <AccessibleButton
            variant="ghost"
            size="sm"
            onClick={handleNewMessage}
            className="text-blue-600"
          >
            <Edit className="w-5 h-5" />
          </AccessibleButton>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full bg-gray-100 border-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Active Contacts */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex space-x-3 overflow-x-auto">
          {contacts.filter(c => c.isOnline).slice(0, 8).map((contact) => (
            <div key={contact.id} className="flex-shrink-0 text-center">
              <div className="relative">
                <Avatar className="w-12 h-12 cursor-pointer" onClick={() => onSelectContact(contact)}>
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <p className="text-xs text-gray-600 mt-1 truncate w-12">{contact.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors ${
                selectedContactId === contact.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => onSelectContact(contact)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{contact.timestamp}</span>
                      {contact.unreadCount > 0 && (
                        <Badge variant="default" className="bg-blue-600 text-white text-xs">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      contact.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}>
                      {contact.isTyping ? (
                        <span className="text-blue-600 italic">Typing...</span>
                      ) : (
                        contact.lastMessage
                      )}
                    </p>
                    
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        className="p-1"
                        onClick={(e) => handleVoiceCall(contact, e)}
                      >
                        <Phone className="w-4 h-4 text-gray-400" />
                      </AccessibleButton>
                      <AccessibleButton
                        variant="ghost"
                        size="sm"
                        className="p-1"
                        onClick={(e) => handleVideoCall(contact, e)}
                      >
                        <Video className="w-4 h-4 text-gray-400" />
                      </AccessibleButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No messages found</p>
            <p className="text-sm mt-2">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesList;
