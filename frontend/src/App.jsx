import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPass from './pages/ResetPass'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; //
import GetStarted from './pages/GetStarted'
import Report_page from './page_user/Report_page'


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPass />} />
        <Route path='/get-started' element={<GetStarted />} />
        <Route path='/report' element={<Report_page />} />

      </Routes>
    </div>
  )
}

export default App