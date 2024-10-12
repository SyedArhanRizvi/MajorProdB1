import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.Routes.js";
dotenv.config();


const app = express();
app.use(cors({
    origin: "http://localhost:5173",  // Replace with your actual frontend domain
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODB_ID)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Your backend has been successfully connected on this port ", process.env.PORT);
    })
})
.catch((err)=>{
    console.log("Due to some issus so we can't connect your backend plz fix the bug first ", err);
});

app.use("/api", userRoutes);