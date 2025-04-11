import express from 'express';
import { adminLogin, adminLogout, adminRegister, adminSendVerifiedOtp, adminVerifyEmail } from '../controller/adminAuth.controller.js';
import adminAuth from '../middleware/admin.auth.js';


const adminRouter = express.Router();

adminRouter.post('/admin-register', adminRegister);
adminRouter.post('/admin-login', adminLogin);
adminRouter.post('/admin-logout', adminLogout);
adminRouter.post('/admin-send-otp', adminAuth, adminSendVerifiedOtp)
adminRouter.post('/admin-verify-email', adminAuth, adminVerifyEmail);



export default adminRouter;