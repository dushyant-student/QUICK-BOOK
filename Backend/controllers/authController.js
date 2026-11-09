import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import fireBaseUserModel from "../models/FireBaseUserModel.js";
import { firebaseAuth } from "../config/firebaseAdmin.js";




// GENERATE JWT + HTTP ONLY COOKIE After Login
export const generateToken = (res, userId) => {
    const token = jwt.sign(
        {
            id: userId,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "3d",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
        path: "/",
    });

    return token;
};





// REGISTER
export const Register = async (req, res) => {
    try {
        const { name, email, passWord } = req.body;

        if (!name || !email || !passWord) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                user:[],
                success: false,
                message: "User already exists",
            });
        }

        const hashPassword = await bcrypt.hash(passWord, 10);

        const user = await userModel.create({  name,  email,  passWord: hashPassword, });

        return res.status(201).json({
            success: true,
            message: "Register Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        // console.log("REGISTER Fault:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




// LOGIN
export const Login = async (req, res) => {
    try {
        const { email, passWord } = req.body;

        if (!email || !passWord) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details",
            });
        }
        

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Account/profile doesn't exist",
            });
        }



        const matchPassword = await bcrypt.compare(
            passWord,
            user.passWord
        );



        if (!matchPassword) {
            return res.status(401).json({
                success: false,
                message: "Password does not match",
            });
        }

      
        
        generateToken(res, user._id.toString());
        

        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        // console.log("LOGIN Fault:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};





// LOGOUT
export const Logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successfully",
        });
    } catch (error) {
       

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};





//Firebase Login Controller
export const firebaseLogin = async (req, res) => {
  try {
    
    const { idToken } = req.body || {};

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase ID token is required",
      });
    }

   
    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    const { uid, email, name, picture, email_verified, } = decodedToken;

    if (!email || !email_verified) {
      return res.status(401).json({
        success: false,
        message: "Verified Google email is required",
      });
    }

    
    let user = await fireBaseUserModel.findOne({
      firebaseUid: uid,
    });

    
    if (!user) {
      user = await fireBaseUserModel.findOne({
        email: email.toLowerCase(),
      });
    }
   

   
    if (!user) {
      user = await fireBaseUserModel.create({
        name: name || email.split("@")[0],
        email: email.toLowerCase(),
        firebaseUid: uid,
        imageURL: picture || "",
        authProvider: "google",
      });

    } else {
      
      if (user.firebaseUid && user.firebaseUid !== uid) {
        return res.status(409).json({
          success: false,
          message: "This email is already linked to another Google account",
        });
      }

      user.firebaseUid = uid;

      if (!user.imageURL && picture) {
        user.imageURL = picture;
      }

      await user.save();
    }


     generateToken(res, user._id.toString());
    
    
    return res.status(200).json({
      success: true,
      isNewUser: user.createdAt?.getTime() === user.updatedAt?.getTime(),
      message: "Google login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.imageURL,
      },
    });

  } catch (error) {
    console.error("Firebase Login Error:", error);

    return res.status(401).json({
      success: false,
      message: "Google authentication failed",
      error: error.message,
    });
  }
};
