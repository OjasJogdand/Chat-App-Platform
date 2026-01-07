import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import signup_router from "./routes/auth/signup.js";
import login_router from "./routes/auth/login.js";
import logout_route from "./routes/auth/logout.js";
import update_router from "./routes/auth/updateProfile.js";
import check_router from "./routes/auth/checkAuth.js";
import router from "./routes/messages/message_routes.js";
import cors from "cors"
import { app,server } from "./lib/socket.js";


app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/auth/signup",signup_router);
app.use("/api/auth/login",login_router);
app.use("/api/auth/logout",logout_route);
app.use("/api/auth/update",update_router);
app.use("/api/auth/check",check_router);
app.use("/api/message",router);

server.listen("3000",()=>{
    console.log("listening on port 3000");
});