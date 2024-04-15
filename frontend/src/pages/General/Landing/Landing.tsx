import { Link } from "react-router-dom";
import hero_img from "./assets/hero_img.png";
import hero_img2 from "./assets/hero_img2.png";
import desc_logo1 from "./assets/desc_card_logo1.png";
import desc_logo2 from "./assets/desc_card_logo2.png";
import desc_logo3 from "./assets/desc_card_logo3.png";
import desc_logo4 from "./assets/desc_card_logo4.png";
import desc_logo5 from "./assets/desc_card_logo5.png";
import { scrollTo } from "../../../utils/ScrollUtils";

const Home = () => {
  return (
    <>
      <Hero_1 />
      <Hero_2 />
      <PointerCards />
      <FAQ />
    </>
  );
};

const Hero_1 = () => (
  <div className="hero min-h-screen">
    <div className="hero-content flex-col lg:flex-row gap-10 lg:gap-24 max-w-[90vw]">
      <div>
        <h1 className="c-text-xl">Connecting users with industry experts</h1>
        <p className="py-6 text-center">
          Discover and engage with top professionals in various fields.
        </p>
        <div className="flex justify-center gap-10">
          <Link
            to="/login"
            className="btn btn-lg btn-primary text-2xl font-light px-5 py-4"
          >
            Get Started
          </Link>
          <button
            onClick={scrollTo("FAQ")}
            className="btn btn-lg btn-outline btn-primary text-2xl font-light px-5 py-4"
          >
            Learn More
          </button>
        </div>
      </div>
      <img
        src={hero_img}
        className="max-w-3xl rounded-3xl shadow-2xl hover-enlarge"
      />
    </div>
  </div>
);

const Hero_2 = () => (
  <div className="hero min-h-screen">
    <div className="hero-content flex-col lg:flex-row gap-10 lg:gap-24 max-w-[90vw]">
      <img
        src={hero_img2}
        className="max-w-3xl rounded-3xl shadow-2xl hover-enlarge"
      />
      <div>
        <h1 className="text-5xl font-bold text-center">
          Find Experts for Personalized Advice or Consultation
        </h1>
        <p className="py-6 text-center">
          Discover a wide range of experts in various fields who are ready to
          provide personalized advice or consultation tailored to your specific
          needs.
        </p>
        <div className="flex justify-center gap-10">
          <button
            onClick={scrollTo("FAQ")}
            className="btn btn-lg btn-primary text-2xl font-light px-5 py-4"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
);

const PointerCards = () => (
  <div className="grid place-items-center min-h-screen m-auto">
    <div className="flex flex-col justify-evenly h-full w-full gap-5">
      <div className="flex sm:flex-col lg:flex-row items-center justify-evenly gap-5">
        <DescCard
          icon={desc_logo1}
          title="Discover the Power of 
Expertise"
          content="Our platform connects you with verified experts in
 various fields, ensuring you receive
 top-quality advice and solutions."
          bg_color="bg-green-200"
        />
        <DescCard
          icon={desc_logo2}
          title="Tailored Solutions for Your Business"
          content="We provide customized solutions to meet your unique business needs. Our experts work closely with you to understand your challenges and goals."
          bg_color="bg-blue-200"
        />

        <DescCard
          icon={desc_logo3}
          title="Experience Unmatched Efficiency"
          content="Our consultants leverage their vast experience and industry knowledge to deliver efficient solutions that drive your business growth."
          bg_color="bg-red-200"
        />
      </div>
      <div className="flex sm:flex-col lg:flex-row items-center justify-evenly gap-5">
        <DescCard
          icon={desc_logo4}
          title="Innovate with Confidence"
          content="Our consultancy services empower you to innovate with confidence. We provide the guidance and support you need to navigate through complex business scenarios."
          bg_color="bg-yellow-200"
        />
        <DescCard
          icon={desc_logo5}
          title="Transform Your Business"
          content="Our strategic insights and innovative approach can help transform your business. We aim to drive change that leads to substantial improvements in performance."
          bg_color="bg-purple-200"
        />
      </div>
    </div>
  </div>
);

const FAQ = () => (
  <div className="hero min-h-screen" id="FAQ">
    <div className="hero-content flex-col lg:flex-row gap-10 lg:gap-24 max-w-[90vw]">
      <div>
        <h1 className="text-5xl font-bold text-center">
          Frequently Asked Questions
        </h1>
        <p className="py-6 text-center">
          Find answers to common questions about our consultancy services and
          how to engage with our experts.
        </p>
        <div className="flex justify-center gap-10">
          <button
            onClick={scrollTo("Footer")}
            className="btn btn-lg btn-primary text-2xl font-light px-5 py-4"
          >
            Contact Us
          </button>
        </div>
      </div>
      <ul className="list-disc">
        <li>
          <h1 className="text-xl font-semibold">How can I get consultancy?</h1>
          <p className="text-lg py-4">
            To get consultancy, simply reach out to our experts through our
            contact form or give us a call. They will guide you through the
            process.
          </p>
        </li>
        <li>
          <h1 className="text-xl font-semibold">What subjects do we cover?</h1>
          <p className="text-lg py-4">
            We cover a wide range of subjects, including but not limited to
            business, finance, technology, marketing, and personal development.
          </p>
        </li>
        <li>
          <h1 className="text-xl font-semibold">How much does it cost?</h1>
          <p className="text-lg py-4">
            The cost of consultancy varies depending on the subject and the
            duration of the engagement. Please contact us for more details.
          </p>
        </li>
        <li>
          <h1 className="text-xl font-semibold">
            Can I request a specific expert?
          </h1>
          <p className="text-lg py-4">
            Yes, you can request a specific expert based on their expertise and
            availability. We will do our best to accommodate your request.
          </p>
        </li>
        <li>
          <h1 className="text-xl font-semibold">How long does it take?</h1>
          <p className="text-lg py-4">
            The duration of the consultancy engagement depends on the complexity
            of the subject and the scope of the project. Our experts will
            provide you with an estimated timeline.
          </p>
        </li>
      </ul>
    </div>
  </div>
);

interface DescCardProps {
  icon: string;
  title: string;
  content: string;
  bg_color: string;
}

const DescCard = ({ icon, title, content, bg_color }: DescCardProps) => {
  return (
    <>
      <div
        className={`flex flex-col max-w-80 h-full rounded-2xl p-10 shadow-xl hover:scale-105 cursor-default hover-enlarge text-black dark:brightness-90 ${bg_color}`}
      >
        <img
          src={icon}
          alt="desc card icon"
          className="mx-auto max-h-8 max-w-8"
        />
        <h1 className="text-2xl font-semibold text-center py-4 ">{title}</h1>
        <p className="text-lg text-center">{content}</p>
      </div>
    </>
  );
};

export default Home;
