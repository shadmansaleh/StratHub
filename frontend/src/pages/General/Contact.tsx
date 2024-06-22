import { FaGithub, FaLinkedin } from "react-icons/fa";
import avatar from "@/assets/contact_avatar.jpg";
import { enqueueSnackbar } from "notistack";

function Contact() {
  return (
    <div className="container mx-auto my-10 min-h-[100vh] w-full">
      <h1 className="text-5xl font-semibold text-center mt-20 mb-40 font-poppins">
        Contact Us
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="col-span-2">
          <h2 className="text-3xl text-accent font-poppins">Contact Form</h2>
          <form
            className="mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              enqueueSnackbar(
                "Sorry Contact Form is not working currently. Please send an Email",
                {
                  variant: "error",
                }
              );
            }}
          >
            <div className="form-control">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="input input-primary"
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="input input-primary"
              />
            </div>
            <div className="form-control">
              <label htmlFor="message" className="label">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Enter your message"
                className="textarea textarea-primary"
              ></textarea>
            </div>
            <button className="btn btn-primary mt-5 w-full">Submit</button>
          </form>
        </div>
        <div className="col-span-1">
          <img
            src={avatar}
            alt="dev-image"
            className="w-full aspect-square rounded-full relative xl:left-[35%] top-[10%] shadow-2xl"
          />
        </div>
        <div className="col-span-1 text-right">
          <h2 className="text-3xl text-accent font-poppins">
            Find The Developer
          </h2>
          <h3 className="text-2xl  text-primary text-right my-4 italic">
            Shadman Saleh
          </h3>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Email</h3>
            <a
              href="mailto:shadman@mail.com text-right"
              className="text-accent"
            >
              shadmansaleh3@gmail.com
            </a>
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold ">Phone</h3>
            <p className=" text-right">+123-456-7890</p>
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Address</h3>
            <p>Chittagong, Bangladesh</p>
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Social Media</h3>
            <div className="flex gap-4 justify-end">
              <a
                href="https://github.com/shadmansaleh"
                className="text-3xl text-right"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/shadman-saleh"
                className="text-3xl"
              >
                <FaLinkedin className="text-blue-600" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
