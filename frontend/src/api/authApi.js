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
    console.log("Attempting login...");
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    // Store token if needed
    if (data.token) {
      console.log("Storing authToken and authUser...");
      localStorage.setItem("authToken", data.token); // Store token securely
      localStorage.setItem("authUser", JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message || "An error occurred during login");
  }
};

//signup function
export const SignUser = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${apiUrl}/Sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await handleResponse(response);
    // Store token if needed
    if (data.token) {
      localStorage.setItem("authToken", data.token); // Store token securely
      localStorage.setItem("authUser", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error(error.message || "An error occurred during Signup");
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${apiUrl}/logout`, {
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
