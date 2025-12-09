import mongoose, { Schema } from "mongoose";



const moodSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }, 
    mood : {
        type : String,
        enum :  ["Happy", "Neutral", "Sad", "Excited"], // do i need to specify or validate only this moods
        required : true
    }, 
    note : {
        type : String,
    }, 
    date : {
        type : String,
        required : true
    }
}, {timestamps : true});


const Mood = mongoose.model("Mood", moodSchema);

export { Mood };