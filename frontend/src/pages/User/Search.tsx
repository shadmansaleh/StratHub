import { useState } from "react";
import TextBox from "../../components/TextBox";

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
      </div>
    </>
  );
}

export default Search;
