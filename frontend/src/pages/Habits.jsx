import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Chip,
  Stack,
  Fade,
  Tooltip,
} from "@mui/material";

import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WhatshotIcon from "@mui/icons-material/Whatshot"; // 🔥 streak icon
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech"; // 🏆 longest streak

import { api } from "../api/axiosInstance";

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
  });

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await api.get("/habits/today");
      setHabits(res.data.data || []);
    } catch (err) {
      console.log("Failed to load habits:", err);
    } finally {
      setLoading(false);
    }
  };

  const addHabit = async () => {
    if (!form.title.trim()) return;

    try {
      const res = await api.post("/habits", form);
      setHabits([...habits, res.data.data]);
      setForm({ title: "" });
    } catch (err) {
      console.log("Habit creation error:", err);
    }
  };

  const completeHabit = async (id) => {
    try {
      const res = await api.patch(`/habits/${id}`);

      // backend returns updated habit including streak
      const updatedHabit = res.data.data;

      setHabits(habits.map(h => (h._id === id ? updatedHabit : h)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHabit = async (id) => {
    try {
      await api.delete(`/habits/${id}`);
      setHabits(habits.filter((h) => h._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
          Habit Tracker 🔥
        </Typography>

        {/* ADD HABIT FORM */}
        <Card
          sx={{
            mb: 4,
            p: 3,
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Add new Habit
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Habit Title"
              variant="outlined"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={addHabit}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
              }}
            >
              Add Habit
            </Button>
          </Stack>
        </Card>

        {/* HABITS LIST */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Your Habits
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : habits.length === 0 ? (
          <Typography sx={{ mt: 3, color: "gray" }}>
            No habits yet — start by creating one! 🌱
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {habits.map((habit) => (
              <Grid item xs={12} md={6} lg={4} key={habit._id}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    background: habit.isCompleted
                      ? "rgba(0,200,0,0.15)"
                      : "rgba(255,255,255,0.95)",
                    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <CardContent>
                    {/* Title Row */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <TrackChangesIcon color="success" />
                      <Typography variant="h6" fontWeight={700}>
                        {habit.title}
                      </Typography>
                    </Stack>

                    {/* STATUS CHIP */}
                    <Chip
                      label={habit.isCompleted ? "Completed" : "Pending"}
                      color={habit.isCompleted ? "success" : "warning"}
                      sx={{ mt: 2 }}
                    />

                    {/* 🔥 STREAK INFO */}
                    <Stack spacing={1} sx={{ mt: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <WhatshotIcon color="error" />
                        <Typography fontWeight={600}>
                          Streak: {habit.streakCount || 0} days
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <MilitaryTechIcon color="primary" />
                        <Typography fontWeight={600}>
                          Longest: {habit.longestStreak || 0} days
                        </Typography>
                      </Stack>

                      {habit.lastCompletedDate && (
                        <Typography sx={{ color: "gray", mt: 1 }}>
                          Last Completed: {habit.lastCompletedDate}
                        </Typography>
                      )}
                    </Stack>

                    {/* ACTION BUTTONS */}
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      {!habit.isCompleted && (
                        <Tooltip title="Mark Complete">
                          <IconButton
                            color="success"
                            onClick={() => completeHabit(habit._id)}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                      )}

                      <Tooltip title="Delete Habit">
                        <IconButton
                          color="error"
                          onClick={() => deleteHabit(habit._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Fade>
  );
};

export default Habits;
