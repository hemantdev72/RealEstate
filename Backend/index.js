import express from "express";
import dotenv from "dotenv"
import cors from "cors";
// import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import { dbConnect } from "./config/db.js";
import cookieParser from 'cookie-parser';

const app=express();
app.use(cookieParser());

dotenv.config();
app.use(cors());
app.use(express.json());
dbConnect();

app.use("/api/auth",authRouter);

app.use((err,req,res,next)=>{
    const statusCode= err.statusCode || 500;
    const message=err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

app.listen(3000,()=>{
    console.log("app is running");
})