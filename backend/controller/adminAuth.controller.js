import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplate.js';
import adminModel from '../model/admin.model.js';
import transporter from '../config/node_mailer.js';

export const adminRegister = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const existingUser = await adminModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = adminModel({ name, email, password: hashedPassword });
        await user.save();

        const generateToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.cookie('token', generateToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

                maxAge: 7 * 24 * 60 * 60 * 1000,


            }

        );
        //Sending welcome email
        const mailOptions = {
            from: 'BARANGAY NG MGA TILAG',
            to: email,
            subject: 'Welcome to CLEAN COM',
            text: `Welcome to CLEAN COM, your account has been created successfully. with this login email: ${email} .`
        }

        await transporter.sendMail(mailOptions)
        return res.status(200).json({ success: true, message: "admin registered successfully", token: generateToken });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const user = await adminModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const generateToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie('token', generateToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

                maxAge: 7 * 24 * 60 * 60 * 1000,


            }

        );

        return res.status(200).json({ success: true, message: "admin logged in successfully", token: generateToken });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


export const adminLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ success: true, message: "admin logged out successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const adminSendVerifiedOtp = async (req, res) => {
    try {

       const {userId} = req.body;

       const admin = await adminModel.findById(userId);
       if (!admin) {
           return res.status(400).json({ success: false, message: "Admin not found" });
       }
         const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const expireTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now
            admin.verifyOTP = otp;
            admin.verifyOTPExpireAt = expireTime;
            await admin.save();
            const mailOptions = {
                from: 'BARANGAY NG MGA TILAG',
                to: admin.email,
                subject: 'Verify your email address',
                text: `Your OTP is ${otp}. It is valid for 5 minutes.`
            }
            await transporter.sendMail(mailOptions)
            return res.status(200).json({ success: true, message: "OTP sent successfully" });

        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
        
    }
}

export const adminVerifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const admin = await adminModel.findById(userId);
        if (!admin) {
            return res.status(400).json({ success: false, message: "admin not found" });
        }

        if (admin.verifyOTP !== otp || admin.isVerified === '') {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (admin.verifyOTPExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        admin.isverified = true
        admin.verifyOTP = ''
        admin.verifyOTPExpireAt = 0;

        await admin.save();
        return res.json({ success: true, message: "email verified success" })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

