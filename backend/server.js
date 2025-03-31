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

// Define allowed origins - include both your production and preview URLs
const allowedOrigins = [
    process.env.FRONT_END_URL,
    'https://cleancom-k4kf.vercel.app/',
    // Add any other origins you need
];

// // Configure CORS with more options
// app.use(cors({
//     origin: function (origin, callback) {
//         // Allow requests with no origin (like mobile apps, curl requests)
//         if (!origin) return callback(null, true);
        
//         if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
//             callback(null, true);
//         } else {
//             console.log("Blocked by CORS: ", origin);
//             callback(null, false);
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));

app.use(cors({origin : ['https://cleancom-k4kf.vercel.app']}));





app.use(cookieParser());
app.use(express.json());

// Pre-flight OPTIONS handling
app.options('*', cors());

app.get("/", (req, res) => {
    res.send("API WORKING fine");
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});