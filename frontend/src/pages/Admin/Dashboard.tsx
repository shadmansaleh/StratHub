import React from "react";

function Dashboard() {
  // Dashboard for admin page
  return (
    <div className="bg-base-100 dark:bg-base-800 text-base-content dark:text-base-100 w-[95%] mx-auto">
      <h1 className="text-3xl text-primary pt-2 pb-0">Dashboard</h1>
      <hr className="divider w-[12rem]" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Cards */}
        <div className="card bordered items-center">
          <div className="card-body items-center">
            <h2 className="card-title">Users</h2>
            <div className="text-2xl text-primary">5,000</div>
          </div>
        </div>
        <div className="card bordered items-center">
          <div className="card-body items-center">
            <h2 className="card-title">Experts</h2>
            <div className="text-2xl text-primary">500</div>
          </div>
        </div>
        <div className="card bordered items-center">
          <div className="card-body items-center">
            <h2 className="card-title">Appointments</h2>
            <div className="text-2xl  text-primary">100</div>
          </div>
        </div>
        <div className="card bordered items-center">
          <div className="card-body items-center">
            <h2 className="card-title">Reports</h2>
            <div className="text-2xl text-primary">10</div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Yearly Report</h2>
            <div className="p-2">
              <img
                src="https://quickchart.io/chart?c={type:'line',data:{labels:['January','February','March','April','May','June','July','August','September','October','November','December'],datasets:[{label:'Revenue',data:[12,19,3,5,2,3,10,15,20,30,45,50]}]}}"
                alt="Chart"
              />
            </div>
          </div>
        </div>

        {/* user visit diagram */}
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">User Visit</h2>
            <div className="p-2">
              <img
                src="https://quickchart.io/chart?c={type:'bar',data:{labels:['January','February','March','April','May','June','July','August','September','October','November','December'],datasets:[{label:'Users',data:[12,19,3,5,2,3,10,15,20,30,45,50]}]}}"
                alt="Chart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
