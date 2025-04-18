import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/app.context";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LogIn,
  Recycle,
  Bell,
  User,
  Mail,
  LogOut,
  Lock,
  Users,
  X,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, backendUrl, setIsLogin, isLoading, isLogin } =
    useContext(AppContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp",
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("OTP Sent Successfully");
        navigate("/email-verify");
        setDropdownOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (data.success) {
        setIsLogin(false);
        setUserData(null);
        toast.success("Logged out successfully");
        setDropdownOpen(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-8 fixed top-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
        {/* Logo section */}
        <div className="flex items-center gap-2">
          <Recycle size={28} className="text-green-600" />
          <span className="font-bold text-xl text-green-800">
            CLEAN<span className="text-green-600">COM</span>
          </span>
        </div>

        {/* Middle navigation - only visible on larger screens */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="text-green-700 hover:text-green-600 font-medium"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/services")}
            className="text-green-700 hover:text-green-600 font-medium"
          >
            Services
          </button>
          <button
            onClick={() => navigate("/about")}
            className="text-green-700 hover:text-green-600 font-medium"
          >
            About
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="text-green-700 hover:text-green-600 font-medium"
          >
            Contact
          </button>
        </div>

        {/* User section */}
        {isLoading ? (
          <div className="animate-pulse bg-green-100 rounded-full px-6 py-2">
            <div className="w-16 h-5 bg-green-200 rounded"></div>
          </div>
        ) : isLogin && userData ? (
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex p-2 rounded-full text-green-700 hover:bg-green-50">
              <Bell size={20} />
            </button>

            <div ref={dropdownRef} className="relative">
              {/* Profile Avatar with dropdown indicator */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                <div
                  className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white 
                  hover:from-green-600 hover:to-green-700 transition-all"
                >
                  {userData.name && userData.name[0].toUpperCase()}
                </div>
                <ChevronDown size={16} className="text-green-600 md:hidden" />
              </button>

              {/* Dropdown menu - shown on hover for desktop and on tap for mobile */}
              <div
                className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-green-100
                transition-all duration-300
                ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'}`}
              >
                <div className="p-3 border-b border-green-100">
                  <p className="font-medium text-green-800">{userData.name}</p>
                  <p className="text-sm text-green-600">{userData.email}</p>
                </div>

                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-green-50 text-green-700"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </button>
                  </li>

                  {userData.isverified === false && (
                    <li>
                      <button
                        onClick={sendVerificationOtp}
                        className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-green-50 text-green-700"
                      >
                        <Mail size={16} />
                        <span>Verify Email</span>
                      </button>
                    </li>
                  )}

                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-red-50 text-red-600"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="flex items-center gap-2 bg-green-600 rounded-full px-6 py-2 text-white hover:bg-green-700 transition-all"
          >
            LOGIN <LogIn size={16} />
          </button>
        )}
      </div>

      {/* Login Selection Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-green-100 bg-green-50">
              <h3 className="text-lg font-semibold text-green-800">
                Select Login Type
              </h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-green-600 hover:text-green-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    navigate("/login");
                  }}
                  className="flex items-center gap-4 p-4 rounded-lg border border-green-200 hover:border-green-400 hover:bg-green-50 transition-all"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Users size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-green-800">User Login</h4>
                    <p className="text-sm text-green-600">
                      Access your personal account
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    navigate("/admin-access-pin");
                  }}
                  className="flex items-center gap-4 p-4 rounded-lg border border-green-200 hover:border-green-400 hover:bg-green-50 transition-all"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Lock size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-green-800">Admin Login</h4>
                    <p className="text-sm text-green-600">
                      Access the admin dashboard
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <div className="p-4 bg-green-50 border-t border-green-100 text-center">
              <p className="text-sm text-green-600">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    navigate("/signup");
                  }}
                  className="text-green-700 font-medium hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;