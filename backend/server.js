import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";

const app = express();

const port = process.env.PORT || 5000;
connectDB();

// Define all possible origins
const allowedOrigins = [
    'https://cleancom-k4kf.vercel.app',
    'https://cleancom-k4kf-7ijh2m84h-heros-projects-275bb566.vercel.app',
    // Include any other origins you might use
];

// Handle preflight requests
app.options('*', (req, res) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.status(200).end();
});

// Configure CORS for all other requests
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    next();
});

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API WORKING fine");
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});