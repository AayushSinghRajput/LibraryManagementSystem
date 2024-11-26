import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notification, setNotification] = useState(true);
  const [fontSize, setFontSize] = useState("medium");
  const [language, setLanguage] = useState("en");
  const [profilePic, setProfilePic] = useState(null);
  const [highContrast, setHighContrast] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleThemeChange = () =>
    setTheme(theme === "light" ? "dark" : "light");
  const handleNotificationChange = () => setNotification(!notification);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };
  const handleHighContrastChange = () => setHighContrast(!highContrast);
  const handleTwoFactorAuthChange = () => setTwoFactorAuth(!twoFactorAuth);

  const resetSettings = () => {
    setTheme("light");
    setNotification(true);
    setFontSize("medium");
    setLanguage("en");
    setProfilePic(null);
    setHighContrast(false);
    setTwoFactorAuth(false);
  };

  return (
    <div
      className={`settings-container ${highContrast ? "high-contrast" : ""}`}
    >
      <h2 className="settings-heading">Settings</h2>

      {/* Theme setting section */}
      <div className={`settings-section ${theme}`}>
        <h3>Theme</h3>
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

      {/* Font Size setting section */}
      <div className={`settings-section ${theme}`}>
        <h3>Font Size</h3>
        <select
          value={fontSize}
          onChange={handleFontSizeChange}
          className="settings-select"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Language setting section */}
      <div className={`settings-section ${theme}`}>
        <h3>Language</h3>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="settings-select"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      {/* Profile section */}
      <div className={`settings-section ${theme}`}>
        <h3>User Profile</h3>
        <label>
          Upload Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </label>
        {profilePic && (
          <img src={profilePic} alt="Profile" className="profile-pic" />
        )}
      </div>

      {/* High Contrast Mode */}
      <div className={`settings-section ${theme}`}>
        <h3>Accessibility</h3>
        <label className="settings-label">
          <input
            type="checkbox"
            checked={highContrast}
            onChange={handleHighContrastChange}
          />
          Enable High Contrast Mode
        </label>
      </div>

      {/* Two-Factor Authentication */}
      <div className={`settings-section ${theme}`}>
        <h3>Security</h3>
        <label className="settings-label">
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={handleTwoFactorAuthChange}
          />
          Enable Two-Factor Authentication
        </label>
      </div>

      {/* Reset Settings */}
      <div className={`settings-section ${theme}`}>
        <button
          onClick={resetSettings}
          className={`settings-button reset ${theme}`}
        >
          Reset to Default Settings
        </button>
      </div>

      <p className="settings-note">
        Changes will be applied instantly. Enjoy your personalized experience!
      </p>
    </div>
  );
};

export default Settings;
