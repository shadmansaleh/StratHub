import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState("PST");
  const [activeMember, setActiveMember] = useState<{
    name: string;
    todayTime: number;
    weeklyTime: number;
    monthlyTime: number;
  } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(e.target.value);
  };

  // Dummy data for Today's Activity, Weekly Activity, Monthly Activity, and Active Clients
  const todayActivity = 5; // Replace with actual data from the database
  const weeklyActivity = 25; // Replace with actual data from the database
  const monthlyActivity = 100; // Replace with actual data from the database
  const activeClients = 15; // Replace with actual data from the database

  // Function to dynamically add "hour" or "minute" based on the activity count
  const getActivityDisplay = (count: number): string => {
    if (count === 1) {
      return "1 h";
    } else if (count < 60) {
      return `${count} h`;
    } else {
      const minutes = count % 60;
      const hours = Math.floor(count / 60);
      return `${hours} h ${minutes} m`;
    }
  };

  // Function to get active member information
  const getActiveMemberInfo = () => {
    // Replace this with actual data fetching logic
    setActiveMember({
      name: "John Doe",
      todayTime: 2, // Dummy data for demonstration
      weeklyTime: 10, // Dummy data for demonstration
      monthlyTime: 40, // Dummy data for demonstration
    });
  };

  // Fetch active member information on component mount
  useEffect(() => {
    getActiveMemberInfo();
  }, []);

  return (
    <div className="w-full bg-base-100 dark:bg-base-800 text-base-content dark:text-base-100">
      <h1 className="text-3xl text-primary pt-2 pb-0">Dashboard</h1>
      <hr className="divider w-[12rem]" />

      <div className="container mx-auto mt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <label
              htmlFor="fromDate"
              className="text-lg font-semibold text-primary mr-4"
            >
              From:
            </label>
            <DatePicker
              id="fromDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="rounded-md border-primary border px-2 py-1"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="toDate"
              className="text-lg font-semibold text-primary mr-4"
            >
              To:
            </label>
            <DatePicker
              id="toDate"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="rounded-md border-primary border px-2 py-1"
            />
          </div>
          <div className="flex items-center ml-auto">
            <p className="text-lg font-semibold text-primary mr-4">
              {currentTime.toLocaleDateString()}{" "}
              {currentTime.toLocaleTimeString()}
            </p>
            <label
              htmlFor="timezone"
              className="text-lg font-semibold text-primary mr-4"
            >
              Timezone:
            </label>
            <select
              id="timezone"
              value={selectedTimezone}
              onChange={handleTimezoneChange}
              className="rounded-md border-primary border px-2 py-1"
            >
              <option value="PST">PST</option>
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              {/* Add more timezone options as needed */}
            </select>
          </div>
        </div>

        {/* Other components of the Dashboard will go here */}
        <div className="border border-gray-300 rounded-md p-4 bg-base-200 dark:bg-base-700">
          <div className="flex justify-between">
            {/* Today's Activity */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold text-primary mb-2">
                Today's Activity
              </h2>
              <p className="text-3xl font-bold text-primary">
                {getActivityDisplay(todayActivity)}
              </p>
            </div>
            <hr className="border-t-2 border-primary my-auto mx-4" />

            {/* Weekly Activity */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold text-primary mb-2">
                Weekly Activity
              </h2>
              <p className="text-3xl font-bold text-primary">
                {getActivityDisplay(weeklyActivity)}
              </p>
            </div>
            <hr className="border-t-2 border-primary my-auto mx-4" />

            {/* Monthly Activity */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold text-primary mb-2">
                Monthly Activity
              </h2>
              <p className="text-3xl font-bold text-primary">
                {getActivityDisplay(monthlyActivity)}
              </p>
            </div>
            <hr className="border-t-2 border-primary my-auto mx-4" />

            {/* Active Clients */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold text-primary mb-2">
                Active Clients
              </h2>
              <p className="text-3xl font-bold text-primary">{activeClients}</p>
            </div>
          </div>
        </div>

        {/* Currently Active */}
        {activeMember && (
          <div className="mt-8 border border-gray-300 rounded-md p-4 bg-base-200 dark:bg-base-700">
            <h2 className="text-lg font-semibold text-primary mb-2">
              Currently Active
            </h2>
            <p className="text-xl font-semibold text-primary">
              Name: {activeMember.name}
            </p>
            <p className="text-lg text-primary">
              Today's Time: {activeMember.todayTime} hours
            </p>
            <p className="text-lg text-primary">
              This Week's Time: {activeMember.weeklyTime} hours
            </p>
            <p className="text-lg text-primary">
              This Month's Time: {activeMember.monthlyTime} hours
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
