// In your AppContext
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;

    // user states
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null); // Use null instead of false
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    // admin states
    const [adminIsLogin, setAdminIsLogin] = useState(false);
    const [adminData, setAdminData] = useState(null); // Use null instead of false
    const [adminIsLoading, setAdminIsLoading] = useState(true); // Add loading state

    const getAuthState = async() => {
        setIsLoading(true);
        try {
            const {data} = await axios.get(backendUrl + "/api/auth/is-auth", {
                withCredentials: true
            });
            
            if(data.success) {
                setIsLogin(true);
                await getUserData();
            } else {
                setIsLogin(false);
                setUserData(null);
            }
        } catch (error) {
            // 401 errors are expected when not logged in
            setIsLogin(false);
            setUserData(null);
            // Only log the error, don't show toast for auth check
            console.error("Auth check failed:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getAdminAuthState = async() => {
        setIsLoading(true);
        try {
            const {data} = await axios.get(backendUrl + "/api/auth/is-auth", {
                withCredentials: true
            });
            
            if(data.success) {
                setAdminIsLogin(true);
                await getUserData();
            } else {
                setAdminIsLogin(false);
                setAdminData(null);
            }
        } catch (error) {
            // 401 errors are expected when not logged in
            setAdminIsLogin(false);
            setAdminData(null);
            // Only log the error, don't show toast for auth check
            console.error("Auth check failed:", error.message);
        } finally {
            setAdminIsLoading(false);
        }
    };

    const getUserData = async() => {
        try {
            const {data} = await axios.get(backendUrl + "/api/user/data", {
                withCredentials: true
            });
            
            if(data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            // Only show toast for getUserData since this should work if user is logged in
            toast.error("Failed to fetch user data");
            console.error("User data fetch failed:", error.message);
        }
    };

    const getAdminData = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/user/admin-data", {
                withCredentials: true
            });
            
            if(data.success) {
                setAdminData(data.adminData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            // Only show toast for getUserData since this should work if user is logged in
            toast.error("Failed to fetch user data");
            console.error("User data fetch failed:", error.message);
        }
    };
    
    useEffect(() => {
        // Check auth state on mount and when route changes
        const isAuthPage = ["/login", "/signup", "/reset-password"].includes(window.location.pathname);
        
        if (!isAuthPage) {
            getAuthState();
        } else {
            // Reset loading state on auth pages
            setIsLoading(false);
        }
    }, []); // Add dependency on path changes

    const value = {
       
        backendUrl,
        //user
        isLogin,
        userData,
        isLoading,// Expose loading state
        // admin
        adminIsLogin,
        adminData,
        adminIsLoading,

        //user
        setIsLogin,
        setUserData,
        getUserData,
        getAuthState, // Expose this so components can trigger re-auth after login

        //admin
        setAdminData,
        setIsLoading,
        setAdminIsLoading,
        getAdminAuthState,
        getAdminData,
        setAdminIsLogin


    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};