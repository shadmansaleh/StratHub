import { useEffect, useState, useRef } from "react";
import useAxios from "@/hooks/useAxios";
import demo_profile from "./assets/profile_demo.svg";
import TextBox from "@/components/TextBox";

export type ProfileInfoType = {
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
};
const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile_info, setProfileInfo] = useState<ProfileInfoType>({
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
  });

  const [editMode, setEditMode] = useState(false);
  const { axios, axiosErrHandler } = useAxios();
  const profilePicRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios
      .get("/user/get_user")
      .then((res) => {
        setProfileInfo(res.data.user);
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
      })
      .catch(axiosErrHandler);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("Content-Type", file.type);
    axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setProfileInfo({ ...profile_info, profile_pic: res.data.url });
      })
      .catch(axiosErrHandler);
  };

  return (
    <div className="w-[95%] mx-auto">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="text-3xl text-primary pt-2 pb-0">Profile</h1>
          <hr className="divider w-[6rem]" />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row">
              <div className="avatar">
                <div className="w-24 aspect-square rounded-full m-6">
                  <img
                    src={
                      profile_info.profile_pic !== ""
                        ? profile_info.profile_pic
                        : demo_profile
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-evenly">
                <h2 className="text-2xl text-primary font-semibold">
                  {profile_info.username}
                </h2>
                <h3 className="text-xl text-primary">
                  {profile_info.designation}
                </h3>
                <p className="text-md text-primary">{profile_info.timezone}</p>
              </div>
            </div>
            <div className="flex flex-row gap-6">
              {editMode && (
                <div>
                  <button
                    className="btn btn-accent"
                    onClick={() => profilePicRef.current?.click()}
                  >
                    Upload a photo
                  </button>
                  <input
                    type="file"
                    ref={profilePicRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
              <button
                className={`btn ${editMode ? "btn-error" : "btn-primary"} `}
                onClick={() => setEditMode(!editMode)}
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
            {editMode && (
              <>
                <hr className="divider w-[90%] mx-auto" />
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
