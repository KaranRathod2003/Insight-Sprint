import dotenv from "dotenv";
dotenv.config();



import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from './middlewares/error.middleware.js';


const app = express();


app.use(cors({
    origin : process.env.CORS_ORIGIN, 
    credentials: true,
}))

app.use(express.json({limit : "20kb"}));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static("public"));




import authRoutes from "./routes/auth.routes.js";

app.use("/api/auth", authRoutes);


import taskRoutes from "./routes/task.routes.js"

app.use("/api/tasks", taskRoutes);


import habitRoutes from "./routes/habit.routes.js";

app.use("/api/habits", habitRoutes);

import moodRoutes from "./routes/mood.routes.js"

app.use("/api/mood", moodRoutes)

import statsRoutes from "./routes/stats.routes.js"

app.use("/api/stats", statsRoutes);

import aiRoutes from "./routes/ai.routes.js"

app.use("/api/ai", aiRoutes);

app.use(errorHandler);

export default app;