import { Link } from "react-router-dom";
import TextBox from "../../components/TextBox";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

import { enqueueSnackbar } from "notistack";
import { AxiosResponse } from "axios";
import { useAxios } from "../../hooks/useAxios";

import { useNavigate } from "react-router-dom";
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  accountType: string;
  consentChecked: boolean;
}

const emailRegex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
let usernameRegex = new RegExp("^[a-z][a-zA-Z0-9_]{5,}$");
const strongPasswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_]).{8,}"
);

function SignUp() {
  const [stage, setStage] = useState(1);
  const navigate = useNavigate();
  const { axios, axiosErrHandler } = useAxios();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    accountType: "regular",
    consentChecked: false,
  } as FormData);
  const max_stage = 2;

  const formDataFollow =
    (field: string, dataName = "value") =>
    (e: any) => {
      setFormData({ ...formData, [field]: e.target[dataName] });
    };

  const handleSteps = (e: any) => {
    e.preventDefault();
    let verification_passed = true;
    switch (stage) {
      case 1:
        if (emailRegex.test(formData["email"]) == false) {
          enqueueSnackbar("Invalid email", { variant: "error" });
          verification_passed = false;
        }
        if (
          verification_passed &&
          strongPasswordRegex.test(formData["password"]) == false
        ) {
          enqueueSnackbar(
            "Invalid Password: Password must be at least 8 characters long and contain a lowercase letter, an uppercase letter, a number, and a special character",
            { variant: "error", autoHideDuration: 3000 }
          );
          verification_passed = false;
        }
        if (
          verification_passed &&
          formData["password"] != formData["confirmPassword"]
        ) {
          enqueueSnackbar("Passwords do not match", { variant: "error" });
          verification_passed = false;
        }
        if (verification_passed)
          axios
            .get("/user/email_taken", {
              params: { username: formData["email"] },
            })
            .then((res: AxiosResponse) => {
              if (res.data.taken) {
                enqueueSnackbar("Email already used", {
                  variant: "error",
                });
                verification_passed = false;
              }
            })
            .catch(axiosErrHandler);
        break;
      case 2:
        if (usernameRegex.test(formData["username"]) == false) {
          enqueueSnackbar(
            "Invalid Username: Username must be at least 6 characters long start with a lowercase letter. And can only contain lowercase letters uppercase letters numbers and underscore",
            { variant: "error" }
          );
          verification_passed = false;
        }
        if (verification_passed && !formData.consentChecked) {
          enqueueSnackbar(
            "To use StratHub you need to agree to our terms and conditions and privacy policy",
            { variant: "error" }
          );
          verification_passed = false;
        }
        if (verification_passed)
          axios
            .get("/user/username_taken", {
              params: { username: formData["username"] },
            })
            .then((res: AxiosResponse) => {
              if (res.data.taken) {
                enqueueSnackbar("Username already exists", {
                  variant: "error",
                });
                verification_passed = false;
              }
            })
            .catch(axiosErrHandler);
        break;
    }
    if (!verification_passed) return;
    if (stage < max_stage) setStage(stage + 1);
    if (stage == max_stage) {
      try {
        axios
          .post("/user/register", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.accountType == "regular" ? "user" : "expert",
          })
          .then(() => {
            enqueueSnackbar("Account created successfully", {
              variant: "success",
            });
            navigate("/login");
          })
          .catch(axiosErrHandler);
      } catch (e) {
        axiosErrHandler(e);
      }
    }
  };

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-normal m-5 tracking-wider capitalize">
              Lets get started
            </h1>
          </div>
          <div className="card max-w-[30rem] lg:w-[30vw] md:w-[35vw] sm:w-[50vw] shadow-2xl bg-blue-50">
            {stage != 1 && (
              <IoMdArrowBack
                onClick={() => setStage(stage - 1)}
                className="h-10 w-10 text-gray-800 absolute top-2 left-2"
              />
            )}
            <p className="py-6 text-center text-xl mt-8">
              Create a new account
            </p>
            <progress
              className="progress progress-primary w-[70%] mx-auto"
              value={(stage / max_stage) * 100}
              max="100"
            ></progress>
            <form className="card-body" onSubmit={handleSteps}>
              {stage == 1 && (
                <>
                  <TextBox
                    type="email"
                    label="Email"
                    placeholder="email"
                    id="input-email"
                    value={formData["email"]}
                    onChange={formDataFollow("email")}
                  />
                  <TextBox
                    type="password"
                    label="Password"
                    placeholder="password"
                    id="input-password"
                    value={formData["password"]}
                    onChange={formDataFollow("password")}
                  />
                  <TextBox
                    type="password"
                    label="Confirm password"
                    placeholder="password"
                    id="input-confirm-password"
                    value={formData["confirmPassword"]}
                    onChange={formDataFollow("confirmPassword")}
                  />
                </>
              )}
              {stage == 2 && (
                <>
                  <TextBox
                    type="text"
                    label="Username"
                    placeholder="username"
                    id="input-username"
                    value={formData["username"]}
                    onChange={formDataFollow("username")}
                  />
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Account Type</span>
                    </label>
                    <select
                      className="form-select"
                      value={formData["accountType"]}
                      onChange={formDataFollow("accountType")}
                    >
                      <option value="regular">Regular</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="remember-me" className="">
                      <input
                        type="checkbox"
                        name="concent"
                        id="input-concent"
                        onChange={formDataFollow("consentChecked", "checked")}
                      />
                      <span className="px-2 text-sm">
                        I have read and agree with StratHubs{" "}
                        <Link to="" className="hover:underline">
                          {" "}
                          Terms & Conditions{" "}
                        </Link>{" "}
                        , and{" "}
                        <Link to="" className="hover:underline">
                          {" "}
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                </>
              )}
              <div className="form-control mt-2">
                <input
                  type="submit"
                  value={stage != max_stage ? "Next" : "Sign Up"}
                  className="bg-black text-white rounded-3xl text-2xl font-light px-5 py-4 hover:bg-gray-600 shadow-xl uppercase"
                />
              </div>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
