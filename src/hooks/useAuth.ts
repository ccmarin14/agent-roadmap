import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, isSupabaseReady } from "../lib/supabaseClient";
import { ALLOW_GUESTS } from "../config";

const STORAGE_KEY = "agent-kit-auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (stored === "guest") {
        setIsGuest(true);
        setLoading(false);
        return;
      }

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.id) {
            setUser(parsed);
          }
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      if (isSupabaseReady && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(session.user));
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (!isSupabaseReady || !supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(session.user));
        } else if (!isGuest) {
          setUser(null);
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored && stored !== "guest") {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [isGuest]);

  const login = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error("Supabase no está configurado");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      setUser(data.user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
    }
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const continueAsGuest = () => {
    if (!ALLOW_GUESTS) {
      throw new Error("El modo invitado no está habilitado");
    }
    setIsGuest(true);
    localStorage.setItem(STORAGE_KEY, "guest");
  };

  return {
    user,
    loading,
    isGuest,
    login,
    logout,
    continueAsGuest,
  };
}
