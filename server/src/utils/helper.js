import jwt from 'jsonwebtoken'

export const verifyOTP = (otp, admin) => {
    const isMatch = String(admin.otp) === String(otp);
    const notExpired = admin.otpExpires && admin.otpExpires > new Date();
    return isMatch && notExpired;
};

export const generateToken = (adminId) => {
    const accesstoken = jwt.sign({ adminId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    const refreshtoken = jwt.sign({ adminId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    const refreshtokenExpies = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return {
        accesstoken,
        refreshtoken,
        refreshtokenExpies
    };
};