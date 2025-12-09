import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Fade,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";

import MoodIcon from "@mui/icons-material/Mood";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

import { api } from "../api/axiosInstance";

const moodOptions = [
  { label: "Happy", icon: <InsertEmoticonIcon fontSize="large" />, color: "success" },
  { label: "Neutral", icon: <SentimentNeutralIcon fontSize="large" />, color: "warning" },
  { label: "Sad", icon: <SentimentVeryDissatisfiedIcon fontSize="large" />, color: "error" },
  { label: "Excited", icon: <SentimentSatisfiedAltIcon fontSize="large" />, color: "primary" },
];

const MoodPage = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch today's mood
  useEffect(() => {
    fetchMood();
  }, []);

  const fetchMood = async () => {
    try {
      const res = await api.get("/mood");
      if (res.data?.data) {
        setSelectedMood(res.data.data.mood || "");
        setNote(res.data.data.note || "");
      }
    } catch (err) {
      console.log("Failed to load mood:", err);
    } finally {
      setLoading(false);
    }
  };

  const submitMood = async () => {
    if (!selectedMood) return alert("Please select a mood first!");

    try {
      await api.post("/mood", { mood: selectedMood, note });
      fetchMood();
      alert("Mood updated!");
    } catch (err) {
      console.log("Failed to submit mood:", err);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
          Mood Logger 😊
        </Typography>

        <Card
          sx={{
            p: 3,
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            mb: 4,
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            How are you feeling today?
          </Typography>

          <Grid container spacing={3}>
            {moodOptions.map((mood) => (
              <Grid item xs={6} md={3} key={mood.label}>
                <Tooltip title={mood.label} arrow>
                  <Card
                    onClick={() => setSelectedMood(mood.label)}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      borderRadius: 4,
                      cursor: "pointer",
                      transition: "0.3s",
                      boxShadow:
                        selectedMood === mood.label
                          ? "0 5px 20px rgba(0,0,0,0.3)"
                          : "0 3px 10px rgba(0,0,0,0.1)",
                      transform:
                        selectedMood === mood.label ? "scale(1.05)" : "scale(1)",
                      "&:hover": { transform: "scale(1.07)" },
                    }}
                  >
                    <Typography color={mood.color} sx={{ mb: 1 }}>
                      {mood.icon}
                    </Typography>
                    <Chip
                      label={mood.label}
                      color={mood.color}
                      variant={selectedMood === mood.label ? "filled" : "outlined"}
                      sx={{ fontWeight: 600 }}
                    />
                  </Card>
                </Tooltip>
              </Grid>
            ))}
          </Grid>

          {/* Note Input */}
          <TextField
            label="Add a note (optional)"
            fullWidth
            multiline
            minRows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{ mt: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={submitMood}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              width: "100%",
            }}
            startIcon={<MoodIcon />}
          >
            Save Mood
          </Button>
        </Card>
      </Box>
    </Fade>
  );
};

export default MoodPage;
