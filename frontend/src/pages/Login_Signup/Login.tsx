import { Link } from "react-router-dom";
import { FaGoogle, FaTwitter, FaApple, FaFacebook } from "react-icons/fa";

function Login() {
  return (
    <form action="">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-normal m-5 tracking-wider capitalize">
              Welcome Back
            </h1>
          </div>
          <div className="card lg:w-[25vw] md:w-[35vw] sm:w-[50vw] shadow-2xl bg-blue-50">
            <p className="py-6 text-center text-xl mt-8">
              Login using social networks
            </p>
            <div className="flex mx-auto">
              <Link to="">
                <FaGoogle
                  size="48"
                  className="text-red-500 dark:shadow-lg mx-5 dark:text-primary hover-enlarge"
                />
              </Link>
              <Link to="">
                <FaFacebook
                  size="48"
                  className="text-blue-800 dark:shadow-lg mx-5 dark:text-primary hover-enlarge"
                />
              </Link>
              <Link to="">
                <FaTwitter
                  size="48"
                  className="text-blue-600 dark:shadow-lg mx-5 dark:text-primary hover-enlarge"
                />
              </Link>
              <Link to="">
                <FaApple
                  size="48"
                  className="text-black dark:shadow-lg mx-5 dark:text-primary hover-enlarge"
                />
              </Link>
            </div>
            <div className="divider w-[70%] mx-auto mt-12">or</div>
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered bg-transparent"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered bg-transparent"
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="remember-me" className="">
                  <input type="checkbox" name="remember-me" id="remember-me" />
                  <span className="px-2">Remember Me</span>
                </label>
              </div>
              <div className="form-control mt-2">
                <button className="bg-black text-white rounded-3xl text-2xl font-light px-5 py-4 hover:bg-gray-600 shadow-xl uppercase">
                  Login
                </button>
              </div>
              <Link to="" className="hover:underline">
                forgot password
              </Link>
              <p>
                New to StratHub?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
