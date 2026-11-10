
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import fireBaseUserModel from "../models/FireBaseUserModel.js";

export const getMe = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        user: null,
        message: "Please login",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    let user = await userModel
      .findById(decoded.id)
      .select("-passWord");

    if (!user) {
      user = await fireBaseUserModel
        .findById(decoded.id)
        .select("-passWord");
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        user: null,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("GetMe Error:", error.message);

    return res.status(401).json({
      success: false,
      user: null,
      message: "Invalid or expired token",
    });
  }
};
