import ClientCard from "@/components/ClientCard";
import demo_profile from "@/assets/profile_demo.png";

function Clients() {
  let clients = [];
  for (let i = 0; i < 10; i++) {
    clients.push({
      name: "John Doe",
      profile_pic: demo_profile,
      expert_in: "Web Development",
      experience: 5,
      rating: 4,
      price: 50,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    });
  }
  return (
    <div className="w-[95%] mx-auto">
      <div>
        <h1 className="text-3xl text-primary pt-2 pb-0">Clients</h1>
      </div>
      <hr className="divider w-[12rem]" />
      <div className="flex justify-center items-center flex-wrap w-[90%] m-auto gap-[1rem]">
        {clients.map((client, idx) => (
          <ClientCard
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
    </div>
  );
}

export default Clients;
