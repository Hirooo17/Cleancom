import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminAuth = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState('login'); // 'login' or 'signup'
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminKey: '' // Additional field for admin registration
  });

  const toggleAuthState = (newState) => {
    setIsAnimating(true);
    setTimeout(() => {
      setAuthState(newState);
      setIsAnimating(false);
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary frontend-only validation
    if (authState === 'signup' && !formData.adminKey) {
      toast.error('Admin key is required');
      return;
    }
    toast.info(authState === 'login' ? 'Admin login logic would go here' : 'Admin signup logic would go here');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-green-100 to-lime-300">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer hover:scale-105 transition-transform duration-300"
      />

      <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-full sm:w-96 text-indigo-300 text-sm border border-slate-700 transition-all duration-500 hover:shadow-xl">
        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex justify-center mb-2">
            <div className="bg-indigo-900/50 text-indigo-300 px-4 py-1 rounded-full text-xs font-medium">
              Admin Portal
            </div>
          </div>

          <h2 className="text-3xl font-semibold text-white text-center mb-3">
            {authState === 'signup' ? 'Admin Registration' : 'Admin Login'}
          </h2>

          <p className="text-center text-sm mb-8 text-gray-400">
            {authState === 'signup' 
              ? 'Register a new admin account' 
              : 'Access the admin dashboard'
            }
          </p>

          <form onSubmit={handleSubmit}>
            {authState === 'signup' && (
              <>
                <div className="mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#3A5C33] hover:bg-[#456339] transition-colors duration-300 focus-within:ring-2 focus-within:ring-indigo-400">
                  <img src={assets.person_icon} alt="Person" className="w-5 h-5" />
                  <input
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    className="bg-transparent outline-none w-full text-white placeholder-indigo-200/60"
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className="mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#3A5C33] hover:bg-[#456339] transition-colors duration-300 focus-within:ring-2 focus-within:ring-indigo-400">
                  <img src={assets.key_icon} alt="Key" className="w-5 h-5" />
                  <input
                    name="adminKey"
                    onChange={handleChange}
                    value={formData.adminKey}
                    className="bg-transparent outline-none w-full text-white placeholder-indigo-200/60"
                    type="password"
                    placeholder="Admin Secret Key"
                    required
                  />
                </div>
              </>
            )}

            <div className="mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#3A5C33] hover:bg-[#456339] transition-colors duration-300 focus-within:ring-2 focus-within:ring-indigo-400">
              <img src={assets.mail_icon} alt="Email" className="w-5 h-5" />
              <input
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="bg-transparent outline-none w-full text-white placeholder-indigo-200/60"
                type="email"
                placeholder="Admin Email"
                required
              />
            </div>

            <div className="mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#3A5C33] hover:bg-[#456339] transition-colors duration-300 focus-within:ring-2 focus-within:ring-indigo-400">
              <img src={assets.lock_icon} alt="Lock" className="w-5 h-5" />
              <input
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="bg-transparent outline-none w-full text-white placeholder-indigo-200/60"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <button className="cursor-pointer py-3 w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-800 text-white font-medium hover:from-indigo-600 hover:to-indigo-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50 mb-6">
              {authState === 'login' ? 'Login as Admin' : 'Register Admin'}
            </button>
          </form>

          {authState === 'login' ? (
            <p className="text-center text-gray-400 text-xs">
              Need admin access?{' '}
              <span
                onClick={() => toggleAuthState('signup')}
                className="text-blue-400 cursor-pointer hover:text-blue-300 underline font-medium"
              >
                Register here
              </span>
            </p>
          ) : (
            <p className="text-center text-gray-400 text-xs">
              Already an admin?{' '}
              <span
                onClick={() => toggleAuthState('login')}
                className="text-blue-400 cursor-pointer hover:text-blue-300 underline font-medium"
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;