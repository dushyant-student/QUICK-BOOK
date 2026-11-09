import bcrypt from "bcryptjs";
import fireBaseUserModel from "../models/FireBaseUserModel.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";


// GET MY PROFILE
export const getServerProfile = async (req, res) => {
    try {
       

        if (!req?.user || !req?.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User Credentials",
            });
        }

        const profile = await userModel
            .findById(req.user?.id)
            .select("-passWord");

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        return res.status(200).json({
            success: true,
            profile,
        });
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




//You Can UPDATE PROFILE Goolge Profile or Create Account profile
export const updateProfile = async (req, res) => {
    try {
        
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const user =await fireBaseUserModel.findById(req.user?.id) || await userModel.findById(req.user?.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: req?.user,
            });
        }

        // Update Data's
        if (req.body.name) {
            user.name = req.body?.name;
        }

        
        if (req.body.email) {
            user.email = req.body?.email;
        }

        
        if (req.body.description) {
            user.description = req.body?.description;
        }

        
        if (req.file) {
            
            if (user.public_id) {
                await cloudinary.uploader.destroy(
                    user.public_id
                );
            }

            
            const result = await cloudinary.uploader.upload(
                req.file.path
            );
            user.imageURL = result.secure_url ;
            user.public_id = result.public_id;
            
        }

        // Update password
        if (req.body?.passWord) {
            if (req.body?.passWord.length < 6) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Password must be at least 6 characters long",
                });
            }

            user.passWord = await bcrypt.hash(
                req.body.passWord,
                10
            );
        }

        const updatedUser = await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            data: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                description: updatedUser.description,
                imageURL: updatedUser.imageURL,
            },
        });
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


