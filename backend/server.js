import express from "express";
import mongoose, { connect } from "mongoose";
import 'dotenv/config';
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";

const app = express();

const port = process.env.PORT || 5000;
connectDB();


const allowedOrigins = [
    'http://localhost:5173'
]

app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// api end point
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API WORKING fine");
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
