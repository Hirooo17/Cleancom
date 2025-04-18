import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminAccessPin = () => {
    const navigate = useNavigate()
    const inputRefs = React.useRef([]);
    const ADMIN_PIN = "633633"; // Fixed admin pin

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").replace(/\D/g, ''); // Remove non-digits
        const pasteArray = paste.split("");
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        // Combine all input values
        const enteredPin = inputRefs.current
            .map(input => input.value)
            .join('');
        
        if (enteredPin.length !== 6) {
            toast.error("Please enter a 6-digit pin");
            return;
        }

        if (enteredPin === ADMIN_PIN) {
            toast.success("Admin Login access granted!");
            // Store admin access in localStorage or context
            localStorage.setItem('adminAccess', 'granted');
            navigate('/admin-login'); // Redirect to admin dashboard
        } else {
            toast.error("Invalid admin pin");
            // Clear all inputs
            inputRefs.current.forEach(input => input.value = '');
            // Focus first input
            inputRefs.current[0]?.focus();
        }
    }

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
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Admin Access
                    </h1>
                    <p className="text-center text-indigo-300/80 max-w-xs">
                        Enter admin pin to access the the Admin Login
                    </p>
                </div>

                {/* PIN Input Section */}
                <div className="mb-8">
                    <label className="block text-indigo-200 text-xs font-medium mb-3 ml-1">
                        Enter 6-digit admin pin
                    </label>
                    <div className="flex justify-between gap-2" onPaste={handlePaste}>
                        {Array(6)
                            .fill(0)
                            .map((_, index) => (
                                <input
                                    key={index}
                                    type="password"
                                    maxLength="1"
                                    required
                                    className="w-12 h-12 bg-slate-800/80 text-white text-center text-xl rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200 outline-none shadow-inner"
                                    ref={(el) => (inputRefs.current[index] = el)}
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
                                    autoComplete="off"
                                />
                            ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit"
                    className="cursor-pointer py-3.5 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-medium hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-indigo-500/40"
                >
                    Verify Admin Pin
                </button>

                {/* Security Note */}
                <p className="text-center text-slate-500 text-xs mt-6">
                    For security reasons, please don't share this pin
                </p>
            </form>
        </div>
    );
};

export default AdminAccessPin;