import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Habit } from '../models/habit.model.js';


// create Habit
const createHabit = asyncHandler(async(req, res)=>{
    const {title, icon} = req.body;

    if(!title || title.length < 3) throw new ApiError(400, "Title required and must be atleast 3");

    const date = new Date().toISOString().split("T")[0];

    const habit = await Habit.create({
        user : req.user._id,
        title,
        icon,
        date
    })

    return res.status(201).json(new ApiResponse(201, habit, "Habit created Successfully"));
})

const getTodayHabits = asyncHandler(async(req, res)=>{
    const today = new Date().toISOString().split("T")[0];

    const habits = await Habit.find({
        user : req.user._id,
        date : today
    })

    if(habits.length === 0) throw new ApiError(404, "Today Habit not Found");

    return res.status(200).json(new ApiResponse(200, habits, "Habit fetched successfully"));
})

const toggleHabit = asyncHandler(async(req, res)=>{
    const habitId = req.params.id;

    if(!habitId) throw new ApiError(400, "Habit not found or invalid ID")
    // error handle for not or invalid id ??

    const habit = await Habit.findById(habitId);
    if(!habit) throw new ApiError(404, "Habit not found")

    habit.isCompleted = !habit.isCompleted;

    await habit.save();

    return res.status(200).json(new ApiResponse(200, habit, "Habit updated successfully"));

})

const deleteHabit = asyncHandler(async(req, res)=>{
    const habitId = req.params.id;

    const habit = await Habit.findByIdAndDelete(habitId);
    if(!habit) throw new ApiError(400, "Habit not found");

    return res.status(200).json(new ApiResponse(200, {}, "Habit deleted successfully"));
})




export { createHabit, getTodayHabits, toggleHabit, deleteHabit }

