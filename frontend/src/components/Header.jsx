import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/app.context';
import { Trash2, Recycle, Leaf } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/get-started');
  };
  
  const { userData } = useContext(AppContext);
  
  return (
    <div className='bg-gradient-to-b from-green-50 to-green-100 py-16 px-4'>
      <div className='flex flex-col items-center text-center text-green-800 max-w-4xl mx-auto'>
        {/* Icon instead of image */}
        <div className='bg-green-200 rounded-full p-6 mb-6 shadow-lg'>
          <Recycle size={80} className='text-green-600' />
        </div>
        
        <h1 className='flex items-center justify-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
          Hey {userData ? userData.name : 'Eco Warrior'}!
          <span className='flex items-center justify-center bg-green-200 rounded-full w-10 h-10'>
            <Leaf size={24} className='text-green-600' />
          </span>
        </h1>
        
        <h2 className='text-3xl sm:text-5xl font-bold mb-6 text-green-700'>
          WELCOME TO <span className='text-green-600'>CLEAN</span>COM
        </h2>
        
        <p className='mb-8 max-w-md text-green-700 text-lg'>
          Join our community effort to keep our environment clean and sustainable
        </p>
        
        <div className='flex gap-4'>
          <button 
            onClick={handleGetStarted} 
            className='bg-green-600 text-white font-medium rounded-full px-8 py-3 hover:bg-green-700 transition-all shadow-md'
          >
            GET STARTED
          </button>
          
          <button 
            className='border-2 border-green-600 text-green-700 font-medium rounded-full px-8 py-3 hover:bg-green-100 transition-all'
          >
            LEARN MORE
          </button>
        </div>
        
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl'>
          <div className='bg-white p-4 rounded-xl shadow-sm border border-green-200 flex flex-col items-center'>
            <div className='bg-green-100 p-3 rounded-full mb-3'>
              <Trash2 size={24} className='text-green-600' />
            </div>
            <h3 className='font-medium text-green-800'>Report Issues</h3>
            <p className='text-green-600 text-sm'>Submit complaints about waste management</p>
          </div>
          
          <div className='bg-white p-4 rounded-xl shadow-sm border border-green-200 flex flex-col items-center'>
            <div className='bg-green-100 p-3 rounded-full mb-3'>
              <Recycle size={24} className='text-green-600' />
            </div>
            <h3 className='font-medium text-green-800'>Recycle Guide</h3>
            <p className='text-green-600 text-sm'>Learn proper waste segregation</p>
          </div>
          
          <div className='bg-white p-4 rounded-xl shadow-sm border border-green-200 flex flex-col items-center'>
            <div className='bg-green-100 p-3 rounded-full mb-3'>
              <Leaf size={24} className='text-green-600' />
            </div>
            <h3 className='font-medium text-green-800'>Community Impact</h3>
            <p className='text-green-600 text-sm'>See how your efforts make a difference</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;