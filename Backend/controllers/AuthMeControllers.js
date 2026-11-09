import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import fireBaseUserModel from "../models/FireBaseUserModel.js";


export const getMe = async (req, res) => {
  try {

    const token = req.cookies?.token;


    if (!token) {
      return res.status(201).json({
        success: false,
        user: null,

      });
    }


    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );



    const firebaseUser = await fireBaseUserModel.findById(decoded.id).select("-passWord");
    let user = await userModel.findById(decoded.id).select("-passWord");

    user = user || firebaseUser


    if (!user) {
      return res.status(404).json({
        success: false,
        user: null,

      });
    }



    return res.status(200).json({
      success: true,
      user: user,

    });


  } catch (error) {
    // Token invalid or expired
    // console.log(error)
    return res.status(200).json({
      success: false,
      user: null,

    });
  }
}

