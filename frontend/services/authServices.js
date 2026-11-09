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
    
    // Backend login
    const loginResponse = await fetch(`${API_URL}/auth/firebase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ idToken }),
    });
    
    const loginData = await loginResponse.json();
    
    
    if (!loginResponse.ok || !loginData.success) {
      throw new Error(loginData.message);
    }
    
    
    
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error("Unable to fetch user");
    }
    
    
    await signOut(auth);
    return data;

  } catch (error) {
    // console.error("Google Login Error:", error);
    await signOut(auth).catch(() => {});
    throw error;
  }
};

