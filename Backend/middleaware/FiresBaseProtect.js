import { firebaseAuth } from "../config/firebaseAdmin.js";



export const firebaseSessionLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase ID token is required",
      });
    }

    // Verify Firebase ID token
    await firebaseAuth.verifyIdToken(idToken);

    // Create Firebase session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const sessionCookie = await firebaseAuth.createSessionCookie(
      idToken,
      { expiresIn }
    );

    // Save session cookie in browser
    res.cookie("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });

  } catch (error) {
    console.error("Firebase Session Login Error:", error);

    return res.status(401).json({
      success: false,
      message: "Firebase authentication failed",
    });
  }
};