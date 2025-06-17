import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, MoreHorizontal, Send, Smile, Paperclip, MessageCircle, Users, Filter, ArrowLeft, Check, CheckCheck, Clock, Bookmark, Star, Bell, X, Trash, Archive, Info, Image, Mic, Gif, Sticker, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  isMuted?: boolean;
  isStarred?: boolean;
  isGroup?: boolean;
  members?: { name: string; avatar: string }[];
  status?: 'sent' | 'delivered' | 'read';
}

interface Message {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  time: string;
  isMine: boolean;
  status?: 'sent' | 'delivered' | 'read';
  isReaction?: boolean;
  reaction?: string;
  attachments?: {
    type: 'image' | 'file' | 'audio' | 'video';
    url: string;
    name?: string;
    size?: string;
  }[];
}

const MessagesTab = () => {
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [isGroupInfoOpen, setIsGroupInfoOpen] = useState(false);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: MOCK_IMAGES.AVATARS[0],
      lastMessage: 'Hey! How are you doing?',
      time: '2m',
      unread: 2,
      isOnline: true,
      isStarred: true,
      status: 'read'
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: MOCK_IMAGES.AVATARS[1],
      lastMessage: 'Thanks for sharing that article!',
      time: '1h',
      unread: 0,
      isOnline: false,
      status: 'delivered'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: MOCK_IMAGES.AVATARS[2],
      lastMessage: 'See you tomorrow!',
      time: '3h',
      unread: 1,
      isOnline: true,
      isTyping: true
    },
    {
      id: '4',
      name: 'Design Team',
      avatar: MOCK_IMAGES.AVATARS[3],
      lastMessage: 'David: Let\'s finalize the mockups',
      time: '5h',
      unread: 4,
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
      lastMessage: 'Can you send me the project files?',
      time: '1d',
      unread: 0,
      isOnline: false,
      isMuted: true,
      status: 'sent'
    }
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1-1',
        sender: 'Sarah Johnson',
        senderId: '1',
        content: 'Hey! How are you doing?',
        time: '2:30 PM',
        isMine: false
      },
      {
        id: '1-2',
        sender: 'You',
        senderId: 'current_user',
        content: 'I\'m doing great! Just working on some projects. How about you?',
        time: '2:32 PM',
        isMine: true,
        status: 'read'
      },
      {
        id: '1-3',
        sender: 'Sarah Johnson',
        senderId: '1',
        content: 'Same here! Really excited about the new features we\'re building.',
        time: '2:35 PM',
        isMine: false
      },
      {
        id: '1-4',
        sender: 'Sarah Johnson',
        senderId: '1',
        content: 'Check out this cool photo from my weekend hike!',
        time: '2:36 PM',
        isMine: false,
        attachments: [
          {
            type: 'image',
            url: MOCK_IMAGES.POSTS[2],
            name: 'weekend_hike.jpg',
            size: '2.4 MB'
          }
        ]
      },
      {
        id: '1-5',
        sender: 'You',
        senderId: 'current_user',
        content: 'Wow, that looks amazing! Where was this taken?',
        time: '2:38 PM',
        isMine: true,
        status: 'read'
      },
      {
        id: '1-6',
        sender: 'Sarah Johnson',
        senderId: '1',
        content: 'Mount Rainier National Park. We should go sometime!',
        time: '2:40 PM',
        isMine: false
      },
      {
        id: '1-7',
        sender: 'You',
        senderId: 'current_user',
        content: '👍',
        time: '2:41 PM',
        isMine: true,
        isReaction: true,
        status: 'delivered'
      }
    ],
    '2': [
      {
        id: '2-1',
        sender: 'Mike Chen',
        senderId: '2',
        content: 'Hey, did you see that article I sent you about React performance?',
        time: '10:15 AM',
        isMine: false
      },
      {
        id: '2-2',
        sender: 'You',
        senderId: 'current_user',
        content: 'Yes! It was really helpful. Thanks for sharing!',
        time: '10:30 AM',
        isMine: true,
        status: 'delivered'
      },
      {
        id: '2-3',
        sender: 'Mike Chen',
        senderId: '2',
        content: 'No problem! I thought you might find it useful for your current project.',
        time: '10:32 AM',
        isMine: false
      },
      {
        id: '2-4',
        sender: 'You',
        senderId: 'current_user',
        content: 'Definitely. I\'ve already implemented some of the optimization techniques.',
        time: '10:35 AM',
        isMine: true,
        status: 'delivered'
      }
    ],
    '3': [
      {
        id: '3-1',
        sender: 'Emma Wilson',
        senderId: '3',
        content: 'Are we still meeting tomorrow at the coffee shop?',
        time: '3:15 PM',
        isMine: false
      },
      {
        id: '3-2',
        sender: 'You',
        senderId: 'current_user',
        content: 'Yes, 10 AM works for me!',
        time: '3:20 PM',
        isMine: true,
        status: 'read'
      },
      {
        id: '3-3',
        sender: 'Emma Wilson',
        senderId: '3',
        content: 'Perfect! See you tomorrow!',
        time: '3:22 PM',
        isMine: false
      }
    ],
    '4': [
      {
        id: '4-1',
        sender: 'David Kim',
        senderId: '4-1',
        content: 'Hey team, let\'s finalize the mockups for the new feature',
        time: '11:00 AM',
        isMine: false
      },
      {
        id: '4-2',
        sender: 'Lisa Wang',
        senderId: '4-2',
        content: 'I\'ve uploaded the latest designs to Figma',
        time: '11:05 AM',
        isMine: false,
        attachments: [
          {
            type: 'file',
            url: '#',
            name: 'design_mockups_v2.fig',
            size: '8.2 MB'
          }
        ]
      },
      {
        id: '4-3',
        sender: 'You',
        senderId: 'current_user',
        content: 'They look great! I have a few suggestions for the navigation',
        time: '11:10 AM',
        isMine: true,
        status: 'read'
      },
      {
        id: '4-4',
        sender: 'Alex Rodriguez',
        senderId: '4-3',
        content: 'I agree with the suggestions. Let\'s discuss in our meeting tomorrow',
        time: '11:15 AM',
        isMine: false
      }
    ],
    '5': [
      {
        id: '5-1',
        sender: 'Lisa Wang',
        senderId: '5',
        content: 'Hi! Can you send me the project files when you get a chance?',
        time: '9:30 AM',
        isMine: false
      },
      {
        id: '5-2',
        sender: 'You',
        senderId: 'current_user',
        content: 'Sure thing! Here they are:',
        time: '9:45 AM',
        isMine: true,
        status: 'sent',
        attachments: [
          {
            type: 'file',
            url: '#',
            name: 'project_files.zip',
            size: '24.5 MB'
          }
        ]
      },
      {
        id: '5-3',
        sender: 'You',
        senderId: 'current_user',
        content: 'Let me know if you need anything else!',
        time: '9:46 AM',
        isMine: true,
        status: 'sent'
      }
    ]
  });

  // Scroll to bottom when messages change or chat is selected
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedChat]);

  // Simulate typing indicator
  useEffect(() => {
    if (selectedChat?.id === '3' && !conversations.find(c => c.id === '3')?.isTyping) {
      const typingTimeout = setTimeout(() => {
        setConversations(prev => prev.map(conv => 
          conv.id === '3' ? { ...conv, isTyping: true } : conv
        ));
        
        // After 3 seconds, add a new message and remove typing indicator
        setTimeout(() => {
          const newMessage: Message = {
            id: `3-${messages['3'].length + 1}`,
            sender: 'Emma Wilson',
            senderId: '3',
            content: 'By the way, I\'ll bring the project documents with me tomorrow.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMine: false
          };
          
          setMessages(prev => ({
            ...prev,
            '3': [...prev['3'], newMessage]
          }));
          
          setConversations(prev => prev.map(conv => 
            conv.id === '3' ? { 
              ...conv, 
              isTyping: false,
              lastMessage: 'By the way, I\'ll bring the project documents with me tomorrow.',
              time: 'now',
              unread: conv.id === selectedChat?.id ? 0 : conv.unread + 1
            } : conv
          ));
        }, 3000);
      }, 5000);
      
      return () => clearTimeout(typingTimeout);
    }
  }, [selectedChat, conversations, messages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;
    
    const newMessage: Message = {
      id: `${selectedChat.id}-${Date.now()}`,
      sender: 'You',
      senderId: 'current_user',
      content: messageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      status: 'sent'
    };
    
    // Add message to chat
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));
    
    // Update conversation preview
    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat.id ? {
        ...conv,
        lastMessage: messageText.trim(),
        time: 'now',
        unread: 0
      } : conv
    ));
    
    setMessageText('');
    
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
    
    // Simulate reply for demo purposes
    if (selectedChat.id === '1') {
      setTimeout(() => {
        setConversations(prev => prev.map(conv => 
          conv.id === '1' ? { ...conv, isTyping: true } : conv
        ));
        
        setTimeout(() => {
          const replyMessage: Message = {
            id: `1-${Date.now()}`,
            sender: 'Sarah Johnson',
            senderId: '1',
            content: 'That sounds great! Looking forward to catching up soon.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMine: false
          };
          
          setMessages(prev => ({
            ...prev,
            '1': [...prev['1'], replyMessage]
          }));
          
          setConversations(prev => prev.map(conv => 
            conv.id === '1' ? {
              ...conv,
              isTyping: false,
              lastMessage: 'That sounds great! Looking forward to catching up soon.',
              time: 'now',
              unread: selectedChat.id === '1' ? 0 : 1
            } : conv
          ));
        }, 3000);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectChat = (conversation: Conversation) => {
    setSelectedChat(conversation);
    
    // Mark as read when selecting
    if (conversation.unread > 0) {
      setConversations(prev => prev.map(conv => 
        conv.id === conversation.id ? { ...conv, unread: 0 } : conv
      ));
    }
  };

  const handleCall = (type: 'audio' | 'video') => {
    setCallType(type);
    setIsCallDialogOpen(true);
  };

  const handleStarConversation = (id: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, isStarred: !conv.isStarred } : conv
    ));
    
    const conversation = conversations.find(c => c.id === id);
    toast.success(conversation?.isStarred 
      ? `Removed ${conversation.name} from favorites` 
      : `Added ${conversation.name} to favorites`);
  };

  const handleMuteConversation = (id: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, isMuted: !conv.isMuted } : conv
    ));
    
    const conversation = conversations.find(c => c.id === id);
    toast.success(conversation?.isMuted 
      ? `Unmuted ${conversation.name}` 
      : `Muted ${conversation.name}`);
  };

  const handleArchiveConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (selectedChat?.id === id) {
      setSelectedChat(null);
    }
    toast.success('Conversation archived');
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (selectedChat?.id === id) {
      setSelectedChat(null);
    }
    toast.success('Conversation deleted');
  };

  const handleSendReaction = (reaction: string) => {
    if (!selectedChat) return;
    
    const newMessage: Message = {
      id: `${selectedChat.id}-${Date.now()}`,
      sender: 'You',
      senderId: 'current_user',
      content: reaction,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      isReaction: true,
      status: 'sent'
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));
    
    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat.id ? {
        ...conv,
        lastMessage: `You sent a ${reaction}`,
        time: 'now'
      } : conv
    ));
  };

  const handleAttachFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !selectedChat) return;
    
    // For demo purposes, we'll just use a mock image
    const newMessage: Message = {
      id: `${selectedChat.id}-${Date.now()}`,
      sender: 'You',
      senderId: 'current_user',
      content: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      status: 'sent',
      attachments: [
        {
          type: 'image',
          url: MOCK_IMAGES.POSTS[Math.floor(Math.random() * MOCK_IMAGES.POSTS.length)],
          name: files[0].name,
          size: `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`
        }
      ]
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));
    
    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat.id ? {
        ...conv,
        lastMessage: 'You sent an image',
        time: 'now'
      } : conv
    ));
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return matchesSearch && conversation.unread > 0;
    if (activeTab === 'groups') return matchesSearch && conversation.isGroup;
    if (activeTab === 'online') return matchesSearch && conversation.isOnline;
    if (activeTab === 'starred') return matchesSearch && conversation.isStarred;
    
    return matchesSearch;
  });

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <Check className="w-3 h-3 text-blue-500" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.isReaction) {
      return (
        <div className="flex justify-center">
          <div className="text-4xl">{message.content}</div>
        </div>
      );
    }
    
    return (
      <>
        {message.content && <p>{message.content}</p>}
        
        {message.attachments && message.attachments.map((attachment, index) => (
          <div key={index} className="mt-2">
            {attachment.type === 'image' ? (
              <div className="relative">
                <img
                  src={attachment.url}
                  alt="Attachment"
                  className="max-w-full rounded-lg max-h-60 object-cover cursor-pointer"
                  onClick={() => setIsImageDialogOpen(true)}
                />
                <div className="absolute bottom-2 right-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-black/50 text-white hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Download logic
                    }}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <File className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{attachment.name}</p>
                  <p className="text-xs text-gray-500">{attachment.size}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="w-full">
      <div className="container-responsive mx-auto py-6">
        <div className="max-w-6xl mx-auto h-[calc(100vh-200px)] flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Conversation List - Hidden on mobile when chat is selected */}
          <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-5 px-4 pt-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="online">Online</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => handleSelectChat(conversation)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
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
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">
                              {conversation.name}
                              {conversation.isGroup && (
                                <Badge variant="outline" className="ml-2 text-xs">Group</Badge>
                              )}
                            </h3>
                            <div className="flex items-center space-x-2 ml-2">
                              <span className="text-sm text-gray-500">{conversation.time}</span>
                              {conversation.unread > 0 && (
                                <Badge className="bg-blue-600 text-white text-xs">
                                  {conversation.unread}
                                </Badge>
                              )}
                              {conversation.isMuted && (
                                <Bell className="w-3 h-3 text-gray-400" />
                              )}
                              {conversation.isStarred && (
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
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
                                <>
                                  {conversation.isGroup && !conversation.lastMessage.startsWith(conversation.name.split(' ')[0]) 
                                    ? `${conversation.lastMessage}` 
                                    : conversation.lastMessage
                                  }
                                </>
                              )}
                            </p>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-56 p-2" onClick={(e) => e.stopPropagation()}>
                                <div className="grid gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="justify-start"
                                    onClick={() => handleStarConversation(conversation.id)}
                                  >
                                    <Star className={`w-4 h-4 mr-2 ${conversation.isStarred ? 'fill-current text-yellow-500' : ''}`} />
                                    {conversation.isStarred ? 'Unstar' : 'Star'} conversation
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="justify-start"
                                    onClick={() => handleMuteConversation(conversation.id)}
                                  >
                                    {conversation.isMuted ? (
                                      <>
                                        <Bell className="w-4 h-4 mr-2" />
                                        Unmute notifications
                                      </>
                                    ) : (
                                      <>
                                        <BellOff className="w-4 h-4 mr-2" />
                                        Mute notifications
                                      </>
                                    )}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="justify-start"
                                    onClick={() => handleArchiveConversation(conversation.id)}
                                  >
                                    <Archive className="w-4 h-4 mr-2" />
                                    Archive conversation
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDeleteConversation(conversation.id)}
                                  >
                                    <Trash className="w-4 h-4 mr-2" />
                                    Delete conversation
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages found</h3>
                      <p className="text-gray-500">
                        {searchTerm 
                          ? `No results for "${searchTerm}"`
                          : activeTab === 'unread' 
                            ? "You don't have any unread messages"
                            : activeTab === 'groups'
                              ? "You're not in any group conversations"
                              : activeTab === 'online'
                                ? "No contacts are online right now"
                                : activeTab === 'starred'
                                  ? "You haven't starred any conversations"
                                  : "Start a new conversation to connect with friends"
                        }
                      </p>
                      {searchTerm && (
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setSearchTerm('')}
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
            {selectedChat ? (
              <>
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="md:hidden h-8 w-8 p-0"
                      onClick={handleBackToList}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedChat.isOnline 
                          ? selectedChat.isTyping 
                            ? 'typing...' 
                            : 'Active now' 
                          : 'Last seen 1h ago'
                        }
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => selectedChat.isGroup ? setIsGroupInfoOpen(true) : setIsInfoOpen(true)}
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages[selectedChat.id]?.map((message, index) => {
                    // Check if we should show date separator
                    const showDateSeparator = index === 0 || 
                      new Date(message.time).toDateString() !== 
                      new Date(messages[selectedChat.id][index - 1].time).toDateString();
                    
                    return (
                      <React.Fragment key={message.id}>
                        {showDateSeparator && (
                          <div className="flex justify-center my-4">
                            <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                              {new Date().toDateString() === new Date(message.time).toDateString()
                                ? 'Today'
                                : new Date(message.time).toLocaleDateString()
                              }
                            </div>
                          </div>
                        )}
                        
                        <div
                          className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                        >
                          {!message.isMine && (
                            <Avatar className="w-8 h-8 mr-2 self-end mb-1">
                              <AvatarImage src={selectedChat.avatar} />
                              <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className="max-w-[70%]">
                            <div
                              className={`px-4 py-2 rounded-lg ${
                                message.isMine
                                  ? message.isReaction 
                                    ? 'bg-transparent' 
                                    : 'bg-blue-600 text-white'
                                  : message.isReaction
                                    ? 'bg-transparent'
                                    : 'bg-gray-200 text-gray-900'
                              }`}
                            >
                              {renderMessageContent(message)}
                            </div>
                            <div className="flex items-center mt-1 space-x-1">
                              <p className={`text-xs ${message.isMine ? 'text-gray-500 text-right' : 'text-gray-500'}`}>
                                {message.time}
                              </p>
                              {message.isMine && message.status && (
                                <div className="ml-1">
                                  {getStatusIcon(message.status)}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {message.isMine && (
                            <Avatar className="w-8 h-8 ml-2 self-end mb-1">
                              <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Popover open={isAttachmentMenuOpen} onOpenChange={setIsAttachmentMenuOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                          <Paperclip className="w-5 h-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56 p-2">
                        <div className="grid grid-cols-3 gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex flex-col items-center h-auto py-2"
                            onClick={handleAttachFile}
                          >
                            <Image className="w-5 h-5 mb-1" />
                            <span className="text-xs">Photo</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex flex-col items-center h-auto py-2"
                            onClick={() => toast.info('File upload coming soon')}
                          >
                            <File className="w-5 h-5 mb-1" />
                            <span className="text-xs">File</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex flex-col items-center h-auto py-2"
                            onClick={() => toast.info('Camera feature coming soon')}
                          >
                            <Camera className="w-5 h-5 mb-1" />
                            <span className="text-xs">Camera</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex flex-col items-center h-auto py-2"
                            onClick={() => toast.info('Audio recording coming soon')}
                          >
                            <Mic className="w-5 h-5 mb-1" />
                            <span className="text-xs">Audio</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex flex-col items-center h-auto py-2"
                            onClick={() => toast.info('GIF feature coming soon')}
                          >
                            <Gif className="w-5 h-5 mb-1" />
                            <span className="text-xs">GIF</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex flex-col items-center h-auto py-2"
                            onClick={() => toast.info('Sticker feature coming soon')}
                          >
                            <Sticker className="w-5 h-5 mb-1" />
                            <span className="text-xs">Sticker</span>
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <div className="flex-1 flex space-x-2">
                      <Input
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="rounded-full"
                      />
                      <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                            <Smile className="w-5 h-5" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-2">
                          <div className="grid grid-cols-8 gap-2">
                            {['👍', '❤️', '😂', '😮', '😢', '😡', '👏', '🔥', 
                              '🎉', '💯', '🙏', '👌', '😊', '🥰', '😎', '🤔'].map(emoji => (
                              <Button 
                                key={emoji} 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-lg"
                                onClick={() => {
                                  if (messageText) {
                                    setMessageText(prev => prev + emoji);
                                  } else {
                                    handleSendReaction(emoji);
                                    setIsEmojiPickerOpen(false);
                                  }
                                }}
                              >
                                {emoji}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Select a conversation to start messaging or start a new conversation with the + button.
                  </p>
                  <Button className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    New Message
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelected}
      />
      
      {/* Image Viewer Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative">
            <img
              src={MOCK_IMAGES.POSTS[2]}
              alt="Full size"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsImageDialogOpen(false)}
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Contact Info Dialog */}
      <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Info</DialogTitle>
          </DialogHeader>
          
          {selectedChat && (
            <div className="space-y-4">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mt-2">{selectedChat.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedChat.isOnline ? 'Active now' : 'Last active 1h ago'}
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="flex flex-col items-center h-auto py-3">
                  <Phone className="w-5 h-5 mb-1" />
                  <span className="text-xs">Call</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center h-auto py-3">
                  <Video className="w-5 h-5 mb-1" />
                  <span className="text-xs">Video</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center h-auto py-3">
                  <Search className="w-5 h-5 mb-1" />
                  <span className="text-xs">Search</span>
                </Button>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Options</h4>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleMuteConversation(selectedChat.id)}
                  >
                    {selectedChat.isMuted ? (
                      <>
                        <Bell className="w-4 h-4 mr-2" />
                        Unmute notifications
                      </>
                    ) : (
                      <>
                        <BellOff className="w-4 h-4 mr-2" />
                        Mute notifications
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleStarConversation(selectedChat.id)}
                  >
                    <Star className={`w-4 h-4 mr-2 ${selectedChat.isStarred ? 'fill-current text-yellow-500' : ''}`} />
                    {selectedChat.isStarred ? 'Unstar conversation' : 'Star conversation'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save messages
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 pt-2 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    handleDeleteConversation(selectedChat.id);
                    setIsInfoOpen(false);
                  }}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete conversation
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Block {selectedChat.name}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Group Info Dialog */}
      <Dialog open={isGroupInfoOpen} onOpenChange={setIsGroupInfoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Group Info</DialogTitle>
          </DialogHeader>
          
          {selectedChat && selectedChat.isGroup && (
            <div className="space-y-4">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mt-2">{selectedChat.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedChat.members?.length || 0} members
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Members</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedChat.members?.map((member, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{member.name}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Options</h4>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleMuteConversation(selectedChat.id)}
                  >
                    {selectedChat.isMuted ? (
                      <>
                        <Bell className="w-4 h-4 mr-2" />
                        Unmute notifications
                      </>
                    ) : (
                      <>
                        <BellOff className="w-4 h-4 mr-2" />
                        Mute notifications
                      </>
                    )}
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Add members
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    Search in conversation
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 pt-2 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Leave group
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    handleDeleteConversation(selectedChat.id);
                    setIsGroupInfoOpen(false);
                  }}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete conversation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Call Dialog */}
      <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={selectedChat?.avatar} />
              <AvatarFallback>{selectedChat?.name.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold mb-1">{selectedChat?.name}</h3>
            <p className="text-gray-500 mb-6">
              {callType === 'audio' ? 'Audio calling...' : 'Video calling...'}
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-12 w-12 p-0 bg-gray-100"
                onClick={() => setIsCallDialogOpen(false)}
              >
                <X className="w-6 h-6 text-red-500" />
              </Button>
              {callType === 'audio' ? (
                <Button
                  size="lg"
                  className="rounded-full h-12 w-12 p-0 bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    toast.success(`${callType} call connected`);
                    setTimeout(() => setIsCallDialogOpen(false), 1500);
                  }}
                >
                  <Phone className="w-6 h-6" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="rounded-full h-12 w-12 p-0 bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    toast.success(`${callType} call connected`);
                    setTimeout(() => setIsCallDialogOpen(false), 1500);
                  }}
                >
                  <Video className="w-6 h-6" />
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