import { useState } from "react";
import { CiExport } from "react-icons/ci";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import TextBox from "../../components/TextBox";

function Appointments() {
  const appointments = [
    {
      date: "2021-09-01",
      service: "Web Development",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-02",
      service: "Health Checkup",
      expert_name: "John Doe",
      duration: "30min",
      status: "Pending",
    },
    {
      date: "2021-09-03",
      service: "Legal Advice",
      expert_name: "John Doe",
      duration: "30min",
      status: "Pending",
    },
    {
      date: "2021-09-04",
      service: "Web Development",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-05",
      service: "Business Consultation",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-06",
      service: "Web Development",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-01",
      service: "Web Development",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-02",
      service: "Health Checkup",
      expert_name: "John Doe",
      duration: "30min",
      status: "Pending",
    },
    {
      date: "2021-09-03",
      service: "Legal Advice",
      expert_name: "John Doe",
      duration: "30min",
      status: "Pending",
    },
    {
      date: "2021-09-04",
      service: "Web Development",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-05",
      service: "Business Consultation",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-06",
      service: "Web Development",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-01",
      service: "Web Development",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-02",
      service: "Health Checkup",
      expert_name: "John Doe",
      duration: "30min",
      status: "Pending",
    },
    {
      date: "2021-09-03",
      service: "Legal Advice",
      expert_name: "John Doe",
      duration: "30min",
      status: "Pending",
    },
    {
      date: "2021-09-04",
      service: "Web Development",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-05",
      service: "Business Consultation",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
    {
      date: "2021-09-06",
      service: "Web Development",
      expert_name: "John Doe",
      duration: "30min",
      status: "Completed",
    },
  ];
  const sortOrders = ["Date", "Name", "Duration", "Status"];
  const [Sort, setSort] = useState([sortOrders[0], true]);
  const [page, setPage] = useState(1);
  let page_length = 15;
  let pages = Math.ceil(appointments.length / page_length);
  return (
    <div className="m-10">
      <div className="flex mb-4">
        <h1 className="text-3xl text-primary pt-2 pb-0">Appointments</h1>
        <button className="btn btn-sm btn-ghost ml-auto font-light">
          <CiExport size={20} />
          Export CSV
        </button>
      </div>
      <hr className="divider w-[12rem]" />
      <div className="">
        <div className="flex">
          <TextBox
            placeholder="Search for appointment"
            className="flex-grow m-2 [&>input]:border-2 [&>input]:border-primary"
          />
          <button className="btn btn-accent m-2">Search</button>
          <details className="dropdown m-1 ">
            <summary className="btn">
              {Sort[1] ? <FaArrowDown /> : <FaArrowUp />} {Sort[0]}
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              {sortOrders.map((item, idx) => (
                <li
                  onClick={() => setSort([item, Sort[1]])}
                  className="hover:text-accent"
                >
                  {item}
                </li>
              ))}
              <div className="divider m-0 py-1 w-full"></div>
              <li
                onClick={() => setSort([Sort[0], !Sort[1]])}
                className="hover:text-accent"
              >
                Ascending
              </li>
              <li
                onClick={() => setSort([Sort[0], !Sort[1]])}
                className="hover:text-accent"
              >
                Descending
              </li>
            </ul>
          </details>
        </div>
      </div>
      <table className="table w-full mt-10">
        <thead>
          <tr className="">
            {["Date", "Service", "Expert Name", "Duration", "Status"].map(
              (item, idx) => (
                <th key={idx} className="font-serif text-xl text-accent">
                  {item}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {appointments
            .slice(
              page_length * (page - 1),
              Math.min(page_length * page, appointments.length)
            )
            .map((item, idx) => (
              <tr key={idx} className="hover py-6">
                <td>{item.date}</td>
                <td>{item.service}</td>
                <td>{item.expert_name}</td>
                <td>{item.duration}</td>
                <td>{item.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-10 flex flex-row justify-between">
        <p>
          Showing {page_length} out of {appointments.length} appointments
        </p>
        <div className="join p-2">
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn  btn-sm btn-disabled">...</button>
          <button className="join-item btn btn-sm">99</button>
          <button className="join-item btn btn-sm">100</button>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
