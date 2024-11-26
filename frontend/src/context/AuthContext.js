import React, { createContext, useState, useEffect, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// Provider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores authenticated user data
  const [isLoading, setIsLoading] = useState(true); // Loading state for checking auth status

  // Simulate fetching user authentication status on initial render
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Check if a user is stored in localStorage (or use a token-based API call here)
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error(
              "Error parsing authUser data from localStorage:",
              error
            );
          }
        }
      } catch (error) {
        console.error("Error fetching auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    // Cleanup if the component is unmounted
    return () => setIsLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
