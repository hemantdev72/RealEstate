import mongoose from "mongoose";

export const dbConnect=async ()=>{
    try{
        console.log(process.env.MONGO)
        await mongoose.connect(process.env.MONGO);
        console.log("db connected");
    } catch(error){
        console.log(error,"db connection error");
    }
}