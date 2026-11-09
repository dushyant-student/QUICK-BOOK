import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import fireBaseUserModel from "../models/FireBaseUserModel.js";

export const protect = async (req, res, next) => {
    try {
        // GET TOKEN FROM COOKIE
        
        const token = req.cookies?.token;
       
        // TOKEN NOT FOUND
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please Login",
            });
        }


    
        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        // Find user in Firebase and MongoDB
        const user = await fireBaseUserModel.findById(decoded.id).select("-password") || await User.findById(decoded.id).select("-password") ;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


       
        req.user = user;
        
        next();

    } catch (error) {
        // console.log("PROTECT ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
