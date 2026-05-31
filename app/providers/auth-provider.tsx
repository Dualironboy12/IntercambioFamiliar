"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { devSkipAuth } from "@/lib/dev-flags";
import { Session } from "@supabase/supabase-js";

export type AuthUser = {
  name: string;
};

type AuthContextValue = {
  session: Session | null;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => void;
  signup: (name: string, email: string, password?: string) => void;
  logout: () => void;
  currentUser: AuthUser | null;
};

const defaultAuthContext: AuthContextValue = {
  session: null,
  isLoggedIn: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
  currentUser: null,
};

const AuthContext = createContext<AuthContextValue>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (devSkipAuth) return;

    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    if (devSkipAuth) {
      return {
        session: null,
        isLoggedIn: false,
        login: () => {},
        signup: () => {},
        logout: () => {},
        currentUser: { name: "Usuario Demo" },
      };
    }

    const currentUser = session
      ? {
          name:
            (session.user.user_metadata?.nombre as string | undefined) ??
            session.user.email ??
            "User",
        }
      : null;

    return {
      session,
      isLoggedIn: !!session,
      login: () => {},
      signup: () => {},
      logout: () => {
        void supabase.auth.signOut();
      },
      currentUser,
    };
  }, [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
