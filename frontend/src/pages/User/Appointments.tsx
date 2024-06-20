import { useState } from "react";
import { CiExport } from "react-icons/ci";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import TextBox from "@/components/TextBox";
import useQuery from "@/hooks/useQuery";
import Loading from "@/components/Loading";
import { strCapitalize } from "@/utils/utils";
import moment from "moment";
import useAxios from "@/hooks/useAxios";
import { enqueueSnackbar } from "notistack";

type Appointment = {
  id: string;
  date: string;
  service: string;
  expert_name: string;
  client_name: string;
  time: string;
  duration: string;
  status: string;
};

function Appointments() {
  const { axios } = useAxios();
  const { data: userinfo, isLoading: userInfoLoading } = useQuery<{
    name: string;
    id: string;
  }>("/user/get_user", {
    filter: (res) => {
      return {
        name: strCapitalize(res.user.first_name + " " + res.user.last_name),
        id: res.user._id,
      };
    },
  });

  const {
    data: appointments,
    isLoading: appointmentsLoading,
    reload: reloadAppointments,
  } = useQuery<Appointment[]>("/user/appointments", {
    config: {
      params: {
        client: userinfo?.id,
      },
    },
    filter: (data) =>
      data.appointments.map((app: any) => ({
        id: app._id,
        date: moment(app.date).format("YYYY-MM-DD"),
        service: app.service,
        expert_name: strCapitalize(
          app.expert.first_name + " " + app.expert.last_name
        ),
        client_name: strCapitalize(
          app.client.first_name + " " + app.client.last_name
        ),
        time: moment(app.start_time, "HH:mm").format("hh:mm A"),
        duration: app.duration,
        status: app.status,
      })),
    follow: [userinfo?.id],
    blockers: [userInfoLoading],
  });

  const sortOrders = ["Date", "Name", "Duration", "Status"];
  const [Sort, setSort] = useState([sortOrders[0], true]);
  const [page, setPage] = useState(1);
  if (appointmentsLoading || appointments === null || userInfoLoading)
    return <Loading />;
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
                  key={idx}
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
            {[
              "Date",
              "Service",
              "Client Name",
              "Expert Name",
              "Time",
              "Duration",
              "Status",
            ].map((item, idx) => (
              <th key={idx} className="font-serif text-xl text-accent">
                {item}
              </th>
            ))}
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
                <td>{item.client_name}</td>
                <td>{item.expert_name}</td>
                <td>{item.time}</td>
                <td>{item.duration}</td>
                <td>
                  <details className="dropdown">
                    <summary className="m-1 btn btn-ghost font-normal">
                      {item.status}
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      {["pending", "completed", "cancelled"].map(
                        (status_item, status_idx) => (
                          <li
                            className="hover:text-accent cursor-pointer text-md"
                            key={status_idx}
                            onClick={async () => {
                              const res = await axios.post(
                                "/user/update_appointment",
                                {
                                  id: item.id,
                                  status: status_item,
                                }
                              );
                              if (res.status === 200) {
                                enqueueSnackbar("Appointment updated", {
                                  variant: "success",
                                });
                                reloadAppointments();
                              } else {
                                enqueueSnackbar("Error updating appointment", {
                                  variant: "error",
                                });
                              }
                            }}
                          >
                            {strCapitalize(status_item)}
                          </li>
                        )
                      )}
                    </ul>
                  </details>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-10 flex flex-row justify-between">
        <p>
          Showing {Math.min(page_length * page, appointments.length)} out of{" "}
          {appointments.length} appointments
        </p>
        <div className="join p-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              className={`join-item btn btn-sm ${
                i + 1 === page ? "btn-accent" : ""
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
