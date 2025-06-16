import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// Mock user type to replace Supabase User
interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

// Mock session type to replace Supabase Session
interface MockSession {
  user: MockUser;
  access_token: string;
}

interface AuthContextType {
  user: MockUser | null;
  session: MockSession | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<MockSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedSession = localStorage.getItem('mock_session');
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession);
        setSession(parsedSession);
        setUser(parsedSession.user);
      } catch (error) {
        console.error('Error parsing saved session:', error);
        localStorage.removeItem('mock_session');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user
      const mockUser: MockUser = {
        id: `user_${Date.now()}`,
        email,
        user_metadata: {
          full_name: fullName,
          avatar_url: `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face`
        }
      };

      const mockSession: MockSession = {
        user: mockUser,
        access_token: `mock_token_${Date.now()}`
      };

      // Save to localStorage
      localStorage.setItem('mock_session', JSON.stringify(mockSession));
      
      setUser(mockUser);
      setSession(mockSession);
      
      toast.success('Account created successfully! (Mock mode)');
      return { error: null };
    } catch (error) {
      console.error('Mock sign-up error:', error);
      toast.error('Sign-up failed. Please try again.');
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user (in real app, this would validate credentials)
      const mockUser: MockUser = {
        id: `user_${Date.now()}`,
        email,
        user_metadata: {
          full_name: email.split('@')[0], // Use email prefix as name
          avatar_url: `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face`
        }
      };

      const mockSession: MockSession = {
        user: mockUser,
        access_token: `mock_token_${Date.now()}`
      };

      // Save to localStorage
      localStorage.setItem('mock_session', JSON.stringify(mockSession));
      
      setUser(mockUser);
      setSession(mockSession);
      
      toast.success('Welcome back! (Mock mode)');
      return { error: null };
    } catch (error) {
      console.error('Mock sign-in error:', error);
      toast.error('Sign-in failed. Please try again.');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Remove from localStorage
      localStorage.removeItem('mock_session');
      
      setUser(null);
      setSession(null);
      
      toast.success('Signed out successfully (Mock mode)');
    } catch (error) {
      console.error('Mock sign-out error:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};