"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "@/app/api/services/userService";
import { authService } from "@/app/api/services/authService";
import { useToast } from "./ToastContext";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const { showToast } = useToast();
  const router = useRouter();

  const syncAttemptedRef = useRef(false);

  useEffect(() => {
    // Sync with NextAuth session
    const syncWithGoogle = async () => {
      // @ts-ignore
      if (session?.id_token && !user) {
        // Prevent infinite loop if we already tried syncing this session
        if (syncAttemptedRef.current) return;
        syncAttemptedRef.current = true;

        try {
          // @ts-ignore
          console.log("Syncing Google Login with Backend...");
          // @ts-ignore
          const userData = await authService.googleLogin(session.id_token);
          console.log("Google Login Synced:", userData);
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          showToast("Logged in successfully", "success");
        } catch (error) {
          console.error("Failed to sync Google login. Response:", error);
          showToast("Google Login Failed", "error");
          // Important: If backend fails, we sign out of NextAuth too so they can try again properly
          // otherwise they are stuck in a "Authenticated in Frontend, Unauthenticated in Backend" state
          signOut({ redirect: false });
        }
      }
    };
    // Disabled per user request
    // syncWithGoogle();
  }, [session, user, showToast]);

  useEffect(() => {
    // Check local storage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const userData = await authService.login(email, password);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const register = async (userData: any) => {
    const newUser = await authService.register(userData);
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = async () => {
    await signOut({ redirect: false });
    authService.logout();
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
