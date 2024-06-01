function ExpertDashboard() {
  // Dashboard for expert page
  return (
    <div className="bg-base-100 dark:bg-base-800 text-base-content dark:text-base-100 w-[95%] mx-auto">
      <h1 className="text-3xl text-primary pt-2 pb-0">Expert Dashboard</h1>
      <hr className="divider w-[12rem]" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Cards */}
        <div className="card bordered items-center">
          <div className="card-body items-center">
            <h2 className="card-title">Appointments</h2>
            <div className="text-2xl text-primary">25</div>
          </div>
        </div>
        <div className="card bordered items-center">
          <div className="card-body items-center">
            <h2 className="card-title">Sessions Completed</h2>
            <div className="text-2xl text-primary">20</div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Appointment Trends */}
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Appointment Trends</h2>
            <div className="p-2">
              <img
                src="https://quickchart.io/chart?c={type:'line',data:{labels:['January','February','March','April','May','June','July','August','September','October','November','December'],datasets:[{label:'Appointments',data:[5,10,15,20,25,20,15,10,5,10,15,20]}]}}"
                alt="Chart"
              />
            </div>
          </div>
        </div>

        {/* Session Duration */}
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Session Duration</h2>
            <div className="p-2">
              <img
                src="https://quickchart.io/chart?c={type:'bar',data:{labels:['0-15 min','16-30 min','31-45 min','46-60 min'],datasets:[{label:'Duration',data:[10,5,3,2]}]}}"
                alt="Chart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertDashboard;
