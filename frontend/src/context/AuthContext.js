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
        console.log("Fetched user from localStorage:", storedUser);
        console.log("Fetched token from localStorage:", storedToken);
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
    try {
      setUser(userData);
      setToken(authToken);
      localStorage.setItem("authUser", JSON.stringify(userData)); // Store user persistently
      localStorage.setItem("authToken", authToken); //Save token persistenly
      console.log(
        "Login stored user:",
        JSON.parse(localStorage.getItem("authUser"))
      );
      console.log("Login stored token:", localStorage.getItem("authToken"));
    } catch (error) {
      console.error("Error storing data in localStorage:", error);
    }
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
