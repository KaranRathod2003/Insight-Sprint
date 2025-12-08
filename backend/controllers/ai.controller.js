import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";
import { Habit } from "../models/habit.model.js";
import { Mood } from "../models/mood.model.js";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey : `AIzaSyBaB3HxEIMuFC41mngCAmx3OsieMwpNRB4`});

const generateSummary = asyncHandler(async (req, res) => {
  const { notes } = req.body;
  const today = new Date().toISOString().split("T")[0];



  // Fetch today's data
  const tasks = await Task.find({ user: req.user._id, date: today });
  const habits = await Habit.find({ user: req.user._id, date: today });
  const mood = await Mood.findOne({ user: req.user._id, date: today });

  // Filter tasks
  const completedTasks = tasks.filter(t => t.isCompleted);
  const pendingTasks = tasks.filter(t => !t.isCompleted);

  // Filter habits
  const completedHabits = habits.filter(h => h.isCompleted);
  const pendingHabits = habits.filter(h => !h.isCompleted);

  // Build summary object
  const summaryData = {
    tasks: {
      completed: completedTasks.map(t => ({
        title: t.title,
        description: t.description
      })),
      pending: pendingTasks.map(t => ({
        title: t.title,
        description: t.description
      }))
    },
    habits: {
      completed: completedHabits.map(h => ({
        title: h.title,
        icon: h.icon
      })),
      pending: pendingHabits.map(h => ({
        title: h.title,
        icon: h.icon
      }))
    },
    mood: mood?.mood || null,
    moodNote: mood?.note || null,
    userNotes: notes || null
  };

    const prompt = `
You are an AI productivity coach. Create a motivating daily summary based on the user's day:

Here is the data:

Completed Tasks: ${summaryData.tasks.completed.join(", ") || "None"}
Pending Tasks: ${summaryData.tasks.pending.join(", ") || "None"}

Completed Habits: ${summaryData.habits.completed.join(", ") || "None"}
Pending Habits: ${summaryData.habits.pending.join(", ") || "None"}

Mood: ${summaryData.mood}
Mood Note: ${summaryData.moodNote || "None"}

User Notes: ${summaryData.userNotes || "None"}

Write:
1. A short daily summary (4–6 lines)
2. Productivity insight (2–3 lines)
3. Improvement advice for tomorrow (2–3 lines)

Keep tone positive, friendly, and motivating.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  const aiText = response.text;
  console.log(response.text);

  return res
    .status(200)
    .json(new ApiResponse(200, {
      summaryData,
      aiSummary: aiText
    }, "Summary created successfully"));
});

export { generateSummary };