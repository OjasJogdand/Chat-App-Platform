import express from "express";
import { protect_route } from "../../middleware/protect.js";
import { messages, user } from "../../db/db.js";
import cloudinary from "../../lib/cloudinary.js";
import { getReceiverSocket, io } from "../../lib/socket.js";

const router=express.Router();
//route to get all the users in the sidebar exept the user which is logged in.
router.get("/users",protect_route,async (req,res)=>{
    try
    {
    const user_id=req.user._id;
    const users=await user.find({_id:{$ne:user_id}}).select("-password");
    return res.json(users);
    }
    catch(err)
    {
        return res.json({msg:"unvalid"});
    }
})
//route to get all the messages from one sender id to the other.
router.get("/:id",protect_route,async (req,res)=>{
    const senderId=req.user._id;
    const receiverId=req.params.id;
    const messages1=await messages.find({$or:[{senderId,receiverId},{receiverId,senderId}]});
    return res.json(messages1);
})
//route to post message.
router.post("/send/:id",protect_route,async (req,res)=>{
    try{
    const {text,image}=req.body;
    const senderId=req.user._id;
    const receiverId=req.params.id;
    let imageURL;
    if(image)
    {
        const uploadedUser=await cloudinary.uploader.upload(image);
        imageURL=uploadedUser.secure_url;
    }
    const message1=new messages({
        senderId,
        receiverId,
        text,
        image:imageURL,
    });
    await message1.save();

    const receiverSocketId=getReceiverSocket(receiverId);
    if(receiverSocketId)
    {
        io.to(receiverSocketId).emit("newMessage",message1);
    }
    return res.json(message1);
    }
    catch(err)
    {
        return res.json(err);
    }
})

export default router;