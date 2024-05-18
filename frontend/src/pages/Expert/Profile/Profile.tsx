import { useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import demo_profile from "./assets/profile_demo.png";
import TextBox from "../../../components/TextBox";
import { BsSuitcaseLgFill } from "react-icons/bs";

const Profile = () => {
  // const { axios, axiosErrHandler } = useAxios();
  const companies = ["ProCrew", "Noon", "LamasaTech"];

  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-3xl text-primary pt-2 pb-0">Expert Profile</h1>
      <hr className="divider w-[12rem]" />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="avatar">
            <div className="w-24 aspect-square rounded-full m-6">
              <img src={demo_profile} alt="profile pic" />
            </div>
          </div>
          <div className="flex flex-col justify-evenly">
            <h2 className="text-2xl text-primary font-semibold">Ala Mohamed</h2>
            <h3 className="text-xl text-primary">Graphics Designer</h3>
            <p className="text-md text-primary">
              Eastern European Time (EET), Cairo UTC +3
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <button className="btn btn-primary">Upload a photo</button>
          <button className="btn btn-outline">Delete</button>
        </div>
      </div>
      <hr className="divider w-[90%] mx-auto" />
      <div className="flex flex-row gap-[1%]">
        <TextBox
          type="text"
          placeholder="eg. Alaa"
          label="First Name"
          className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
        />
        <TextBox
          type="text"
          placeholder="eg. Mohamed"
          label="Last Name"
          className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
        />
      </div>
      <TextBox
        type="text"
        placeholder="eg. aala_mohamed"
        label="Username"
        className="w-[49.5%] [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
      />
      <hr className="divider w-[90%] mx-auto" />
      <div className="flex flex-row gap-[1%]">
        <TextBox
          type="text"
          placeholder="eg. ala@mail.com"
          label="Email"
          className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
        />
        <TextBox
          type="text"
          placeholder="eg. 0123456789"
          label="Phone Number"
          className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
        />
      </div>
      <hr className="divider w-[90%] mx-auto" />
      <h3 className="text-xl font-semibold text-primary">Companies</h3>
      <div>
        <ul className="flex flex-col gap-6 my-6 ml-10">
          {companies.map((company, idx) => (
            <li key={idx} className="flex flex-row gap-2 ">
              <BsSuitcaseLgFill size="1.5rem" className="text-primary" />
              <span className="text-lg text-primary">{company}</span>
            </li>
          ))}
        </ul>
      </div>
      <hr className="divider w-[90%] mx-auto" />
      <div className="flex flex-row gap-[1%]">
        <TextBox
          type="text"
          placeholder="eg. Cairo, Egypt"
          label="Location"
          className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
        />
        <TextBox
          type="text"
          placeholder="eg. Eastern European Time (EET), Cairo UTC +3"
          label="Timezone"
          className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
        />
      </div>
      <hr className="divider w-[90%] mx-auto" />
      <div className="flex flex-row gap-[1%]">
        <TextBox
          type="password"
          placeholder="eg. Alaa"
          label="Current Password"
          className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
        />
        <TextBox
          type="password"
          placeholder="eg. Mohamed"
          label="New Password"
          className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
        />
      </div>
      <TextBox
        type="password"
        placeholder="eg. aala_mohamed"
        label="Confirm New Password"
        className="w-[49.5%] [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
      />
      <hr className="divider w-[90%] mx-auto" />
      <div className="flex flex-row-reverse gap-6">
        <button className="btn btn-primary">Save Changes</button>
        <button className="btn btn-outline">Cancel</button>
      </div>
    </div>
  );
};

export default Profile;
