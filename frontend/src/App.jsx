import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import EmailVerify from './pages/emailVerify'
import ResetPass from './pages/resetPass'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; //


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPass />} />
      </Routes>
    </div>
  )
}

export default App