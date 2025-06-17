import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ChatBox from './ChatBox';
import { MOCK_IMAGES } from '@/lib/constants';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastActive?: string;
  unreadCount?: number;
}

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<Contact | null>(null);
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: MOCK_IMAGES.AVATARS[0],
      isOnline: true,
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: MOCK_IMAGES.AVATARS[1],
      isOnline: false,
      lastActive: '1h ago'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: MOCK_IMAGES.AVATARS[2],
      isOnline: true
    }
  ]);

  const totalUnread = contacts.reduce((sum, contact) => sum + (contact.unreadCount || 0), 0);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleStartChat = (contact: Contact) => {
    setActiveChat(contact);
  };

  const handleCloseChat = () => {
    setActiveChat(null);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <Button 
          onClick={handleToggleChat}
          className="h-12 w-12 rounded-full shadow-lg relative"
        >
          <MessageCircle className="h-6 w-6" />
          {totalUnread > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white">
              {totalUnread}
            </Badge>
          )}
        </Button>
      </div>

      {isOpen && !activeChat && (
        <div className="fixed bottom-20 right-4 w-72 bg-white rounded-lg shadow-xl border z-40">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Chats</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {contacts.map(contact => (
              <div 
                key={contact.id}
                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleStartChat(contact)}
              >
                <div className="relative mr-3">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name} 
                    className="w-10 h-10 rounded-full"
                  />
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{contact.name}</p>
                    {contact.unreadCount && (
                      <Badge className="bg-blue-500 text-white">{contact.unreadCount}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {contact.isOnline ? 'Active now' : contact.lastActive}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeChat && (
        <ChatBox 
          isOpen={true}
          onClose={handleCloseChat}
          contact={activeChat}
        />
      )}
    </>
  );
};

export default ChatButton;