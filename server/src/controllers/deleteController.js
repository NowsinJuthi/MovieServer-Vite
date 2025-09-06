import userModel from "../models/userModel.js";

export const deleteController = async(req, res)=>{
     try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete user" });
    }
}
