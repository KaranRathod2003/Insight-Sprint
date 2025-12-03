import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema(
    {
        name : {
            type : String,
            min : 3,
            required : true
        },
        email : {
            type : String,
            unique : true,
            required : true,
        }, 
        passwordHash : {
            type : String,
            required : true
        }, 

    }, 
    {timestamps : true});
    
userSchema.methods.isPasswordCorrect = async function (password) {
    if (!password || !this.passwordHash) {
        throw new Error('Password and hash are required for comparison');
    }
    return await bcrypt.compare(password, this.passwordHash);
};




const User = mongoose.model("User", userSchema)

export { User };