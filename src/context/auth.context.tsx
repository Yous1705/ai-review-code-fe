"use client";

import { User } from "@/type/auth.type";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user?: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProvideProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProvideProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = (token: string, user?: User) => {
    localStorage.setItem("access_token", token);
    setToken(token);

    if (user) {
      setUser(user);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
