import { useState } from "react";
import TextBox from "../../components/TextBox";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [notification, setNotification] = useState(true);
  const [availability, setAvailability] = useState("Available");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [language, setLanguage] = useState("en"); // Default language is English
  const [emailNotification, setEmailNotification] = useState(false);
  const [importantEmails, setImportantEmails] = useState(false);
  const [emailDigest, setEmailDigest] = useState(false);

  const saveChanges = () => {
    console.log("Settings saved:", {
      name,
      email,
      password,
      phoneNumber,
      location,
      timezone,
      currentPassword,
      newPassword,
      confirmNewPassword,
      notification,
      availability,
      twoFactorAuth,
      language,
      emailNotification,
      importantEmails,
      emailDigest,
    });
  };

  const exportData = () => {
    // Logic to export data
    console.log("Data exported successfully!");
  };

  const deleteAccount = () => {
    // Logic to delete account
    console.log("Account deleted successfully!");
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl text-primary pt-2 pb-4">Settings</h1>
      <hr className="divider w-[12rem]" />

      {/* Profile Settings */}
      {/* Code for profile settings */}

      {/* Location and Timezone Settings */}
      {/* Code for location and timezone settings */}

      {/* Password Settings */}
      {/* Code for password settings */}

      {/* Notification Settings */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
        <div className="flex items-center">
          <input
            id="notification"
            type="checkbox"
            className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 rounded"
            checked={notification}
            onChange={(e) => setNotification(e.target.checked)}
          />
          <label htmlFor="notification" className="ml-4 block text-lg text-gray-900">
            Receive notifications
          </label>
        </div>

        {/* Email Notification */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-4">Email Notification Preferences</h2>
          <div className="mt-2">
            <div className="flex items-center">
              <input
                id="emailNotification"
                type="checkbox"
                className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 rounded"
                checked={emailNotification}
                onChange={(e) => setEmailNotification(e.target.checked)}
              />
              <label htmlFor="emailNotification" className="ml-4 block text-lg text-gray-900">
                Receive email notifications
              </label>
            </div>
            {/* Additional options for email notifications */}
            {emailNotification && (
              <div className="mt-2 ml-10">
                <div className="flex items-center">
                  <input
                    id="importantEmails"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 rounded"
                    checked={importantEmails}
                    onChange={(e) => setImportantEmails(e.target.checked)}
                  />
                  <label htmlFor="importantEmails" className="ml-4 block text-lg text-gray-900">
                    Receive notifications for important emails only
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    id="emailDigest"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 rounded"
                    checked={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.checked)}
                  />
                  <label htmlFor="emailDigest" className="ml-4 block text-lg text-gray-900">
                    Receive daily email digest
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Availability Settings */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Availability Settings</h2>
        <div className="flex items-center">
          <label className="block text-lg font-medium text-gray-700 mr-4">Availability</label>
          <select
            className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 h-10 shadow-sm sm:text-lg border-gray-300 rounded-box"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="Away">Away</option>
          </select>
        </div>
      </div>

      {/* Two-factor Authentication Settings */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Two-factor Authentication</h2>
        <div className="flex items-center">
          <input
            id="twoFactorAuth"
            type="checkbox"
            className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 rounded"
            checked={twoFactorAuth}
            onChange={(e) => setTwoFactorAuth(e.target.checked)}
          />
          <label htmlFor="twoFactorAuth" className="ml-4 block text-lg text-gray-900">
            Enable Two-factor Authentication
          </label>
        </div>
      </div>

      {/* Language Preference */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Language Preference</h2>
        <div className="flex items-center">
          <label className="block text-lg font-medium text-gray-700 mr-4">Language</label>
          <select
            className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 h-10 shadow-sm sm:text-lg border-gray-300 rounded-box"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            {/* Add more language options as needed */}
          </select>
        </div>
      </div>

      {/* Data Export */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Export</h2>
        <button className="btn btn-primary text-lg" onClick={exportData}>
          Export Data
        </button>
      </div>

      {/* Account Deletion */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Account Deletion</h2>
        <p className="text-lg text-gray-700 mb-4">
          Please note that account deletion is irreversible and all your data will be lost.
        </p>
        <button className="btn btn-danger text-lg" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>

      {/* Save Button */}
      <div className="flex flex-row-reverse gap-8">
        <button className="btn btn-primary text-xl" onClick={saveChanges}>
          Save Changes
        </button>
        <button className="btn btn-outline text-xl">Cancel</button>
      </div>
    </div>
  );
};

export default Settings;
