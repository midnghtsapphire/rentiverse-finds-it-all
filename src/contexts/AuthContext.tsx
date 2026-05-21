import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAdminAccess: (email?: string | null) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const isMissingRowError = (errorMessage?: string) =>
  errorMessage?.toLowerCase().includes("0 rows") ?? false;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminAccess = async (email?: string | null) => {
    if (!email) {
      setIsAdmin(false);
      return false;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const { data, error } = await supabase
      .from("admin_users")
      .select("id, is_active")
      .eq("email", normalizedEmail)
      .eq("is_active", true)
      .maybeSingle();

    if (error && !isMissingRowError(error.message)) {
      setIsAdmin(false);
      return false;
    }

    const hasAccess = Boolean(data?.id);
    setIsAdmin(hasAccess);
    return hasAccess;
  };

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      await checkAdminAccess(initialSession?.user?.email);
      setLoading(false);
    };

    void bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      void checkAdminAccess(nextSession?.user?.email).finally(() => {
        setLoading(false);
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      isAdmin,
      signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error || !data.user) {
          throw new Error(error?.message ?? "Unable to sign in.");
        }

        return data.user;
      },
      signUp: async (email, password) => {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) {
          throw new Error(error.message);
        }
      },
      signOut: async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw new Error(error.message);
        }
        setIsAdmin(false);
      },
      checkAdminAccess,
    }),
    [user, session, loading, isAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
