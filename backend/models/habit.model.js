import mongoose, {Schema} from 'mongoose';

const habitSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }, 
    title : {
        type : String,
        required : true,
        min : 3
    },
    isCompleted : {
        type : Boolean,
        default : false
    }, 
    icon : {
        type : String, //optional
    },
    date :{
        type : String,
        required : true
    },
    streakCount : {
        type : Number,
        default : 0
    }
}, {timestamps : true});


const Habit = mongoose.model("Habit", habitSchema);

export { Habit };