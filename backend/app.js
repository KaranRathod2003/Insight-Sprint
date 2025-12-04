import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from './middlewares/error.middleware.js';


dotenv.config();
const app = express();


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit : "20kb"}));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static("public"));

app.use(errorHandler);


import authRoutes from "./routes/auth.routes.js";

app.use("/api/auth", authRoutes);


import taskRoutes from "./routes/task.routes.js"

app.use("/api/tasks", taskRoutes);


import habitRoutes from "./routes/habit.routes.js";

app.use("/api/habits", habitRoutes);

import moodRoutes from "./routes/mood.routes.js"

app.use("/api/mood", moodRoutes)



export default app;