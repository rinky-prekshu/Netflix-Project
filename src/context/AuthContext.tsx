import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  signup: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_TOKEN_KEY = "netflix_auth_token";
const AUTH_USER_KEY = "netflix_auth_user";
const USERS_KEY = "netflix_users";

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
      }
    }
  }, []);

  const getUsers = (): StoredUser[] => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const signup = useCallback((name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email already registered" };
    }
    users.push({ name, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, message: "Account created successfully" };
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { success: false, message: "Invalid email or password" };
    }
    const fakeToken = btoa(`${email}:${Date.now()}`);
    const userData = { name: found.name, email: found.email };
    localStorage.setItem(AUTH_TOKEN_KEY, fakeToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
    setUser(userData);
    return { success: true, message: "Login successful" };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
