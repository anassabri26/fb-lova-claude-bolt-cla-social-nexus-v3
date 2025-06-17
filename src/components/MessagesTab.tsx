import React, { useState, useRef, useEffect } from 'react';
import { Search, Phone, Video, MoreHorizontal, Send, Smile, Paperclip, MessageCircle, Image, Mic, ThumbsUp, X, Filter, Settings, Archive, Bell, BellOff, Pin, Flag, UserMinus, Star, Check, Edit, MapPin, Camera, File, User, ChevronDown, ChevronUp, Info, Trash2, Clock, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { MOCK_IMAGES } from '@/lib/constants';
import { toast } from 'sonner';
import { useIsMobile, useIsTablet } from '@/hooks/use-device';

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
  members?: { name: string; avatar: string; isOnline?: boolean }[];
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
  attachments?: { type: 'image' | 'file' | 'audio' | 'location'; url: string; name?: string; size?: string; duration?: string; location?: string }[];
  isDeleted?: boolean;
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
  const [recordingTime, setRecordingTime] = useState(0);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [isSearchingMessages, setIsSearchingMessages] = useState(false);
  const [messageSearchTerm, setMessageSearchTerm] = useState('');
  const [isForwardingMessage, setIsForwardingMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [editText, setEditText] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const [isVoiceMessagePlaying, setIsVoiceMessagePlaying] = useState(false);
  const [currentVoiceMessage, setCurrentVoiceMessage] = useState<string | null>(null);
  const [voiceMessageProgress, setVoiceMessageProgress] = useState(0);
  const [isTypingIndicatorVisible, setIsTypingIndicatorVisible] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

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
        { name: 'David Kim', avatar: MOCK_IMAGES.AVATARS[3], isOnline: true },
        { name: 'Lisa Wang', avatar: MOCK_IMAGES.AVATARS[4], isOnline: false },
        { name: 'Alex Rodriguez', avatar: MOCK_IMAGES.AVATARS[5], isOnline: true }
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
    },
    {
      id: '6',
      name: 'Alex Rodriguez',
      avatar: MOCK_IMAGES.AVATARS[5],
      lastMessage: 'Great meeting today!',
      time: '2d',
      unread: 0,
      isOnline: true
    },
    {
      id: '7',
      name: 'Jessica Park',
      avatar: MOCK_IMAGES.AVATARS[6],
      lastMessage: 'Let me know when you\'re free',
      time: '3d',
      unread: 0,
      isOnline: false
    },
    {
      id: '8',
      name: 'Robert Smith',
      avatar: MOCK_IMAGES.AVATARS[7],
      lastMessage: 'Thanks for your help!',
      time: '1w',
      unread: 0,
      isOnline: false,
      isMuted: true
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
      },
      {
        id: '2-4',
        sender: 'You',
        content: 'That\'s impressive! I\'ll definitely try it out on our project.',
        time: '10:35 AM',
        isMine: true,
        status: 'read'
      },
      {
        id: '2-5',
        sender: 'Mike Chen',
        senderAvatar: MOCK_IMAGES.AVATARS[1],
        content: 'Here\'s the link to the article:',
        time: '10:36 AM',
        isMine: false
      },
      {
        id: '2-6',
        sender: 'Mike Chen',
        senderAvatar: MOCK_IMAGES.AVATARS[1],
        content: 'https://example.com/react-performance-tips',
        time: '10:36 AM',
        isMine: false
      },
      {
        id: '2-7',
        sender: 'You',
        content: 'Perfect, thanks!',
        time: '10:40 AM',
        isMine: true,
        status: 'read'
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
      },
      {
        id: '3-4',
        sender: 'Emma Wilson',
        senderAvatar: MOCK_IMAGES.AVATARS[2],
        content: 'I\'ll be bringing the project documents we discussed.',
        time: '3:52 PM',
        isMine: false
      },
      {
        id: '3-5',
        sender: 'You',
        content: 'Great! I\'ll prepare my notes as well.',
        time: '4:00 PM',
        isMine: true,
        status: 'delivered'
      },
      {
        id: '3-6',
        sender: 'Emma Wilson',
        senderAvatar: MOCK_IMAGES.AVATARS[2],
        content: 'Here\'s our meeting location:',
        time: '4:05 PM',
        isMine: false,
        attachments: [
          { type: 'location', url: '#', location: 'Coffee House, 123 Main St' }
        ]
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
        status: 'read'
      },
      {
        id: '4-4',
        sender: 'Alex Rodriguez',
        senderAvatar: MOCK_IMAGES.AVATARS[5],
        content: 'I agree with the changes. The new layout is much cleaner.',
        time: '12:15 PM',
        isMine: false
      },
      {
        id: '4-5',
        sender: 'David Kim',
        senderAvatar: MOCK_IMAGES.AVATARS[3],
        content: 'Let\'s schedule a quick call to discuss the final details.',
        time: '12:30 PM',
        isMine: false
      },
      {
        id: '4-6',
        sender: 'You',
        content: 'I\'m available tomorrow afternoon if that works for everyone.',
        time: '12:45 PM',
        isMine: true,
        status: 'read'
      }
    ],
    '5': [
      {
        id: '5-1',
        sender: 'Lisa Wang',
        senderAvatar: MOCK_IMAGES.AVATARS[4],
        content: 'Can you send me the files for the project?',
        time: '9:15 AM',
        isMine: false
      },
      {
        id: '5-2',
        sender: 'You',
        content: 'Sure, here they are:',
        time: '9:30 AM',
        isMine: true,
        status: 'read'
      },
      {
        id: '5-3',
        sender: 'You',
        content: 'Project files',
        time: '9:31 AM',
        isMine: true,
        status: 'read',
        attachments: [
          { type: 'file', url: '#', name: 'project_files.zip', size: '15.2 MB' }
        ]
      },
      {
        id: '5-4',
        sender: 'Lisa Wang',
        senderAvatar: MOCK_IMAGES.AVATARS[4],
        content: 'Thank you! I\'ll take a look and get back to you.',
        time: '9:45 AM',
        isMine: false
      }
    ],
    '6': [
      {
        id: '6-1',
        sender: 'Alex Rodriguez',
        senderAvatar: MOCK_IMAGES.AVATARS[5],
        content: 'Great meeting today! I think we made a lot of progress.',
        time: '4:30 PM',
        isMine: false
      },
      {
        id: '6-2',
        sender: 'You',
        content: 'Definitely! The new strategy looks promising.',
        time: '4:45 PM',
        isMine: true,
        status: 'read'
      },
      {
        id: '6-3',
        sender: 'Alex Rodriguez',
        senderAvatar: MOCK_IMAGES.AVATARS[5],
        content: 'I\'ll send over the meeting notes later today.',
        time: '4:50 PM',
        isMine: false
      },
      {
        id: '6-4',
        sender: 'You',
        content: 'Perfect, thanks!',
        time: '5:00 PM',
        isMine: true,
        status: 'read'
      }
    ],
    '7': [
      {
        id: '7-1',
        sender: 'Jessica Park',
        senderAvatar: MOCK_IMAGES.AVATARS[6],
        content: 'Hey, are you free for a coffee this weekend?',
        time: '2:15 PM',
        isMine: false
      },
      {
        id: '7-2',
        sender: 'You',
        content: 'I should be free on Saturday afternoon!',
        time: '2:30 PM',
        isMine: true,
        status: 'read'
      },
      {
        id: '7-3',
        sender: 'Jessica Park',
        senderAvatar: MOCK_IMAGES.AVATARS[6],
        content: 'Great! How about 3 PM at the usual place?',
        time: '2:35 PM',
        isMine: false
      },
      {
        id: '7-4',
        sender: 'You',
        content: 'Sounds good to me!',
        time: '2:40 PM',
        isMine: true,
        status: 'read'
      },
      {
        id: '7-5',
        sender: 'Jessica Park',
        senderAvatar: MOCK_IMAGES.AVATARS[6],
        content: 'Perfect! Let me know when you\'re free next week too, I have some exciting news to share.',
        time: '2:45 PM',
        isMine: false
      }
    ],
    '8': [
      {
        id: '8-1',
        sender: 'Robert Smith',
        senderAvatar: MOCK_IMAGES.AVATARS[7],
        content: 'Thanks for your help with the project!',
        time: '5:30 PM',
        isMine: false
      },
      {
        id: '8-2',
        sender: 'You',
        content: 'Happy to help! Let me know if you need anything else.',
        time: '5:45 PM',
        isMine: true,
        status: 'read'
      },
      {
        id: '8-3',
        sender: 'Robert Smith',
        senderAvatar: MOCK_IMAGES.AVATARS[7],
        content: 'Will do. Have a great evening!',
        time: '5:50 PM',
        isMine: false
      },
      {
        id: '8-4',
        sender: 'You',
        content: 'You too!',
        time: '6:00 PM',
        isMine: true,
        status: 'read'
      }
    ]
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && selectedChat) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedChat]);

  // Focus input when chat is selected
  useEffect(() => {
    if (selectedChat && messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [selectedChat]);

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

  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        setRecordingTime(0);
      }
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  // Simulate typing indicator for user
  useEffect(() => {
    if (messageText && selectedChat) {
      setIsTypingIndicatorVisible(true);
      
      // Simulate other user seeing typing indicator
      const timer = setTimeout(() => {
        // Update conversation to show typing indicator for the other user
        setConversations(prev => prev.map(conv => 
          conv.id === selectedChat.id 
            ? { ...conv, lastMessage: 'You: ' + messageText.substring(0, 20) + (messageText.length > 20 ? '...' : '') }
            : conv
        ));
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setIsTypingIndicatorVisible(false);
    }
  }, [messageText, selectedChat]);

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!messageText.trim() && !isRecording) return;
    if (!selectedChat) return;
    
    let content = messageText.trim();
    let attachments;
    
    if (isRecording) {
      content = '🎤 Voice message';
      attachments = [{
        type: 'audio',
        url: '#',
        duration: formatRecordingTime(recordingTime)
      }];
    }
    
    const newMessage: Message = {
      id: `${selectedChat.id}-${Date.now()}`,
      sender: 'You',
      content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      status: 'sent',
      attachments
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));
    
    // Update conversation
    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat.id 
        ? { ...conv, lastMessage: `You: ${content.length > 20 ? content.substring(0, 20) + '...' : content}`, time: 'now', unread: 0 }
        : conv
    ));
    
    setMessageText('');
    setIsRecording(false);
    setIsReplying(false);
    setReplyingTo(null);
    setIsEditingMessage(false);
    setEditingMessage(null);
    
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
    if (selectedChat.id === '1' && Math.random() > 0.5) {
      setTimeout(() => {
        // Show typing indicator
        setConversations(prev => prev.map(conv => 
          conv.id === selectedChat.id ? { ...conv, isTyping: true } : conv
        ));
      }, 3000);
    }
  };

  const handleSelectChat = (chat: Conversation) => {
    setSelectedChat(chat);
    
    // Mark as read
    if (chat.unread > 0) {
      setConversations(prev => prev.map(conv => 
        conv.id === chat.id ? { ...conv, unread: 0 } : conv
      ));
    }
    
    // Reset states
    setIsSearchingMessages(false);
    setMessageSearchTerm('');
    setIsForwardingMessage(false);
    setSelectedMessage(null);
    setIsReplying(false);
    setReplyingTo(null);
    setIsEditingMessage(false);
    setEditingMessage(null);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.info('Voice recording started');
  };

  const handleStopRecording = () => {
    if (recordingTime < 1) {
      setIsRecording(false);
      toast.error('Recording too short');
      return;
    }
    
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
        attachment = { 
          type: 'image', 
          url: MOCK_IMAGES.POSTS[Math.floor(Math.random() * MOCK_IMAGES.POSTS.length)] 
        };
        break;
      case 'file':
        content = 'Sent a file';
        attachment = { 
          type: 'file', 
          url: '#', 
          name: 'document.pdf', 
          size: '2.4 MB' 
        };
        break;
      case 'location':
        content = 'Shared a location';
        attachment = { 
          type: 'location', 
          url: '#', 
          location: 'San Francisco, CA' 
        };
        break;
      case 'contact':
        content = 'Shared a contact';
        attachment = { 
          type: 'file', 
          url: '#', 
          name: 'John Doe', 
          size: 'Contact Card' 
        };
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
        ? { ...conv, lastMessage: `You: ${content}`, time: 'now', unread: 0 }
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

  const handleDeleteMessage = (messageId: string) => {
    if (!selectedChat) return;
    
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: prev[selectedChat.id].map(msg => 
        msg.id === messageId ? { ...msg, isDeleted: true, content: 'This message was deleted' } : msg
      )
    }));
    
    toast.success('Message deleted');
  };

  const handleForwardMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsForwardingMessage(true);
  };

  const handleForwardToChat = (chatId: string) => {
    if (!selectedMessage) return;
    
    const forwardedMessage: Message = {
      id: `${chatId}-${Date.now()}`,
      sender: 'You',
      content: selectedMessage.content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      status: 'sent',
      attachments: selectedMessage.attachments
    };
    
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), forwardedMessage]
    }));
    
    // Update conversation
    setConversations(prev => prev.map(conv => 
      conv.id === chatId 
        ? { 
            ...conv, 
            lastMessage: `You: ${forwardedMessage.content.length > 20 ? forwardedMessage.content.substring(0, 20) + '...' : forwardedMessage.content}`, 
            time: 'now' 
          }
        : conv
    ));
    
    setIsForwardingMessage(false);
    setSelectedMessage(null);
    
    toast.success('Message forwarded');
  };

  const handleReplyToMessage = (message: Message) => {
    setIsReplying(true);
    setReplyingTo(message);
    messageInputRef.current?.focus();
  };

  const handleEditMessage = (message: Message) => {
    if (!message.isMine || message.isDeleted) return;
    
    setIsEditingMessage(true);
    setEditingMessage(message);
    setEditText(message.content);
    messageInputRef.current?.focus();
  };

  const handleSaveEdit = () => {
    if (!selectedChat || !editingMessage || !editText.trim()) return;
    
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: prev[selectedChat.id].map(msg => 
        msg.id === editingMessage.id ? { ...msg, content: editText.trim(), status: 'sent' } : msg
      )
    }));
    
    setIsEditingMessage(false);
    setEditingMessage(null);
    setEditText('');
    
    toast.success('Message updated');
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim() || selectedMembers.length === 0) {
      toast.error('Please enter a group name and select at least one member');
      return;
    }
    
    const newGroupId = `group-${Date.now()}`;
    const newGroup: Conversation = {
      id: newGroupId,
      name: newGroupName,
      avatar: MOCK_IMAGES.AVATARS[Math.floor(Math.random() * MOCK_IMAGES.AVATARS.length)],
      lastMessage: 'Group created',
      time: 'now',
      unread: 0,
      isOnline: true,
      isGroup: true,
      members: selectedMembers.map(memberId => {
        const member = conversations.find(c => c.id === memberId);
        return {
          name: member?.name || 'Unknown',
          avatar: member?.avatar || '',
          isOnline: member?.isOnline || false
        };
      })
    };
    
    setConversations(prev => [newGroup, ...prev]);
    
    // Create initial message
    const initialMessage: Message = {
      id: `${newGroupId}-1`,
      sender: 'System',
      content: `Group "${newGroupName}" created by You`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: false
    };
    
    setMessages(prev => ({
      ...prev,
      [newGroupId]: [initialMessage]
    }));
    
    setIsCreatingGroup(false);
    setNewGroupName('');
    setSelectedMembers([]);
    setSelectedChat(newGroup);
    
    toast.success('Group created successfully');
  };

  const handleViewImage = (url: string) => {
    setViewingImage(url);
    setIsImageViewerOpen(true);
  };

  const handlePlayVoiceMessage = (messageId: string, url: string) => {
    setIsVoiceMessagePlaying(!isVoiceMessagePlaying);
    setCurrentVoiceMessage(currentVoiceMessage === messageId ? null : messageId);
    
    if (currentVoiceMessage !== messageId) {
      // Simulate voice message playback
      setVoiceMessageProgress(0);
      const interval = setInterval(() => {
        setVoiceMessageProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsVoiceMessagePlaying(false);
            setCurrentVoiceMessage(null);
            return 0;
          }
          return prev + 5;
        });
      }, 300);
    }
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
                 a.time.includes('d') ? Date.now() - parseInt(a.time) * 24 * 60 * 60 * 1000 :
                 a.time.includes('w') ? Date.now() - parseInt(a.time) * 7 * 24 * 60 * 60 * 1000 : 0;
                 
    const timeB = b.time === 'now' ? Date.now() : 
                 b.time.includes('m') ? Date.now() - parseInt(b.time) * 60 * 1000 :
                 b.time.includes('h') ? Date.now() - parseInt(b.time) * 60 * 60 * 1000 :
                 b.time.includes('d') ? Date.now() - parseInt(b.time) * 24 * 60 * 60 * 1000 :
                 b.time.includes('w') ? Date.now() - parseInt(b.time) * 7 * 24 * 60 * 60 * 1000 : 0;
    
    return timeB - timeA;
  });

  const filteredMessages = selectedChat && messages[selectedChat.id] 
    ? messageSearchTerm 
      ? messages[selectedChat.id].filter(msg => 
          msg.content.toLowerCase().includes(messageSearchTerm.toLowerCase())
        )
      : messages[selectedChat.id]
    : [];

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

  const renderMessageContent = (message: Message) => {
    if (message.isDeleted) {
      return (
        <div className="italic text-gray-500 text-sm">
          {message.content}
        </div>
      );
    }

    return (
      <>
        {message.content}
        
        {/* Attachments */}
        {message.attachments?.map((attachment, index) => (
          <div key={index} className="mt-2">
            {attachment.type === 'image' && (
              <div 
                className="relative cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleViewImage(attachment.url)}
              >
                <img
                  src={attachment.url}
                  alt={attachment.name || 'Image attachment'}
                  className="rounded-lg max-w-full max-h-60 object-cover"
                />
                {attachment.name && (
                  <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs p-1 rounded">
                    {attachment.name}
                  </div>
                )}
              </div>
            )}
            
            {attachment.type === 'file' && (
              <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-3">
                <File className="w-8 h-8 text-blue-500" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{attachment.name}</p>
                  <p className="text-xs text-gray-500">{attachment.size}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            {attachment.type === 'audio' && (
              <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePlayVoiceMessage(message.id, '#')}
                  className="h-8 w-8 p-0"
                >
                  {isVoiceMessagePlaying && currentVoiceMessage === message.id ? (
                    <Pause className="w-4 h-4 text-blue-500" />
                  ) : (
                    <Play className="w-4 h-4 text-blue-500" />
                  )}
                </Button>
                
                <div className="flex-1 min-w-0">
                  <div className="w-full bg-gray-300 h-1 rounded-full">
                    <div 
                      className="bg-blue-500 h-1 rounded-full transition-all"
                      style={{ width: currentVoiceMessage === message.id ? `${voiceMessageProgress}%` : '0%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{attachment.duration}</p>
                </div>
                
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            {attachment.type === 'location' && (
              <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-3">
                <MapPin className="w-8 h-8 text-red-500" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Shared Location</p>
                  <p className="text-xs text-gray-500">{attachment.location}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ExternalLink className="w-4 h-4" />
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
          <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${isMobile && selectedChat ? 'hidden' : 'block'}`}>
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
                    onClick={() => setIsCreatingGroup(true)}
                  >
                    <Users className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      const newChat: Conversation = {
                        id: `new-${Date.now()}`,
                        name: 'New Message',
                        avatar: MOCK_IMAGES.AVATARS[Math.floor(Math.random() * MOCK_IMAGES.AVATARS.length)],
                        lastMessage: 'Start a new conversation',
                        time: 'now',
                        unread: 0,
                        isOnline: false
                      };
                      
                      setConversations(prev => [newChat, ...prev]);
                      setSelectedChat(newChat);
                      toast.success('New conversation started');
                    }}
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => {
                        toast.info('Message requests feature coming soon');
                      }}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Message Requests
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab('archived');
                        setShowSettings(false);
                      }}
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Archived Chats
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => {
                        toast.info('Notification settings feature coming soon');
                      }}
                    >
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
                      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group ${
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
                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handlePinChat(conversation.id, e)}
                                className="h-6 w-6 p-0"
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
                      {searchTerm && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSearchTerm('')}
                          className="mt-2"
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
          <div className={`flex-1 flex flex-col ${isMobile && !selectedChat ? 'hidden' : 'block'}`}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isMobile && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedChat(null)}
                        className="mr-1 h-8 w-8 p-0"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    )}
                    <Avatar 
                      className="w-10 h-10 cursor-pointer"
                      onClick={() => setIsInfoDialogOpen(true)}
                    >
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div 
                      className="cursor-pointer"
                      onClick={() => setIsInfoDialogOpen(true)}
                    >
                      <h3 className="font-semibold">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedChat.isTyping ? (
                          <span className="text-blue-600">typing...</span>
                        ) : (
                          selectedChat.isOnline ? 'Active now' : 'Last seen 1h ago'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsSearchingMessages(!isSearchingMessages)}
                      className={`h-8 w-8 p-0 ${isSearchingMessages ? 'bg-gray-100' : ''}`}
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleCall('audio')}>
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleCall('video')}>
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsInfoDialogOpen(true)}
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Message Search Bar */}
                {isSearchingMessages && (
                  <div className="p-2 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Search in conversation..."
                          value={messageSearchTerm}
                          onChange={(e) => setMessageSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setIsSearchingMessages(false);
                          setMessageSearchTerm('');
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {messageSearchTerm && (
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{filteredMessages.length} results</span>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ArrowUp className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ArrowDown className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Message Forwarding Bar */}
                {isForwardingMessage && selectedMessage && (
                  <div className="p-3 border-b border-gray-200 bg-blue-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Share className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-sm">Forward message to:</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setIsForwardingMessage(false);
                          setSelectedMessage(null);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mt-2 max-h-32 overflow-y-auto">
                      <div className="grid grid-cols-2 gap-2">
                        {conversations
                          .filter(c => c.id !== selectedChat.id)
                          .map(conv => (
                            <Button
                              key={conv.id}
                              variant="ghost"
                              size="sm"
                              onClick={() => handleForwardToChat(conv.id)}
                              className="justify-start"
                            >
                              <Avatar className="w-6 h-6 mr-2">
                                <AvatarImage src={conv.avatar} />
                                <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="truncate">{conv.name}</span>
                            </Button>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message, index) => {
                      const prevMessage = index > 0 ? filteredMessages[index - 1] : null;
                      const showSender = !prevMessage || prevMessage.sender !== message.sender;
                      const isFirstInGroup = !prevMessage || prevMessage.isMine !== message.isMine;
                      
                      return (
                        <div
                          key={message.id}
                          className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                        >
                          {!message.isMine && showSender && (
                            <Avatar className="w-8 h-8 mr-2 flex-shrink-0 self-end">
                              <AvatarImage src={message.senderAvatar} />
                              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className={`max-w-xs lg:max-w-md ${!message.isMine && !showSender ? 'ml-10' : ''}`}>
                            {/* Reply Preview */}
                            {message.replyTo && (
                              <div className={`rounded-t-lg px-3 py-1 text-xs ${
                                message.isMine ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                              }`}>
                                <div className="flex items-center space-x-1">
                                  <Reply className="w-3 h-3" />
                                  <span className="font-medium">Replying to {message.replyTo.sender}</span>
                                </div>
                                <p className="truncate">{message.replyTo.content}</p>
                              </div>
                            )}
                            
                            {/* Message Content */}
                            <div 
                              className={`px-4 py-2 rounded-lg ${
                                message.isMine
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-900'
                              } ${message.replyTo ? 'rounded-t-none' : ''}`}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                // Show context menu
                              }}
                            >
                              {/* Sender name for group chats */}
                              {selectedChat.isGroup && !message.isMine && showSender && (
                                <p className="text-xs font-medium mb-1">
                                  {message.sender}
                                </p>
                              )}
                              
                              {renderMessageContent(message)}
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
                            
                            {/* Message Actions - Visible on hover */}
                            <div className={`absolute ${message.isMine ? 'right-12' : 'left-12'} opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 bg-white shadow-md rounded-full p-1`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReaction(message.id, '👍')}
                                className="h-6 w-6 p-0"
                              >
                                <span className="text-sm">👍</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReaction(message.id, '❤️')}
                                className="h-6 w-6 p-0"
                              >
                                <span className="text-sm">❤️</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReplyToMessage(message)}
                                className="h-6 w-6 p-0"
                              >
                                <Reply className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleForwardMessage(message)}
                                className="h-6 w-6 p-0"
                              >
                                <Share className="w-3 h-3" />
                              </Button>
                              {message.isMine && !message.isDeleted && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditMessage(message)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteMessage(message.id)}
                                    className="h-6 w-6 p-0 text-red-500"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">No messages yet</p>
                        <p className="text-sm text-gray-400">Start the conversation!</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Reply Preview */}
                {isReplying && replyingTo && (
                  <div className="p-2 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Reply className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Replying to {replyingTo.sender}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setIsReplying(false);
                          setReplyingTo(null);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="ml-6 mt-1 text-sm text-gray-600 line-clamp-1">
                      {replyingTo.content}
                    </div>
                  </div>
                )}

                {/* Edit Message Preview */}
                {isEditingMessage && editingMessage && (
                  <div className="p-2 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Edit className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Edit message</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setIsEditingMessage(false);
                          setEditingMessage(null);
                          setEditText('');
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mt-2">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full"
                      />
                      <div className="flex justify-end mt-2">
                        <Button 
                          size="sm" 
                          onClick={handleSaveEdit}
                          disabled={!editText.trim() || editText === editingMessage.content}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  {isRecording ? (
                    <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-600 font-medium">
                          Recording... {formatRecordingTime(recordingTime)}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleStopRecording}>
                        Stop
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Popover open={isAttachmentMenuOpen} onOpenChange={setIsAttachmentMenuOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Paperclip className="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent side="top" className="w-56 p-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleAttachment('photo')}
                              className="flex flex-col items-center p-2 h-auto"
                            >
                              <Image className="w-5 h-5 text-blue-500 mb-1" />
                              <span className="text-xs">Photo</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleAttachment('file')}
                              className="flex flex-col items-center p-2 h-auto"
                            >
                              <File className="w-5 h-5 text-green-500 mb-1" />
                              <span className="text-xs">File</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleAttachment('location')}
                              className="flex flex-col items-center p-2 h-auto"
                            >
                              <MapPin className="w-5 h-5 text-red-500 mb-1" />
                              <span className="text-xs">Location</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleAttachment('contact')}
                              className="flex flex-col items-center p-2 h-auto"
                            >
                              <User className="w-5 h-5 text-purple-500 mb-1" />
                              <span className="text-xs">Contact</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setIsAttachmentMenuOpen(false);
                                toast.info('Camera feature coming soon');
                              }}
                              className="flex flex-col items-center p-2 h-auto"
                            >
                              <Camera className="w-5 h-5 text-amber-500 mb-1" />
                              <span className="text-xs">Camera</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setIsAttachmentMenuOpen(false);
                                toast.info('Poll feature coming soon');
                              }}
                              className="flex flex-col items-center p-2 h-auto"
                            >
                              <BarChart className="w-5 h-5 text-indigo-500 mb-1" />
                              <span className="text-xs">Poll</span>
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      <div className="flex-1 flex space-x-2">
                        <Input
                          ref={messageInputRef}
                          placeholder={isTypingIndicatorVisible ? "You are typing..." : "Type a message..."}
                          value={isEditingMessage ? editText : messageText}
                          onChange={(e) => isEditingMessage ? setEditText(e.target.value) : setMessageText(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              if (isEditingMessage) {
                                handleSaveEdit();
                              } else {
                                handleSendMessage();
                              }
                            }
                          }}
                          disabled={isRecording}
                          className={isTypingIndicatorVisible ? "border-blue-300" : ""}
                        />
                        <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Smile className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent side="top" className="w-64 p-2">
                            <div className="grid grid-cols-8 gap-1">
                              {['😊', '👍', '❤️', '😂', '🎉', '👏', '🔥', '💯', '🙏', '😍', '🤔', '👌', '😎', '🥳', '😢', '😭', '😡', '🤯', '🤮', '🤢', '😴', '🥱', '🤗', '🤫'].map(emoji => (
                                <Button 
                                  key={emoji}
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    if (isEditingMessage) {
                                      setEditText(prev => prev + emoji);
                                    } else {
                                      setMessageText(prev => prev + emoji);
                                    }
                                    setIsEmojiPickerOpen(false);
                                  }}
                                  className="text-lg p-1 h-8 w-8"
                                >
                                  {emoji}
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      {(isEditingMessage ? editText.trim() : messageText.trim()) ? (
                        <Button 
                          onClick={isEditingMessage ? handleSaveEdit : handleSendMessage}
                          disabled={isEditingMessage ? !editText.trim() : !messageText.trim()}
                        >
                          {isEditingMessage ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
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
                                    ? { ...conv, lastMessage: `You: 👍`, time: 'now', unread: 0 }
                                    : conv
                                ));
                                
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
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreatingGroup(true)}
                    className="mt-4"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Create Group Chat
                  </Button>
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

      {/* Chat Info Dialog */}
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chat Info</DialogTitle>
          </DialogHeader>
          
          {selectedChat && (
            <div className="space-y-4">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-2">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{selectedChat.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedChat.isOnline ? 'Active now' : 'Last active 1h ago'}
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex flex-col items-center space-y-1 h-auto py-2"
                  onClick={() => {
                    setIsInfoDialogOpen(false);
                    handleCall('audio');
                  }}
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-xs">Call</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex flex-col items-center space-y-1 h-auto py-2"
                  onClick={() => {
                    setIsInfoDialogOpen(false);
                    handleCall('video');
                  }}
                >
                  <Video className="w-4 h-4 text-green-600" />
                  <span className="text-xs">Video</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex flex-col items-center space-y-1 h-auto py-2"
                  onClick={() => {
                    setConversations(prev => prev.map(conv => 
                      conv.id === selectedChat.id ? { ...conv, isMuted: !conv.isMuted } : conv
                    ));
                    toast.success(selectedChat.isMuted ? 'Notifications enabled' : 'Notifications muted');
                  }}
                >
                  {selectedChat.isMuted ? (
                    <>
                      <Bell className="w-4 h-4 text-blue-600" />
                      <span className="text-xs">Unmute</span>
                    </>
                  ) : (
                    <>
                      <BellOff className="w-4 h-4 text-red-600" />
                      <span className="text-xs">Mute</span>
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex flex-col items-center space-y-1 h-auto py-2"
                  onClick={() => {
                    setConversations(prev => prev.map(conv => 
                      conv.id === selectedChat.id ? { ...conv, isPinned: !conv.isPinned } : conv
                    ));
                    toast.success(selectedChat.isPinned ? 'Chat unpinned' : 'Chat pinned');
                  }}
                >
                  {selectedChat.isPinned ? (
                    <>
                      <Pin className="w-4 h-4 text-red-600" />
                      <span className="text-xs">Unpin</span>
                    </>
                  ) : (
                    <>
                      <Pin className="w-4 h-4 text-blue-600" />
                      <span className="text-xs">Pin</span>
                    </>
                  )}
                </Button>
              </div>
              
              {selectedChat.isGroup && selectedChat.members && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Members ({selectedChat.members.length})</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedChat.members.map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-gray-500">
                              {member.isOnline ? 'Active now' : 'Offline'}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600"
                  onClick={() => {
                    handleDeleteChat(selectedChat.id, new MouseEvent('click') as any);
                    setIsInfoDialogOpen(false);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Conversation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Group Dialog */}
      <Dialog open={isCreatingGroup} onOpenChange={setIsCreatingGroup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Group Chat</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Group Name</label>
              <Input
                placeholder="Enter group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Add Members</label>
              <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
                {conversations
                  .filter(c => !c.isGroup)
                  .map(conv => (
                    <div key={conv.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                      <input
                        type="checkbox"
                        id={`member-${conv.id}`}
                        checked={selectedMembers.includes(conv.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMembers(prev => [...prev, conv.id]);
                          } else {
                            setSelectedMembers(prev => prev.filter(id => id !== conv.id));
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`member-${conv.id}`} className="flex items-center space-x-2 cursor-pointer flex-1">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={conv.avatar} />
                          <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{conv.name}</p>
                          <p className="text-xs text-gray-500">
                            {conv.isOnline ? 'Active now' : 'Offline'}
                          </p>
                        </div>
                      </label>
                    </div>
                  ))
                }
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {selectedMembers.length} members selected
              </p>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsCreatingGroup(false);
                  setNewGroupName('');
                  setSelectedMembers([]);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateGroup}
                disabled={!newGroupName.trim() || selectedMembers.length === 0}
              >
                Create Group
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Viewer */}
      <Dialog open={isImageViewerOpen} onOpenChange={setIsImageViewerOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <div className="relative h-[80vh] flex items-center justify-center">
            {viewingImage && (
              <img
                src={viewingImage}
                alt="Full size"
                className="max-w-full max-h-full object-contain"
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsImageViewerOpen(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesTab;