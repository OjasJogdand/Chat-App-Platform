import express from "express";
import { user } from "../../db/db.js";;
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { protect_route } from "../../middleware/protect.js";
import cloudinary from "../../lib/cloudinary.js";

const update_router=express.Router();
update_router.put("/",protect_route,async(req,res)=>{
    const {profilePic}=req.body;
    if(!profilePic)
    {
        return res.json({msg:"enter profile pic"})
    }
    const user_id=req.user._id;
    const uploadedUser=cloudinary.uploader.upload(profilePic);
    const updated_User=await user.findByIdAndUpdate(user_id,{profilePic:(await uploadedUser).secure_url},{new:true})
    res.json(updated_User)
})
export default update_router;