import { IconType } from "react-icons";
import {
  FaBriefcase,
  FaUsers,
  FaHandshake,
  FaCogs,
  FaGraduationCap,
  FaMedkit,
  FaTools,
  FaPalette,
  FaGavel,
} from "react-icons/fa";
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
        className={`flex flex-col justify-stretch items-stretch max-w-[80%] h-[30rem] rounded-2xl p-10 shadow-xl hover:scale-105 cursor-default c-hover-enlarge text-black dark:brightness-90 ${bg_color}`}
      >
        {icon({ className: "mx-auto h-12 w-12" })}
        <h1 className="text-2xl font-semibold text-center py-4 ">{title}</h1>
        <p className="text-lg text-center">{content}</p>
      </div>
    </>
  );
};

function Services() {
  return (
    <div className="">
      <div className="container mx-auto px-6 py-20 lg:max-w-[80%]">
        <h1 className="text-4xl font-semibold text-center">Our Services</h1>
        <p className="text-xl text-center py-6">
          We offer a wide range of consultancy services to help businesses grow
          and succeed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
          <DescCard
            icon={FaBriefcase}
            title="Business Consultancy"
            content="Our team of experts provides consultancy services to help businesses improve their operations, increase efficiency, and achieve their goals."
            bg_color="bg-red-500"
          />
          <DescCard
            icon={FaUsers}
            title="Marketing Consultancy"
            content="We offer marketing consultancy services to help businesses develop effective marketing strategies and reach their target audience."
            bg_color="bg-blue-500"
          />
          <DescCard
            icon={FaHandshake}
            title="Financial Consultancy"
            content="Our financial experts provide consultancy services to help businesses manage their finances, make informed decisions, and achieve financial success."
            bg_color="bg-yellow-500"
          />
          <DescCard
            icon={FaCogs}
            title="Technology Consultancy"
            content="We offer technology consultancy services to help businesses leverage technology to improve their operations, increase efficiency, and achieve their goals."
            bg_color="bg-purple-500"
          />
          <DescCard
            icon={FaGraduationCap}
            title="Educational Consultancy"
            content="Our educational consultants provide guidance and support to educational institutions, helping them improve their curriculum, teaching methods, and student outcomes."
            bg_color="bg-green-500"
          />
          <DescCard
            icon={FaMedkit}
            title="Medical Consultancy"
            content="Our team of medical experts offers consultancy services to healthcare organizations, assisting them in enhancing patient care, optimizing processes, and implementing best practices."
            bg_color="bg-indigo-500"
          />
          <DescCard
            icon={FaTools}
            title="Engineering Consultancy"
            content="We provide engineering consultancy services to help businesses in various industries with design, analysis, and implementation of engineering projects, ensuring efficiency and quality."
            bg_color="bg-pink-500"
          />
          <DescCard
            icon={FaPalette}
            title="Designing Consultancy"
            content="Our design consultants offer creative solutions and expertise in areas such as graphic design, user experience design, and product design, helping businesses create visually appealing and user-friendly products."
            bg_color="bg-orange-500"
          />
          <DescCard
            icon={FaGavel}
            title="Legal Consultancy"
            content="Our legal experts provide consultancy services to help businesses navigate legal complexities, ensure compliance, and mitigate legal risks."
            bg_color="bg-gray-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Services;
