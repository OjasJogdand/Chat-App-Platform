import express from "express";
import { user } from "../../db/db.js";;
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const login_router=express.Router();
login_router.post("/",async (req,res)=>{
    try
    {
    const {email,password}=req.body;
    const user1=await user.findOne({email});
    if(!user1)
    {
        return res.status(400).json({msg:"user not found"});
    }
    const isValid=await bcrypt.compare(password,user1.password);
    if(!isValid)
    {
        return res.status(400).json({msg:"invalid passowrd"});
    }
    const token=jwt.sign({email},process.env.JWT_SECRET,{
       expiresIn:"7d"
         });
        res.cookie("jwt",token,{
             maxAge: 7*24*3600*1000,
         })
         return res.json(user1);
    }
    catch(err)
    {
        return res.status(500).json({ msg: "server error" });
    }
})
export default login_router;