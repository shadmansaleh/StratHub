import { useEffect, useRef, useState } from "react";
import useAxios from "@/hooks/useAxios";
import demo_profile from "@/assets/profile_demo.png";
import TextBox from "@/components/TextBox";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { IoMdPricetag } from "react-icons/io";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { strCapitalize } from "@/utils/utils";
import { enqueueSnackbar } from "notistack";
import Loading from "@/components/Loading";
import { ExpertCategory } from "@/types/backendTypes";

/*
appointment time
city
expert in
linkedin
site
skills
work details
 */
export type ExpertProfileInfoType = {
  appointment_times: Array<{ from: string; to: string }>;
  city: string;
  description: string;
  designation: string;
  expert_in: string;
  email: string;
  experience: number;
  first_name: string;
  hourly_rate: number;
  last_name: string;
  location: string;
  phone: string;
  profile_pic: string;
  timezone: string;
  username: string;
  skill_list: Array<string>;
  links: { linkedin: string; site: string };
  work_details: Array<{
    company: string;
    designation: string;
    start_date: string;
    end_date: string;
    location: string;
    description: string;
  }>;
};

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile_info, setProfileInfo] = useState<ExpertProfileInfoType>({
    appointment_times: [],
    city: "",
    description: "",
    designation: "",
    expert_in: "",
    email: "",
    experience: 0,
    first_name: "",
    hourly_rate: 0,
    last_name: "",
    location: "",
    phone: "",
    profile_pic: "",
    timezone: "",
    username: "",
    skill_list: [],
    links: { linkedin: "", site: "" },
    work_details: [],
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

  if (loading || profile_info === null) return <Loading />;

  const formDataFollow = (field: string, type?: string) => (e: any) => {
    let value = e.target.value;
    if (type && type === "number")
      value = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
    setProfileInfo({ ...profile_info, [field]: value });
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
            <div className="flex flex-col gap-[1%]">
              <label htmlFor="" className="label">
                <span className="label-text text-primary font-semibold text-xl">
                  Expert in
                </span>
              </label>
              <details className="dropdown px-4">
                <summary className="m-1 btn btn-outline font-normal">
                  {profile_info.expert_in}
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                  {Object.values(ExpertCategory).map((category, idx) => (
                    <li
                      key={idx}
                      onClick={() =>
                        setProfileInfo({ ...profile_info, expert_in: category })
                      }
                    >
                      <a>{strCapitalize(category)}</a>
                    </li>
                  ))}
                </ul>
              </details>
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
                value={profile_info.experience.toString()}
                onChange={formDataFollow("experience", "number")}
              />
              <TextBox
                type="text"
                placeholder="50"
                label="Hourly Rate"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.hourly_rate.toString()}
                onChange={formDataFollow("hourly_rate", "number")}
              />
            </div>
            <hr className="divider w-[90%] mx-auto" />
            <h3 className="text-xl font-semibold text-primary">
              Work Experience
            </h3>
            <div>
              <ul className="flex flex-col gap-6 my-6 ml-10">
                {profile_info.work_details.map((info, idx: number) => (
                  <li key={idx} className="flex flex-row gap-2 ">
                    <BsSuitcaseLgFill
                      size="1.5rem"
                      className={`text-primary ${editMode && "mt-3"}`}
                    />
                    {editMode ? (
                      <>
                        <div className="flex flex-row gap-2 flex-wrap">
                          <TextBox
                            placeholder="Company Name (eg. Google)"
                            value={info.company}
                            className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                            onChange={(e) => {
                              const work_details_copy = [
                                ...profile_info.work_details,
                              ];
                              work_details_copy[idx].company = e.target.value;
                              setProfileInfo({
                                ...profile_info,
                                work_details: work_details_copy,
                              });
                            }}
                          />
                          <TextBox
                            placeholder="Designation (eg. Graphic Designer)"
                            value={info.designation}
                            className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                            onChange={(e) => {
                              const work_details_copy = [
                                ...profile_info.work_details,
                              ];
                              work_details_copy[idx].designation =
                                e.target.value;
                              setProfileInfo({
                                ...profile_info,
                                work_details: work_details_copy,
                              });
                            }}
                          />
                          <TextBox
                            placeholder="Start Date (eg. 2020-01-01)"
                            value={info.start_date}
                            className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                            onChange={(e) => {
                              const work_details_copy = [
                                ...profile_info.work_details,
                              ];
                              work_details_copy[idx].start_date =
                                e.target.value;
                              setProfileInfo({
                                ...profile_info,
                                work_details: work_details_copy,
                              });
                            }}
                          />
                          <TextBox
                            placeholder="End Date (eg. 2021-01-01)"
                            value={info.end_date}
                            className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                            onChange={(e) => {
                              const work_details_copy = [
                                ...profile_info.work_details,
                              ];
                              work_details_copy[idx].end_date = e.target.value;
                              setProfileInfo({
                                ...profile_info,
                                work_details: work_details_copy,
                              });
                            }}
                          />
                          <TextBox
                            placeholder="Location"
                            value={info.location}
                            className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                            onChange={(e) => {
                              const work_details_copy = [
                                ...profile_info.work_details,
                              ];
                              work_details_copy[idx].location = e.target.value;
                              setProfileInfo({
                                ...profile_info,
                                work_details: work_details_copy,
                              });
                            }}
                          />
                          <TextBox
                            placeholder="Description (eg. I was a graphic designer)"
                            value={info.description}
                            className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                            onChange={(e) => {
                              const work_details_copy = [
                                ...profile_info.work_details,
                              ];
                              work_details_copy[idx].description =
                                e.target.value;
                              setProfileInfo({
                                ...profile_info,
                                work_details: work_details_copy,
                              });
                            }}
                          />
                        </div>
                        <MdRemoveCircle
                          size="1.5rem"
                          className="m-3 text-error"
                          onClick={() => {
                            const work_details_copy = [
                              ...profile_info.work_details,
                            ];
                            work_details_copy.splice(idx, 1);
                            setProfileInfo({
                              ...profile_info,
                              work_details: work_details_copy,
                            });
                          }}
                        />
                      </>
                    ) : (
                      <span className="text-lg text-primary">
                        {info.company}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {editMode && (
                <MdAddCircle
                  size="1.5rem"
                  className="mx-10 text-accent -translate-y-4"
                  onClick={() => {
                    setProfileInfo({
                      ...profile_info,
                      work_details: [
                        ...profile_info.work_details,
                        {
                          company: "",
                          designation: "",
                          start_date: "",
                          end_date: "",
                          location: "",
                          description: "",
                        },
                      ],
                    });
                  }}
                />
              )}
            </div>
            <h3 className="text-xl font-semibold text-primary">Skills</h3>
            <div>
              <ul className="flex flex-row flex-wrap gap-6 my-6 ml-10">
                {profile_info.skill_list.map((skill, idx: number) => (
                  <li key={idx} className="flex flex-row gap-2 ">
                    <IoMdPricetag
                      size="1.5rem"
                      className={`text-primary ${editMode && "mt-3"}`}
                    />
                    {editMode ? (
                      <>
                        <div className="flex flex-row gap-2 flex-wrap">
                          <TextBox
                            placeholder="skill tags (eg. Graphic Design, Photoshop)"
                            value={skill}
                            className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                            onChange={(e) => {
                              const skills_copy = [...profile_info.skill_list];
                              skills_copy[idx] = e.target.value;
                              setProfileInfo({
                                ...profile_info,
                                skill_list: skills_copy,
                              });
                            }}
                          />
                        </div>
                        <MdRemoveCircle
                          size="1.5rem"
                          className="m-3 text-error"
                          onClick={() => {
                            const skills_copy = [...profile_info.skill_list];
                            skills_copy.splice(idx, 1);
                            setProfileInfo({
                              ...profile_info,
                              skill_list: skills_copy,
                            });
                          }}
                        />
                      </>
                    ) : (
                      <span className="text-lg text-primary">
                        {strCapitalize(skill)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {editMode && (
                <MdAddCircle
                  size="1.5rem"
                  className="mx-10 text-accent -translate-y-4"
                  onClick={() => {
                    setProfileInfo({
                      ...profile_info,
                      skill_list: [...profile_info.skill_list, ""],
                    });
                  }}
                />
              )}
            </div>
            <hr className="divider w-[90%] mx-auto" />
            <h3 className="text-xl font-semibold text-primary">
              Appointment Schedules
            </h3>
            <div>
              <ul className="flex flex-row flex-wrap gap-6 my-6 ml-10">
                {profile_info.appointment_times.map((time, idx: number) => (
                  <li key={idx} className="flex flex-row gap-2 ">
                    <IoMdPricetag
                      size="1.5rem"
                      className={`text-primary ${editMode && "mt-3"}`}
                    />
                    {editMode ? (
                      <>
                        <div className="flex flex-row gap-2 flex-wrap">
                          <TextBox
                            placeholder="18:00"
                            value={time.from}
                            className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                            onChange={(e) => {
                              const appointments_copy = [
                                ...profile_info.appointment_times,
                              ];
                              appointments_copy[idx].from = e.target.value;
                              setProfileInfo({
                                ...profile_info,
                                appointment_times: appointments_copy,
                              });
                            }}
                          />
                          <TextBox
                            placeholder="20:00"
                            value={time.to}
                            className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                            onChange={(e) => {
                              const appointments_copy = [
                                ...profile_info.appointment_times,
                              ];
                              appointments_copy[idx].to = e.target.value;
                              setProfileInfo({
                                ...profile_info,
                                appointment_times: appointments_copy,
                              });
                            }}
                          />
                        </div>
                        <MdRemoveCircle
                          size="1.5rem"
                          className="m-3 text-error"
                          onClick={() => {
                            const appointments_copy = [
                              ...profile_info.appointment_times,
                            ];
                            appointments_copy.splice(idx, 1);
                            setProfileInfo({
                              ...profile_info,
                              appointment_times: appointments_copy,
                            });
                          }}
                        />
                      </>
                    ) : (
                      <div
                        key={idx}
                        className="flex  items-center card card-compact shadow-md bg-secondary m-2 p-4"
                      >
                        <p className="text-md">
                          {time.from} - {time.to}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {editMode && (
                <MdAddCircle
                  size="1.5rem"
                  className="mx-10 text-accent -translate-y-4"
                  onClick={() => {
                    setProfileInfo({
                      ...profile_info,
                      appointment_times: [
                        ...profile_info.appointment_times,
                        { from: "", to: "" },
                      ],
                    });
                  }}
                />
              )}
            </div>
            <hr className="divider w-[90%] mx-auto" />
            <div className="flex flex-row gap-[1%]">
              <TextBox
                type="text"
                placeholder="LA"
                label="City"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.city}
                onChange={formDataFollow("city")}
              />
              <TextBox
                type="text"
                placeholder="eg. Cairo, Egypt"
                label="Address"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-semibold [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.location}
                onChange={formDataFollow("location")}
              />
            </div>
            <div className="flex flex-row gap-[1%]">
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
            <label className="label">
              <span className="label-text text-primary font-semibold text-xl">
                Links
              </span>
            </label>
            <div className="flex flex-row gap-[1%]">
              <TextBox
                type="text"
                placeholder="eg. linkedin.com/in/alaa_mohamed"
                label="Linkedin"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-normal [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.links.linkedin}
                onChange={(e) =>
                  setProfileInfo({
                    ...profile_info,
                    links: { ...profile_info.links, linkedin: e.target.value },
                  })
                }
              />
              <TextBox
                type="text"
                placeholder="eg. alaa.com"
                label="Site"
                className="flex-1 [&>label>span]:text-xl [&>label>span]:text-primary [&>label>span]:font-normal [&>input]:bg-base-50"
                nobox={!editMode}
                value={profile_info.links.site}
                onChange={(e) =>
                  setProfileInfo({
                    ...profile_info,
                    links: { ...profile_info.links, site: e.target.value },
                  })
                }
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
