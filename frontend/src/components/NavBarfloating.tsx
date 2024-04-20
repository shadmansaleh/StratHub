import { FaSearch } from "react-icons/fa";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import TextBox from "../components/TextBox";
import useDarkMode from "../hooks/useDarkMode";
import { useLocation } from "react-router-dom";

const NavBarFloating = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const loc = useLocation();
  const breadCrumbItems = loc.pathname.split("/");

  return (
    <nav className="mx-2 w-3/50 h-14 flex justify-between items-center shadow-md bg-base-50 dark:bg-gray-700 sticky top-4 z-10 rounded-full">
      <div className="nav-left justify-left max-w-xs text-sm breadcrumbs px-5 ">
        <ul>
          {breadCrumbItems.map((item, idx) => (
            <li key={idx}>
              <a>{item}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="nav-right flex items-center">
        <TextBox
          type="text"
          placeholder="Search"
          className="h-10 [&>input]:border-0"
        />
        <FaSearch size="1rem" className="-translate-x-8" />
        <div onClick={() => setDarkMode(!darkMode)}>
          {!darkMode && <IoMoonOutline size="2.5rem" className="p-2" />}
          {darkMode && <IoSunnyOutline size="2.5rem" className="p-2" />}
        </div>
        <IoIosNotificationsOutline size="2.5rem" className="p-2" />
        <CgProfile size="2.5rem" className="p-2" />
      </div>
    </nav>
  );
};

export default NavBarFloating;
