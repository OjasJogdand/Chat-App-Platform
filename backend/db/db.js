import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const URL=process.env.MONGODB_URI;
mongoose.connect(URL);

const userSchema=mongoose.Schema({
    email:String,
    fullName:String,
    password:String,
    profilePic:String,
    createdAt:Date,
    updatedAt:Date,
});

const messageSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    receiverId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    text:String,
    image:String,
},
{
    timestamps:true
});

const user=mongoose.model("Users",userSchema);
const messages=mongoose.model("Messages",messageSchema);

export {user,messages};
