
import React, { useState } from 'react';
import { Search, Edit, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import ConversationView from '../components/ConversationView';
import AccessibleButton from '../components/AccessibleButton';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unread: boolean;
}

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const contacts: Contact[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Are we still on for dinner tonight?',
      timestamp: '10:35 AM',
      isOnline: true,
      unread: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Thanks for the help with the project!',
      timestamp: 'Yesterday',
      isOnline: false,
      unread: false
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'See you at the conference tomorrow',
      timestamp: '2 days ago',
      isOnline: true,
      unread: true
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-7xl mx-auto flex h-[calc(100vh-4rem)]">
        {/* Contacts Sidebar */}
        <div className="w-full md:w-80 bg-white border-r">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Messages</h1>
              <AccessibleButton variant="ghost" size="sm" className="p-2">
                <Edit className="w-5 h-5" />
              </AccessibleButton>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-100 border-0"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedContact?.id === contact.id ? 'bg-blue-50 border-r-2 border-r-blue-600' : ''
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium truncate ${contact.unread ? 'font-semibold' : ''}`}>
                        {contact.name}
                      </h3>
                      <span className="text-xs text-gray-500">{contact.timestamp}</span>
                    </div>
                    <p className={`text-sm truncate ${
                      contact.unread ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}>
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation View */}
        <div className="hidden md:flex flex-1">
          {selectedContact ? (
            <ConversationView contact={selectedContact} />
          ) : (
            <div className="flex items-center justify-center w-full bg-white">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No conversation selected</h3>
                <p className="text-gray-500">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Messages;
