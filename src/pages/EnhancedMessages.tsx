
import React, { useState } from 'react';
import Header from '../components/Header';
import MobileNavigation from '../components/MobileNavigation';
import MessagesList from '../components/MessagesList';
import ConversationView from '../components/ConversationView';

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

const EnhancedMessages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleBackToList = () => {
    setSelectedContact(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)]">
        <div className="flex h-full">
          {/* Messages List - Hidden on mobile when contact is selected */}
          <div className={`w-full md:w-80 lg:w-96 border-r border-gray-200 ${
            selectedContact ? 'hidden md:block' : 'block'
          }`}>
            <MessagesList 
              onSelectContact={handleSelectContact}
              selectedContactId={selectedContact?.id}
            />
          </div>

          {/* Conversation View */}
          <div className={`flex-1 ${
            selectedContact ? 'block' : 'hidden md:block'
          }`}>
            {selectedContact ? (
              <div className="h-full">
                {/* Mobile back button */}
                <div className="md:hidden p-4 border-b border-gray-200 bg-white">
                  <button
                    onClick={handleBackToList}
                    className="text-blue-600 font-medium"
                  >
                    ← Back to messages
                  </button>
                </div>
                <ConversationView 
                  contact={{
                    name: selectedContact.name,
                    avatar: selectedContact.avatar,
                    isOnline: selectedContact.isOnline
                  }}
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
                  <p className="text-gray-500 max-w-sm">
                    Select a conversation from the sidebar to start messaging with your friends and connections.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default EnhancedMessages;
