import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js'
import { generateAccessToken, generateRefreshToken } from '../services/auth.service.js';

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
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json(new ApiResponse(201, { user, accessToken }, "User registerd successFully"))
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) throw new ApiError(400, "All fields are required");

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "User not found");
    const validPassword = await user.isPasswordCorrect(password)
    if (!validPassword) throw new ApiError(400, "Incorrect password");
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // const loggedInUser = User.findById(user._id).select("") // do i need this 

    // set cookie i dont know
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json(new ApiResponse(200, { user, accessToken }, "User logged in Successfully"))


})




export { register, login };