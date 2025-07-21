"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: "victim" | "counselor" | "admin";
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrCreateProfile = async () => {
      setLoading(true);
      console.log('1. Checking session...');
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session Error:', sessionError);
        setLoading(false);
        return;
      }

      console.log('2. Session data:', session);
      
      if (session?.user) {
        console.log('3. User found in session:', session.user.id);
        const { data, error } = await supabase
          .from("profiles")
          .select("id, email, full_name, role")
          .eq("id", session.user.id)
          .single();
        
        console.log('4. Profile fetch result:', { data, error });

        if (data) {
          console.log('5. Profile found, setting user.');
          setUser(data);
        } else {
          console.warn('6. No profile found. It might need to be created.');
          setUser(null);
        }
      } else {
        console.log('7. No session found.');
        setUser(null);
      }
      setLoading(false);
      console.log('8. Finished auth check.');
    };

    getOrCreateProfile();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change event:', event);
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        getOrCreateProfile();
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 