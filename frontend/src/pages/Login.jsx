import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/app.context';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {




  const navigate = useNavigate();
  const { backendUrl, setIsLogin, getUserData } = useContext(AppContext);
  const [state, setState] = useState('Sign Up');
  const [isAnimating, setIsAnimating] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toggleState = (newState) => {
    setIsAnimating(true);
    setTimeout(() => {
      setState(newState);
      setIsAnimating(false);
    }, 300);
  };


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
        if (data.success) {
          setIsLogin(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.response?.data?.message || "An error occurred"); 
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if (data.success) {
          setIsLogin(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.response?.data?.message || "An error occurred"); 
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred"); 
    }
  }

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
          <h2 className="text-3xl font-semibold text-white text-center mb-3">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>

          <p className="text-center text-sm mb-8">
            {state === 'Sign Up' ? 'Create your account' : 'Login to your account'}
          </p>

          <form onSubmit={onSubmitHandler}>
            {state === 'Sign Up' && (
              <div className="mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#3A5C33] hover:bg-[#456339] transition-colors duration-300 focus-within:ring-2 focus-within:ring-indigo-400">
                <img src={assets.person_icon} alt="Person" className="w-5 h-5" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="bg-transparent outline-none w-full text-white placeholder-indigo-200/60"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}

            <div className="mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#3A5C33] hover:bg-[#456339] transition-colors duration-300 focus-within:ring-2 focus-within:ring-indigo-400">
              <img src={assets.mail_icon} alt="Email" className="w-5 h-5" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-transparent outline-none w-full text-white placeholder-indigo-200/60"
                type="email"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#3A5C33] hover:bg-[#456339] transition-colors duration-300 focus-within:ring-2 focus-within:ring-indigo-400">
              <img src={assets.lock_icon} alt="Lock" className="w-5 h-5" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-transparent outline-none w-full text-white placeholder-indigo-200/60"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <p onClick={() => navigate('/reset-password')} className="text-center mb-6 cursor-pointer hover:text-indigo-400 transition-colors duration-300 text-sm">
              Forgot Password?
            </p>

            <button className="cursor-pointer py-3 w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-800 text-white font-medium hover:from-indigo-600 hover:to-indigo-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50">
              {state}
            </button>
          </form>

          {state === 'Sign Up' ? (
            <p className="text-center text-gray-400 text-xs mt-6">
              Already have an account?{" "}
              <span
                onClick={() => toggleState('Login')}
                className="text-blue-400 cursor-pointer hover:text-blue-300 underline font-medium"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-center text-gray-400 text-xs mt-6">
              Don't have an account?{" "}
              <span
                onClick={() => toggleState('Sign Up')}
                className="text-blue-400 cursor-pointer hover:text-blue-300 underline font-medium"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;