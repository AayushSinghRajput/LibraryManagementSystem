const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Helper to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }
  return data;
};
// Login function
export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);

    // Store token if needed
    if (data.token) {
      localStorage.setItem("authToken", data.token); // Store token securely
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message || "An error occurred during login");
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), //add token only if it exists
      },
    });

    const data = await handleResponse(response);

    // Clear token on logout
    localStorage.removeItem("authToken");

    return data;
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("An error occurred during logout");
  }
};
