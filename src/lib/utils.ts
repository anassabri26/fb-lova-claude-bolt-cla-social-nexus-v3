import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { APP_CONFIG } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Performance utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = APP_CONFIG.DEBOUNCE_DELAY
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Format utilities
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  return `${Math.floor(diffInSeconds / 604800)}w`;
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Device detection
export const isMobile = (): boolean => {
  return window.innerWidth < APP_CONFIG.MOBILE_BREAKPOINT;
};

export const isTablet = (): boolean => {
  return window.innerWidth >= APP_CONFIG.MOBILE_BREAKPOINT && 
         window.innerWidth < APP_CONFIG.DESKTOP_BREAKPOINT;
};

export const isDesktop = (): boolean => {
  return window.innerWidth >= APP_CONFIG.DESKTOP_BREAKPOINT;
};

// Storage utilities
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Silent error handling
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Silent error handling
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      // Silent error handling
    }
  }
};

// Error handling
export const handleError = (error: unknown, context?: string): void => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  if (APP_CONFIG.FEATURES.ANALYTICS) {
    // Analytics tracking would go here in production
  }
};

// Performance monitoring
export const performanceMonitor = {
  mark: (name: string): void => {
    if (typeof performance !== 'undefined' && performance && performance.mark) {
      performance.mark(name);
    }
  },
  
  measure: (name: string, startMark: string, endMark?: string): number => {
    if (typeof performance !== 'undefined' && performance && performance.measure && performance.getEntriesByName) {
      performance.measure(name, startMark, endMark);
      const entries = performance.getEntriesByName(name);
      return entries.length > 0 ? entries[0].duration : 0;
    }
    return 0;
  },
  
  clearMarks: (): void => {
    if (typeof performance !== 'undefined' && performance && performance.clearMarks) {
      performance.clearMarks();
    }
  }
};

// Image optimization
export const optimizeImageUrl = (url: string, width?: number, height?: number): string => {
  if (!url || typeof url !== 'string' || !url.includes('unsplash.com')) return url;
  
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('fit', 'crop');
  params.set('auto', 'format');
  
  return `${url}?${params.toString()}`;
};