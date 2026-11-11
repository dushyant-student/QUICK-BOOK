"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { googleLogin } from "@/services/authServices";
import toast from "react-hot-toast";


export default function GoogleLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      
      const user = await googleLogin();
      
      if (!user.success){
        toast.error("LOGIN FAILED")
        return
      }
      router.push("/dashboard");
      window.location.reload()
      

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="border rounded-lg px-5 py-3 flex items-center justify-between gap-3 w-full mb-4 border-white/10 bg-white/5 hover:bg-white/10 text-white transition "
    >
      {loading ? "Please wait..." : <span className="pl-18 font-semibold" >Continue with Google</span> }
    </button>
  );
}