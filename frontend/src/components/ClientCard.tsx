import React from "react";
import demo_profile from "../assets/profile_demo.png";
import { useState } from "react";

interface ClientCardProps {
  name: string;
  profile_pic: string;
  expert_in: string;
  experience: number;
  price: number;
  rating: number;
  description: string;
}

function ClientCard({
  name,
  profile_pic,
  expert_in,
  experience,
  price,
  rating,
  description,
}: ClientCardProps) {
  let rating_star = [];
  for (let i = 1; i <= 5; i++) {
    rating_star.push(
      <input
        key={i}
        type="radio"
        name={`rating-${i}`}
        className={`mask mask-star-2 bg-orange-400`}
        checked={i === Math.round(rating)}
        // readOnly
      />
    );
  }
  return (
    <div className=" bg-gradient-to-tl from-primary-content to-neutral w-1/5 min-h-80 m-5 p-2 rounded-box">
      <div className="flex justify-center items-start">
        <div className="w-20 aspect-square rounded-full ml-2 my-2">
          <img src={demo_profile} alt="profile pic" />
        </div>
        <div className=" ml-3 my-2">
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-sm">
            Expert in: <span className=" text-primary">{expert_in}</span>
          </p>
          <p className="text-sm">
            Experience:{" "}
            <span className=" text-primary">{experience} years</span>
          </p>
          {/* <p className="text-sm text-secondary">Rating: <span className=" text-primary">4.5</span></p> */}
          <p className="text-sm">
            Price: <span className=" text-primary">${price}/hr</span>
          </p>
        </div>
      </div>
      {/* rating bar */}
      <div className="m-2 flex justify-center items-center">
        <form className="rating">
          {rating_star}
          <p className="text-sm text-primary m-2">{rating}</p>
        </form>
      </div>
      <div>
        <h2 className="text-sm font-bold">Description</h2>
        <p className="text-sm text-primary">{description}</p>
        <div className="flex justify-center">
          <button className="bg-primary text-white rounded-box p-2 m-2">
            Attend
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientCard;
