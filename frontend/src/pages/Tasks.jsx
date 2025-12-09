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

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";

import { api } from "../api/axiosInstance";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // Fetch tasks initially
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch Tasks API
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/today");
      setTasks(res.data.data || []);
    } catch (err) {
      console.log("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add Task
  const addTask = async () => {
    if (!form.title.trim()) return;

    try {
      const res = await api.post("/tasks", form);
      setTasks([...tasks, res.data.data]);
      setForm({ title: "", description: "" });
    } catch (err) {
      console.log("Task creation error:", err);
    }
  };

  // Mark Complete
  const completeTask = async (id) => {
    try {
      await api.patch(`/tasks/${id}`, { isCompleted: true });
      setTasks(tasks.map((t) => (t._id === id ? { ...t, isCompleted: true } : t)));
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
          Tasks Manager 📝
        </Typography>

        {/* ADD TASK FORM */}
        <Card
          sx={{
            mb: 4,
            p: 3,
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Add a new Task
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Task Title"
              variant="outlined"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <TextField
              label="Description"
              variant="outlined"
              multiline
              minRows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={addTask}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
              }}
            >
              Add Task
            </Button>
          </Stack>
        </Card>

        {/* TASKS LIST */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Your Tasks
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : tasks.length === 0 ? (
          <Typography sx={{ mt: 3, color: "gray" }}>
            No tasks yet — start by creating one! 😊
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((task) => (
              <Grid item xs={12} md={6} lg={4} key={task._id}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    background: task.isCompleted
                      ? "rgba(0,200,0,0.15)"
                      : "rgba(255,255,255,0.95)",
                    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <AssignmentIcon color="primary" />
                      <Typography variant="h6" fontWeight={700}>
                        {task.title}
                      </Typography>
                    </Stack>

                    <Typography sx={{ mt: 1, color: "gray" }}>
                      {task.description}
                    </Typography>

                    {/* STATUS */}
                    <Chip
                      label={task.isCompleted ? "Completed" : "Pending"}
                      color={task.isCompleted ? "success" : "warning"}
                      sx={{ mt: 2 }}
                    />

                    {/* ACTION BUTTONS */}
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      {!task.isCompleted && (
                        <Tooltip title="Mark Complete">
                          <IconButton
                            color="success"
                            onClick={() => completeTask(task._id)}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                      )}

                      <Tooltip title="Delete Task">
                        <IconButton
                          color="error"
                          onClick={() => deleteTask(task._id)}
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

export default Tasks;
