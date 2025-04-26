
import { createContext, useContext, useState, ReactNode } from "react";

// User interface with trust score
interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  trustScore: number;
  joinedDate: string;
}

// Mock user data
const MOCK_USER: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  photoUrl: "https://i.pravatar.cc/150?img=11",
  trustScore: 4.8,
  joinedDate: "January 2023",
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // For demo purposes, we'll start with a logged-in user
  const [user, setUser] = useState<User | null>(MOCK_USER);

  const login = async (email: string, password: string) => {
    // This would normally validate with a backend
    console.log("Logging in with:", email, password);
    setUser(MOCK_USER);
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (email: string, password: string, name: string) => {
    // This would normally create a new user in the backend
    console.log("Signing up with:", email, password, name);
    setUser({
      ...MOCK_USER,
      email,
      name,
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
