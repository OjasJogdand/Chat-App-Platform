import express from "express";
import { user } from "../../db/db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const signup_router=express.Router();
signup_router.post("/",async (req,res)=>{
    try{
    const {email,fullName,password}=req.body;
    const user1=await user.findOne({email});
    if(user1)
    {
        return res.status(400).json({msg:"user already exists"});
    }
    else
    {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const user2=await user.create({
            email,
            fullName,
            password:hashedPassword,
        })
        if(user2)
        {
        const token=jwt.sign({email},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        res.cookie("jwt",token,{
            maxAge: 7*24*3600*1000,
        })
        return res.json({_id:user2._id,email,fullName,});
        }
        else{
            return res.status(400).json({msg:"invalid details"});
        }
    }
    }
    catch(err)
    {
        res.json(err);
    }
});
export default signup_router;