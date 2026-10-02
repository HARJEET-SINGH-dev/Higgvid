import express from "express";
import { db } from "./src/prisma/db";

const app = express();

app.post("/api/v1/signup" , (req , res)=>{
})

app.post("/api/v1/signin" , (req , res)=>{

})

app.post("/api/v1/avatar" , (req , res)=>{

})

app.post("/api/v1/video" , (req , res)=>{

})

app.get("/api/v1/video/:videoId" , (req , res)=>{

})

app.get("/api/v1/videos" , (req , res)=>{

})

app.get("/api/v1/me" , (req , res)=>{

})

app.get("/api/v1/models" , (req , res)=>{

})

app.get("/api/v1/avatar/:avatarId" , (req , res)=>{

})

app.get("/api/v1/avatars" , (req , res)=>{

})

app.listen(3000 , ()=>{
    console.log("sever running https://localhost:3000");
})
