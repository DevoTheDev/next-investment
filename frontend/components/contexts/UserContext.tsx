"use client";
import formatHeader from "@/lib/utils";
import React, { ReactNode } from "react";
import { userController } from "../controllers/UserController";

export interface User {
  username: string
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  userForm: <K extends keyof User>(inputClasses: Pick<HTMLDivElement, "className">, containerClasses: Pick<HTMLDivElement, "className">, specifics?: K[] | Partial<Record<K, Pick<HTMLDivElement, "className">>>) => React.ReactNode
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const { getUserToken, updateUserData, deleteUserData } = userController();

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      // Retrieve the token (assuming this function is available)
      const token = getUserToken();
  
      if (!token) {
        throw new Error("No valid user token was detected.");
      }
  
      try {
        // Call the updateUserData function from userController (passing the token and updates)
        const response = await updateUserData(token, updates);

        console.log("Update User DB response : ", response);
        
      } catch (error) {
        console.error("Failed to update user data", error);
      }
    }
  };
  
  const userForm = <K extends keyof User>(
    containerClasses: Pick<HTMLDivElement, "className">,
    inputClasses: Pick<HTMLDivElement, "className">,
    specifics?: K[] | Partial<Record<K, Pick<HTMLDivElement, "className">>>
  ): React.ReactNode => {
    const isSpecificKeys = Array.isArray(specifics);
  
    // Cast user as non-nullable safely using optional chaining and default object
    const safeUser: Partial<User> = user || {};
  
    // Gather keys to render based on specifics
    const keys = isSpecificKeys
      ? (specifics as K[]) // Narrow type
      : (Object.keys(safeUser) as K[]);
  
    // Extract specific styles if provided
    const specificClasses = !isSpecificKeys
      ? (specifics as Partial<Record<K, Pick<HTMLDivElement, "className">>> || {})
      : {};
  
    const handleInputChange = (key: K, value: any) => {
      if (user) {
        setUser({ ...user, [key]: value });
      }
    };
  
    return (
      <div className={containerClasses.className}>
        {keys.map((key) => (
          <div key={key as string} className="mb-4">
            <label className="block mb-2">
              {formatHeader(key)}
            </label>
            <input
              type="text"
              value={safeUser[key] as string || ""}
              className={`${inputClasses.className} ${specificClasses[key]?.className || ""}`}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <UserContext.Provider value={{ user, setUser, updateUser, userForm }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
