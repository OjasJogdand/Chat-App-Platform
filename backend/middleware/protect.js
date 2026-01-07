import express from "express";
import { user } from "../db/db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const protect_route=async (req,res,next)=>{
    try
    {
    const token=req.cookies.jwt;
    if(!token)
    {
        return res.status(401).json({msg:"unauthorized"});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const email=decoded.email;
    const user1=await user.findOne({email}).select("-password");
    if(!user1)
    {
        return res.status(401).json({msg:"unauthorized"});
    }
    req.user=user1;
    next();
    }
    catch(err)
    {
        return res.status(401).json("token not provided");
    }
};