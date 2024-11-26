import React, { useState, useEffect } from "react";
import "./Settings.css"; // Import the CSS file

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notification, setNotification] = useState(true);

  // Apply the theme change globally
  useEffect(() => {
    document.body.className = theme; // Apply theme class to the body
  }, [theme]);

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log("Theme changed to:", theme === "light" ? "dark" : "light");
  };

  const handleNotificationChange = () => {
    setNotification(!notification);
    console.log("Notification setting:", notification ? "Disabled" : "Enabled");
  };

  return (
    <div className="settings-container">
      <h2 className="settings-heading">Settings</h2>

      {/* Theme setting section */}
      <div className={`settings-section ${theme}`}>
        <h3>Theme</h3>
        <p>
          Toggle between Light and Dark mode to change the appearance of the
          system.
        </p>
        <button
          onClick={handleThemeChange}
          className={`settings-button ${theme}`}
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>

      {/* Notifications setting section */}
      <div className={`settings-section ${theme}`}>
        <h3>Notifications</h3>
        <label className="settings-label">
          <input
            type="checkbox"
            checked={notification}
            onChange={handleNotificationChange}
          />
          Enable notifications
        </label>
      </div>

      {/* User preferences section */}
      <div className={`settings-section ${theme}`}>
        <h3>User Preferences</h3>
        <p>
          Manage your personal settings for notifications, theme, and other
          preferences.
        </p>
      </div>

      <p className="settings-note">
        Changes will be applied instantly. Enjoy your personalized experience!
      </p>
    </div>
  );
};

export default Settings;
