import { Task } from '../models/task.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js'


const createTask = asyncHandler(async(req, res)=>{
    const {title, description} = req.body;

    if(!title || title.length < 3) throw new ApiError(400, "Title is required or title atleast 3 letters");
    // get todays Date in (YYYY-MM-DD)
    const date = new Date().toISOString().split("T")[0];

    //CREATE TASK 
    const task = await Task.create({
        title,
        description,
        user : req.user._id,
        date
    })

    return res.status(200).json(new ApiResponse(201, task, "Task Created Successfully"));

})

const getTodayTasks = asyncHandler(async(req, res)=>{
    const today = new Date().toISOString().split("T")[0];

    const tasks = await Task.find({
        user : req.user._id,
        date : today
    })

    if(!tasks) throw new ApiError(400, "Task not found");

    return res.status(200).json(new ApiResponse(200, tasks, "Task fetched successfully"));
})

const toggleTask = asyncHandler(async(req, res)=>{
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if(!task) throw new ApiError(404, "Task not found");

    task.isCompleted = !task.isCompleted;

    await task.save();

    return res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
})

const deleteTask = asyncHandler(async(req, res)=>{
    const taskId = req.params.id;

    const task = await Task.findByIdAndDelete(taskId);
    // do i need to handle error ??
      if (!task) {
    throw new ApiError(404, "Task not found");
  }

    return res.status(200).json(new ApiResponse(200, {}, "Task deleted Successfully"));
})

export { createTask, getTodayTasks, toggleTask, deleteTask }