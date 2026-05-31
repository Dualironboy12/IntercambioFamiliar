"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { devSkipAuth } from "@/lib/dev-flags";
import { Session } from "@supabase/supabase-js";

export type AuthUser = {
  name: string;
};

export type AuthSignupResult = {
  error: string | null;
};

export type AuthLoginResult = {
  error: string | null;
};

export type AuthDeleteAccountResult = {
  error: string | null;
};

type AuthContextValue = {
  session: Session | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<AuthLoginResult>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthSignupResult>;
  logout: () => void;
  deleteAccount: () => Promise<AuthDeleteAccountResult>;
  currentUser: AuthUser | null;
};

const defaultAuthContext: AuthContextValue = {
  session: null,
  isLoggedIn: false,
  login: async () => ({ error: null }),
  signup: async () => ({ error: null }),
  logout: () => {},
  deleteAccount: async () => ({ error: null }),
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

  const login = useCallback(
    async (email: string, password: string): Promise<AuthLoginResult> => {
      if (devSkipAuth) {
        return { error: null };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.session) {
        setSession(data.session);
      }

      return { error: null };
    },
    []
  );

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<AuthSignupResult> => {
      if (devSkipAuth) {
        return { error: null };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nombre: name.trim() },
        },
      });

      if (error) {
        return { error: error.message };
      }

      if (data.session) {
        setSession(data.session);
      }

      return { error: null };
    },
    []
  );

  const logout = useCallback(() => {
    if (devSkipAuth) return;
    void supabase.auth.signOut();
  }, []);

  const deleteAccount = useCallback(async (): Promise<AuthDeleteAccountResult> => {
    if (devSkipAuth) {
      return { error: null };
    }

    const { error } = await supabase.rpc("delete_own_account");

    if (error) {
      return { error: error.message };
    }

    await supabase.auth.signOut();
    setSession(null);

    return { error: null };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    if (devSkipAuth) {
      return {
        session: null,
        isLoggedIn: false,
        login,
        signup,
        logout,
        deleteAccount,
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
      login,
      signup,
      logout,
      deleteAccount,
      currentUser,
    };
  }, [session, login, signup, logout, deleteAccount]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
