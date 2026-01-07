import {create} from "zustand";

export const useThemeStore=create((set)=>({
    theme:localStorage.getItem("theme")||"retro",
    setTheme: (data)=>{
        set({theme:data});
        localStorage.setItem("theme",data);
    }
}));