import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export const AppContext = createContext();


export const AppContextProvider = (props)=>{

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(false);

    const getAuthState = async() => {
        try {
            const {data} = await axios.get(backendUrl + "/api/auth/is-auth", {
                // Adding withCredentials if you're using cookies for auth
                withCredentials: true
            })
            
            if(data.success) {
                setIsLogin(true)
                await getUserData()
            } else {
                // Handle unsuccessful auth without error
                setIsLogin(false)
            }
        } catch (error) {
            // Handle network errors or server errors silently
            setIsLogin(false)
            console.error("Auth check failed:", error.message)
        }
    }
    
    const getUserData = async() => {
        try {
            const {data} = await axios.get(backendUrl + "/api/user/data", {
                withCredentials: true
            })
            
            if(data.success) {
                setUserData(data.userData)
            } else {
                // Only show error toast for specific user data issues
                toast.error(data.message)
            }
        } catch (error) {
            // Provide more specific error message
            toast.error("Failed to fetch user data")
            console.error("User data fetch failed:", error.message)
        }
    }
    
    useEffect(() => {
        // Check if the user has already been authenticated in this session
        const isAuthPage = ["/login", "/signup", "/reset-password"].includes(window.location.pathname)
        
        if (!isAuthPage) {
            getAuthState()
        }
        
        // Add dependency array variables if they affect this logic
    }, [/* Add dependencies here if needed */])

    const value ={
        backendUrl,
        isLogin,
        userData,
        setIsLogin,
        setUserData,
        getUserData

    }

    return(
        <AppContext.Provider value ={value}>
            {props.children}
        </AppContext.Provider>

    )
}