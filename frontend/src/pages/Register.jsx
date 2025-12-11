import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  CircularProgress,
  Fade,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { api } from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    setErrorMsg("");
    if (!form.name || !form.email || !form.password) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", form);

      const { user, accessToken } = res.data.data;

      login(user, accessToken);
      setSuccess(true);

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.log(err);
      setErrorMsg(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          p: 3,
        }}
      >
        <Card
          sx={{
            width: 420,
            borderRadius: 4,
            p: 3,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            color: "white",
            animation: "fadeSlide 0.6s ease",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              sx={{ mb: 2 }}
            >
              Create Account ✨
            </Typography>

            <Typography
              textAlign="center"
              sx={{ mb: 4, opacity: 0.8 }}
            >
              Join InsightSprint & start tracking your productivity!
            </Typography>

            <Stack spacing={3}>
              <TextField
                label="Full Name"
                variant="filled"
                InputProps={{
                  startAdornment: <PersonAddAltIcon sx={{ mr: 1, color: "#fff" }} />,
                }}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                }}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <TextField
                label="Email"
                variant="filled"
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: "#fff" }} />,
                }}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                }}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <TextField
                label="Password"
                type="password"
                variant="filled"
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: "#fff" }} />,
                }}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                }}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
              {success && <Alert severity="success">Account created! Redirecting...</Alert>}

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleRegister}
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                {loading ? <CircularProgress size={26} color="inherit" /> : "Create Account"}
              </Button>

              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={{ color: "white", textTransform: "none" }}
              >
                Already have an account? Login
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Little Animation Keyframes */}
        <style>
          {`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
        </style>
      </Box>
    </Fade>
  );
};

export default Register;
