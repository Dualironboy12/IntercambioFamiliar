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
  userId: string | null;
  isLoggedIn: boolean;
  /** True until the initial getSession() call resolves — use to avoid flash of unauthenticated UI. */
  isAuthLoading: boolean;
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
  userId: null,
  isLoggedIn: false,
  isAuthLoading: true,
  login: async () => ({ error: null }),
  signup: async () => ({ error: null }),
  logout: () => {},
  deleteAccount: async () => ({ error: null }),
  currentUser: null,
};

const AuthContext = createContext<AuthContextValue>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthLoginResult> => {

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
    void supabase.auth.signOut();
  }, []);

  const deleteAccount = useCallback(async (): Promise<AuthDeleteAccountResult> => {

    const { error } = await supabase.rpc("delete_own_account");

    if (error) {
      return { error: error.message };
    }

    await supabase.auth.signOut();
    setSession(null);

    return { error: null };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
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
      userId: session?.user?.id ?? null,
      isLoggedIn: !!session,
      isAuthLoading,
      login,
      signup,
      logout,
      deleteAccount,
      currentUser,
    };
  }, [session, isAuthLoading, login, signup, logout, deleteAccount]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
