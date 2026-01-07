import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    getUsers: async ()=>{
        set({isUsersLoading:true});
        try
        {
          const res=await axios.get("http://localhost:3000/api/message/users",{withCredentials:true});
          set({users:res.data});
          toast.success("secccfull");
        }
        catch(err)
        {
            set({users:[]});
            toast.error("error");
        }
        finally
        {
            set({isUsersLoading:false});
        }
    },
    getMessages: async (userId)=>{
        set({isMessagesLoading:true});
        try
        {
            const res=await axios.get(`http://localhost:3000/api/message/${userId}`,{withCredentials:true});
            set({messages:res.data});
        }
        catch(err)
        {
            toast.error("error");
        }
        finally
        {
            set({isMessagesLoading:false});
        }
    },
    sendMessage: async (messageData)=>{
        const {selectedUser,messages}=get();
        try
        {
            const res=await axios.post(`http://localhost:3000/api/message/send/${selectedUser._id}`,messageData,{withCredentials:true});
            set({messages:[...messages,res.data]});
        }
        catch(err)
        {
            toast.error("error");
        }
    },
    setSelectedUser: (selectedUser)=>{
        set({selectedUser});
    },
    subscribeToMessages: ()=>{
        const {selectedUser}=get();
        if(!selectedUser) return;

        const {socket}=useAuthStore.getState();
        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderId!=selectedUser._id)
                return;
            set({messages:[...get().messages,newMessage]});
        })
    },
    unsubscribeFromMessages:()=>{
        const {socket}=useAuthStore.getState();
        if(socket!=null)
        {
        socket.off("newMessage");
        }
    }
}));