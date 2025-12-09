import { useEffect, useState } from "react";
import { api } from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch today's stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats/today");
        setStats(res.data.data);
      } catch (err) {
        console.log("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">

      {/* Greeting Section */}
      <h1 className="text-3xl font-bold">Hello, {user?.name} 👋</h1>
      <p className="text-gray-600 mb-6">Here’s your progress for today!</p>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <p>Total: {stats?.tasks?.total}</p>
          <p>Completed: {stats?.tasks?.completed}</p>
          <p>Pending: {stats?.tasks?.pending}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Habits</h2>
          <p>Total: {stats?.habits?.total}</p>
          <p>Completed: {stats?.habits?.completed}</p>
          <p>Pending: {stats?.habits?.pending}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Mood</h2>
          <p className="text-2xl">
            {stats?.mood?.mood || "No mood logged"}
          </p>

          {stats?.mood?.note && (
            <p className="text-gray-500 text-sm mt-1">
              Note: {stats.mood.note}
            </p>
          )}

        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="/tasks" className="p-4 bg-blue-500 text-white rounded-xl text-center font-medium">Add Task</a>
        <a href="/habits" className="p-4 bg-green-500 text-white rounded-xl text-center font-medium">Add Habit</a>
        <a href="/mood" className="p-4 bg-yellow-500 text-white rounded-xl text-center font-medium">Log Mood</a>
        <a href="/summary" className="p-4 bg-purple-500 text-white rounded-xl text-center font-medium">AI Summary</a>
      </div>

    </div>
  );
};

export default Dashboard;
