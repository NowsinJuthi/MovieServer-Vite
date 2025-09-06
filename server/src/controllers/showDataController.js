import userModel from "../models/userModel.js";

export const showDataController = async (req,res)=>{
    try {
            const allUsers =  await userModel.find({})
            return res.status(200).json(allUsers)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
}