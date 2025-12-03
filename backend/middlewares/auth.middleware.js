import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"
const verifyJWT = asyncHandler(async (req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new ApiError(401, "Unauthorized : No token provided")
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded?._id){
            throw new ApiError(401, "Invalid token");
        }
        const user = await User.findById(decoded._id).select("-passwordHash");
        if(!user){
            throw new ApiError(401, "User not found");
        }
        req.user = user;
        next();

    } catch (error) {
        next(error)
    }
}) 

export { verifyJWT }