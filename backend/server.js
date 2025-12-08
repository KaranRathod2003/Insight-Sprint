import dotenv from "dotenv";
dotenv.config();


import app from "./app.js";

import connectDB from "./config/db.js";




const PORT = process.env.PORT || 5000;

// Connect DB and then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    // console.log(process.env)
  });
});
