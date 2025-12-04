import { Mood } from '../models/mood.model.js';
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'


const logMood = asyncHandler(async(req, res)=>{
    const {mood, note} = req.body;

    if(!mood) throw new ApiError(404, "Mood field is required");

    const date = new Date().toISOString().split("T")[0];

    const moodModule = await Mood.create({
        mood,
        note, 
        user : req.user._id,
        date
    })
    return res.status(201).json(new ApiResponse(201, moodModule, "Mood created successfully"));
})


const getWeeklyMood  = asyncHandler(async(req, res)=>{

    // 1. find todays date
    const today = new Date();
    // 2. last7th day date
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 7);

    const last7DaysDate = last7Days.toISOString().split("T")[0];

    const moods = await Mood.find({
        user : req.user._id,
        date : { $gte: last7DaysDate }
    })
    // if(!moods)

    return res.status(200).json(new ApiResponse(200, moods, "Weekly mood fetch successfully"));
})


export {logMood, getWeeklyMood}