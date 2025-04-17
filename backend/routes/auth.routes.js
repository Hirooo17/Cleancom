import express from "express";
import { countUsers, deleteUser, getUsers, isAuthenticated, login, logout, register, resetOtp, resetPassword, sendVerifiedOtp, verifyEmai } from "../controller/auth.controller.js";
import userAuth from "../middleware/user.auth.js";


const authRouter = express.Router();


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifiedOtp);
authRouter.post('/verify-account', userAuth, verifyEmai);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', resetOtp );
authRouter.post('/reset-password', resetPassword );
authRouter.get('/count', countUsers)

authRouter.get('/users', getUsers);
authRouter.delete('/delete-users/:id', deleteUser);
export default authRouter;