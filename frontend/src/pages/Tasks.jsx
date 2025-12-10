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



import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";


import { api } from "../api/axiosInstance";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);



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

  // Open Edit Modal
  const handleEditClick = (task) => {
    setEditTask(task);
    setEditOpen(true);
  };

  // Update Task API
  const updateTask = async () => {
    if (!editTask.title.trim()) return;

    try {
      const res = await api.put(`/tasks/${editTask._id}`, {
        title: editTask.title,
        description: editTask.description,
      });

      // Update UI instantly
      setTasks(tasks.map((t) => (t._id === editTask._id ? res.data.data : t)));

      setEditOpen(false);
    } catch (err) {
      console.log("Task update error:", err);
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

                      <Tooltip title="Edit Task">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(task)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* EDIT TASK MODAL */}
        <Modal open={editOpen} onClose={() => setEditOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Edit Task
            </Typography>

            <TextField
              label="Task Title"
              fullWidth
              sx={{ mb: 2 }}
              value={editTask?.title || ""}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              sx={{ mb: 3 }}
              value={editTask?.description || ""}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.3, borderRadius: 2 }}
              onClick={updateTask}
            >
              Save Changes
            </Button>
          </Box>
        </Modal>

      </Box>
    </Fade>
  );
};

export default Tasks;
