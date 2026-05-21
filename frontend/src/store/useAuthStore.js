import {create} from "zustand"
import axios from "axios"
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isSigningIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth: async ()=>{
        try
        {
        const res=await axios.get(`${API_URL}/api/auth/check`,{withCredentials:true});
        set({authUser:res.data});
        get().connectSocket();
        }
        catch(err)
        {
            set({authUser:null});
        }
        finally
        {
            set({isCheckingAuth:false});
        }
    },
    signup: async (data)=>{
        set({isSigningUp:true});;
        try
        {
        const res=await axios.post(`${API_URL}/api/auth/signup`,data,{withCredentials:true});
        set({authUser:res.data});
        get().connectSocket();
        toast.success("succesfully signed up")
        }
        catch(err)
        {
            toast.error("error");
        }
        finally
        {
            set({isSigningUp:false});
        }
    },
    logout: async ()=>{
        try
        {
            const res=await axios.post(`${API_URL}/api/auth/logout`,{},{withCredentials:true});
            set({authUser:null});
            get().disconnectSocket();
            toast.success("succesfully logged out");
        }
        catch(err)
        {
            toast.error("error");
        }
    },
    login: async (data)=>{
        set({isSigningIn:true});
        try
        {
        const res=await axios.post(`${API_URL}/api/auth/login`,data,{withCredentials:true});
        set({authUser:res.data});
        toast.success("succesfully logged in")
        get().connectSocket();
        }
        catch(err)
        {
            toast.error("error");
        }
        finally
        {
            set({isSigningIn:false});
        }
    },
    updateProfile: async (data)=>{
        set({isUpdatingProfile:true});
        try
        {
            const res=await axios.put(`${API_URL}/api/auth/update`,data,{withCredentials:true});
            set({authUser:res.data});
            toast.success("succefully updated");
        }
        catch(err)
        {
            toast.error("error");
        }
        finally
        {
            set({isUpdatingProfile:false});
        }
    },
    connectSocket: ()=>{
        const {authUser}=get();
        if(!authUser) return;
        const socket=io(API_URL,{withCredentials:true,query:{userId:authUser._id}});
        set({socket:socket});
        socket.connect();
        socket.on("getOnlineUsers",(keys)=>{
            set({onlineUsers:keys});
        })
    },
    disconnectSocket: ()=>{
        const socket=get().socket;
        if(socket)
        {
            socket.disconnect();
            set({socket:null});
        }
    }
}))