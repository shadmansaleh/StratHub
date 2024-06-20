import { Link } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";

interface ExpertCardProps {
  name: string;
  profile_pic: string;
  expert_in: string;
  experience: number;
  price: number;
  rating: number;
  description: string;
  id: string;
  is_favorite: boolean;
  only_favorite_visible?: boolean;
}

function ExpertCard({
  name,
  profile_pic,
  expert_in,
  experience,
  price,
  rating,
  description,
  id,
  is_favorite,
  only_favorite_visible,
}: ExpertCardProps) {
  return (
    <ProfileCard
      name={name}
      profile_pic={profile_pic}
      is_favorite={is_favorite}
      only_favorite_visible={only_favorite_visible}
      id={id}
      info={
        <>
          <p className="text-sm">
            Expert in: <span className=" text-primary">{expert_in}</span>
          </p>
          <p className="text-sm">
            Experience:{" "}
            <span className=" text-primary">{experience} years</span>
          </p>
          {/* <p className="text-sm text-secondary">Rating: <span className=" text-primary">4.5</span></p> */}
          <p className="text-sm">
            Price: <span className=" text-primary">{price}$/hr</span>
          </p>
        </>
      }
      rating={rating}
      description={description}
    >
      <Link
        to={`${__BASE_URL__}/user/consultant?id=${id}`}
        className="btn btn-primary mx-4 my-5 p-4 w-8/12"
      >
        More Info
      </Link>
    </ProfileCard>
  );
}

export default ExpertCard;
