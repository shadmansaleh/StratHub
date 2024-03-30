import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer p-10 bg-blue-200 text-base-content">
      <aside>
        <img src={logo} alt="" className="h-12 w-12" />
        <p>
          StratHub Ltd.
          <br />
          Providing reliable consultancy since 2024
        </p>
        <div className="flex mt-2">
          <Link to="">
            <FaFacebook
              size="32"
              className="text-blue-800 dark:shadow-lg mr-2 dark:text-primary"
            />
          </Link>
          <Link to="">
            <FaTwitter
              size="32"
              className="text-blue-600 dark:shadow-lg mx-2 dark:text-primary"
            />
          </Link>
          <Link to="">
            <FaInstagram
              size="32"
              className="text-orange-400 dark:shadow-lg mx-2 dark:text-primary"
            />
          </Link>
        </div>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Career Counselling</a>
        <a className="link link-hover">Business Advice</a>
        <a className="link link-hover">Health and Wellness</a>
        <a className="link link-hover">Engineering Solutions</a>
        <a className="link link-hover">Education</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
}

export default Footer;
