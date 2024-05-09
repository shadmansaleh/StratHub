import { CiExport } from "react-icons/ci";

function Appointments() {
  return (
    <div className="m-10">
      <div className="flex">
        <h3 className="text-2xl font-normal">Appointments</h3>
        <button className="btn btn-sm btn-ghost ml-auto font-light">
          <CiExport size={20} />
          Export CSV
        </button>
      </div>
    </div>
  );
}

export default Appointments;
