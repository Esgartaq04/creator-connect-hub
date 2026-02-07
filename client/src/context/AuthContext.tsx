import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, getAuthToken } from "@/lib/firebase";
import { fetchUserProfile } from "@/services/userService";

interface AuthUser {
  id: string;
  email: string | null;
  creatorId: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      try {
        const token = await firebaseUser.getIdToken();
        const profile = await fetchUserProfile(token);
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          creatorId: profile.creatorId ?? null,
        });
      } catch (error) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          creatorId: null,
        });
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const token = await credentials.user.getIdToken();
    const profile = await fetchUserProfile(token);
    setUser({
      id: credentials.user.uid,
      email: credentials.user.email,
      creatorId: profile.creatorId ?? null,
    });
  };

  const register = async (email: string, password: string) => {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await credentials.user.getIdToken();
    const profile = await fetchUserProfile(token);
    setUser({
      id: credentials.user.uid,
      email: credentials.user.email,
      creatorId: profile.creatorId ?? null,
    });
  };

  const logout = () => {
    signOut(auth).catch(() => {});
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { getAuthToken };
