import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { FaUser, FaHeart, FaHistory, FaSearch } from "react-icons/fa";
import { MdLogout, MdDashboard, MdManageAccounts } from "react-icons/md";
import { IoMdSettings, IoIosPeople } from "react-icons/io";
import { AiFillSchedule } from "react-icons/ai";
import { BsPersonFillCheck } from "react-icons/bs";
import { TbReport } from "react-icons/tb";

interface SideBarItem {
  name: string;
  icon: IconType;
  key: string;
  onClick?: () => void;
}

function SideBar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { auth, clearAuth } = useContext(AuthContext);
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

  const user_sidebar_items: SideBarItem[] = [
    { name: "Dashboard", icon: MdDashboard, key: "dashboard" },
    { name: "Profile", icon: FaUser, key: "profile" },
    { name: "Search", icon: FaSearch, key: "search" },
    { name: "Appointments", icon: AiFillSchedule, key: "appointments" },
    {
      name: "Favorites",
      icon: FaHeart,
      key: "favorites",
    },
    { name: "History", icon: FaHistory, key: "history" },
    { name: "Settings", icon: IoMdSettings, key: "settings" },
    { name: "Logout", icon: MdLogout, key: "logout", onClick: onLogout },
  ];

  const expert_sidebar_items: SideBarItem[] = [
    { name: "Dashboard", icon: MdDashboard, key: "dashboard" },
    { name: "Profile", icon: FaUser, key: "profile" },
    { name: "Clients", icon: MdManageAccounts, key: "clients" },
    { name: "Recent", icon: FaHistory, key: "recent" },
    { name: "Settings", icon: IoMdSettings, key: "settings" },
    { name: "Logout", icon: MdLogout, key: "logout", onClick: onLogout },
  ];

  const admin_sidebar_items: SideBarItem[] = [
    { name: "Dashboard", icon: MdDashboard, key: "dashboard" },
    { name: "Users", icon: IoIosPeople, key: "users" },
    { name: "Experts", icon: IoIosPeople, key: "experts" },
    { name: "Verify", icon: BsPersonFillCheck, key: "verify" },
    { name: "Reports", icon: TbReport, key: "reports" },
    { name: "Settings", icon: IoMdSettings, key: "settings" },
    { name: "Logout", icon: MdLogout, key: "logout", onClick: onLogout },
  ];

  let sidebar_items: SideBarItem[] = [];
  if (auth?.role == "expert") sidebar_items = expert_sidebar_items;
  else if (auth?.role == "admin") sidebar_items = admin_sidebar_items;
  else sidebar_items = user_sidebar_items;

  const shrinkOnClose = `transition-transform duration-300 ease-in-out ${
    sidebarCollapsed ? "scale-0 w-0" : ""
  }`;

  return (
    <>
      <div
        className={`h-screen flex flex-col bg-base-200 duration-100 transition-min-width ease-in-out ${
          sidebarCollapsed ? "min-w-0" : "min-w-64"
        }`}
      >
        <div
          className={
            "flex flex-row gap-2 p-4 items-center hover:bg-accent hover:text-accent-content"
          }
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <img src={logo} className="aspect-square w-[3rem]" />
          <span className={`text-3xl font-medium ${shrinkOnClose}`}>
            StratHub
          </span>
        </div>
        {sidebar_items.map((item, index) => (
          <div
            key={index}
            className="hover:bg-accent hover:text-accent-content last:mt-auto last:pb-4 first:pt-4"
            onClick={item.onClick ? item.onClick : onSidebarItemClick(index)}
          >
            <div
              className={`flex flex-row gap-2 p-4 items-center group ${
                !sidebarCollapsed && "pl-8"
              }`}
            >
              <item.icon
                size="2rem"
                className={`${sidebarCollapsed && "mx-auto"}`}
              />
              <span className={`text-xl ${shrinkOnClose}`}>{item.name}</span>
              {sidebarCollapsed && (
                <span className="absolute w-auto p-2 m-2 min-w-max left-20 rounded-md shadow-md text-primary-content bg-primary text-sm transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                  {item.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SideBar;
