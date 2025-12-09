import { useEffect, useState } from "react";
import { api } from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

// MUI
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

// Icons
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

  // 🔥 SAFE MOOD COLOR FUNCTION
  const getMoodColor = (mood) => {
    if (!mood || typeof mood !== "string") return "default";

    const normalized = mood.toLowerCase();

    if (normalized === "happy") return "success";
    if (normalized === "sad") return "error";
    if (normalized === "neutral") return "warning";
    if (normalized === "excited") return "primary";

    return "default";
  };

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

  const taskProgress =
    stats?.tasks?.total > 0
      ? (stats.tasks.completed / stats.tasks.total) * 100
      : 0;

  const habitProgress =
    stats?.habits?.total > 0
      ? (stats.habits.completed / stats.habits.total) * 100
      : 0;

  // LOADING SKELETON
  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", p: 4 }}>
        <Skeleton variant="text" width="40%" height={60} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid key={i} size={{ xs: 12, md: 4 }}>
              <Skeleton
                variant="rectangular"
                height={200}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Fade in={!loading} timeout={700}>
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
          sx={{ color: "white", mb: 1 }}
        >
          Hello, {user?.name} 👋
        </Typography>
        <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}>
          Here's your progress for today!
        </Typography>

        {/* 🔥 Stats Grid */}
        <Grid container spacing={3}>
          {/* TASKS */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                "&:hover": { transform: "translateY(-5px)" },
                transition: "0.3s",
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <AssignmentIcon color="primary" fontSize="large" />
                  <Typography variant="h6" fontWeight={700}>
                    Tasks
                  </Typography>
                </Stack>

                <Typography sx={{ mb: 1 }}>
                  Total: <Chip label={stats?.tasks?.total} color="primary" />
                </Typography>
                <Typography sx={{ mb: 1, color: "green" }}>
                  Completed:{" "}
                  <Chip label={stats?.tasks?.completed} color="success" />
                </Typography>
                <Typography sx={{ mb: 2, color: "red" }}>
                  Pending: <Chip label={stats?.tasks?.pending} color="error" />
                </Typography>

                <Tooltip title={`Completion: ${taskProgress.toFixed(0)}%`}>
                  <LinearProgress
                    variant="determinate"
                    value={taskProgress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Tooltip>
              </CardContent>
            </Card>
          </Grid>

          {/* HABITS */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                "&:hover": { transform: "translateY(-5px)" },
                transition: "0.3s",
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <CheckCircleIcon color="success" fontSize="large" />
                  <Typography variant="h6" fontWeight={700}>
                    Habits
                  </Typography>
                </Stack>

                <Typography sx={{ mb: 1 }}>
                  Total: <Chip label={stats?.habits?.total} color="primary" />
                </Typography>
                <Typography sx={{ mb: 1, color: "green" }}>
                  Completed:{" "}
                  <Chip label={stats?.habits?.completed} color="success" />
                </Typography>
                <Typography sx={{ mb: 2, color: "red" }}>
                  Pending: <Chip label={stats?.habits?.pending} color="error" />
                </Typography>

                <Tooltip title={`Completion: ${habitProgress.toFixed(0)}%`}>
                  <LinearProgress
                    variant="determinate"
                    value={habitProgress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Tooltip>
              </CardContent>
            </Card>
          </Grid>

          {/* MOOD */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                "&:hover": { transform: "translateY(-5px)" },
                transition: "0.3s",
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <SentimentSatisfiedAltIcon
                    color={getMoodColor(stats?.mood?.mood)}
                    fontSize="large"
                  />
                  <Typography variant="h6" fontWeight={700}>
                    Mood
                  </Typography>
                </Stack>

                <Typography variant="h4" fontWeight={800}>
                  {stats?.mood?.mood || "No mood logged"}
                </Typography>

                {stats?.mood?.note && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontStyle: "italic", color: "text.secondary" }}
                  >
                    Note: {stats.mood.note}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 🔥 Quick actions */}
        <Typography
          variant="h5"
          sx={{ mt: 6, mb: 2, color: "white", textAlign: "center" }}
        >
          Quick Actions
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Button
              href="/tasks"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<AddIcon />}
              sx={{ py: 2, borderRadius: 3 }}
            >
              Add Task
            </Button>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Button
              href="/habits"
              variant="contained"
              color="success"
              fullWidth
              size="large"
              startIcon={<TrackChangesIcon />}
              sx={{ py: 2, borderRadius: 3 }}
            >
              Add Habit
            </Button>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Button
              href="/mood"
              variant="contained"
              color="warning"
              fullWidth
              size="large"
              startIcon={<MoodIcon />}
              sx={{ py: 2, borderRadius: 3 }}
            >
              Log Mood
            </Button>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Button
              href="/summary"
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              startIcon={<InsightsIcon />}
              sx={{ py: 2, borderRadius: 3 }}
            >
              AI Summary
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default Dashboard;
