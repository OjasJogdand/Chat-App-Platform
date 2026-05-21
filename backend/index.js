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

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";


app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({origin:frontendUrl,credentials:true}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/auth/signup",signup_router);
app.use("/api/auth/login",login_router);
app.use("/api/auth/logout",logout_route);
app.use("/api/auth/update",update_router);
app.use("/api/auth/check",check_router);
app.use("/api/message",router);

const port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log(`listening on port ${port}`);
});