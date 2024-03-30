import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

interface NavBarProps {
  userToken: string;
}

function NavBar<NavBarProps>({ userToken }) {
  return (
    <>
      <div className="navbar bg-blue-200 shadow-lg">
        <div className="flex-1">
          <img src={logo} alt="strathub-logo" className="h-12 w-12 mr-4" />
          <Link to="" className="text-xl font-normal">
            StratHub
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-4">
            <li>
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
                <ul className="p-2">
                  <li>
                    <Link to="">Submenu 1</Link>
                  </li>
                  <li>
                    <Link to="">Submenu 2</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="flex-none gap-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          {userToken ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="">Settings</Link>
                </li>
                <li>
                  <Link to="">Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-black text-white rounded-2xl text-xl font-light px-6 py-2 hover:bg-gray-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
