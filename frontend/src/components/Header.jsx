import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/app.context';
import { AlertTriangle, Users, Heart } from 'lucide-react';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const { userData, isLoading, isLogin, getUserData } = useContext(AppContext);
  
  

  const getStartedButton =  async (e) => {
    e.preventDefault();

    try {
        if(isLogin){
          navigate('/get-started')
          getUserData();
        }
        else{
          toast.error("LOGIN FIRST")
        }

    } catch (error) {
        toast.error(error.message)
    }
  };

  
  // Create a greeting that works whether user is logged in or not
  const renderGreeting = () => {
    if (isLoading) {
      return (
        <h1 className='flex items-center justify-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
          <span className='animate-pulse bg-green-100 rounded w-32 h-8'></span>
          <span className='flex items-center justify-center bg-green-200 rounded-full w-10 h-10'>
            <Heart size={24} className='text-green-600' />
          </span>
        </h1>
      );
    }
    
    return (
      <h1 className='flex items-center justify-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Kamusta {userData ? userData.name : 'Kapamilya'}!
        <span className='flex items-center justify-center bg-green-200 rounded-full w-10 h-10'>
          <Heart size={24} className='text-green-600' />
        </span>
      </h1>
    );
  };
  
  return (
    <div className='bg-gradient-to-b from-green-50 to-green-100 py-16 px-4'>
      <div className='flex flex-col items-center text-center text-green-800 max-w-4xl mx-auto'>
        {/* Icon instead of image */}
        <div className='bg-green-200 rounded-full p-6 mb-6 shadow-lg'>
          <Users size={80} className='text-green-600' />
        </div>
        
        {renderGreeting()}
        
        <h2 className='text-3xl sm:text-5xl font-bold mb-6 text-green-700'>
          WELCOME TO <span className='text-green-600'>CLEANCOM</span>
        </h2>
        
        <p className='mb-4 max-w-2xl text-green-700 text-lg font-medium'>
          Your Voice Matters in Barangay 633! 🏘️
        </p>
        
        <p className='mb-8 max-w-2xl text-green-700 text-base'>
          Connect with your community through our comprehensive reporting system. From noise complaints to lost items, we're here to help make our barangay a better place for everyone to live, work, and thrive together.
        </p>
        
        <div className='flex gap-4'>
          <button 
            onClick={getStartedButton} 
            className='bg-green-600 text-white font-medium rounded-full px-8 py-3 hover:bg-green-700 transition-all shadow-md'
          >
            GET STARTED
          </button>
          
          <button 
            onClick={() => navigate('/about')}
            className='border-2 border-green-600 text-green-700 font-medium rounded-full px-8 py-3 hover:bg-green-100 transition-all'
          >
            LEARN MORE
          </button>
        </div>
        
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl'>
          <div className='bg-white p-4 rounded-xl shadow-sm border border-green-200 flex flex-col items-center'>
            <div className='bg-green-100 p-3 rounded-full mb-3'>
              <AlertTriangle size={24} className='text-green-600' />
            </div>
            <h3 className='font-medium text-green-800'>Report Issues</h3>
            <p className='text-green-600 text-sm'>Submit complaints about noise, safety, cleanliness, and more</p>
          </div>
          
          <div className='bg-white p-4 rounded-xl shadow-sm border border-green-200 flex flex-col items-center'>
            <div className='bg-green-100 p-3 rounded-full mb-3'>
              <Users size={24} className='text-green-600' />
            </div>
            <h3 className='font-medium text-green-800'>Lost & Found</h3>
            <p className='text-green-600 text-sm'>Help reunite community members with their belongings</p>
          </div>
          
          <div className='bg-white p-4 rounded-xl shadow-sm border border-green-200 flex flex-col items-center'>
            <div className='bg-green-100 p-3 rounded-full mb-3'>
              <Heart size={24} className='text-green-600' />
            </div>
            <h3 className='font-medium text-green-800'>Community Impact</h3>
            <p className='text-green-600 text-sm'>Track how your reports create positive change in Brgy 633</p>
          </div>
        </div>
        
        <div className='mt-8 text-green-600 text-sm font-medium'>
          🤝 Together, we build a stronger Barangay 633 community!
        </div>
      </div>
    </div>
  );
};

export default Header;