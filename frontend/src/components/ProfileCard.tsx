import React from "react";
import demo_profile from "../assets/profile_demo.png";
import { useState } from "react";

function ProfileCard() {
  const [rating, setRating] = React.useState(4.5);
  return (
    <div className=" bg-gradient-to-tl from-primary-content to-neutral w-1/5 min-h-80 m-5 p-2 rounded-box">
      <div className="flex justify-center items-start">
        <div className="w-20 aspect-square rounded-full ml-2 my-2">
          <img src={demo_profile} alt="profile pic" />
        </div>
        <div className=" ml-3 my-2">
          <h2 className="text-lg font-bold">John Doe</h2>
          <p className="text-sm text-secodary">
            Expert in: <span className=" text-primary">Web Development</span>
          </p>
          <p className="text-sm text-secodary">
            Experience: <span className=" text-primary">5 years</span>
          </p>
          {/* <p className="text-sm text-secondary">Rating: <span className=" text-primary">4.5</span></p> */}
          <p className="text-sm text-secodary">
            Price: <span className=" text-primary">$50/hr</span>
          </p>
        </div>
      </div>
      {/* rating bar */}
      <div className="m-2 flex justify-center items-center">
        <div className="rating">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <p className="text-sm text-primary m-2">{rating}</p>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-bold">Description</h2>
        <p className="text-sm text-primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex justify-center">
          <button className="bg-primary text-white rounded-box p-2 m-2">
            Attend
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
