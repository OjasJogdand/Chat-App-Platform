import express from "express";
import { protect_route } from "../../middleware/protect.js";

const check_router=express.Router();
check_router.get("/",protect_route,(req,res)=>{
    try
    {
        res.json(req.user);
    }
    catch{
        res.json({msg:"error"});
    }
})
export default check_router;