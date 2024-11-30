import React, { createContext, useState, useEffect, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); //Track token
  const [user, setUser] = useState(null); // Stores user data
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("authUser");
        const storedToken = localStorage.getItem("authToken");
        console.log(storedUser, storedToken);
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser)); // Parse and set user
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error fetching user from localStorage:", error);
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("authUser", JSON.stringify(userData)); // Store user persistently
    localStorage.setItem("authToken", authToken); //Save token persistenly
    console.log("Stored user:", localStorage.getItem("authUser"));
    console.log("Stored token:", localStorage.getItem("authToken"));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authUser"); // Clear user data
    localStorage.removeItem("authToken"); //Clear token
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
