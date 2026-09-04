"use client";

import { authService } from "@/services/auth.service";
import { User } from "@/type/auth.type";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextType {
  user: User | null;
  login: (user?: User) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProvideProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProvideProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await authService.me();

        setUser(response.data.data);
      } catch (e: any) {
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = (user?: User) => {
    if (user) {
      setUser(user);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e: any) {
      console.error("Logout failed:", e);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
