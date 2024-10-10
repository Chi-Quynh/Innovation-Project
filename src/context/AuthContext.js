import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Parse user if exists, otherwise null
  });

  const login = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedUser = storedUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (storedUser) {
      setUser(storedUser); // Set user state
      localStorage.setItem("user", JSON.stringify(storedUser)); // Store user in localStorage for persistence
      return true;
    }
    return false;
  };

  const signup = (username, password) => {
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const normalizedUsername = username.toLowerCase(); // Normalize username to lowercase

    // Check if the username already exists (case insensitive)
    const userExists = storedUsers.some(
      (user) => user.username.toLowerCase() === normalizedUsername
    );

    if (userExists) {
      return false; // User already exists
    } else {
      const newUser = { username, password };
      storedUsers.push(newUser); // Add new user to the array
      localStorage.setItem("users", JSON.stringify(storedUsers)); // Store updated user list
      return true; // Successful signup
    }
  };

  const logout = () => {
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
