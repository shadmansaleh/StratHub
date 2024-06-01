import dp from "./assets/profile.jpg";
import { IoLocationOutline } from "react-icons/io5";

function Consultant() {
  const profile_pic = dp;
  const work_details = [
    {
      company: "Google",
      designation: "Software Engineer",
      start_date: "2019-01-01",
      end_date: "2020-01-01",
      location: "Mountain View, CA",
      description: "Worked on the search team",
    },
    {
      company: "Facebook",
      designation: "Software Engineer",
      start_date: "2020-01-01",
      end_date: "2021-01-01",
      location: "Menlo Park, CA",
      description: "Worked on the ads team",
    },
  ];
  const name = "John Doe";
  const city = "San Francisco, CA";
  const designation = "Software Engineer";
  const rating = 4.5;
  const phone = "123-456-7890";
  const email = "jondoe@mail.com";
  const address = "123, Main Street, San Francisco, CA";
  const site = "www.johndoe.com";
  const linkedin = "www.linkedin.com/johndoe";
  const reviews = [
    {
      name: "Aramis Roy",
      rating: 5,
      review: "Appriciate the help, great consultant",
    },
    {
      name: "Kiran Kumar",
      rating: 4,
      review: "Great consultant, helped me a lot",
    },
    {
      name: "Arshad Ali",
      rating: 5,
      review: "Definitely recommend",
    },
  ];

  const appointment_times = [
    { from: "10:00", to: "13:00" },
    { from: "18:00", to: "22:00" },
  ];

  const skill_list = ["Python", "Java", "C++", "React", "Node.js"];

  let rating_star = [];
  if (rating !== undefined) {
    for (let i = 1; i <= 5; i++) {
      rating_star.push(
        <input
          key={i}
          type="radio"
          name={`rating-${i}`}
          className={`mask mask-star-2 bg-blue-400`}
          checked={i === Math.round(rating)}
          readOnly
        />
      );
    }
  }
  return (
    <>
      <div className="flex gap-10 h-full overflow-hidden">
        <div className="flex flex-col h-[90vh] w-[25%] overflow-y-scroll overflow-x-clip no-scrollbar">
          <img
            src={profile_pic}
            alt=""
            className="rounded-full w-[70%] aspect-square mx-auto my-10"
          />

          <div className="flex flex-col">
            <div className="divider divider-accent w-[80%] mx-auto my-10 opacity-70">
              <h3>Work</h3>
            </div>
            {work_details.map((work, idx) => (
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
              {skill_list.map((skill, idx) => (
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
            <h3 className="text-4xl font-semibold">{name}</h3>
            <IoLocationOutline className="text-accent ml-6" size={20} />
            <h4 className="text-lg">{city}</h4>
            <button className="btn btn-xs btn-warning ml-auto">Report</button>
          </div>
          <h3 className="text-lg text-accent my-2">{designation}</h3>
          <div className="flex">
            <h3 className="text-lg font-semibold mt-4 opacity-50">Ratings:</h3>
            {rating && (
              <div className="my-2 flex justify-start items-center">
                <form className="rating translate-y-[30%] mx-4">
                  {rating_star}
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
              {appointment_times.map((time, idx) => (
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
            <h3 className="text-2xl opacity-75 mt-10">Reviews</h3>
            <div className="">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex flex-col card shadow-md bg-secondary m-6 p-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <form className="rating">
                      {rating_star}
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
          <div className="flex flex-col">
            <h3 className="text-2xl opacity-75 my-6">Contact Information</h3>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <div className="ml-6">
                  <div className="flex items-center">
                    <p className="text-lg">Phone: </p>
                    <p className="text-lg ml-2">{phone}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-lg ">Email: </p>
                    <p className="text-lg ml-2">{email}</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-lg">Address: </p>
                    <p className="text-lg ml-2">{address}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="text-lg">Email: </p>
                  <p className="text-lg ml-2 text-accent">{email}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-lg">Website: </p>
                  <p className="text-lg ml-2 text-accent">{site}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-lg">LinkedIn: </p>
                  <p className="text-lg ml-2 text-accent">{linkedin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consultant;
