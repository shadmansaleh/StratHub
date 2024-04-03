import { Link } from "react-router-dom";
import { FaGoogle, FaTwitter, FaApple, FaFacebook } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useAxios } from "../../hooks/useAxios";
import { enqueueSnackbar } from "notistack";
import TextBox from "../../components/TextBox";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { axios } = useAxios();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.elements["input-email"].value;
    const password = e.target.elements["input-password"].value;
    const remember = e.target.elements["input-remember-me"].checked;
    try {
      const res = await axios.post("/user/login", {
        email: email,
        password: password,
      });
      const token = res?.data?.token;
      const role = res?.data?.role;
      setAuth &&
        setAuth(
          {
            role,
            token,
          },
          !remember
        );
      enqueueSnackbar("Login successful", { variant: "success" });
      navigate("/home");
    } catch (error: AxiosError | any) {
      enqueueSnackbar(`Login failed: ${error?.response?.data?.message}`, {
        variant: "error",
      });
      console.error(error);
    }
  };
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-normal m-5 tracking-wider capitalize">
            Welcome Back
          </h1>
        </div>
        <div className="card max-w-[30rem] lg:w-[30vw] md:w-[35vw] sm:w-[50vw] shadow-2xl bg-blue-50">
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
          <div className="divider w-[70%] mx-auto mt-6">or</div>
          <form className="card-body pt-4" onSubmit={handleSubmit}>
            <TextBox
              type="email"
              label="Email"
              placeholder="email"
              id="input-email"
            />
            <TextBox
              type="password"
              label="Password"
              placeholder="password"
              id="input-password"
            />
            <div className="form-control">
              <label htmlFor="remember-me" className="">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="input-remember-me"
                  defaultChecked
                />
                <span className="px-2">Remember Me</span>
              </label>
            </div>
            <div className="form-control mt-2">
              <input
                type="submit"
                value="Login"
                className="bg-black text-white rounded-3xl text-2xl font-light px-5 py-4 hover:bg-gray-600 shadow-xl uppercase"
              />
            </div>
            <Link to="/forgot_password" className="hover:underline">
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
  );
}

export default Login;
