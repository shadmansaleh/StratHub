import TextBox from "../../../components/TextBox";
import { useState } from "react";

import { IoMdArrowBack } from "react-icons/io";
import { enqueueSnackbar } from "notistack";
import { useAxios } from "../../../hooks/useAxios";

import { useNavigate } from "react-router-dom";
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const emailRegex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
// const strongPasswordRegex = new RegExp(".*");
const strongPasswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_]).{8,}"
);

function SignUp() {
  const navigate = useNavigate();
  const { axios, axiosErrHandler } = useAxios();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  } as FormData);

  const formDataFollow =
    (field: string, dataName = "value") =>
    (e: any) => {
      setFormData({ ...formData, [field]: e.target[dataName] });
    };

  const handleSteps = async (e: any) => {
    e.preventDefault();
    let verification_passed = true;
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
    if (verification_passed) {
      try {
        const res = await axios.get("/user/email_taken", {
          params: { email: formData["email"] },
        });
        if (res.data.taken === false) {
          enqueueSnackbar("Email not found", {
            variant: "error",
          });
          verification_passed = false;
        }
      } catch (e) {
        axiosErrHandler(e);
        verification_passed = false;
      }
    }
    if (!verification_passed) return;
    axios
      .post("/user/update_password", {
        email: formData.email,
        password: formData.password,
      })
      .then(() => {
        enqueueSnackbar("Password Updated successfully", {
          variant: "success",
        });
        navigate("/login");
      })
      .catch(axiosErrHandler);
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
          <div className="card max-w-[30rem] lg:w-[30vw] md:w-[35vw] sm:w-[50vw] shadow-2xl bg-base-100">
            <IoMdArrowBack
              onClick={() => navigate("/login")}
              className="h-10 w-10 text-primary absolute top-4 left-4"
            />
            <p className="py-6 text-center text-2xl mt-8">Forgot Password</p>
            <form className="card-body" onSubmit={handleSteps}>
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
              <div className="form-control mt-2">
                <input
                  type="submit"
                  value="Update Password"
                  className="btn btn-lg btn-primary text-2xl font-light px-5 py-4 shadow-xl uppercase"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
