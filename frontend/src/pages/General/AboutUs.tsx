import { IconType } from "react-icons";
import { FaBriefcase, FaUsers, FaHandshake, FaCogs } from "react-icons/fa";
interface DescCardProps {
  icon: IconType;
  title: string;
  content: string;
  bg_color: string;
}
const DescCard = ({ icon, title, content, bg_color }: DescCardProps) => {
  return (
    <>
      <div
        className={`flex flex-col justify-stretch items-stretch max-w-[80%] h-[25rem] rounded-2xl p-10 shadow-xl hover:scale-105 cursor-default c-hover-enlarge text-black dark:brightness-90 ${bg_color}`}
      >
        {icon({ className: "mx-auto h-12 w-12" })}
        <h1 className="text-2xl font-semibold text-center py-4 ">{title}</h1>
        <p className="text-lg text-center">{content}</p>
      </div>
    </>
  );
};

function AboutUs() {
  return (
    <div className="">
      <div className="container mx-auto px-6 py-20 lg:max-w-[60%]">
        <h1 className="text-4xl font-semibold text-center">About Us</h1>
        <p className="text-xl text-center py-6">
          We are a team of experienced consultants with a passion for helping
          businesses succeed. Our experts have years of experience in their
          respective fields and are committed to providing the best advice and
          guidance to our clients.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
          <DescCard
            icon={FaBriefcase}
            title="Expert Consultancy"
            content="Our team of experts provides consultancy services in a wide range of subjects, including business, finance, technology, marketing, and personal development."
            bg_color="bg-purple-500"
          />
          <DescCard
            icon={FaUsers}
            title="Dedicated Team"
            content="We have a dedicated team of consultants who are committed to providing the best advice and guidance to our clients. Our experts are available to help you with any questions or concerns you may have."
            bg_color="bg-blue-500"
          />
          <DescCard
            icon={FaHandshake}
            title="Client Satisfaction"
            content="Our top priority is client satisfaction. We work closely with our clients to understand their needs and provide them with the best solutions to help them achieve their goals."
            bg_color="bg-yellow-500"
          />
          <DescCard
            icon={FaCogs}
            title="Custom Solutions"
            content="We understand that every business is unique, which is why we offer custom solutions tailored to the specific needs of our clients. Our experts will work with you to develop a strategy that is right for your business."
            bg_color="bg-red-500"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
