import { Link } from "react-router-dom";
import TextBox from "../../components/TextBox";
import { useState } from "react";

function SignUp() {
  const [stage, setStage] = useState(0);
  return (
    <form action="">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-normal m-5 tracking-wider capitalize">
              Lets get started
            </h1>
          </div>
          <div className="card lg:w-[25vw] md:w-[35vw] sm:w-[50vw] shadow-2xl bg-blue-50">
            <p className="py-6 text-center text-xl mt-8">
              Create a new account
            </p>
            <progress
              className="progress progress-primary w-[70%] mx-auto"
              value={25}
              max="100"
            ></progress>
            <form className="card-body">
              {stage == 0 && (
                <>
                  <TextBox type="email" label="Email" placeholder="email" />
                  <TextBox
                    type="password"
                    label="Password"
                    placeholder="password"
                  />
                  <TextBox
                    type="password"
                    label="Confirm password"
                    placeholder="password"
                  />
                </>
              )}
              <div className="form-control mt-2">
                <button className="bg-black text-white rounded-3xl text-2xl font-light px-5 py-4 hover:bg-gray-600 shadow-xl uppercase">
                  {stage != 4 ? "Next" : "Sign Up"}
                </button>
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
    </form>
  );
}

export default SignUp;
