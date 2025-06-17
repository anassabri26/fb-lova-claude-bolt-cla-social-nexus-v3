import React, { useState, useRef, useEffect } from 'react';
import { Search, Phone, Video, MoreHorizontal, Send, Smile, Paperclip, MessageCircle, Image, Mic, ThumbsUp, X, Filter, Settings, Archive, Bell, BellOff, Pin, Flag, UserMinus, Star, Check, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MOCK_IMAGES } from '@/lib/constants';
import { toast } from 'sonner';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
  isTyping?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
  isArchived?: boolean;
  isGroup?: boolean;
  members?: { name: string; avatar: string }[];
}

interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  time: string;
  isMine: boolean;
  status?: 'sent' | 'delivered' | 'read';
  reactions?: { emoji: string; count: number }[];
  attachments?: { type: 'image' | 'file'; url: string; name?: string }[];
}

const MessagesTab = () => {
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: MOCK_IMAGES.AVATARS[0],
      lastMessage: 'Hey! How are you doing?',
      time: '2m',
      unread: 2,
      isOnline: true,
      isTyping: true
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: MOCK_IMAGES.AVATARS[1],
      lastMessage: 'Thanks for sharing that article!',
      time: '1h',
      unread: 0,
      isOnline: false,
      isPinned: true
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: MOCK_IMAGES.AVATARS[2],
      lastMessage: 'See you tomorrow!',
      time: '3h',
      unread: 1,
      isOnline: true
    },
    {
      id: '4',
      name: 'Design Team',
      avatar: MOCK_IMAGES.AVATARS[3],
      lastMessage: 'David: Let\'s finalize the mockups',
      time: '5h',
      unread: 5,
      isOnline: false,
      isGroup: true,
      members: [
        { name: 'David Kim', avatar: MOCK_IMAGES.AVATARS[3] },
        { name: 'Lisa Wang', avatar: MOCK_IMAGES.AVATARS[4] },
        { name: 'Alex Rodriguez', avatar: MOCK_IMAGES.AVATARS[5] }
      ]
    },
    {
      id: '5',
      name: 'Lisa Wang',
      avatar: MOCK_IMAGES.AVATARS[4],
      lastMessage: 'Can you send me the files?',
      time: '1d',
      unread: 0,
      isOnline: false,
      isArchived: true
    }
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1-1',
        sender: 'Sarah Johnson',
        senderAvatar: MOCK_IMAGES.AVATARS[0],
        content: 'Hey! How are you doing?',
        time: '2:30 PM',
        isMine: false
      },
      {
        id: '1-2',
        sender: 'You',
        content: 'I\'m doing great! Just working on some projects. How about you?',
        time: '2:32 PM',
        isMine: true,
        status: 'read'
      },
      {
        id: '1-3',
        sender: 'Sarah Johnson',
        senderAvatar: MOCK_IMAGES.AVATARS[0],
        content: 'Same here! Really excited about the new features we\'re building.',
        time: '2:35 PM',
        isMine: false
      },
      {
        id: '1-4',
        sender: 'Sarah Johnson',
        senderAvatar: MOCK_IMAGES.AVATARS[0],
        content: 'By the way, did you see the latest design mockups?',
        time: '2:36 PM',
        isMine: false,
        attachments: [
          { type: 'image', url: MOCK_IMAGES.POSTS[0], name: 'design-mockup.jpg' }
        ]
      }
    ],
    '2': [
      {
        id: '2-1',
        sender: 'Mike Chen',
        senderAvatar: MOCK_IMAGES.AVATARS[1],
        content: 'Hey, I found this article about React performance optimization that I thought you might find interesting!',
        time: '10:15 AM',
        isMine: false
      },
      {
        id: '2-2',
        sender: 'You',
        content: 'Thanks for sharing! I\'ll check it out.',
        time: '10:30 AM',
        isMine: true,
        status: 'read',
        reactions: [{ emoji: '👍', count: 1 }]
      },
      {
        id: '2-3',
        sender: 'Mike Chen',
        senderAvatar: MOCK_IMAGES.AVATARS[1],
        content: 'Let me know what you think. I implemented some of the techniques and saw a 30% performance boost.',
        time: '10:32 AM',
        isMine: false
      }
    ],
    '3': [
      {
        id: '3-1',
        sender: 'Emma Wilson',
        senderAvatar: MOCK_IMAGES.AVATARS[2],
        content: 'Are we still meeting tomorrow at the coffee shop?',
        time: '3:45 PM',
        isMine: false
      },
      {
        id: '3-2',
        sender: 'You',
        content: 'Yes, 10 AM works for me!',
        time: '3:50 PM',
        isMine: true,
        status: 'delivered'
      },
      {
        id: '3-3',
        sender: 'Emma Wilson',
        senderAvatar: MOCK_IMAGES.AVATARS[2],
        content: 'Perfect! See you tomorrow!',
        time: '3:51 PM',
        isMine: false
      }
    ],
    '4': [
      {
        id: '4-1',
        sender: 'David Kim',
        senderAvatar: MOCK_IMAGES.AVATARS[3],
        content: 'Hey team, let\'s finalize the mockups for the new feature',
        time: '11:30 AM',
        isMine: false
      },
      {
        id: '4-2',
        sender: 'Lisa Wang',
        senderAvatar: MOCK_IMAGES.AVATARS[4],
        content: 'I\'ve made some updates to the dashboard design',
        time: '11:45 AM',
        isMine: false,
        attachments: [
          { type: 'image', url: MOCK_IMAGES.POSTS[1], name: 'dashboard-design.jpg' }
        ]
      },
      {
        id: '4-3',
        sender: 'You',
        content: 'Looks great! I have a few suggestions for the navigation',
        time: '12:00 PM',
        isMine: true,
        status: 'sent'
      }
    ]
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && selectedChat) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedChat]);

  // Simulate typing indicator
  useEffect(() => {
    if (selectedChat?.isTyping) {
      const timer = setTimeout(() => {
        // Add a new message from the sender
        const newMessage: Message = {
          id: `${selectedChat.id}-${Date.now()}`,
          sender: selectedChat.name,
          senderAvatar: selectedChat.avatar,
          content: 'I was thinking we could meet up this weekend. Are you free?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMine: false
        };
        
        setMessages(prev => ({
          ...prev,
          [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
        }));
        
        // Update conversation
        setConversations(prev => prev.map(conv => 
          conv.id === selectedChat.id 
            ? { ...conv, isTyping: false, lastMessage: newMessage.content, time: 'now' }
            : conv
        ));
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!messageText.trim() && !isRecording) return;
    if (!selectedChat) return;
    
    const newMessage: Message = {
      id: `${selectedChat.id}-${Date.now()}`,
      sender: 'You',
      content: isRecording ? '🎤 Voice message (0:15)' : messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      status: 'sent'
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));
    
    // Update conversation
    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat.id 
        ? { ...conv, lastMessage: newMessage.content, time: 'now', unread: 0 }
        : conv
    ));
    
    setMessageText('');
    setIsRecording(false);
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedChat.id]: prev[selectedChat.id].map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      }));
    }, 1000);
    
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedChat.id]: prev[selectedChat.id].map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      }));
    }, 2000);
  };

  const handleSelectChat = (chat: Conversation) => {
    setSelectedChat(chat);
    
    // Mark as read
    if (chat.unread > 0) {
      setConversations(prev => prev.map(conv => 
        conv.id === chat.id ? { ...conv, unread: 0 } : conv
      ));
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.info('Voice recording started');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    handleSendMessage();
  };

  const handleAttachment = (type: 'photo' | 'file' | 'location' | 'contact') => {
    if (!selectedChat) return;
    
    let content = '';
    let attachment = null;
    
    switch (type) {
      case 'photo':
        content = 'Sent a photo';
        attachment = { type: 'image', url: MOCK_IMAGES.POSTS[Math.floor(Math.random() * MOCK_IMAGES.POSTS.length)] };
        break;
      case 'file':
        content = 'Sent a file: document.pdf';
        break;
      case 'location':
        content = 'Shared a location';
        break;
      case 'contact':
        content = 'Shared a contact: John Doe';
        break;
    }
    
    const newMessage: Message = {
      id: `${selectedChat.id}-${Date.now()}`,
      sender: 'You',
      content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      status: 'sent',
      attachments: attachment ? [attachment] : undefined
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));
    
    // Update conversation
    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat.id 
        ? { ...conv, lastMessage: newMessage.content, time: 'now', unread: 0 }
        : conv
    ));
    
    setIsAttachmentMenuOpen(false);
    toast.success(`${type} sent`);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    if (!selectedChat) return;
    
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: prev[selectedChat.id].map(msg => {
        if (msg.id === messageId) {
          const existingReactions = msg.reactions || [];
          const existingReaction = existingReactions.find(r => r.emoji === emoji);
          
          let updatedReactions;
          if (existingReaction) {
            updatedReactions = existingReactions.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            );
          } else {
            updatedReactions = [...existingReactions, { emoji, count: 1 }];
          }
          
          return { ...msg, reactions: updatedReactions };
        }
        return msg;
      })
    }));
    
    toast.success(`Reacted with ${emoji}`);
  };

  const handlePinChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.map(conv => 
      conv.id === chatId ? { ...conv, isPinned: !conv.isPinned } : conv
    ));
    
    const chat = conversations.find(c => c.id === chatId);
    if (chat) {
      toast.success(chat.isPinned ? `Unpinned ${chat.name}` : `Pinned ${chat.name}`);
    }
  };

  const handleMuteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.map(conv => 
      conv.id === chatId ? { ...conv, isMuted: !conv.isMuted } : conv
    ));
    
    const chat = conversations.find(c => c.id === chatId);
    if (chat) {
      toast.success(chat.isMuted ? `Unmuted ${chat.name}` : `Muted ${chat.name}`);
    }
  };

  const handleArchiveChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.map(conv => 
      conv.id === chatId ? { ...conv, isArchived: !conv.isArchived } : conv
    ));
    
    const chat = conversations.find(c => c.id === chatId);
    if (chat) {
      toast.success(chat.isArchived ? `Unarchived ${chat.name}` : `Archived ${chat.name}`);
    }
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(conv => conv.id !== chatId));
    
    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
    }
    
    toast.success('Conversation deleted');
  };

  const handleCall = (type: 'audio' | 'video') => {
    if (!selectedChat) return;
    
    setCallType(type);
    setIsCallDialogOpen(true);
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = 
      (activeTab === 'all' && !conv.isArchived) || 
      (activeTab === 'unread' && conv.unread > 0) || 
      (activeTab === 'archived' && conv.isArchived);
    
    return matchesSearch && matchesTab;
  });

  // Sort conversations: pinned first, then by unread, then by time
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (a.unread > 0 && b.unread === 0) return -1;
    if (a.unread === 0 && b.unread > 0) return 1;
    
    // Convert time strings to comparable values
    const timeA = a.time === 'now' ? Date.now() : 
                 a.time.includes('m') ? Date.now() - parseInt(a.time) * 60 * 1000 :
                 a.time.includes('h') ? Date.now() - parseInt(a.time) * 60 * 60 * 1000 :
                 a.time.includes('d') ? Date.now() - parseInt(a.time) * 24 * 60 * 60 * 1000 : 0;
                 
    const timeB = b.time === 'now' ? Date.now() : 
                 b.time.includes('m') ? Date.now() - parseInt(b.time) * 60 * 1000 :
                 b.time.includes('h') ? Date.now() - parseInt(b.time) * 60 * 60 * 1000 :
                 b.time.includes('d') ? Date.now() - parseInt(b.time) * 24 * 60 * 60 * 1000 : 0;
    
    return timeB - timeA;
  });

  const getMessageStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <div className="flex"><Check className="w-3 h-3 text-gray-400" /><Check className="w-3 h-3 text-gray-400 -ml-1" /></div>;
      case 'read':
        return <div className="flex"><Check className="w-3 h-3 text-blue-500" /><Check className="w-3 h-3 text-blue-500 -ml-1" /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <div className="max-w-6xl mx-auto h-[calc(100vh-200px)] flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">Messages</h2>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => toast.info('New message')}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {showSettings && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Message Settings</h3>
                  <div className="space-y-2 text-sm">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Filter className="w-4 h-4 mr-2" />
                      Message Requests
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Archive className="w-4 h-4 mr-2" />
                      Archived Chats
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Notification Settings
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="px-4 pt-2">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Unread
                  {conversations.filter(c => c.unread > 0).length > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white">
                      {conversations.filter(c => c.unread > 0).length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="flex-1 overflow-y-auto">
                {sortedConversations.length > 0 ? (
                  sortedConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => handleSelectChat(conversation)}
                      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedChat?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                          {conversation.isGroup && (
                            <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                              {conversation.members?.length}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <h3 className={`font-medium truncate ${conversation.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                                {conversation.name}
                              </h3>
                              {conversation.isPinned && (
                                <Pin className="w-3 h-3 text-gray-500" />
                              )}
                              {conversation.isMuted && (
                                <BellOff className="w-3 h-3 text-gray-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              <span className={`text-xs ${conversation.unread > 0 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                                {conversation.time}
                              </span>
                              {conversation.unread > 0 && (
                                <Badge className="bg-blue-600 text-white text-xs">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className={`text-sm truncate ${
                              conversation.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
                            }`}>
                              {conversation.isTyping ? (
                                <span className="text-blue-600">typing...</span>
                              ) : (
                                conversation.lastMessage
                              )}
                            </p>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handlePinChat(conversation.id, e)}
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                              >
                                <Pin className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Conversation Actions - Visible on hover */}
                      <div className="mt-2 pt-2 border-t border-gray-100 hidden group-hover:flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleMuteChat(conversation.id, e)}
                          className="h-7 w-7 p-0"
                        >
                          {conversation.isMuted ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleArchiveChat(conversation.id, e)}
                          className="h-7 w-7 p-0"
                        >
                          <Archive className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDeleteChat(conversation.id, e)}
                          className="h-7 w-7 p-0 text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-4">
                      <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">No conversations found</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedChat.isOnline ? 'Active now' : 'Last seen 1h ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleCall('audio')}>
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleCall('video')}>
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages[selectedChat.id]?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      {!message.isMine && (
                        <Avatar className="w-8 h-8 mr-2 flex-shrink-0 self-end">
                          <AvatarImage src={message.senderAvatar} />
                          <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className="max-w-xs lg:max-w-md">
                        {/* Message Content */}
                        <div className={`px-4 py-2 rounded-lg ${
                          message.isMine
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          <p>{message.content}</p>
                          
                          {/* Attachments */}
                          {message.attachments && message.attachments.map((attachment, index) => (
                            <div key={index} className="mt-2">
                              {attachment.type === 'image' && (
                                <img
                                  src={attachment.url}
                                  alt={attachment.name || 'Attachment'}
                                  className="rounded-lg max-w-full cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => window.open(attachment.url, '_blank')}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {/* Message Info */}
                        <div className={`flex items-center mt-1 ${message.isMine ? 'justify-end' : 'justify-start'}`}>
                          <p className={`text-xs ${message.isMine ? 'text-gray-500' : 'text-gray-500'}`}>
                            {message.time}
                          </p>
                          {message.isMine && message.status && (
                            <span className="ml-1">
                              {getMessageStatusIcon(message.status)}
                            </span>
                          )}
                        </div>
                        
                        {/* Reactions */}
                        {message.reactions && message.reactions.length > 0 && (
                          <div className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} mt-1`}>
                            <div className="bg-white rounded-full px-2 py-1 shadow-sm flex items-center space-x-1">
                              {message.reactions.map((reaction, index) => (
                                <div key={index} className="flex items-center">
                                  <span>{reaction.emoji}</span>
                                  {reaction.count > 1 && (
                                    <span className="text-xs text-gray-500 ml-1">{reaction.count}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-200">
                  {isRecording ? (
                    <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-600 font-medium">Recording...</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleStopRecording}>
                        Stop
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      
                      {isAttachmentMenuOpen && (
                        <div className="absolute bottom-16 left-4 bg-white rounded-lg shadow-lg p-2 flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleAttachment('photo')}
                            className="flex flex-col items-center p-2"
                          >
                            <Image className="w-5 h-5 text-blue-500" />
                            <span className="text-xs mt-1">Photo</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleAttachment('file')}
                            className="flex flex-col items-center p-2"
                          >
                            <File className="w-5 h-5 text-green-500" />
                            <span className="text-xs mt-1">File</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleAttachment('location')}
                            className="flex flex-col items-center p-2"
                          >
                            <MapPin className="w-5 h-5 text-red-500" />
                            <span className="text-xs mt-1">Location</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleAttachment('contact')}
                            className="flex flex-col items-center p-2"
                          >
                            <User className="w-5 h-5 text-purple-500" />
                            <span className="text-xs mt-1">Contact</span>
                          </Button>
                        </div>
                      )}
                      
                      <div className="flex-1 flex space-x-2">
                        <Input
                          placeholder="Type a message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                        >
                          <Smile className="w-4 h-4" />
                        </Button>
                        
                        {isEmojiPickerOpen && (
                          <div className="absolute bottom-16 right-16 bg-white rounded-lg shadow-lg p-2 grid grid-cols-6 gap-1">
                            {['😊', '👍', '❤️', '😂', '🎉', '👏', '🔥', '💯', '🙏', '😍', '🤔', '👌'].map(emoji => (
                              <Button 
                                key={emoji}
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setMessageText(prev => prev + emoji);
                                  setIsEmojiPickerOpen(false);
                                }}
                                className="text-lg p-1 h-8 w-8"
                              >
                                {emoji}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {messageText.trim() ? (
                        <Button onClick={handleSendMessage}>
                          <Send className="w-4 h-4" />
                        </Button>
                      ) : (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onMouseDown={handleStartRecording}
                            onMouseUp={handleStopRecording}
                            onTouchStart={handleStartRecording}
                            onTouchEnd={handleStopRecording}
                          >
                            <Mic className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              const newMessage: Message = {
                                id: `${selectedChat?.id}-${Date.now()}`,
                                sender: 'You',
                                content: '👍',
                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                isMine: true,
                                status: 'sent'
                              };
                              
                              if (selectedChat) {
                                setMessages(prev => ({
                                  ...prev,
                                  [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
                                }));
                                
                                // Update conversation
                                setConversations(prev => prev.map(conv => 
                                  conv.id === selectedChat.id 
                                    ? { ...conv, lastMessage: newMessage.content, time: 'now', unread: 0 }
                                    : conv
                                ));
                              }
                            }}
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
                  <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Call Dialog */}
      <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {callType === 'audio' ? 'Audio Call' : 'Video Call'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-6">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={selectedChat?.avatar} />
              <AvatarFallback>{selectedChat?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <h3 className="text-xl font-semibold mb-2">{selectedChat?.name}</h3>
            <p className="text-gray-500 mb-6">
              {callType === 'audio' ? 'Calling...' : 'Video calling...'}
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full h-12 w-12 p-0"
                onClick={() => {
                  setIsCallDialogOpen(false);
                  toast.info('Call ended');
                }}
              >
                <X className="w-5 h-5 text-red-500" />
              </Button>
              
              {callType === 'audio' ? (
                <Button 
                  size="lg" 
                  className="rounded-full h-12 w-12 p-0 bg-green-500 hover:bg-green-600"
                >
                  <Phone className="w-5 h-5" />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="rounded-full h-12 w-12 p-0 bg-blue-500 hover:bg-blue-600"
                >
                  <Video className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesTab;