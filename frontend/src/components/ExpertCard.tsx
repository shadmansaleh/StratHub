import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";

interface ExpertCardProps {
  name: string;
  profile_pic: string;
  expert_in: string;
  experience: number;
  price: number;
  rating: number;
  description: string;
}

function ExpertCard({
  name,
  profile_pic,
  expert_in,
  experience,
  price,
  rating,
  description,
}: ExpertCardProps) {
  return (
    <ProfileCard
      name={name}
      profile_pic={profile_pic}
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
            Price: <span className=" text-primary">${price}/hr</span>
          </p>
        </>
      }
      rating={rating}
      description={description}
    >
      <Link to="/user/consultant" className="btn btn-primary mx-auto my-5 p-4">
        More Info
      </Link>
      <button className="btn btn-accent mx-auto my-5 p-4">Hire</button>
    </ProfileCard>
  );
}

export default ExpertCard;
