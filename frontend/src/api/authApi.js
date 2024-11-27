// src/api/authApi.js

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message || "An error occurred during login");
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("An error occurred during logout");
  }
};
