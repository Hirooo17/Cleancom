import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/app.context";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LogIn,
  Recycle,
  ChevronRight,
  LogOut,
  Mail,
  User,
  Bell,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, backendUrl, setIsLogin } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        toast.success("OTP Sent Successfully");
        navigate("/email-verify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLogin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
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
      {userData ? (
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex p-2 rounded-full text-green-700 hover:bg-green-50">
            <Bell size={20} />
          </button>

          <div className="relative group">
            <div
              className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white 
              cursor-pointer hover:from-green-600 hover:to-green-700 transition-all"
            >
              {userData.name[0].toUpperCase()}
            </div>

            {/* Dropdown menu */}
            <div
              className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible 
              group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-green-100"
            >
              <div className="p-3 border-b border-green-100">
                <p className="font-medium text-green-800">{userData.name}</p>
                <p className="text-sm text-green-600">{userData.email}</p>
              </div>

              <ul className="py-1">
                <li>
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-green-50 text-green-700"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                </li>

                {!userData.isverified && (
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
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-green-600 rounded-full px-6 py-2 text-white hover:bg-green-700 transition-all"
        >
          LOGIN <LogIn size={16} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
