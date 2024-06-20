import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import logo from "@/assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { FaUser, FaHeart, FaHistory, FaSearch } from "react-icons/fa";
import { MdLogout, MdDashboard, MdManageAccounts } from "react-icons/md";
import { IoMdSettings, IoIosPeople } from "react-icons/io";
import { AiFillSchedule } from "react-icons/ai";
import { BsPersonFillCheck, BsChatDotsFill } from "react-icons/bs";
import { TbReport } from "react-icons/tb";

interface SideBarItem {
  name: string;
  icon: IconType;
  key: string;
  onClick?: () => void;
}

function SideBar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const { auth, clearAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogout = () => {
    if (clearAuth) {
      clearAuth();
      navigate(`${__BASE_URL__}/`);
    }
  };

  const onSidebarItemClick = (idx: number) => () => {
    navigate(sidebar_items[idx].key);
  };

  const user_sidebar_items: SideBarItem[] = [
    // { name: "Dashboard", icon: MdDashboard, key: "dashboard" },
    { name: "Search", icon: FaSearch, key: "search" },
    { name: "Profile", icon: FaUser, key: "profile" },
    { name: "Appointments", icon: AiFillSchedule, key: "appointments" },
    {
      name: "Favorites",
      icon: FaHeart,
      key: "favorites",
    },
    // { name: "History", icon: FaHistory, key: "history" },
    { name: "Chat", icon: BsChatDotsFill, key: "chat" },
    { name: "Settings", icon: IoMdSettings, key: "settings" },
    { name: "Logout", icon: MdLogout, key: "logout", onClick: onLogout },
  ];

  const expert_sidebar_items: SideBarItem[] = [
    { name: "Dashboard", icon: MdDashboard, key: "dashboard" },
    { name: "Profile", icon: FaUser, key: "profile" },
    { name: "Clients", icon: MdManageAccounts, key: "clients" },
    // { name: "Recent", icon: FaHistory, key: "recent" },
    { name: "Chat", icon: BsChatDotsFill, key: "chat" },
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

  const loc = useLocation();
  const path_split = loc.pathname.split("/");
  const cur_key = path_split[2] ? path_split[2] : sidebar_items[0].key;

  return (
    <>
      <div
        className={`h-screen flex flex-col bg-base-200 duration-200 transition-[width] ease-in-out sticky top-0 ${
          sidebarCollapsed ? "min-w-20" : "min-w-56"
        }`}
      >
        <div
          className={"flex flex-row gap-2 p-4 items-center cursor-pointer"}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <img src={logo} className="aspect-square w-[3rem]" />
          <span className={`text-3xl font-medium ${shrinkOnClose}`}>
            <h1 className="">StratHub</h1>
          </span>
        </div>
        {sidebar_items.map((item, index) => (
          <div
            key={index}
            className="last:mt-auto last:pb-4 first:pt-4 "
            onClick={item.onClick ? item.onClick : onSidebarItemClick(index)}
          >
            <div
              className={`flex flex-row gap-2 p-4 items-center group hover:text-accent cursor-pointer ${
                item.key == cur_key && "bg-base-100 rounded-l-badge"
              } ${!sidebarCollapsed && "pl-8"}`}
            >
              <item.icon
                size="2rem"
                className={`${sidebarCollapsed && "mx-auto"}`}
              />
              <span className={`text-xl ${shrinkOnClose} `}>{item.name}</span>
              {sidebarCollapsed && (
                <span className="z-10 absolute w-auto p-2 m-2 min-w-max left-20 rounded-md shadow-md text-primary-content bg-primary text-sm transition-all duration-100 scale-0 origin-left group-hover:scale-100">
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
