import { Link } from "react-router-dom";
import { FaGoogle, FaTwitter, FaApple, FaFacebook } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { useAxios } from "@/hooks/useAxios";
import { enqueueSnackbar } from "notistack";
import TextBox from "@/components/TextBox";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

function notImplemneted() {
  enqueueSnackbar("Sorry feature not implemented yet", { variant: "warning" });
}

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
      const emailRegex = new RegExp(
        "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
      );
      let res: AxiosResponse | null = null;
      if (emailRegex.test(email)) {
        res = await axios.post("/auth/login", {
          email: email,
          password: password,
        });
      } else {
        res = await axios.post("/auth/login", {
          username: email,
          password: password,
        });
      }
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
      navigate(`${__BASE_URL__}/${role}`);
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
          <h1 className="text-3xl lg:text-5xl font-normal m-5 tracking-wider capitalize">
            Welcome Back
          </h1>
        </div>
        <div className="card max-w-[30rem] xl:w-[30vw] lg:w-[35vw] md:w-[45vw] sm:w-[55vw] w-[90vw] shadow-2xl bg-base-100">
          <p className="py-6 text-center text-xl mt-8">
            Login using social networks
          </p>
          <div className="flex mx-auto">
            <Link to="" onClick={notImplemneted}>
              <FaGoogle
                // size="48"
                className="text-red-500 dark:shadow-lg mx-5 dark:text-primary hover-enlarge w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]"
              />
            </Link>
            <Link to="" onClick={notImplemneted}>
              <FaFacebook
                // size="48"
                className="text-blue-800 dark:shadow-lg mx-5 dark:text-primary hover-enlarge w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]"
              />
            </Link>
            <Link to="" onClick={notImplemneted}>
              <FaTwitter
                // size="48"
                className="text-blue-600 dark:shadow-lg mx-5 dark:text-primary hover-enlarge w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]"
              />
            </Link>
            <Link to="" onClick={notImplemneted}>
              <FaApple
                // size="48"
                className="text-black dark:shadow-lg mx-5 dark:text-primary hover-enlarge w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]"
              />
            </Link>
          </div>
          <div className="divider w-[70%] mx-auto mt-6">or</div>
          <form className="card-body pt-4" onSubmit={handleSubmit}>
            <TextBox
              type="text"
              label="Email/Username"
              placeholder="email/username"
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
                className="btn btn-lg btn-primary text-2xl font-light px-5 py-4 shadow-xl uppercase"
              />
            </div>
            <Link
              to={`${__BASE_URL__}/forgot_password`}
              className="hover:underline"
            >
              forgot password
            </Link>
            <p>
              New to StratHub?{" "}
              <Link
                to={`${__BASE_URL__}/signup`}
                className="text-accent hover:underline"
              >
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
