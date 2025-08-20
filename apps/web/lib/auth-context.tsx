'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { User } from 'next-auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getSession();
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Sign up failed');
      }

      // Auto sign in after successful sign up
      await handleSignIn(email, password);
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  const value: AuthContextType = {
    user: session?.user || null,
    isLoading: status === 'loading' || isLoading,
    isAuthenticated: !!session?.user,
    signIn: handleSignIn,
    signOut: handleSignOut,
    signUp: handleSignUp,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
