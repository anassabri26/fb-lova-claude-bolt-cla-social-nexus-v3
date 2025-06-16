import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        console.error('Supabase sign-up error:', error);
        toast.error(error.message);
      } else {
        toast.success('Check your email to confirm your account!');
      }

      return { error };
    } catch (networkError: any) {
      console.error('Network error during sign-up:', networkError);
      
      // Provide more specific error messages based on the type of network error
      if (networkError.message === 'Failed to fetch') {
        toast.error('Unable to connect to authentication service. Please check your internet connection and try again.');
      } else if (networkError.name === 'TypeError' && networkError.message.includes('fetch')) {
        toast.error('Network connection failed. Please ensure you have internet access.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
      
      return { error: networkError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Supabase sign-in error:', error);
        toast.error(error.message);
      } else {
        toast.success('Welcome back!');
      }

      return { error };
    } catch (networkError: any) {
      console.error('Network error during sign-in:', networkError);
      
      if (networkError.message === 'Failed to fetch') {
        toast.error('Unable to connect to authentication service. Please check your internet connection and try again.');
      } else if (networkError.name === 'TypeError' && networkError.message.includes('fetch')) {
        toast.error('Network connection failed. Please ensure you have internet access.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
      
      return { error: networkError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase sign-out error:', error);
        toast.error(error.message);
      } else {
        toast.success('Signed out successfully');
      }
    } catch (networkError: any) {
      console.error('Network error during sign-out:', networkError);
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