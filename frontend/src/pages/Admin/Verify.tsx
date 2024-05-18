import React from "react";
import TextBox from "../../components/TextBox";
import { MdDelete, MdEdit, MdInfo } from "react-icons/md";

function Verify() {
  let verification_requests = [
    {
      name: "Erik Roberts",
      email: "john@mail.com",
    },
    {
      name: "Jane Doe",
      email: "john@mail.com",
    },

    {
      name: "Erik Roberts",
      email: "john@mail.com",
    },
    {
      name: "Jane Doe",
      email: "john@mail.com",
    },
    {
      name: "Erik Roberts",
      email: "john@mail.com",
    },
    {
      name: "Jane Doe",
      email: "john@mail.com",
    },
    {
      name: "Erik Roberts",
      email: "john@mail.com",
    },
    {
      name: "Erik Roberts",
      email: "john@mail.com",
    },
    {
      name: "Jane Doe",
      email: "john@mail.com",
    },
    {
      name: "Jane Doe",
      email: "john@mail.com",
    },
  ];
  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-3xl text-primary pt-2 pb-0">Verify</h1>
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
          {verification_requests.map((user, index) => (
            <tr key={index} className="hover">
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="flex gap-2">
                <MdEdit className="text-accent cursor-pointer" />
                <MdDelete className="text-error  cursor-pointer" />
                <MdInfo className="text-info  cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10 flex flex-row justify-between">
        <p>Showing 10 out of 78 experts</p>
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

export default Verify;
