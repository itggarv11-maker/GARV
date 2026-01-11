

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from 'https://esm.sh/firebase/auth';
import { auth as firebaseAuth, isFirebaseConfigured } from '../services/firebase';
import { FirebaseUser } from '../types';

const INITIAL_TOKENS = 100;

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
  tokens: number | null;
  signup: (email: string, pass: string) => Promise<any>;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<void>;
  isFirebaseConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const unconfiguredError = () => Promise.reject(new Error("Firebase is not configured. Please add your project credentials in 'services/firebase.ts'."));

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<number | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      setLoading(false);
      return;
    }
    
    const authTimeout = setTimeout(() => {
        console.warn("Firebase auth state check timed out after 15 seconds. Assuming no user is logged in.");
        setLoading(false);
    }, 15000);

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      clearTimeout(authTimeout);
      setCurrentUser(user);

      // New, improved logic to handle tokens and new device login.
      if (user) {
        const tokenKey = `userTokens_${user.uid}`;
        const storedTokens = localStorage.getItem(tokenKey);

        if (storedTokens === null) {
          // If a user is logged in but has no tokens on this device,
          // it's likely a new session/device. Grant them the initial tokens
          // to ensure a good experience, instead of locking them out.
          localStorage.setItem(tokenKey, String(INITIAL_TOKENS));
          setTokens(INITIAL_TOKENS);
        } else {
          // User has tokens on this device, load them.
          setTokens(parseInt(storedTokens, 10));
        }
      } else {
        // No user is logged in, so no tokens.
        setTokens(null);
      }
      
      setLoading(false);
    });

    // Listen for token changes from the geminiService
    const handleTokenChange = (event: CustomEvent) => {
        if (typeof event.detail.newTokens === 'number') {
            setTokens(event.detail.newTokens);
        }
    };
    window.addEventListener('tokenChange', handleTokenChange as EventListener);


    return () => {
        unsubscribe();
        clearTimeout(authTimeout);
        window.removeEventListener('tokenChange', handleTokenChange as EventListener);
    };
  }, []);

  const signup = async (email: string, pass: string): Promise<UserCredential> => {
    if (!isFirebaseConfigured || !firebaseAuth) return unconfiguredError();
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, pass);
    // On successful signup, grant initial tokens
    const tokenKey = `userTokens_${userCredential.user.uid}`;
    localStorage.setItem(tokenKey, String(INITIAL_TOKENS));
    setTokens(INITIAL_TOKENS); // Update state immediately
    return userCredential;
  };

  const login = (email: string, pass: string) => {
    if (!isFirebaseConfigured || !firebaseAuth) return unconfiguredError();
    // After login, onAuthStateChanged will fire and handle token logic.
    return signInWithEmailAndPassword(firebaseAuth, email, pass);
  };
  
  const logout = () => {
    if (!isFirebaseConfigured || !firebaseAuth) return unconfiguredError() as Promise<void>;
    return signOut(firebaseAuth);
  };

  const value = {
    currentUser,
    loading,
    tokens,
    signup,
    login,
    logout,
    isFirebaseConfigured,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};