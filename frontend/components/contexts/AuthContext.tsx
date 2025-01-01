"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "./UserContext";
import { userController } from "../controllers/UserController";

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export interface AuthContextType {
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(null);
  const { registerUser, loginUser } = userController();
  const { setUser } = useUserContext();
  const router = useRouter();

  React.useEffect(() => {
    // Load token and user from localStorage on mount
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser)); // Update user in UserContext
    }
  }, []);

  const register = async (username: string, password: string) => {
    try {
      const response = await registerUser(username, password);
      if (response) {
        await login(username, password); // Log in after registration
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed. Please try again.");
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const { token, user } = await loginUser(username, password);
      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));
        setToken(token);
        setUser(user);
        router.push("/portfolio");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

