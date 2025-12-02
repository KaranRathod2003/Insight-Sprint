import jwt from 'jsonwebtoken'

// generate access token
const generateAccessToken = (user) =>{
    return jwt.sign({_id : user._id}, process.env.JWT_SECRET, {expiresIn : "15m"});
}

// generate refresh token
const generateRefreshToken = (user) =>{
    return jwt.sign({_id : user._id}, process.env.REFRESH_TOKEN_SECRET), {expiresIn : "7d"}
}

// send token to cookie 
const sendRefreshToken = (res, token)=>{
    res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

// verify token 
const verifyRefreshToken = (token) =>{
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}


export {generateAccessToken, generateRefreshToken, sendRefreshToken, verifyRefreshToken}