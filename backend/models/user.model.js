import mongoose, { Schema } from 'mongoose';

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
            min : 6,
            max : 10,
            required : true
        }, 

    }, 
    {timestamps : true});
    
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.passwordHash);
};




const User = mongoose.model("User", userSchema)

export { User };