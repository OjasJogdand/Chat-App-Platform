import express from "express";
import {Server} from "socket.io";
import http from "http";

const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
});
//map to store{userId,socketId}
const userSocketMap={};
io.on("connection",(socket)=>{
    console.log("this is socketid"+ socket.id);
    const userId=socket.handshake.query.userId;
    if(userId)
    {
        userSocketMap[userId]=socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        console.log("user is disconnected");
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
});
export function getReceiverSocket(userId)
{
    return userSocketMap[userId];
}
export {app,io,server};