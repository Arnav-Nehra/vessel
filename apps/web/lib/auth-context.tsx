'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import type { Session } from 'next-auth';

interface AuthContextType {
  user: Session['user'] | null;
  isLoading: boolean;
  isAuthenticated: boolean;
   signOut: () => Promise<void>;

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



  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  // The error was likely occurring because `session?.user` can be undefined or not match the expected `User` type,
  // especially if the session is not yet loaded or if the user object is missing required properties.
  // By checking for the presence of a key property (like 'id') before casting to User,
  // we ensure type safety and prevent runtime errors when accessing user properties.

  const value: AuthContextType = {
    user: session?.user ?? null,
    isLoading: status === 'loading' || isLoading,
    isAuthenticated: Boolean(session?.user),
    signOut: handleSignOut,
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
