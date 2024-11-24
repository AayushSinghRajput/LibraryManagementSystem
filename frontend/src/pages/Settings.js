// src/pages/Settings.js
import React, { useState, useEffect } from "react";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notification, setNotification] = useState(true);

  // Apply the theme change globally
  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#333";
      document.body.style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    }
  }, [theme]); // When theme state changes, this hook runs

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log("Theme changed to:", theme === "light" ? "dark" : "light");
  };

  const handleNotificationChange = () => {
    setNotification(!notification);
    console.log("Notification setting:", notification ? "Disabled" : "Enabled");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Settings</h2>

      {/* Theme setting section */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: theme === "light" ? "#f4f4f4" : "#444",
          color: theme === "light" ? "#000" : "#fff",
        }}
      >
        <h3>Theme</h3>
        <p>
          Toggle between Light and Dark mode to change the appearance of the
          system.
        </p>
        <button
          onClick={handleThemeChange}
          style={{
            padding: "10px 20px",
            backgroundColor: theme === "light" ? "#007BFF" : "#555",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>

      {/* Notifications setting section */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: theme === "light" ? "#f4f4f4" : "#444",
          color: theme === "light" ? "#000" : "#fff",
        }}
      >
        <h3>Notifications</h3>
        <label style={{ fontSize: "18px" }}>
          <input
            type="checkbox"
            checked={notification}
            onChange={handleNotificationChange}
            style={{ marginRight: "10px" }}
          />
          Enable notifications
        </label>
      </div>

      {/* More interactivity: Add user info or other settings */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: theme === "light" ? "#f4f4f4" : "#444",
          color: theme === "light" ? "#000" : "#fff",
        }}
      >
        <h3>User Preferences</h3>
        <p>
          Here you can manage your personal settings for notifications, theme,
          and other preferences.
        </p>
      </div>

      <p>
        Changes will be applied instantly. Enjoy your personalized experience!
      </p>
    </div>
  );
};

export default Settings;
