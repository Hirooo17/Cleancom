import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../model/user.model.js';
import transporter from '../config/node_mailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplate.js';



export const register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
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
        return res.status(200).json({ success: true, message: "User registered successfully", token: generateToken });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}



export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }
        const generateToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.cookie('token', generateToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,


            }
        )
        console.log('token created')
        return res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}



export const logout = async (req, res) => {
    res.clearCookie('token',
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',



        });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}



export const sendVerifiedOtp = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);
        if (user.isverified) {
            return res.status(400).json({ success: false, message: "User already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOTP = otp;
        user.verifyOTPExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: 'BARANGAY NG MGA TILAG',
            to: user.email,
            subject: 'Account Verification',
            // text: `Your OTP  ${otp}`, 
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


//
export const verifyEmai = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        if (user.verifyOTP !== otp || user.isVerified === '') {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOTPExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        user.isverified = true
        user.verifyOTP = ''
        user.verifyOTPExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: "email verified success" })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// check if user is authenticated
export const isAuthenticated = (req, res) => {

    try {
        res.json({ success: true, message: "User is authenticated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// reset otp

export const resetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOTP = otp;
        user.resetOTPexpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();
        console.log("User OTP:", otp);

        // Respond immediately
        res.json({ success: true, message: "OTP generated. Check your email." });

        // Send email in the background
        transporter.sendMail({
            from: 'BARANGAY NG MGA TILAG',
            to: user.email,
            subject: 'Password Reset OTP',
            // text: `Your OTP to reset your password is ${otp}`
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }).catch(error => console.error("Email sending failed:", error));

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



// reset password

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Check if OTP is expired before validating it
        if (user.resetOTPexpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        console.log("User OTP:", user.resetOTP);
        console.log("Received OTP:", otp);
        console.log("Type of User OTP:", typeof user.resetOTP);
        console.log("Type of Received OTP:", typeof otp);

        // Ensure OTP is compared as a string
        if (String(user.resetOTP) !== String(otp)) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOTP = '';
        user.resetOTPexpireAt = 0;
        await user.save();
        
        console.log("User updated:", user);

        return res.json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
