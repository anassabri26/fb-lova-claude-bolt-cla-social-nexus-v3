import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Phone, 
  Video, 
  Info, 
  MoreHorizontal, 
  Send, 
  Image, 
  Smile, 
  Paperclip, 
  Mic, 
  ChevronLeft, 
  X, 
  Users, 
  Bell, 
  Settings, 
  ArrowLeft, 
  ThumbsUp, 
  Plus, 
  Edit, 
  Trash2
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile, useIsTablet } from '@/hooks/use-device';
import { MOCK_IMAGES } from '@/lib/constants';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'me' | 'other';
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file' | 'audio';
    url: string;
    name?: string;
  }[];
  reactions?: {
    type: string;
    user: string;
  }[];
}

interface Conversation {
  id: string;
  type: 'individual' | 'group';
  name: string;
  avatar: string;
  lastMessage?: {
    content: string;
    timestamp: string;
    sender: string;
    isRead: boolean;
  };
  isOnline?: boolean;
  isTyping?: boolean;
  unreadCount?: number;
  members?: {
    id: string;
    name: string;
    avatar: string;
    isOnline?: boolean;
    lastActive?: string;
  }[];
  isMuted?: boolean;
}

const MessagesTab = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      type: 'individual',
      name: 'Sarah Johnson',
      avatar: MOCK_IMAGES.AVATARS[0],
      lastMessage: {
        content: 'Hey! How are you doing?',
        timestamp: '10:30 AM',
        sender: 'Sarah Johnson',
        isRead: false
      },
      isOnline: true,
      unreadCount: 2
    },
    {
      id: '2',
      type: 'individual',
      name: 'Mike Chen',
      avatar: MOCK_IMAGES.AVATARS[1],
      lastMessage: {
        content: 'Did you see the latest React update?',
        timestamp: 'Yesterday',
        sender: 'Mike Chen',
        isRead: true
      },
      isOnline: false
    },
    {
      id: '3',
      type: 'group',
      name: 'Design Team',
      avatar: MOCK_IMAGES.AVATARS[2],
      lastMessage: {
        content: 'Let\'s meet tomorrow at 10 AM',
        timestamp: 'Yesterday',
        sender: 'Emma Wilson',
        isRead: true
      },
      members: [
        {
          id: 'user1',
          name: 'Emma Wilson',
          avatar: MOCK_IMAGES.AVATARS[2],
          isOnline: true
        },
        {
          id: 'user2',
          name: 'David Kim',
          avatar: MOCK_IMAGES.AVATARS[3],
          isOnline: false,
          lastActive: '1h ago'
        },
        {
          id: 'user3',
          name: 'Lisa Wang',
          avatar: MOCK_IMAGES.AVATARS[4],
          isOnline: true
        }
      ],
      isMuted: true
    },
    {
      id: '4',
      type: 'individual',
      name: 'Emma Wilson',
      avatar: MOCK_IMAGES.AVATARS[2],
      lastMessage: {
        content: 'Thanks for your help!',
        timestamp: 'Monday',
        sender: 'me',
        isRead: true
      },
      isOnline: true,
      isTyping: true
    }
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1-1',
        content: 'Hey! How are you doing?',
        timestamp: '10:30 AM',
        sender: 'other',
        status: 'read'
      },
      {
        id: '1-2',
        content: 'I\'m doing great! Just working on some projects.',
        timestamp: '10:32 AM',
        sender: 'me',
        status: 'read'
      },
      {
        id: '1-3',
        content: 'That sounds interesting! What kind of projects?',
        timestamp: '10:33 AM',
        sender: 'other',
        status: 'read'
      },
      {
        id: '1-4',
        content: 'Mostly React development. Building a social media app clone!',
        timestamp: '10:35 AM',
        sender: 'me',
        status: 'delivered'
      },
      {
        id: '1-5',
        content: 'That\'s awesome! I\'d love to see it when it\'s ready.',
        timestamp: '10:36 AM',
        sender: 'other',
        status: 'sent',
        reactions: [
          {
            type: '👍',
            user: 'me'
          }
        ]
      }
    ],
    '2': [
      {
        id: '2-1',
        content: 'Did you see the latest React update?',
        timestamp: 'Yesterday',
        sender: 'other',
        status: 'read'
      },
      {
        id: '2-2',
        content: 'Yes! The new hooks are amazing!',
        timestamp: 'Yesterday',
        sender: 'me',
        status: 'read'
      },
      {
        id: '2-3',
        content: 'Check out this article about it',
        timestamp: 'Yesterday',
        sender: 'other',
        status: 'read',
        attachments: [
          {
            type: 'file',
            url: '#',
            name: 'react-updates.pdf'
          }
        ]
      }
    ],
    '3': [
      {
        id: '3-1',
        content: 'Hey team, how\'s the design coming along?',
        timestamp: 'Yesterday',
        sender: 'other',
        status: 'read'
      },
      {
        id: '3-2',
        content: 'I\'ve finished the homepage mockups',
        timestamp: 'Yesterday',
        sender: 'other',
        status: 'read',
        attachments: [
          {
            type: 'image',
            url: MOCK_IMAGES.POSTS[0]
          }
        ]
      },
      {
        id: '3-3',
        content: 'Let\'s meet tomorrow at 10 AM to discuss the next steps',
        timestamp: 'Yesterday',
        sender: 'other',
        status: 'read'
      }
    ],
    '4': [
      {
        id: '4-1',
        content: 'I needed help with that React problem',
        timestamp: 'Monday',
        sender: 'other',
        status: 'read'
      },
      {
        id: '4-2',
        content: 'No problem! Did you try using useEffect?',
        timestamp: 'Monday',
        sender: 'me',
        status: 'read'
      },
      {
        id: '4-3',
        content: 'That worked perfectly! Thanks for your help!',
        timestamp: 'Monday',
        sender: 'other',
        status: 'read',
        reactions: [
          {
            type: '❤️',
            user: 'me'
          }
        ]
      }
    ]
  });

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConversation, messages]);

  // Mark messages as read when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? { ...conv, unreadCount: 0, lastMessage: conv.lastMessage ? { ...conv.lastMessage, isRead: true } : undefined }
            : conv
        )
      );
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMessageObj: Message = {
      id: `${selectedConversation.id}-${Date.now()}`,
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: 'sent'
    };

    // Update messages
    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessageObj]
    }));

    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { 
              ...conv, 
              lastMessage: {
                content: newMessage.trim(),
                timestamp: 'Just now',
                sender: 'me',
                isRead: true
              },
              isTyping: false
            }
          : conv
      )
    );

    setNewMessage('');
    toast.success('Message sent');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    setIsImageViewerOpen(true);
  };

  const handleMuteConversation = (conversationId: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, isMuted: !conv.isMuted }
          : conv
      )
    );
    
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      toast.success(`${conversation.isMuted ? 'Unmuted' : 'Muted'} conversation with ${conversation.name}`);
    }
  };

  const handleStartCall = (type: 'audio' | 'video') => {
    setCallType(type);
    setIsCallDialogOpen(true);
  };

  const handleEndCall = () => {
    setIsCallDialogOpen(false);
    toast.info('Call ended');
  };

  const handleDeleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (selectedConversation?.id === conversationId) {
      setSelectedConversation(null);
    }
    toast.success('Conversation deleted');
  };

  const handleCreateNewMessage = () => {
    toast.info('New message feature coming soon!');
  };

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conv.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Determine layout based on screen size and selection
  const showConversationList = !isMobile || (isMobile && !selectedConversation);
  const showConversation = !isMobile || (isMobile && selectedConversation);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-responsive mx-auto py-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden dark:bg-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-8rem)]">
            {/* Conversation List */}
            {showConversationList && (
              <div className={`${isMobile ? 'col-span-1' : 'col-span-1 md:border-r border-gray-200 dark:border-gray-700'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold dark:text-white">Chats</h1>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full h-8 w-8 p-0"
                        onClick={handleCreateNewMessage}
                      >
                        <Edit className="h-4 w-4 dark:text-gray-300" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full h-8 w-8 p-0"
                        onClick={() => toast.info('Settings coming soon')}
                      >
                        <Settings className="h-4 w-4 dark:text-gray-300" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search messages"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto h-[calc(100%-5rem)]">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors dark:hover:bg-gray-700 ${
                          selectedConversation?.id === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        } ${conversation.unreadCount ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                          )}
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 truncate dark:text-white">{conversation.name}</p>
                            <div className="flex items-center">
                              {conversation.isMuted && (
                                <Bell className="h-3 w-3 text-gray-400 mr-1 line-through" />
                              )}
                              <p className="text-xs text-gray-500 dark:text-gray-400">{conversation.lastMessage?.timestamp}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className={`text-sm truncate ${
                              conversation.unreadCount ? 'text-gray-900 font-medium dark:text-white' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {conversation.isTyping ? (
                                <span className="text-blue-600 dark:text-blue-400">Typing...</span>
                              ) : (
                                conversation.lastMessage?.content
                              )}
                            </p>
                            {conversation.unreadCount ? (
                              <Badge className="ml-2 bg-blue-600">{conversation.unreadCount}</Badge>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      <p>No conversations found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Conversation */}
            {showConversation && selectedConversation && (
              <div className={`${isMobile ? 'col-span-1' : 'col-span-2 md:col-span-2 lg:col-span-3'} flex flex-col h-full`}>
                {/* Conversation Header */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    {isMobile && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleBackToList}
                        className="mr-2 p-0 h-8 w-8"
                      >
                        <ArrowLeft className="h-5 w-5 dark:text-gray-300" />
                      </Button>
                    )}
                    <div className="flex items-center cursor-pointer" onClick={() => setIsInfoOpen(true)}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.avatar} />
                        <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900 dark:text-white">{selectedConversation.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedConversation.isOnline ? (
                            <span className="text-green-500">Active now</span>
                          ) : (
                            'Last active 2h ago'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full h-9 w-9 p-0"
                      onClick={() => handleStartCall('audio')}
                    >
                      <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full h-9 w-9 p-0"
                      onClick={() => handleStartCall('video')}
                    >
                      <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full h-9 w-9 p-0"
                      onClick={() => setIsInfoOpen(true)}
                    >
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
                  {messages[selectedConversation.id]?.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex mb-4 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'other' && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src={selectedConversation.avatar} />
                          <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-1' : 'order-2'}`}>
                        {/* Attachments */}
                        {message.attachments?.map((attachment, i) => (
                          <div key={i} className="mb-1">
                            {attachment.type === 'image' ? (
                              <div 
                                className="rounded-lg overflow-hidden cursor-pointer"
                                onClick={() => handleImageClick(attachment.url)}
                              >
                                <img 
                                  src={attachment.url} 
                                  alt="Attachment" 
                                  className="max-w-full h-auto rounded-lg"
                                />
                              </div>
                            ) : attachment.type === 'file' ? (
                              <div className="bg-gray-100 p-3 rounded-lg flex items-center dark:bg-gray-700">
                                <div className="bg-blue-100 p-2 rounded mr-2 dark:bg-blue-900">
                                  <File className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium dark:text-white">{attachment.name}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Click to download</p>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ))}

                        {/* Message content */}
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === 'me'
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-white text-gray-900 rounded-bl-none shadow-sm dark:bg-gray-800 dark:text-white'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>

                        {/* Timestamp and status */}
                        <div className={`flex items-center mt-1 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{message.timestamp}</p>
                          {message.sender === 'me' && (
                            <div className="ml-1">
                              {message.status === 'sent' && <div className="h-2 w-2 bg-gray-400 rounded-full"></div>}
                              {message.status === 'delivered' && <div className="h-2 w-2 bg-gray-600 rounded-full"></div>}
                              {message.status === 'read' && <div className="h-2 w-2 bg-blue-600 rounded-full"></div>}
                            </div>
                          )}
                        </div>

                        {/* Reactions */}
                        {message.reactions && message.reactions.length > 0 && (
                          <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mt-1`}>
                            <div className="bg-white rounded-full shadow-sm px-2 py-1 flex items-center dark:bg-gray-700">
                              {message.reactions.map((reaction, i) => (
                                <span key={i} className="text-sm">{reaction.type}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-3 border-t border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 mr-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full h-9 w-9 p-0"
                        onClick={() => toast.info('Image upload coming soon')}
                      >
                        <Image className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full h-9 w-9 p-0"
                        onClick={() => toast.info('File upload coming soon')}
                      >
                        <Paperclip className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full h-9 w-9 p-0"
                        onClick={() => toast.info('Voice message coming soon')}
                      >
                        <Mic className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-2 rounded-full h-9 w-9 p-0"
                      onClick={() => toast.info('Emoji picker coming soon')}
                    >
                      <Smile className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </Button>
                    <Button 
                      variant={newMessage.trim() ? 'default' : 'ghost'}
                      size="sm" 
                      className="ml-2 rounded-full h-9 w-9 p-0"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className={`h-5 w-5 ${newMessage.trim() ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty state when no conversation is selected */}
            {!isMobile && !selectedConversation && (
              <div className="col-span-2 md:col-span-2 lg:col-span-3 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-blue-900">
                    <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">Your Messages</h2>
                  <p className="text-gray-600 mb-4 dark:text-gray-400">Select a conversation to start chatting</p>
                  <Button onClick={handleCreateNewMessage}>
                    <Edit className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact/Group Info Dialog */}
      <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <DialogContent className="max-w-md dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle>
              {selectedConversation?.type === 'group' ? 'Group Info' : 'Contact Info'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedConversation && (
            <div className="space-y-4">
              <div className="text-center">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mt-2 dark:text-white">{selectedConversation.name}</h3>
                {selectedConversation.type === 'individual' && selectedConversation.isOnline && (
                  <p className="text-sm text-green-600">Active now</p>
                )}
              </div>

              <div className="flex justify-around py-4">
                <Button 
                  variant="ghost" 
                  className="flex flex-col items-center dark:text-gray-200"
                  onClick={() => {
                    setIsInfoOpen(false);
                    handleStartCall('audio');
                  }}
                >
                  <Phone className="h-6 w-6 mb-1" />
                  <span className="text-xs">Call</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex flex-col items-center dark:text-gray-200"
                  onClick={() => {
                    setIsInfoOpen(false);
                    handleStartCall('video');
                  }}
                >
                  <Video className="h-6 w-6 mb-1" />
                  <span className="text-xs">Video</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex flex-col items-center dark:text-gray-200"
                  onClick={() => handleMuteConversation(selectedConversation.id)}
                >
                  {selectedConversation.isMuted ? (
                    <>
                      <Bell className="h-6 w-6 mb-1" />
                      <span className="text-xs">Unmute</span>
                    </>
                  ) : (
                    <>
                      <Bell className="h-6 w-6 mb-1 line-through" />
                      <span className="text-xs">Mute</span>
                    </>
                  )}
                </Button>
              </div>

              {selectedConversation.type === 'group' && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center dark:text-white">
                    <Users className="h-4 w-4 mr-2" />
                    Members ({selectedConversation.members?.length || 0})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedConversation.members?.map((member) => (
                      <div key={member.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg dark:hover:bg-gray-700">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {member.isOnline && (
                            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium dark:text-white">{member.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {member.isOnline ? 'Active now' : member.lastActive}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2 dark:border-gray-600 dark:text-gray-200"
                      onClick={() => toast.info('Add members feature coming soon')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Members
                    </Button>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t dark:border-gray-700">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => {
                    handleDeleteConversation(selectedConversation.id);
                    setIsInfoOpen(false);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Conversation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog */}
      <Dialog open={isImageViewerOpen} onOpenChange={setIsImageViewerOpen}>
        <DialogContent className="max-w-3xl p-0 bg-black">
          <DialogHeader>
            <DialogTitle className="sr-only">Image Viewer</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 z-10"
              onClick={() => setIsImageViewerOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img 
              src={selectedImage} 
              alt="Full size" 
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Call Dialog */}
      <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
        <DialogContent className="max-w-md dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="sr-only">
              {callType === 'audio' ? 'Audio Call' : 'Video Call'} with {selectedConversation?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={selectedConversation?.avatar} />
              <AvatarFallback>{selectedConversation?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold mb-1 dark:text-white">{selectedConversation?.name}</h3>
            <p className="text-gray-500 mb-8 dark:text-gray-400">
              {callType === 'audio' ? 'Audio call' : 'Video call'}
              <span className="animate-pulse"> • Connecting...</span>
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button 
                variant="ghost" 
                size="lg" 
                className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 p-0 dark:bg-gray-700 dark:hover:bg-gray-600"
                onClick={() => toast.info('Microphone muted')}
              >
                <Mic className="h-6 w-6 dark:text-gray-200" />
              </Button>
              {callType === 'video' && (
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 p-0 dark:bg-gray-700 dark:hover:bg-gray-600"
                  onClick={() => toast.info('Camera turned off')}
                >
                  <Video className="h-6 w-6 dark:text-gray-200" />
                </Button>
              )}
              <Button 
                variant="destructive" 
                size="lg" 
                className="rounded-full h-12 w-12 p-0"
                onClick={handleEndCall}
              >
                <Phone className="h-6 w-6 rotate-135" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper component for File icon
const File = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

// Helper component for MessageCircle icon
const MessageCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default MessagesTab;