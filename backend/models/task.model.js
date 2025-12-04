import mongoose, { Schema } from 'mongoose';


const taskSchema = new Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        title : {
            type : String,
            required : true,
            min : 3
        },
        description : {
            type : String,
            min : 6
        },
        isCompleted : {
            type : Boolean,
            default : false,
        },
        date : {
            type : String,
            required : true
            // min , max

        }
    }, 
    {timestamps : true});





const Task = mongoose.model("Task", taskSchema);

export { Task };