import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function NavBar() {
  return (
    <>
      <div className="navbar bg-blue-200 shadow-lg">
        <div className="flex-1">
          <Link to="/" className="text-xl font-normal px-2">
            <img src={logo} alt="strathub-logo" className="h-12 w-12" />
          </Link>
          <Link to="/" className="text-xl font-normal px-2">
            StratHub
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-4 uppercase">
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
              className="input input-bordered w-24 md:w-auto bg-blue-50"
            />
          </div>
          <Link
            to="/login"
            className="bg-black text-white rounded-2xl text-xl font-light px-6 py-2 hover:bg-gray-600"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;