import { useEffect, useState } from "react";
import TextBox from "@/components/TextBox";
import ExpertCard from "@/components/ExpertCard";
import useAxios from "@/hooks/useAxios";
import { enqueueSnackbar } from "notistack";
import useQuery from "@/hooks/useQuery";
import { ExpertCategory } from "@/types/backendTypes";
import { strCapitalize } from "@/utils/utils";

type expertData = {
  name: string;
  profile_pic: string;
  expert_in: string;
  experience: number;
  rating: number;
  price: number;
  description: string;
  id: string;
  is_favorite: boolean;
};

function Search() {
  const categories = Object.values(ExpertCategory);

  const [categoryActive, setCategoryActive] = useState(
    categories.map(() => false)
  );

  const [experts, setExperts] = useState<expertData[]>([]);
  const { axios, axiosErrHandler } = useAxios();
  const [query, setQuery] = useState("");

  const { data: favorites, isLoading: favoritesLoading } = useQuery<
    { id: string }[]
  >("user/favorites", {
    filter: (data) => data.favorites,
  });
  useEffect(() => {
    axios
      .get("/user/find_users", {
        params: {
          type: "expert",
          catagories: JSON.stringify(
            categories.filter((_, idx) => categoryActive[idx])
          ),
          query: query,
        },
      })
      .then((res) => {
        setExperts(
          res.data.users.map((user: any) => ({
            id: user._id,
            name:
              user.first_name !== ""
                ? strCapitalize(user.first_name + " " + user.last_name)
                : user.username,
            profile_pic: user.profile_pic,
            expert_in: user.designation,
            experience: user.experience,
            rating: user.rating,
            price: user.hourly_rate,
            description: user.description,
            is_favorite: favoritesLoading
              ? false
              : favorites?.some((fav) => fav === user._id),
          }))
        );
      })
      .catch((e) => {
        enqueueSnackbar("Failed to fetch experts", { variant: "error" });
        axiosErrHandler(e);
      });
  }, [categoryActive, query, favorites]);

  return (
    <>
      <div className="">
        <div className="bg-gradient-to-r from-blue-500 to-slate-300 text-transparent bg-clip-text m-4 p-4 flex justify-center items-center">
          <p className=" font-bold p-2 m-2 text-7xl">FIND YOUR EXPERT</p>
        </div>
        <TextBox
          placeholder="Search For Expert Advice"
          label=""
          className="w-[70%] mx-auto my-10 h-16 [&>input]:h-16 [&>input]:border-2 [&>input]:border-primary"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
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
        <div className="flex justify-center items-center flex-wrap w-[90%] m-auto gap-[1rem] my-20">
          {experts.map((expert, idx) => (
            <ExpertCard
              key={idx}
              id={expert.id}
              name={expert.name}
              profile_pic={expert.profile_pic}
              expert_in={expert.expert_in}
              experience={expert.experience}
              rating={expert.rating}
              price={expert.price}
              description={expert.description}
              is_favorite={expert.is_favorite}
            />
          ))}
        </div>
        ``
      </div>
    </>
  );
}

export default Search;
