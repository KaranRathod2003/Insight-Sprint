import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Fade,
  CircularProgress,
} from "@mui/material";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { api } from "../api/axiosInstance";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Map moods to colors
const moodColors = {
  Happy: "#4caf50",
  Neutral: "#ffb300",
  Sad: "#e53935",
  Excited: "#1e88e5",
};

const WeeklyMood = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeeklyMood();
  }, []);

  const loadWeeklyMood = async () => {
    try {
      const res = await api.get("/mood/weekly");
      setWeeklyData(res.data.data || []);
    } catch (err) {
      console.log("Failed to load weekly mood:", err);
    } finally {
      setLoading(false);
    }
  };

  // Convert date YYYY-MM-DD → short "Mon", "Tue"
  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const moodScale = {
  Sad: 1,
  Neutral: 2,
  Happy: 3,
  Excited: 4,
};

const chartData = {
  labels: weeklyData.map((m) => formatDay(m.date)),
  datasets: [
    {
      label: "Mood Trend",
      data: weeklyData.map((m) => moodScale[m.mood] ?? 0),
      borderColor: weeklyData.map((m) => moodColors[m.mood] || "#888"),
      backgroundColor: weeklyData.map((m) => (moodColors[m.mood] || "#888") + "88"),
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 6,
      pointBackgroundColor: weeklyData.map((m) => moodColors[m.mood]),
    },
  ],
};


  const chartOptions = {
  responsive: true,
  scales: {
    y: {
      min: 1,
      max: 4,
      ticks: {
        stepSize: 1,
        callback: (value) => ["", "Sad", "Neutral", "Happy", "Excited"][value],
      },
    },
  },
  plugins: {
    legend: { display: false },
  },
};


  return (
    <Fade in timeout={500}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
          Weekly Mood Chart 📊
        </Typography>

        <Card
          sx={{
            p: 3,
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Mood Trend for the Last 7 Days
            </Typography>

            {loading ? (
              <CircularProgress />
            ) : weeklyData.length === 0 ? (
              <Typography sx={{ mt: 3, color: "gray" }}>
                No mood logs found for the last 7 days 😶
              </Typography>
            ) : (
              <Line data={chartData} options={chartOptions} />
            )}
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default WeeklyMood;
