import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "..server"; // Import your Supabase client configuration

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Parse user if exists, otherwise null
  });

  const login = async (mail, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      mail,
      password,
    });

    if (error) {
      return { success: false, error: error.message }; // Return error if sign-in fails
    }

    setUser(user); // Set user state
    localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage for persistence
    return { success: true, user }; // Return success and user data
  };

  const signup = async (mail, password) => {
    const { user, error } = await supabase.auth.signUp({
      mail,
      password,
    });

    if (error) {
      return { success: false, error: error.message }; // Return error if sign-up fails
    }

    setUser(user); // Set user state
    localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage for persistence
    return { success: true, user }; // Return success and user data
  };

  const logout = async () => {
    await supabase.auth.signOut(); // Sign out the user from Supabase
    setUser(null); // Clear user state
    localStorage.removeItem("user"); // Remove user from localStorage on logout
  };

  // Effect to keep the user state in sync with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Sync user with local storage on change
    } else {
      localStorage.removeItem("user"); // Remove user from local storage if null
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
