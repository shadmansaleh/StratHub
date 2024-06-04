import { useEffect, useRef, useState } from "react";
import useAxios from "@/hooks/useAxios";
import demo_profile from "@/assets/profile_demo.png";
import TextBox from "@/components/TextBox";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { strCapitalize } from "@/utils/utils";
import { enqueueSnackbar } from "notistack";

export type ExpertProfileInfoType = {
  username: string;
  email: string;
  profile_pic: string;
  first_name: string;
  last_name: string;
  designation: string;
  phone: string;
  location: string;
  timezone: string;
  companies: string[];
  description: string;
  experience: string;
  hourly_rate: string;
};
const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile_info, setProfileInfo] = useState<ExpertProfileInfoType>({
    username: "",
    email: "",
    profile_pic: "",
    first_name: "",
    last_name: "",
    designation: "",
    phone: "",
    location: "",
    timezone: "",
    companies: [],
    description: "",
    experience: "",
    hourly_rate: "",
  });

  const [saved_profile_info, setSavedProfileInfo] =
    useState<ExpertProfileInfoType>(profile_info);

  const [editMode, setEditMode] = useState(false);
  const { axios, axiosErrHandler } = useAxios();
  const uploadProfilePicRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios
      .get("/user/get_user")
      .then((res) => {
        setProfileInfo(res.data.user);
        setSavedProfileInfo(res.data.user);
        setLoading(false);
      })
      .catch(axiosErrHandler);
  }, []);

  const formDataFollow =
    (field: string, dataName = "value") =>
    (e: any) => {
      setProfileInfo({ ...profile_info, [field]: e.target[dataName] });
    };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("/user/update_profile", profile_info)
      .then((res) => {
        setProfileInfo(res.data.user);
        setEditMode(false);
        enqueueSnackbar("Profile updated successfully", { variant: "success" });
      })
      .catch((e) => {
        axiosErrHandler(e);
        enqueueSnackbar("Profile update failed", { variant: "error" });
      });
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("Content-Type", file.type);
    axios
      .post("/storage/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setProfileInfo({
          ...profile_info,
          profile_pic: res.data.file,
        });
      })
      .catch((e) => {
        axiosErrHandler(e);
        enqueueSnackbar("Profile picture upload failed", { variant: "error" });
      });
  };

  return (
    <div className="w-[95%] mx-auto">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="text-3xl text-primary pt-2 pb-0">Expert Profile</h1>
          <hr className="divider w-[12rem]" />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row">
              <div className="avatar">
                <div className="w-24 aspect-square rounded-full m-6">
                  <img
                    src={
                      profile_info.profile_pic !== ""
                        ? __BACKEND_URL__ +
                          "/storage/" +
                          profile_info.profile_pic
                        : demo_profile
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-evenly">
                <h2 className="text-2xl text-primary font-semibold">
                  {strCapitalize(saved_profile_info.username)}
                </h2>
                <h3 className="text-xl text-primary">
                  {saved_profile_info.designation}
                </h3>
                <p className="text-md text-primary">
                  {saved_profile_info.timezone}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6">
              {editMode && (
                <div>
                  <button
                    className="btn btn-accent"
                    onClick={() => uploadProfilePicRef.current?.click()}
                  >
                    Upload a photo
                  </button>
                  <input
                    type="file"
                    ref={uploadProfilePicRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
              <button
                className={`btn ${editMode ? "btn-error" : "btn-primary"} `}
                onClick={() => {
                  if (
                    editMode &&
                    profile_info.profile_pic !== saved_profile_info.profile_pic
                  ) {
                    axios
                      .delete("/storage/" + profile_info.profile_pic)
                      .catch(axiosErrHandler);
                  }
                  setEditMode(!editMode);
                }}
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>
          </div>
          <hr className="divider w-[90%] mx-auto" />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row gap-[1%]">
              <TextBox
                type="text"
                placeholder="eg. Alaa"
                label="First Name"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.first_name}
                onChange={formDataFollow("first_name")}
              />
              <TextBox
                type="text"
                placeholder="eg. Mohamed"
                label="Last Name"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.last_name}
                onChange={formDataFollow("last_name")}
              />
            </div>
            <div className="flex flex-row gap-[1%]">
              <TextBox
                type="text"
                placeholder="eg. aala_mohamed"
                label="Username"
                className="w-[49.5%] [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.username}
                onChange={formDataFollow("username")}
              />
              <TextBox
                type="text"
                placeholder="Graphic Designer"
                label="Designation"
                className="w-[49.5%] [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.designation}
                onChange={formDataFollow("designation")}
              />
            </div>
            <hr className="divider w-[90%] mx-auto" />
            <div className="flex flex-row gap-[1%]">
              <TextBox
                type="email"
                placeholder="eg. ala@mail.com"
                label="Email"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.email}
                onChange={formDataFollow("email")}
              />
              <TextBox
                type="text"
                placeholder="eg. 0123456789"
                label="Phone Number"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.phone}
                onChange={formDataFollow("phone")}
              />
            </div>
            <hr className="divider w-[90%] mx-auto" />
            <div className="flex flex-row gap-[1%]">
              <TextBox
                type="text"
                placeholder="5 years"
                label="Experience"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.experience}
                onChange={formDataFollow("experience")}
              />
              <TextBox
                type="text"
                placeholder="50$/hour"
                label="Hourly Rate"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.hourly_rate}
                onChange={formDataFollow("hourly_rate")}
              />
            </div>
            <hr className="divider w-[90%] mx-auto" />
            <h3 className="text-xl font-semibold text-primary">Companies</h3>
            <div>
              <ul className="flex flex-col gap-6 my-6 ml-10">
                {profile_info.companies.map((company, idx) => (
                  <li key={idx} className="flex flex-row gap-2 ">
                    <BsSuitcaseLgFill
                      size="1.5rem"
                      className={`text-primary ${editMode && "mt-3"}`}
                    />
                    {editMode ? (
                      <>
                        <TextBox
                          placeholder=""
                          value={profile_info.companies[idx]}
                          onChange={(e) => {
                            const companiesCopy = [...profile_info.companies];
                            companiesCopy[idx] = e.target.value;
                            setProfileInfo({
                              ...profile_info,
                              companies: companiesCopy,
                            });
                          }}
                        />
                        <MdRemoveCircle
                          size="1.5rem"
                          className="m-3 text-error"
                          onClick={() => {
                            const companiesCopy = [...profile_info.companies];
                            companiesCopy.splice(idx, 1);
                            setProfileInfo({
                              ...profile_info,
                              companies: companiesCopy,
                            });
                          }}
                        />
                      </>
                    ) : (
                      <span className="text-lg text-primary">{company}</span>
                    )}
                  </li>
                ))}
              </ul>
              {editMode && (
                <MdAddCircle
                  size="1.5rem"
                  className="mx-10 text-accent"
                  onClick={() => {
                    setProfileInfo({
                      ...profile_info,
                      companies: [...profile_info.companies, ""],
                    });
                  }}
                />
              )}
            </div>
            <hr className="divider w-[90%] mx-auto" />
            <div className="flex flex-row gap-[1%]">
              <TextBox
                type="text"
                placeholder="eg. Cairo, Egypt"
                label="Location"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.location}
                onChange={formDataFollow("location")}
              />
              <TextBox
                type="text"
                placeholder="eg. Eastern European Time (EET), Cairo UTC +3"
                label="Timezone"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.timezone}
                onChange={formDataFollow("timezone")}
              />
            </div>
            <hr className="divider w-[90%] mx-auto" />
            <div className="flex flex-row gap-[1%]">
              <div>
                <label className="label">
                  <span className="label-text  text-primary font-semibold text-xl">
                    Description
                  </span>
                </label>
                {!editMode ? (
                  <div className="text-xl font-lora px-6 py-3 w-full md:w-[80%] mx-auto">
                    {profile_info.description}
                  </div>
                ) : (
                  <div className="w-full md:w-[80%] mx-auto ">
                    <textarea
                      placeholder="Hello, I'm a graphic designer with 5 years of experience"
                      className="flex-1 bg-base-50  p-6 rounded-xl"
                      rows={5}
                      cols={150}
                      value={profile_info.description}
                      onChange={formDataFollow("description")}
                    />
                  </div>
                )}
              </div>
            </div>

            {editMode && (
              <>
                <div className="flex flex-row-reverse gap-6">
                  <button className="btn btn-primary" type="submit">
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
