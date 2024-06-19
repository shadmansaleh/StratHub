import demo_profile from "@/assets/profile_demo.svg";
import Loading from "@/components/Loading";
import useQuery from "@/hooks/useQuery";
import { strCapitalize } from "@/utils/utils";
import { IoLocationOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";

type userData = {
  profile_pic: string;
  name: string;
  city: string;
  designation: string;
  rating: number;
  phone: string;
  email: string;
  address: string;
  site: string;
  linkedin: string;
  reviews: Array<{
    name: string;
    rating: number;
    review: string;
  }>;
  appointment_times: Array<{
    from: string;
    to: string;
  }>;
  skill_list: Array<string>;
  work_details: Array<{
    company: string;
    designation: string;
    start_date: string;
    end_date: string;
    location: string;
    description: string;
  }>;
};

const RatingStars = (rating: number, key: string, readonly: boolean) => {
  let rating_star = [];
  if (rating !== undefined) {
    for (let i = 1; i <= 5; i++) {
      rating_star.push(
        <input
          key={i}
          type="radio"
          name={`rating-${key}`}
          className={`mask mask-star-2 bg-blue-600 dark:bg-blue-400`}
          defaultChecked={i === Math.round(rating)}
          value={i}
          readOnly={readonly}
        />
      );
    }
  }
  return rating_star;
};

function Consultant() {
  const { axios } = useAxios();

  const [searchParams] = useSearchParams();

  const {
    data: consultant,
    isLoading,
    reload: relaodConsultant,
  } = useQuery<userData>("/user/get_user", {
    config: {
      params: { id: searchParams.get("id") },
    },
    filter: (res) => {
      const user = res.user as any;
      return {
        name: strCapitalize(user.first_name + " " + user.last_name),
        profile_pic: user.profile_pic,
        city: user.city,
        designation: user.designation,
        rating: user.rating,
        phone: user.phone,
        email: user.email,
        address: user.location,
        site: user.links.site,
        linkedin: user.links.linkedin,
        reviews: user.reviews,
        appointment_times: user.appointment_times,
        skill_list: user.skill_list,
        work_details: user.work_details,
      };
    },
  });

  const { data: userinfo } = useQuery<{
    name: string;
  }>("/user/get_user", {
    filter: (res) => {
      return {
        name: strCapitalize(res.user.first_name + " " + res.user.last_name),
      };
    },
  });

  if (isLoading || consultant === null) return <Loading />;

  const submit_review = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let rating: number = 0;
    if (data.get("rating-review-rating") !== null)
      rating = parseInt(data.get("rating-review-rating") as string);
    const review = data.get("review");

    const res = await axios.post("/user/add_review", {
      target: searchParams.get("id"),
      name: userinfo?.name,
      review: review,
      rating: rating,
    });
    if (res.status === 200) {
      e.target.reset();
      relaodConsultant();
    }
  };

  return (
    <>
      <div className="flex gap-10 h-full overflow-hidden">
        <div className="flex flex-col h-[90vh] w-[25%] overflow-y-scroll overflow-x-clip no-scrollbar">
          <img
            src={
              consultant.profile_pic
                ? __BACKEND_URL__ + "/storage/" + consultant.profile_pic
                : demo_profile
            }
            alt=""
            className="rounded-full w-[70%] aspect-square mx-auto my-10"
          />

          <div className="flex flex-col">
            <div className="divider divider-accent w-[80%] mx-auto my-10 opacity-70">
              <h3>Work</h3>
            </div>
            {consultant.work_details.map((work, idx) => (
              <div key={idx} className="w-full mx-auto my-2 ml-10">
                <h3 className="text-2xl text-accent font-semibold">
                  {work.company}
                </h3>
                <p className="text-lg ">{work.designation}</p>
                <p className="text-sm">
                  {work.start_date} - {work.end_date}
                </p>
                <p className="text-sm">{work.location}</p>
                <p className="text-sm">{work.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="divider divider-accent w-[80%] mx-auto my-10 opacity-70">
              <h3>Skills</h3>
            </div>
            <div className="flex flex-wrap ml-10">
              {consultant.skill_list.map((skill, idx) => (
                <div
                  key={idx}
                  className="badge badge-outline border-1 mx-2 my-2 p-2"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[90vh] flex-1 overflow-y-auto overflow-x-clip pt-28 no-scrollbar mr-10">
          <div className="flex items-center">
            <h3 className="text-4xl font-semibold">{consultant.name}</h3>
            <IoLocationOutline className="text-accent ml-6" size={20} />
            <h4 className="text-lg">{consultant.city}</h4>
            <button className="btn btn-xs btn-warning ml-auto">Report</button>
          </div>
          <h3 className="text-lg text-accent my-2">{consultant.designation}</h3>
          <div className="flex">
            <h3 className="text-lg font-semibold mt-4 opacity-50">Ratings:</h3>
            {consultant.rating && (
              <div className="my-2 flex justify-start items-center">
                <form className="rating translate-y-[30%] mx-4">
                  {RatingStars(consultant.rating, "rating", true)}
                </form>
              </div>
            )}
          </div>

          <div className="flex gap-4 my-4">
            <button className="btn btn-accent text-white dark:text-black">
              Get Appointment
            </button>
            <button className="btn btn-secondary">Message</button>
            <button className="btn btn-secondary">Contact</button>
          </div>
          <div className="mt-10">
            <h3 className="text-2xl opacity-75 mb-5">Appointment Times</h3>
            <div className="flex flex-row flex-wrap gap-4 mx-20">
              {consultant.appointment_times.map((time, idx) => (
                <div
                  key={idx}
                  className="flex  items-center card card-compact shadow-md bg-secondary m-2 p-4"
                >
                  <p className="text-md">
                    {time.from} - {time.to}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl opacity-75 my-6">Contact Information</h3>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <div className="ml-6">
                  {consultant.phone && (
                    <div className="flex items-center">
                      <p className="text-lg">Phone: </p>
                      <p className="text-lg ml-2">{consultant.phone}</p>
                    </div>
                  )}
                  {consultant.email && (
                    <div className="flex items-center">
                      <p className="text-lg ">Email: </p>
                      <p className="text-lg ml-2">{consultant.email}</p>
                    </div>
                  )}

                  {consultant.address && (
                    <div className="flex items-center">
                      <p className="text-lg">Address: </p>
                      <p className="text-lg ml-2">{consultant.address}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                {consultant.email && (
                  <div className="flex items-center">
                    <p className="text-lg">Email: </p>
                    <p className="text-lg ml-2 text-accent">
                      {consultant.email}
                    </p>
                  </div>
                )}
                {consultant.site && (
                  <div className="flex items-center">
                    <p className="text-lg">Website: </p>
                    <p className="text-lg ml-2 text-accent">
                      {consultant.site}
                    </p>
                  </div>
                )}
                {consultant.linkedin && (
                  <div className="flex items-center">
                    <p className="text-lg">LinkedIn: </p>
                    <p className="text-lg ml-2 text-accent">
                      {consultant.linkedin}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* reviews */}
          <div className="flex flex-col">
            <h3 className="text-2xl opacity-75 mt-10">Reviews</h3>
            <div className="">
              {consultant.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex flex-col card shadow-md bg-secondary m-6 p-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <form className="rating">
                      {RatingStars(review.rating, `review-rating-${idx}`, true)}
                      <p className="text-sm text-primary m-2">
                        {review.rating}
                      </p>
                    </form>
                  </div>
                  <p className="text-lg">{review.review}</p>
                </div>
              ))}
            </div>
          </div>
          {/* review box */}
          <div className="flex flex-col">
            {/* input box to write review */}
            <h3 className="text-2xl opacity-75 mt-10">
              How was your experience?
            </h3>
            <div className="flex flex-col card shadow-md bg-base-200 m-6 p-6">
              <form className="" onSubmit={submit_review}>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-normal -translate-y-2">
                    {userinfo?.name}
                  </h3>
                  <div className="rating">
                    {RatingStars(0, "review-rating", false)}
                    <p className="text-sm text-primary m-2">Rating</p>
                  </div>
                </div>
                <textarea
                  className="w-full h-20 p-2 rounded-xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                  placeholder="Write your review here"
                  name="review"
                ></textarea>
                <input
                  type="submit"
                  className="btn btn-accent text-white dark:text-black mt-2 w-full"
                  value="Submit Review"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consultant;
