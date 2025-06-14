
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import MessagesList from '../components/MessagesList';

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

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    // In this simplified version, we just log the selection
    console.log('Selected contact:', contact.name);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1">
          <div className="h-[calc(100vh-64px)]">
            <MessagesList 
              onSelectContact={handleSelectContact}
              selectedContactId={selectedContact?.id}
            />
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Messages;
