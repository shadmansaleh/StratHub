import React, { useState } from "react";
import profilePicture from "./Profile/assets/profile_demo.svg";

const Settings: React.FC = () => {
  // Sample user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    profilePicture: profilePicture,
    theme: "light",
    language: "English",
    receiveNotifications: true,
    privacySettings: {
      profileVisibility: "public",
      contactVisibility: "everyone",
    },
    selectedTheme: "light",
    selectedLanguage: "English",
    selectedProfileVisibility: "public",
    selectedContactVisibility: "everyone",
  });

  // Function to handle theme change
  const handleThemeChange = (theme: string) => {
    setUserData({ ...userData, selectedTheme: theme });
    // Implement theme change logic
  };

  // Function to handle language change
  const handleLanguageChange = (language: string) => {
    setUserData({ ...userData, selectedLanguage: language });
    // Implement language change logic
  };

  // Function to handle profile visibility change
  const handleProfileVisibilityChange = (visibility: string) => {
    setUserData({ ...userData, selectedProfileVisibility: visibility });
    // Implement profile visibility change logic
  };

  // Function to handle contact visibility change
  const handleContactVisibilityChange = (visibility: string) => {
    setUserData({ ...userData, selectedContactVisibility: visibility });
    // Implement contact visibility change logic
  };

  // Function to handle email notification toggle
  const handleNotificationToggle = () => {
    setUserData({
      ...userData,
      receiveNotifications: !userData.receiveNotifications,
    });
    // Implement email notification toggle logic
  };

  // Function to save user settings
  const saveSettings = () => {
    // Implement logic to save user settings
  };

  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-3xl text-primary pt-2 pb-0">User Setting</h1>
      <hr className="divider w-[12rem]" />
      {/* Profile Information */}
      <div className="bg-base-200 dark:bg-base-800 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-primary mb-2">
          Profile Information
        </h2>
        <div className="flex items-center mb-2">
          <img
            src={userData.profilePicture}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="text-lg text-primary">{userData.name}</p>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
          {/* If someone click here it will redirect to the profile page */}
          <button className="btn btn-primary ml-auto">Edit Profile</button>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-base-200 dark:bg-base-800 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-primary mb-2">
          Account Settings
        </h2>
        <div className="flex items-center justify-between mb-2">
          <p>Change Password</p>
          <button className="btn btn-primary">Change</button>
        </div>
        <div className="flex items-center justify-between">
          <p>Email Notifications</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={userData.receiveNotifications}
              onChange={handleNotificationToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-base-200 dark:bg-base-800 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-primary mb-2">Preferences</h2>
        <div className="flex items-center justify-between mb-2">
          <p>Theme</p>
          <select
            className="select select-bordered max-w-[10rem]"
            value={userData.selectedTheme}
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p>Language</p>
          <select
            className="select select-bordered max-w-[10rem]"
            value={userData.selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            {/* Add more language options */}
          </select>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-base-200 dark:bg-base-800 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-primary mb-2">
          Privacy Settings
        </h2>
        <div className="flex items-center justify-between mb-2">
          <p>Profile Visibility</p>
          <select
            className="select select-bordered max-w-[10rem]"
            value={userData.selectedProfileVisibility}
            onChange={(e) => handleProfileVisibilityChange(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <p>Contact Visibility</p>
          <select
            className="select select-bordered max-w-[10rem]"
            value={userData.selectedContactVisibility}
            onChange={(e) => handleContactVisibilityChange(e.target.value)}
          >
            <option value="everyone">Everyone</option>
            <option value="friends">Friends</option>
            <option value="no_one">No one</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <button className="btn btn-primary" onClick={saveSettings}>
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
