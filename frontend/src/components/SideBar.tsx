import { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { MdLogout, MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { clearAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    if (clearAuth) {
      clearAuth();
      navigate("/");
    }
  };

  const onSidebarItemClick = (idx: number) => () => {
    navigate(sidebar_items[idx].key);
  };
  const sidebar_items = [
    { name: "Dashboard", icon: MdDashboard, key: "dashboard" },
    { name: "Home", icon: FaHome, key: "home" },
    { name: "Profile", icon: FaUser, key: "profile" },
    { name: "Settings", icon: IoMdSettings, key: "settings" },
    { name: "Logout", icon: MdLogout, key: "logout", onClick: onLogout },
  ];

  return (
    <>
      <div
        className={`h-screen overflow-auto flex flex-col bg-blue-200 duration-200  ${
          sidebarCollapsed ? "min-w-0" : "min-w-64"
        }`}
      >
        <div
          className={"flex flex-row gap-2 p-4 items-center hover:bg-blue-300"}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <img src={logo} className="aspect-square w-10" />
          {!sidebarCollapsed && (
            <span className="text-3xl font-medium ">StratHub</span>
          )}
        </div>
        {sidebar_items.map((item, index) => (
          <div
            key={index}
            className="hover:bg-blue-300 last:mt-auto last:pb-4 first:pt-4"
            onClick={item.onClick ? item.onClick : onSidebarItemClick(index)}
          >
            <div
              className={`flex flex-row gap-2 p-4 items-center ${
                !sidebarCollapsed && "pl-8"
              }`}
            >
              <item.icon size="32" />

              {!sidebarCollapsed && (
                <span className="text-xl">{item.name}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SideBar;
