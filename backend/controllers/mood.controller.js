import { Mood } from '../models/mood.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// ✅ Log OR Update Mood (fix applied)
const logMood = asyncHandler(async (req, res) => {
    const { mood, note } = req.body;

    if (!mood) throw new ApiError(400, "Mood field is required");

    const date = new Date().toISOString().split("T")[0];

    // 🔍 Check if today's mood already exists
    const existingMood = await Mood.findOne({ user: req.user._id, date });

    if (existingMood) {
        existingMood.mood = mood;
        existingMood.note = note;
        await existingMood.save();

        return res
            .status(200)
            .json(new ApiResponse(200, existingMood, "Mood updated successfully"));
    }

    // 🆕 If not found → create a new mood entry
    const newMood = await Mood.create({
        mood,
        note,
        user: req.user._id,
        date
    });

    return res
        .status(201)
        .json(new ApiResponse(201, newMood, "Mood logged successfully"));
});


// ⭐ Weekly Mood Fetch
const getWeeklyMood = asyncHandler(async (req, res) => {
    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 7);

    const last7DaysDate = last7Days.toISOString().split("T")[0];

    const moods = await Mood.find({
        user: req.user._id,
        date: { $gte: last7DaysDate }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, moods, "Weekly mood fetched successfully"));
});

export { logMood, getWeeklyMood };
