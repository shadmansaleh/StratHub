import React from "react";
import { useState } from "react";

function Settings() {
  const [notification, setNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(false);
  const [importantEmails, setImportantEmails] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="w-[95%] mx-auto">
      {/* admin settings page */}
      <h1 className="text-3xl text-primary pt-2 pb-0">Settings</h1>
      <hr className="divider w-[12rem]" />
      {/* Notification Settings */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary-light">
          Notification Settings
        </h2>
        <div className="flex items-center">
          <input
            id="notification"
            type="checkbox"
            className="focus:ring-primary dark:focus:ring-primary-light h-6 w-6 text-primary dark:text-primary-light border-gray-300 dark:border-gray-600 rounded"
            checked={notification}
            onChange={(e) => setNotification(e.target.checked)}
          />
          <label
            htmlFor="notification"
            className="ml-4 block text-lg text-gray-900 dark:text-gray-100"
          >
            Receive notifications
          </label>
        </div>
        {/* Email Notification */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary-light">
            Email Notification Preferences
          </h2>
          <div className="mt-2">
            <div className="flex items-center">
              <input
                id="emailNotification"
                type="checkbox"
                className="focus:ring-primary dark:focus:ring-primary-light h-6 w-6 text-primary dark:text-primary-light border-gray-300 dark:border-gray-600 rounded"
                checked={emailNotification}
                onChange={(e) => setEmailNotification(e.target.checked)}
              />
              <label
                htmlFor="emailNotification"
                className="ml-4 block text-lg text-gray-900 dark:text-gray-100"
              >
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
                    className="focus:ring-primary dark:focus:ring-primary-light h-6 w-6 text-primary dark:text-primary-light border-gray-300 dark:border-gray-600 rounded"
                    checked={importantEmails}
                    onChange={(e) => setImportantEmails(e.target.checked)}
                  />
                  <label
                    htmlFor="importantEmails"
                    className="ml-4 block text-lg text-gray-900 dark:text-gray-100"
                  >
                    Receive important emails
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Account Settings */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary-light">
          Account Settings
        </h2>
        <div className="flex items-center">
          <input
            id="darkMode"
            type="checkbox"
            className="focus:ring-primary dark:focus:ring-primary-light h-6 w-6 text-primary dark:text-primary-light border-gray-300 dark:border-gray-600 rounded"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <label
            htmlFor="darkMode"
            className="ml-4 block text-lg text-gray-900 dark:text-gray-100"
          >
            Dark mode
          </label>
        </div>
      </div>
      <div className="my-2">
        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary-light">
          Pause SignUp
        </h2>
        <div className="flex items-center">
          <input
            id="pauseSignup"
            type="checkbox"
            className="focus:ring-primary dark:focus:ring-primary-light h-6 w-6 text-primary dark:text-primary-light border-gray-300 dark:border-gray-600 rounded"
          />
          <label
            htmlFor="pauseSignup"
            className="ml-4 block text-lg text-gray-900 dark:text-gray-100"
          >
            Pause Expert signup
          </label>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          className="bg-primary text-white px-4 py-2 btn btn-primary"
          onClick={() => alert("Settings saved!")}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Settings;
