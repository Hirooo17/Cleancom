// In your AppContext
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AppContext } from "./app.context.base";

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;

    // user states
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null); // Use null instead of false
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    // admin states
    const [adminIsLogin, setAdminIsLogin] = useState(false);
    const [adminData, setAdminData] = useState(null); // Use null instead of false
    const [adminIsLoading, setAdminIsLoading] = useState(true); // Add loading state

    const getUserData = useCallback(async() => {
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
    }, [backendUrl]);

    const getAdminData = useCallback(async () => {
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
    }, [backendUrl]);

    const getAuthState = useCallback(async() => {
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
    }, [backendUrl, getUserData]);

    const getAdminAuthState = useCallback(async() => {
        setAdminIsLoading(true);
        try {
            const {data} = await axios.get(backendUrl + "/api/auth/is-auth", {
                withCredentials: true
            });
            
            if(data.success) {
                setAdminIsLogin(true);
                await getAdminData();
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
    }, [backendUrl, getAdminData]);
    
    useEffect(() => {
        // Check auth state on mount and when route changes
        const isAuthPage = ["/login", "/signup", "/reset-password","/admin-dashboard", "/admin-login", "/admin-access-pin"].includes(location.pathname);
        
        if (!isAuthPage) {
            getAuthState();
        } else {
            // Reset loading state on auth pages
            setIsLoading(false);
        }
    }, [getAuthState, location.pathname]); // Add dependency on path changes

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
