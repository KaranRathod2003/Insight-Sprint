import { useEffect, useState } from "react";
import { api } from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

// MUI Components
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  LinearProgress,
  Tooltip,
  Fade,
  Skeleton,
} from "@mui/material";

// MUI Icons
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoodIcon from "@mui/icons-material/Mood";
import InsightsIcon from "@mui/icons-material/Insights";
import AddIcon from "@mui/icons-material/Add";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch stats
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

  // Calculate progress percentages
  const taskProgress = stats?.tasks?.total > 0 ? (stats.tasks.completed / stats.tasks.total) * 100 : 0;
  const habitProgress = stats?.habits?.total > 0 ? (stats.habits.completed / stats.habits.total) * 100 : 0;

  // Mood color mapping
const getMoodColor = (mood = "") => {
  const moodMap = {
    happy: "success",
    sad: "error",
    neutral: "warning",
    angry: "error",
    tired: "info",
    sick: "secondary"
  };
  return moodMap[mood.toLowerCase()] || "default";
};


  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", p: 4, bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <Skeleton variant="text" width="40%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="60%" height={30} sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} md={4} key={i}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
        <Skeleton variant="text" width="30%" height={40} sx={{ mt: 6, mb: 2 }} />
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={6} md={3} key={i}>
              <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Fade in={!loading} timeout={1000}>
      <Box
        sx={{
          minHeight: "100vh",
          p: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Greeting */}
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            mb: 1,
          }}
        >
          Hello, {user?.name} 👋
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "rgba(255,255,255,0.8)",
            mb: 4,
            fontWeight: 500,
          }}
        >
          Here's your progress for today!
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          {/* TASKS */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.9)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <AssignmentIcon color="primary" fontSize="large" />
                  <Typography variant="h6" fontWeight={700} color="primary">
                    Tasks
                  </Typography>
                </Stack>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Total: <Chip label={stats?.tasks?.total} color="primary" size="small" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "green" }}>
                  Completed: <Chip label={stats?.tasks?.completed} color="success" size="small" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: "red" }}>
                  Pending: <Chip label={stats?.tasks?.pending} color="error" size="small" />
                </Typography>
                <Tooltip title={`Completion: ${taskProgress.toFixed(0)}%`} arrow>
                  <LinearProgress
                    variant="determinate"
                    value={taskProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(0,0,0,0.1)",
                      "& .MuiLinearProgress-bar": { borderRadius: 4 },
                    }}
                  />
                </Tooltip>
              </CardContent>
            </Card>
          </Grid>

          {/* HABITS */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.9)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <CheckCircleIcon color="success" fontSize="large" />
                  <Typography variant="h6" fontWeight={700} color="success.main">
                    Habits
                  </Typography>
                </Stack>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Total: <Chip label={stats?.habits?.total} color="primary" size="small" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "green" }}>
                  Completed: <Chip label={stats?.habits?.completed} color="success" size="small" />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: "red" }}>
                  Pending: <Chip label={stats?.habits?.pending} color="error" size="small" />
                </Typography>
                <Tooltip title={`Completion: ${habitProgress.toFixed(0)}%`} arrow>
                  <LinearProgress
                    variant="determinate"
                    value={habitProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(0,0,0,0.1)",
                      "& .MuiLinearProgress-bar": { borderRadius: 4 },
                    }}
                  />
                </Tooltip>
              </CardContent>
            </Card>
          </Grid>

          {/* MOOD */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.9)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <SentimentSatisfiedAltIcon color={getMoodColor(stats?.mood?.mood)} fontSize="large" />
                  <Typography variant="h6" fontWeight={700} color={`${getMoodColor(stats?.mood?.mood)}.main`}>
                    Mood
                  </Typography>
                </Stack>
                <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                  {stats?.mood?.mood || "No mood logged"}
                </Typography>
                {stats?.mood?.note && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: "italic" }}>
                    Note: {stats.mood.note}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Action Buttons */}
        <Typography
          variant="h5"
          sx={{
            mt: 6,
            mb: 3,
            color: "white",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Quick Actions
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Tooltip title="Add a new task" arrow>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                href="/tasks"
                sx={{
                  py: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
                startIcon={<AddIcon />}
              >
                Add Task
              </Button>
            </Tooltip>
          </Grid>

          <Grid item xs={6} md={3}>
            <Tooltip title="Track a new habit" arrow>
              <Button
                fullWidth
                variant="contained"
                color="success"
                size="large"
                href="/habits"
                sx={{
                  py: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
                startIcon={<TrackChangesIcon />}
              >
                Add Habit
              </Button>
            </Tooltip>
          </Grid>

          <Grid item xs={6} md={3}>
            <Tooltip title="Log your current mood" arrow>
              <Button
                fullWidth
                variant="contained"
                color="warning"
                size="large"
                href="/mood"
                sx={{
                  py: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
                startIcon={<MoodIcon />}
              >
                Log Mood
              </Button>
            </Tooltip>
          </Grid>

          <Grid item xs={6} md={3}>
            <Tooltip title="Get AI-powered insights" arrow>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                href="/summary"
                sx={{
                  py: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
                startIcon={<InsightsIcon />}
              >
                AI Summary
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default Dashboard;
