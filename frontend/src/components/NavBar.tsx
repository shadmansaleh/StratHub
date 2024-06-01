import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import useDarkMode from "@/hooks/useDarkMode";

function NavBar() {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <>
      <div className="navbar bg-base-200 shadow-lg">
        <div className="flex-1">
          <Link to={`${__BASE_URL__}/`} className="text-xl font-normal px-2">
            <img src={logo} alt="strathub-logo" className="h-12 w-12" />
          </Link>
          <Link to={`${__BASE_URL__}/`}>
            <h1 className="text-4xl font-normal px-2">StratHub</h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal  uppercase">
            <li className="">
              <Link to="">About Us</Link>
            </li>
            <li>
              <Link to="">Services</Link>
            </li>
            <li>
              <Link to="">Contact</Link>
            </li>
            <li>
              <details>
                <summary>More</summary>
                {/* <ul className="p-2">
                  <li>
                    <Link to="">Submenu 1</Link>
                  </li>
                  <li>
                    <Link to="">Submenu 2</Link>
                  </li>
                </ul> */}
              </details>
            </li>
          </ul>
          <div onClick={() => setDarkMode(!darkMode)}>
            {!darkMode && <IoMoonOutline size="3.5rem" className="px-4" />}
            {darkMode && <IoSunnyOutline size="3.5rem" className="px-4" />}
          </div>
        </div>
        <div className="flex-none gap-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto bg-base-100"
            />
          </div>
          <Link
            to={`${__BASE_URL__}/login`}
            className="btn btn-md btn-primary text-xl font-light px-6 py-2"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;
