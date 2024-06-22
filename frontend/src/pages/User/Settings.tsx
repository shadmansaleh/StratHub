import React, { useEffect, useState } from "react";
import profilePicture from "@/assets/profile_demo.svg";
import useAxios from "@/hooks/useAxios";
import { Link } from "react-router-dom";
import Overlay from "@/components/Overlay";
import TextBox from "@/components/TextBox";
import { enqueueSnackbar } from "notistack";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

let emailRegex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
// const strongPasswordRegex = new RegExp(".*");
let strongPasswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_]).{8,}"
);

// disable password verification
// emailRegex = new RegExp(".*");
// strongPasswordRegex = new RegExp(".*");

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

  const { axios } = useAxios();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    let ignore = false;
    axios
      .get("/user/get_user")
      .then((res) => {
        if (ignore) return;
        setUserData({
          ...userData,
          name: res.data.user.first_name + " " + res.data.user.last_name,
          email: res.data.user.email,
          profilePicture: res.data.user.profile_pic
            ? __BACKEND_URL__ + "/storage/" + res.data.user.profile_pic
            : profilePicture,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      ignore = true;
    };
  }, []);

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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  } as FormData);

  const formDataFollow =
    (field: string, dataName = "value") =>
    (e: any) => {
      setFormData({ ...formData, [field]: e.target[dataName] });
    };

  const handleSteps = async (e: any) => {
    e.preventDefault();
    let verification_passed = true;
    if (emailRegex.test(formData["email"]) == false) {
      enqueueSnackbar("Invalid email", { variant: "error" });
      verification_passed = false;
    }
    if (
      verification_passed &&
      strongPasswordRegex.test(formData["password"]) == false
    ) {
      enqueueSnackbar(
        "Invalid Password: Password must be at least 8 characters long and contain a lowercase letter, an uppercase letter, a number, and a special character",
        { variant: "error", autoHideDuration: 3000 }
      );
      verification_passed = false;
    }
    if (
      verification_passed &&
      formData["password"] != formData["confirmPassword"]
    ) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      verification_passed = false;
    }
    if (verification_passed) {
      try {
        const res = await axios.get("/auth/email_taken", {
          params: { email: formData["email"] },
        });
        if (res.data.taken === false) {
          enqueueSnackbar("Email not found", {
            variant: "error",
          });
          verification_passed = false;
        }
      } catch (e) {
        verification_passed = false;
      }
    }
    if (!verification_passed) return;
    axios
      .post("/auth/update_password", {
        email: formData.email,
        password: formData.password,
      })
      .then(() => {
        enqueueSnackbar("Password Updated successfully", {
          variant: "success",
        });
        setShowOverlay(false);
      })
      .catch(() => {});
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
          <Link className="btn btn-primary ml-auto" to="/user/profile">
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-base-200 dark:bg-base-800 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-primary mb-2">
          Account Settings
        </h2>
        <Overlay show={showOverlay} setShow={setShowOverlay}>
          <p className="py-6 text-center text-2xl mt-8">Update Password</p>
          <form className="card-body" onSubmit={handleSteps}>
            <>
              <TextBox
                type="email"
                label="Email"
                placeholder="email"
                id="input-email"
                value={formData["email"]}
                onChange={formDataFollow("email")}
              />
              <TextBox
                type="password"
                label="Password"
                placeholder="password"
                id="input-password"
                value={formData["password"]}
                onChange={formDataFollow("password")}
              />
              <TextBox
                type="password"
                label="Confirm password"
                placeholder="password"
                id="input-confirm-password"
                value={formData["confirmPassword"]}
                onChange={formDataFollow("confirmPassword")}
              />
            </>
            <div className="form-control mt-2">
              <input
                type="submit"
                value="Update Password"
                className="btn btn-lg btn-primary text-2xl font-light px-5 py-4 shadow-xl uppercase"
              />
            </div>
          </form>
        </Overlay>
        <div className="flex items-center justify-between mb-2">
          <p>Change Password</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowOverlay(true)}
          >
            Change
          </button>
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
