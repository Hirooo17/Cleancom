import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/app.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const EmailVerify = () => {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const inputRefs = React.useRef([]);
  
  const {backendUrl, isLogin, userData, getUserData} = useContext(AppContext)

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {

    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp}) 
      if(data.success){
        toast.success(data.message)
        getUserData() 
        navigate("/")

      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() =>{
      isLogin && userData && userData.isverified && navigate('/')
  },[isLogin, userData])

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-green-100 to-lime-300">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer hover:scale-105 transition-transform duration-300"
      />

      <form onSubmit={onSubmitHandler} className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-96 text-sm border border-slate-700/30 backdrop-blur-sm">
        {/* Header with icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-500/20 p-4 rounded-full mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Email Verification
          </h1>
          <p className="text-center text-indigo-300/80 max-w-xs">
            We've sent a verification code to your email
          </p>
        </div>

        {/* OTP Input Section */}
        <div className="mb-8">
          <label className="block text-indigo-200 text-xs font-medium mb-3 ml-1">
            Enter verification code
          </label>
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  required
                  className="w-12 h-12 bg-slate-800/80 text-white text-center text-xl rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200 outline-none shadow-inner"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    // Auto-focus next input
                    if (e.target.value && index < 5) {
                      e.target.nextElementSibling?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    // Handle backspace to go to previous input
                    if (e.key === "Backspace" && !e.target.value && index > 0) {
                      e.target.previousElementSibling?.focus();
                    }
                  }}
                />
              ))}
          </div>
        </div>

        {/* Timer and Resend Section */}
        <div className="flex justify-between items-center mb-8 text-xs">
          <span className="text-slate-400">
            Code expires in{" "}
            <span className="text-indigo-300 font-medium">04:32</span>
          </span>
          <button
            type="button"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Resend Code
          </button>
        </div>

        {/* Submit Button */}
        <button className="cursor-pointer py-3.5 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-medium hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-indigo-500/40">
          Verify Email
        </button>

        {/* Help Link */}
        <p className="text-center text-slate-500 text-xs mt-6">
          Didn't receive the email?{" "}
          <a
            href="#"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Check spam folder
          </a>
        </p>
      </form>
    </div>
  );
};
export default EmailVerify;
