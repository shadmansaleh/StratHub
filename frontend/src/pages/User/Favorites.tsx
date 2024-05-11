import React from "react";
import TextBox from "../../components/TextBox";
import ExpertCard from "../../components/ExpertCard";
import demo_profile from "./Profile/assets/profile_demo.svg"

function Favorites() {
  let experts = [];
  for (let i = 0; i < 15; i++) {
    experts.push({
      name: "John Doe",
      profile_pic: demo_profile,
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
        <h1 className="text-3xl text-primary pt-2 pb-0">Favorites</h1>
        <hr className="divider w-[12rem]" />
        <div className="flex justify-center items-center flex-wrap w-[90%] m-auto gap-[1rem] my-20">
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

export default Favorites;
