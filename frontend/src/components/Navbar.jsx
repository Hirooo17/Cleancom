import React, {  useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/app.context'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

  const navigate = useNavigate()

  const { userData, setUserData, backendUrl, setIsLogin,  } = useContext(AppContext)

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')
      if (data.success) {
        toast.success('OTP Sent Successfully')
        navigate('/email-verify')
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }


  const logout = async () => {
    try {
     axios.defaults.withCredentials = true;
     const { data } = await axios.post(backendUrl + '/api/auth/logout')
     data.success && setIsLogin(false)
     data.success && setUserData(false)
     navigate('/')
    } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
    }
  }
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>

      <img src={assets.logo} alt="logo" className="w-28 sm:w-32" />

      {userData ?
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white 
        relative group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-green-500 hover:to-blue-600 hover:scale-110">

          {userData.name[0].toUpperCase()}

          {/* Smooth Dropdown Animation */}
          <div className="absolute top-full right-0 z-10 bg-white text-black rounded-md shadow-md opacity-0 translate-y-[-10px] 
          group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
            <ul className="py-2 w-40">
              {!userData.isverified && <li onClick={sendVerificationOtp} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Verify Email</li>  }

              
              <li onClick={logout} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
            </ul>
          </div>

        </div>

        :
        <button onClick={() => navigate('/login')}

          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>
          LOGIN <img src={assets.arrow_icon} alt="arrow" className="w-4 sm:w-6" />
        </button>
      }



    </div>
  )
}

export default Navbar