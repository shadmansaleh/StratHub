import ExpertCard from "@/components/ExpertCard";
import useQuery from "@/hooks/useQuery";
import Loading from "@/components/Loading";
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
};

function Favorites() {
  const { data: favorites, isLoading: favoritesLoading } = useQuery<
    expertData[]
  >("/user/favorites", {
    config: {
      params: {
        populate_data: "true",
      },
    },
    filter: (data) =>
      data.favorites.map((favorite: any) => ({
        name:
          favorite.first_name !== ""
            ? strCapitalize(favorite.first_name + " " + favorite.last_name)
            : favorite.username,
        id: favorite._id,
        profile_pic: favorite.profile_pic,
        expert_in: favorite.designation,
        experience: favorite.experience,
        rating: favorite.rating,
        price: favorite.hourly_rate,
        description: favorite.description,
      })),
  });

  return (
    <>
      <div className=" w-[95%] mx-auto">
        <h1 className="text-3xl text-primary pt-2 pb-0">Favorites</h1>
        <hr className="divider w-[12rem]" />
        <div className="flex justify-center items-center flex-wrap w-[90%] m-auto gap-[1rem] my-20">
          {favoritesLoading && <Loading />}
          {favorites?.map((client, idx) => (
            <ExpertCard
              key={idx}
              id={client.id}
              name={client.name}
              profile_pic={client.profile_pic}
              expert_in={client.expert_in}
              experience={client.experience}
              rating={client.rating}
              price={client.price}
              description={client.description}
              is_favorite={true}
              only_favorite_visible={true}
            />
          ))}
        </div>
        ``
      </div>
    </>
  );
}

export default Favorites;
