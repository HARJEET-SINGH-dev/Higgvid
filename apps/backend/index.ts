import express from "express";
import { db } from "./src/prisma/db";
import { CreateUserSchema , CreateAvatarSchema } from "./types";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const app = express();
// Parse JSON request bodies; without this req.body is undefined in every route
app.use(express.json());
// Generated avatar images are saved in ./assets and served at http://localhost:3000/assets/<name>
app.use("/assets", express.static("assets"));
const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_API_KEY,
});

app.post("/api/v1/signup" ,async (req , res)=>{
    const {success , data} = CreateUserSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({message : "incorrect credentials"});
        return;
    }
    // Usernames are unique in the DB, so a second signup with the same name would throw.
    const existing = await db.orm.public.User.where({username : data.username}).first();
    if(existing){
        res.status(409).json({message : "username already taken"});
        return;
    }

    const user = await db.orm.public.User.create(
        {
            // User.id is `text NOT NULL` with no DB default, so the app must generate it;
            // without this every insert fails with a null-id error.
            id : crypto.randomUUID(),
            // Use the validated `data`, not the raw req.body
            username : data.username,
            password : data.password,
        }
    )

    res.json({
        id : user.id
    })

})

app.post("/api/v1/signin" ,async (req , res)=>{
    const {success , data} = CreateUserSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({message : "incorrect credentials"});
        return;
    }

    const user = await db.orm.public.User.where({username : data.username}).first();
    if(!user || user.password !== data.password){
        res.status(403).json({
            message : 'incorred credentials'
        })

        return;
    }

    return res.json({
        id : user.id
    });
})

// Avatar generation is POST /api/v1/avatar (singular). GET /api/v1/avatars (plural) is the
// separate "list my avatars" route below. Body: { "name": string, "image": "<public image URL>" }
app.post("/api/v1/avatar" ,async (req , res)=>{
    // req.body is an object, not a function (was req.body())
    const { success , data } = CreateAvatarSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({message : "incorrect details provided from avatars endpoint"})
    }
})

// Placeholder routes: an empty handler never sends a response, so the client just hangs
// until it times out. Reply 501 until each one is implemented.
app.post("/api/v1/video" , (req , res)=>{
    res.status(501).json({message : "not implemented yet"});
})

app.get("/api/v1/video/:videoId" , (req , res)=>{
    res.status(501).json({message : "not implemented yet"});
})

app.get("/api/v1/videos" , (req , res)=>{
    res.status(501).json({message : "not implemented yet"});
})

app.get("/api/v1/me" , (req , res)=>{
    res.status(501).json({message : "not implemented yet"});
})

app.get("/api/v1/models" , (req , res)=>{
    res.status(501).json({message : "not implemented yet"});
})

app.get("/api/v1/avatar/:avatarId" , (req , res)=>{
    res.status(501).json({message : "not implemented yet"});
})

app.get("/api/v1/avatars" , (req , res)=>{
    res.status(501).json({message : "not implemented yet"});
})

app.listen(3000 , ()=>{
    // Plain HTTP: app.listen does not set up TLS, so https://localhost:3000 will not connect
    console.log("server running http://localhost:3000");
})
