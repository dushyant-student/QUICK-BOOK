import api from "@/lib/axios";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";


const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;


export const RegisterService =async (formData)=>{
    const response = await api.post("/auth/register",formData);
    return response.data ;
}


export const LoginService = async (formData)=>{
    const response = await api.post("/auth/login",formData);
    return response.data ;
}



export const LogoutService = async()=>{
    const response = await api.get("/auth/logout");
    return response.data ;
    
} 



// Google login
export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const idToken = await result.user.getIdToken();

    // Login through same-origin API
    const loginResponse = await api.post("/auth/firebase", {
      idToken,
    });

    if (!loginResponse.data?.success) {
      throw new Error(
        loginResponse.data?.message || "Google login failed"
      );
    }

    // Verify session
    const sessionResponse = await api.get("/auth/me");

    if (!sessionResponse.data?.success) {
      throw new Error("Unable to verify session");
    }

    await signOut(auth);

    return sessionResponse.data;

  } catch (error) {
    await signOut(auth).catch(() => {});
    throw error;
  }
};
