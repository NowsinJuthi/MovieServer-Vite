
import { adminLoginService, adminVerifyService, registerService } from '../services/adminService.js';


export const adminRegister = async (req, res) => {

    try {

        const { email, password } = req.body
        const result = await registerService(email, password)
        return res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        const result = await adminLoginService(email, password)
        return res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const verifyAdmin = async (req, res) => {

    try {
        const { email, otp } = req.body
        const result = await adminVerifyService(email, otp)
        return res.status(201).json(result)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const refreshAccessToken = (req, res) => {

    // try {
    //     const token = req.cookie.refreshtoken;

    //     if (!token) return res.status(404).json({ message: "No refresh token found" })

    //     const verified = ''

    //     if (!verified) return res.status(403).json({ message: "Unauthorized token" })

    //     const newAccessToken = ''
    //     res.status(200).json({ message: "Access token refreshed" })
    //         .cookie('accesstoken', newAccessToken, {
    //             httpOnly: truq,
    //             secure: true,
    //             sameSite: "Strict",
    //             maxAge: 10 * 60 * 1000
    //         })


    // } catch (error) {
    //     res.status(500).json({ message: error.message })
    // }
}
export const logOutAdmin = async (req, res) => {

    try {
        const [refreshtoken] = req.body
        const result = await adminLogoutService(req.admin, refreshtoken)
        return res.status(201).json(result)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}