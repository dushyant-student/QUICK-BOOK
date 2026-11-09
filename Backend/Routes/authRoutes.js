import express from "express";
import { protect } from "../middleaware/protect.js";
import { firebaseLogin, Register , Login, Logout } from "../controllers/authController.js";
import { getMe } from "../controllers/AuthMeControllers.js";
import upload from "../middleaware/multer.js";
import { getServerProfile, updateProfile } from "../controllers/profileControllers.js";



const authuRoutes = express.Router();


// Google Login
authuRoutes.post("/firebase", firebaseLogin);

// Check logged-in user
authuRoutes.get("/me", getMe);

// Register
authuRoutes.post("/register", Register);

// Login
authuRoutes.post("/login", Login);

//Logout
authuRoutes.get("/logout",Logout);

//Get Login profile
authuRoutes.get( "/get-my-profile",protect,  getServerProfile );

// Update profile
authuRoutes.put( "/update-profile", protect, upload.single("imageURL"), updateProfile);


export default authuRoutes;