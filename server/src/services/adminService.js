import bcrypt from 'bcrypt';
import registerModel from "../models/registerModel.js";
import { sendOTPtoEmail } from "../utils/mailer.js";
import { generateToken, verifyOTP } from '../utils/helper.js';

export const registerService = async (email, password) => {
    if (!email || !password) {
        const error = new Error('Email and Password are required');
        error.statusCode = 400;
        throw error;
    }

    const existingUser = await registerModel.findOne({ email });
    if (existingUser) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const newAdmin = new registerModel({
        email,
        password: hashedPassword,
        otp,
        otpExpires
    });

    await newAdmin.save();

    await sendOTPtoEmail(email, otp);

    return { message: "Registration successful, OTP sent to email" };
};

export const findAdminByEmail = async (email) => {
    return await registerModel.findOne({ email });
};

export const saveOTPtoAdmin = async (email, otp, otpExpires, hashedPassword) => {
    return await registerModel.findOneAndUpdate({ email }, {
        otp,
        otpExpires,
        password: hashedPassword
    }, { new: true });
};

export const adminLoginService = async (email, password) => {
    
    const admin = await registerModel.findOne({ email });

    if (!admin) {
        const error = new Error('User Not Found');
        error.statusCode = 400;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
        const error = new Error('Invalied Credantial');
        error.statusCode = 400;
        throw error;
    }

    if(!admin.isVerified){
        const error = new Error('Please verify your email');
        error.statusCode = 400;
        throw error;
    }

    const {accesstoken, refreshtoken, refreshtokenExpies} = generateToken(admin?._id);

    admin.refreshtoken.push({
        token: refreshtoken,
        expiresAt: refreshtokenExpies
    });

    await admin.save();

    return {
        accesstoken,
        refreshtoken,
        message:"User logged in successfully"
    }
};

export const adminVerifyService = async (email, otp) => {
    const admin = await registerModel.findOne({ email });

    if (!admin) {
        const error = new Error('User Not Found');
        error.statusCode = 400;
        throw error;
    }

    if (!verifyOTP(otp, admin)) {
        const error = new Error('Invalid or OTP Expired');
        error.statusCode = 400;
        throw error;
    }

    admin.otp = undefined;
    admin.otpExpires = undefined;
    admin.isVerified = true;

    const { accesstoken, refreshtoken, refreshtokenExpies } = generateToken(admin._id);

    admin.refreshtoken.push({
        token: refreshtoken,
        expiresAt: refreshtokenExpies
    });

    await admin.save();

    return {
        accesstoken,
        refreshtoken,
        message: "User verified successfully"
    };
};


export const adminLogoutService =()=>{

}
