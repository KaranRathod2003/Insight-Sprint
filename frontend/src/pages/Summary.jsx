import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Fade,
  CircularProgress,
  Divider,
  Stack,
  Chip,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { api } from "../api/axiosInstance";

const Summary = () => {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [summaryData, setSummaryData] = useState(null);

  const generateSummary = async () => {
    setLoading(true);

    try {
      const res = await api.post("/ai/summary", { notes });
      setAiSummary(res.data.data.aiSummary);
      setSummaryData(res.data.data.summaryData);
    } catch (err) {
      console.log("Summary generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
          AI Daily Summary 🤖✨
        </Typography>

        {/* Input Section */}
        <Card
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Add Notes (Optional)
          </Typography>

          <TextField
            placeholder="Anything specific about your day?"
            fullWidth
            multiline
            minRows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<SmartToyIcon />}
            onClick={generateSummary}
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: 3,
              fontWeight: 700,
              width: "100%",
            }}
          >
            Generate AI Summary
          </Button>
        </Card>

        {/* Loading */}
        {loading && (
          <Box textAlign="center" sx={{ mt: 4 }}>
            <CircularProgress size={50} />
            <Typography sx={{ mt: 2, fontWeight: 600 }}>
              AI is analyzing your day...
            </Typography>
          </Box>
        )}

        {/* Actual AI Output */}
        {!loading && aiSummary && (
          <Fade in timeout={500}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                background: "linear-gradient(135deg, #f5f9ff, #eef3ff)",
                mt: 4,
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                📌 Your Day Summary (AI Generated)
              </Typography>

              <Box
                sx={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                  background: "white",
                  p: 2.5,
                  borderRadius: 3,
                  border: "1px solid #d0d7e2",
                  fontSize: "1rem",
                }}
              >
                {aiSummary}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Optional: Breakdown Section */}
              {summaryData && (
                <>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    🔍 Breakdown of Your Day
                  </Typography>

                  {/* Tasks */}
                  <Typography fontWeight={600}>Tasks:</Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 1 }}>
                    <Chip
                      label={`Completed: ${summaryData.tasks.completed.length}`}
                      color="success"
                    />
                    <Chip
                      label={`Pending: ${summaryData.tasks.pending.length}`}
                      color="warning"
                    />
                  </Stack>

                  {/* Habits */}
                  <Typography fontWeight={600}>Habits:</Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 1 }}>
                    <Chip
                      label={`Completed: ${summaryData.habits.completed.length}`}
                      color="success"
                    />
                    <Chip
                      label={`Pending: ${summaryData.habits.pending.length}`}
                      color="warning"
                    />
                  </Stack>

                  {/* Mood */}
                  <Typography fontWeight={600}>Mood Today:</Typography>
                  <Chip
                    icon={<EditNoteIcon />}
                    label={summaryData.mood || "Not logged"}
                    sx={{ mt: 1 }}
                    color={
                      summaryData.mood === "Happy"
                        ? "success"
                        : summaryData.mood === "Neutral"
                        ? "warning"
                        : summaryData.mood === "Sad"
                        ? "error"
                        : "primary"
                    }
                  />
                </>
              )}
            </Card>
          </Fade>
        )}
      </Box>
    </Fade>
  );
};

export default Summary;
