
import React, { useState } from 'react';
import { Search, Edit, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import AccessibleButton from './AccessibleButton';
import ConversationThread from './ConversationThread';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount: number;
}

const EnhancedMessagesList = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const contacts: Contact[] = [
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
      unreadCount: 1
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Let\'s catch up soon',
      timestamp: '1d',
      isOnline: false,
      unreadCount: 0
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedContact) {
    return (
      <ConversationThread
        contact={selectedContact}
        onBack={() => setSelectedContact(null)}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <AccessibleButton variant="ghost" size="sm">
            <Edit className="w-5 h-5 text-gray-600" />
          </AccessibleButton>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full bg-gray-100 border-none"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
            onClick={() => setSelectedContact(contact)}
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
                      <div className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                        {contact.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
                <p className={`text-sm truncate ${
                  contact.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedMessagesList;
