import { useState } from "react";
import TextBox from "../../components/TextBox";
import ExpertCard from "../../components/ExpertCard";

function Search() {
  const categories = [
    "Explore",
    "Learning",
    "Health",
    "Desging System",
    "Mobile Design",
    "Desging System",
    "Desging System",
    "Desging System",
    "Desging System",
    "Mobile Design",
    "Mobile Design",
    "Mobile Design",
    "Mobile Design",
    "Desging System",
  ];

  const [categoryActive, setCategoryActive] = useState(
    categories.map(() => false)
  );

  let experts = [];
  for (let i = 0; i < 15; i++) {
    experts.push({
      name: "John Doe",
      expert_in: "Web Development",
      experience: 5,
      rating: 3.5,
      price: 50,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    });
  }

  return (
    <>
      <div className="">
        <div className="bg-gradient-to-r from-blue-500 to-slate-300 text-transparent bg-clip-text m-4 p-4 flex justify-center items-center">
          <p className=" font-bold p-2 m-2 text-7xl">FIND YOUR EXPERT</p>
        </div>
        <div className="flex justify-center items-center">
          <ul className=" ml-32 mr-32 flex justify-center items-center flex-wrap">
            {categories.map((item, idx) => (
              <li
                className={`btn btn-outline opacity-50 m-1 ${
                  categoryActive[idx] &&
                  "bg-primary text-primary-content border-primary"
                }`}
                key={idx}
                onClick={() => {
                  let categoryActiveCpy = categoryActive.map((item) => item);
                  categoryActiveCpy[idx] = !categoryActiveCpy[idx];
                  setCategoryActive(categoryActiveCpy);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className=" m-8">
          <p className="text-6xl flex justify-center font-normal">
            Explore Experts Around The World
          </p>
          <p className="text-2xl flex justify-center font-normal">
            Explore, and choose the best advisor for you and Glorify Your Skill
          </p>
        </div>
        <TextBox
          placeholder="Search For Expert Advice"
          label=""
          className="w-[70%] mx-auto"
        />
        <div className="flex justify-center items-center flex-wrap w-[90%] m-auto gap-[1rem]">
          {experts.map((client, idx) => (
            <ExpertCard
              key={idx}
              name={client.name}
              profile_pic={client.profile_pic}
              expert_in={client.expert_in}
              experience={client.experience}
              rating={client.rating}
              price={client.price}
              description={client.description}
            />
          ))}
        </div>
        ``
      </div>
    </>
  );
}

export default Search;
