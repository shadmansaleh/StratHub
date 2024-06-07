import demo_profile from "@/assets/profile_demo.svg";
import useAxios from "@/hooks/useAxios";
import { strCapitalize } from "@/utils/utils";
import { ReactNode, useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface ProfileCard {
  name: string;
  id: string;
  profile_pic?: string;
  info?: ReactNode;
  rating?: number;
  description?: string;
  children?: ReactNode;
  is_favorite?: boolean;
  only_favorite_visible?: boolean;
}

function ProfileCard({
  name,
  id,
  profile_pic,
  info,
  rating,
  description,
  children,
  is_favorite,
  only_favorite_visible,
}: ProfileCard) {
  const { axios } = useAxios();
  let rating_star = [];

  const [is_favorite_state, setIsFavorite] = useState<boolean | undefined>(
    is_favorite
  );

  useEffect(() => {
    setIsFavorite(is_favorite);
  }, [is_favorite]);

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

  const toggleFavorite = async () => {
    if (is_favorite_state) {
      await axios.post("/user/remove_favorite", {
        favorite_id: id,
      });
      setIsFavorite(false);
    } else {
      axios.post("/user/add_favorite", { favorite_id: id });
      setIsFavorite(true);
    }
  };

  if (only_favorite_visible && !is_favorite_state) return <></>;
  return (
    <div className=" bg-gradient-to-tl from-primary-content to-neutral min-h-80 m-5 p-2 rounded-box w-[20rem] h-[24rem]">
      <div className="flex justify-center items-start">
        <div className="w-20 aspect-square rounded-full ml-2 my-2">
          <img
            src={
              profile_pic
                ? __BACKEND_URL__ + "/storage/" + profile_pic
                : demo_profile
            }
            className="rounded-full w-20 h-20 object-cover"
            alt="profile pic"
          />
        </div>
        <div className=" ml-3 my-2">
          <div className="flex justify-between m-2">
            <h2 className="text-lg font-bold">{strCapitalize(name)}</h2>
            {is_favorite_state !== undefined && (
              <>
                {is_favorite_state ? (
                  <MdFavorite
                    className="text-2xl text-primary ml-6 cursor-pointer"
                    onClick={toggleFavorite}
                  />
                ) : (
                  <MdFavoriteBorder
                    className="text-2xl text-primary ml-6 cursor-pointer"
                    onClick={toggleFavorite}
                  />
                )}
              </>
            )}
          </div>
          {info && info}
        </div>
      </div>
      {/* rating bar */}
      {rating !== undefined && (
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
