import demo_profile from "@/assets/profile_demo.png";
import { ReactNode } from "react";

interface ProfileCard {
  name: string;
  profile_pic?: string;
  info?: ReactNode;
  rating?: number;
  description?: string;
  children?: ReactNode;
}

function ProfileCard({
  name,
  profile_pic,
  info,
  rating,
  description,
  children,
}: ProfileCard) {
  let rating_star = [];
  if (rating !== undefined) {
    for (let i = 1; i <= 5; i++) {
      rating_star.push(
        <input
          key={i}
          type="radio"
          name={`rating-${i}`}
          className={`mask mask-star-2 bg-orange-400`}
          checked={i === Math.round(rating)}
          readOnly
        />
      );
    }
  }
  return (
    <div className=" bg-gradient-to-tl from-primary-content to-neutral w-1/5 min-h-80 m-5 p-2 rounded-box">
      <div className="flex justify-center items-start">
        <div className="w-20 aspect-square rounded-full ml-2 my-2">
          <img
            src={profile_pic ? profile_pic : demo_profile}
            alt="profile pic"
          />
        </div>
        <div className=" ml-3 my-2">
          <h2 className="text-lg font-bold">{name}</h2>
          {info && info}
        </div>
      </div>
      {/* rating bar */}
      {rating && (
        <div className="m-2 flex justify-center items-center">
          <form className="rating">
            {rating_star}
            <p className="text-sm text-primary m-2">{rating}</p>
          </form>
        </div>
      )}
      <div>
        {description && (
          <>
            <h2 className="text-sm font-bold">description</h2>
            <p className="text-sm text-primary">{description}</p>
          </>
        )}
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  );
}

export default ProfileCard;
