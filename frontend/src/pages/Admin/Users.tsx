import { MdEdit, MdDelete } from "react-icons/md";
import TextBox from "../../components/TextBox";
import useQuery from "@/hooks/useQuery";
import Loading from "@/components/Loading";
import { strCapitalize } from "@/utils/utils";
import { useState } from "react";

function Users() {
  const { data: users, isLoading } = useQuery<
    { name: string; email: string }[]
  >("/user/all_users", {
    filter: (data) => {
      return data.users
        .filter((user: any) => user.role === "user")
        .map((user: any) => ({
          name:
            user.first_name !== ""
              ? strCapitalize(user.first_name + " " + user.last_name)
              : user.username,
          email: user.email,
        }));
    },
  });

  const page_length = 15;
  const [page, setPage] = useState(1);

  if (isLoading || !users) return <Loading />;
  const pages = Math.ceil(users.length / page_length);

  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-3xl text-primary pt-2 pb-0">Users</h1>
      <hr className="divider w-[12rem]" />
      <div className="flex p-10">
        <TextBox
          placeholder="Search for appointment"
          className="flex-grow m-2 [&>input]:border-2 [&>input]:border-primary"
        />
        <button className="btn btn-accent m-2">Search</button>
      </div>
      <table className="table w-[90%] m-auto">
        <thead>
          <tr>
            {["ID", "Name", "Email", "Operations"].map((item, idx) => (
              <th key={idx} className="font-serif text-xl text-accent">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users
            .slice(
              page_length * (page - 1),
              Math.min(page_length * page, users.length)
            )
            .map((user, index) => (
              <tr key={index} className="hover">
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="flex gap-2">
                  <div className="tooltip tooltip-primary" data-tip="Edit">
                    <MdEdit className="text-accent cursor-pointer" />
                  </div>
                  <div className="tooltip tooltip-primary" data-tip="Delete">
                    <MdDelete className="text-error cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-10 flex flex-row justify-between">
        <p>
          Showing {Math.min(page_length * page, users.length)} out of{" "}
          {users.length} appointments
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

export default Users;
