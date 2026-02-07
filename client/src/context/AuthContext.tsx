import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthUser } from "@/services/authService";
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
} from "@/services/authService";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const tokenKey = "creatorhub_token";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(tokenKey);
};

const setToken = (token: string | null) => {
  if (typeof window === "undefined") return;
  if (!token) {
    window.localStorage.removeItem(tokenKey);
    return;
  }
  window.localStorage.setItem(tokenKey, token);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    fetchCurrentUser(token)
      .then((data) => setUser(data))
      .catch(() => {
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    setToken(response.token);
    setUser(response.user);
  };

  const register = async (email: string, password: string) => {
    const response = await registerUser(email, password);
    setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    const token = getToken();
    if (token) {
      logoutUser(token).catch(() => {});
    }
    setToken(null);
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

export const getAuthToken = getToken;
