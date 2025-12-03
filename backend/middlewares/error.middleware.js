import { ApiError } from "../utils/ApiError.js";


const errorHandler = async(err, req, res, next) =>{
    console.error("Error : ", err);

    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success : false,
            message : err.message,
            errors : err.errors || []
        })
    }

    return res.status(err.statusCode).json({
        success : false,
        message : "Internal server error"
    })
}

export { errorHandler }