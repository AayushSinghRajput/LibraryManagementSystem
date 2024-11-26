// src/api/authApi.js

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Handle specific errors based on status codes
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data; // Return user data (e.g., JWT token, user info)
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message || "An error occurred during login");
  }
};

// Function to log out a user
export const logoutUser = async () => {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    // Optionally, handle the response if there is any logout success data
    const data = await response.json();
    return data; // e.g., success message or token invalidation
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("An error occurred during logout");
  }
};
