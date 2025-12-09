// import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Task } from '../models/task.model.js'
import { Habit } from '../models/habit.model.js'
import { Mood } from '../models/mood.model.js'

const getTodayStats = asyncHandler(async (req, res) => {
    const today = new Date().toISOString().split("T")[0];

    const tasks = await Task.find({
        user: req.user._id,
        date: today
    })
    const habits = await Habit.find({
        user: req.user._id,
        date: today
    })
    const mood = await Mood.findOne({
        user: req.user._id,
        date: today
    })

    const totalTasks = tasks.length;
    const totalHabits = habits.length;

    const completedTasks = tasks.filter(t => t.isCompleted).length;
    const completedHabits = habits.filter(h => h.isCompleted).length;

    const pendingTasks = totalTasks - completedTasks;
    const pendingHabits = totalHabits - completedHabits;

    const calcPercentage = (completed, total) => {
        if (total === 0) return 0;
        return Math.round((completed / total) * 100);
    };

    const taskStats = {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        percentage: calcPercentage(completedTasks, totalTasks),
    };

    const habitStats = {
        total: totalHabits,
        completed: completedHabits,
        pending: pendingHabits,
        percentage: calcPercentage(completedHabits, totalHabits),
    };

    const moodStats = mood
        ? { mood: mood.mood, note: mood.note }
        : { mood: null, note: null };

    return res.status(200).json(new ApiResponse(200,
        {
            tasks: taskStats,
            habits: habitStats,
            mood: moodStats
        },
        "Today's stats fetched successfully"))
})

export { getTodayStats };