import userModel from "../models/userModel.js";


export const userCreate = async (req,res) => {
    try {
        const newUser = req.body;
        await userModel.create(newUser)

        return res.status(201).json({
            message:"User created",
            data:newUser,
        })
    } catch (error) {
        return res.status(500).json({massage:"Server Error"})
    }
 
};
