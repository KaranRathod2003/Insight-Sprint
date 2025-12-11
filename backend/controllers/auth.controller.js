import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../services/auth.service.js';


// register 

const register = asyncHandler(async (req, res) => {
    // get fields
    const { name, email, password } = req.body;

    if (!name || !email || !password) throw new ApiError(400, "All fields are required");

    const passwordHash = await bcrypt.hash(password, 10);

    const exitsUser = await User.findOne({ email });
    if (exitsUser) throw new ApiError(401, "User already exits");
    

    const user = await User.create({
        name,
        email,
        passwordHash
    })

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token cookie - i dont know 
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json(new ApiResponse(201, { user, accessToken }, "User registerd successFully"))
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) throw new ApiError(400, "All fields are required");

    const user = await User.findOne({ email }).select("+passwordHash")
    if (!user) throw new ApiError(400, "User not found");
    console.log('User found:', user.email);
    console.log('Password hash exists:', !!user.passwordHash);
    const validPassword = await user.isPasswordCorrect(password)
    if (!validPassword) throw new ApiError(400, "Incorrect password");
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // const loggedInUser = User.findById(user._id).select("") // do i need this 

    // set cookie i dont know
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json(new ApiResponse(200, { user, accessToken }, "User logged in Successfully"))


})

const logout = asyncHandler(async(req, res)=>{
    // do i need to fetch refreshToken from anywhere only after that user can log OUT??
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,      // ← Changed from true to match login
        sameSite: "none",
    })
    return res.status(200).json(new ApiResponse(200, {}, "Logged out successFully"))
})

const refreshAccessToken = asyncHandler(async(req, res)=>{
    const { refreshToken } = req.cookies;
    if(!refreshToken) throw new ApiError(400, "please login again");

    let decoded;
     try {
        decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }
     if(!decoded?._id) {
        throw new ApiError(401, "Invalid refresh token payload");
    }

    const user = await User.findById(decoded._id);
    if(!user) throw new ApiError(400, "User not found");

    const accessToken = generateAccessToken(user);

    return res.status(200).json(new ApiResponse(200, {accessToken}, "Refreshed access Token SuccessFully"))
})

const getProfile = asyncHandler(async(req, res)=>{
    // litrally this 
    const user = req.user;

    if(!user) throw new ApiError(400, "User not found");


    return res.status(200).json(new ApiResponse(200, user, "User fetched successFully"))


})

export { register, login, logout, refreshAccessToken, getProfile };