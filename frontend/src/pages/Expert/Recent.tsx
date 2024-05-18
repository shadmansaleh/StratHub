import React from "react";

const Recent: React.FC = () => {
  // Mock data for recent activities (replace with actual data from your backend)
  const recentActivities = [
    {
      type: "Appointment",
      date: "2024-05-10",
      details: "Appointment with Client A",
    },
    {
      type: "Consultation",
      date: "2024-05-09",
      details: "Consultation with Client B",
    },
    {
      type: "Message",
      date: "2024-05-08",
      details: "Received a message from Client C",
    },
    // Add more activities as needed
  ];

  return (
    <div className="w-full bg-base-100 dark:bg-base-800 text-base-content dark:text-base-100 w-[95%] mx-auto">
      <h1 className="text-3xl text-primary pt-2 pb-0">Recent Activity</h1>
      <hr className="divider w-[12rem]" />

      <div className="activity-list">
        {recentActivities.map((activity, index) => (
          <div
            key={index}
            className="activity-item bg-base-200 dark:bg-base-700 border border-base-300 dark:border-base-600 p-4 rounded-lg mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-lg font-semibold text-primary dark:text-primary-light">
                {activity.type}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {activity.date}
              </div>
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              {activity.details}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-8">
        <a
          href="/profile"
          className="btn btn-outline text-lg text-primary dark:text-primary-light"
        >
          Back to Profile
        </a>
      </footer>
    </div>
  );
};

export default Recent;
