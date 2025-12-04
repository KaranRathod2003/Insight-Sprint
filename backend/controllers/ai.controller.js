import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Task } from '../models/task.model.js'
import { Habit } from '../models/habit.model.js'
import { Mood } from '../models/mood.model.js'


const generateSummary = asyncHandler(async (req, res) => {
    const { notes } = req.body;
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

    const pendingTask = tasks.filter(t => !t.isCompleted);
    const pendingHabit = habits.filter(t => !t.isCompleted);
    const completedHabit = habits.filter(t => t.isCompleted);
    const completedTask = tasks.filter(t => t.isCompleted);

    const summary = {
        tasks: {
            completed: completedTask.map(t => ({
                title: t.title,
                description: t.description
            })),
            pending: pendingTask.map(t => ({
                title: t.title,
                description: t.description
            }))
        },
        habits: {
            completed: completedHabit.map(h => ({
                title: h.title,
                icon: h.icon
            })),
            pending: pendingHabit.map(h => ({
                title: h.title,
                icon: h.icon
            }))
        },
        mood: mood?.mood || null,
        moodNote: mood?.note || null,
        userNotes: notes || null
    }
    return res.status(200).json(new ApiResponse(200, summary, "Summary craeted successfully"))
})

export { generateSummary }