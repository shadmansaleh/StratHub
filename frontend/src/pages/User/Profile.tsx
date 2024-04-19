import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

function Profile() {
  return <div className="w-full">
    <nav className="m-4 p-4 w-3/50 flex justify-between shadow-md bg-white sticky top-0 z-10 rounded-full">
      <div className="nav-left flex justify-left items-center">
        <IoMdMenu className="m-2 w-8 h-8"/>
        {/* <img className=" w-20" src={logo} alt="logo" /> */}
      </div>
      <div className="nav-middle flex justify-center items-center">
        <input className="search-box border border-black mr-2 pl-2 pr-8 pt-1 pb-1 rounded-full text-center" type="text" placeholder="Search" />
        <FaSearch className="w-6 h-6"/>
      </div>
      <div className="nav-right flex items-center">
        <IoIosNotificationsOutline className="m-3 w-10 h-10" />
        <CgProfile className="m-1 w-14 h-14" />
        {/* <img src={logout_icon} alt="" /> */}
      </div>
    </nav>
  </div>;
}

export default Profile;
