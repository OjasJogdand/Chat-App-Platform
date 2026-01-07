import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const logout_route=express.Router();
logout_route.post("/",async (req,res)=>{
    try {
        res.clearCookie("jwt");
        return res.json({msg:"logged out succecfully"});
    } catch (error) {
        return res.json({msg:"error"});
    }
})
export default logout_route;