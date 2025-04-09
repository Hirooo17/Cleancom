import express from "express";
import mongoose, { connect } from "mongoose";
import 'dotenv/config';
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import trashReporRouter from "./routes/trashReport.routes.js";
import { fileURLToPath } from 'url';
import path from 'path';  

const app = express();

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 5000;
connectDB();


const allowedOrigins = [
    process.env.FRONT_END_URL,
    'https://cleancom-k4kf.vercel.app'
]

app.use(cookieParser());
// app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));
app.use(
    cors({
      origin: process.env.FRONT_END_URL,
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
  


// api end point
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    res.send("API WORKING fine");
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/trash-reports', trashReporRouter );
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
