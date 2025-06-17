// Application constants and configuration
export const APP_CONFIG = {
  name: 'Facebook Clone',
  version: '2.0.0',
  description: 'High-performance social media platform',
  author: 'Social Media Team',
  
  // Performance settings
  POSTS_PER_PAGE: 10,
  INFINITE_SCROLL_THRESHOLD: 100,
  DEBOUNCE_DELAY: 300,
  CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  
  // UI settings
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1280,
  
  // Feature flags
  FEATURES: {
    VIRTUAL_SCROLLING: true,
    INFINITE_SCROLL: true,
    REAL_TIME_UPDATES: true,
    OFFLINE_SUPPORT: false,
    ANALYTICS: true,
    STORIES: true,
    LIVE_CHAT: true,
    ACTIVITY_FEED: true,
    TRENDING_TOPICS: true,
  }
} as const;

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  PROFILE: '/profile',
  FRIENDS: '/friends',
  MESSAGES: '/messages',
  NOTIFICATIONS: '/notifications',
  WATCH: '/watch',
  MARKETPLACE: '/marketplace',
  GROUPS: '/groups',
  EVENTS: '/events',
  SAVED: '/saved',
  MEMORIES: '/memories',
  SETTINGS: '/settings',
} as const;

export const API_ENDPOINTS = {
  POSTS: '/api/posts',
  USERS: '/api/users',
  FRIENDS: '/api/friends',
  COMMENTS: '/api/comments',
  LIKES: '/api/likes',
} as const;

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  CACHE: 'app_cache',
} as const;

export const MOCK_IMAGES = {
  AVATARS: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  ],
  POSTS: [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
  ]
} as const;