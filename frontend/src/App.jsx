import { useEffect} from "react";
import { Routes,Route } from "react-router-dom";
import NavBar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useAuthStore";
import { Navigate } from "react-router-dom";
import {Loader} from "lucide-react"
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
  const {theme}=useThemeStore();
  useEffect(() => {
    checkAuth();
  }, []);

  
  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <NavBar/>
    <Routes>
      <Route path="/" element={!authUser?<Navigate to="/login"/>:<HomePage/>}/>
      <Route path="/signup" element={authUser?<Navigate to="/"/>:<SignUpPage/>}/>
      <Route path="/login" element={authUser?<Navigate to="/"/>:<Login/>}/>
      <Route path="/settings" element={<SettingsPage/>}/>
      <Route path="/profile" element={!authUser?<Navigate to="/login"/>:<ProfilePage/>} />
    </Routes>
    </div>
  );
}

export default App;
