"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { googleLogin } from "@/services/authServices";


export default function GoogleLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      
      await googleLogin();

      router.push("/dashboard");
      router.refresh();

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
      className="border rounded-lg px-5 py-3 flex items-center justify-between gap-3 w-full mb-4 border-white/10 bg-white/5 hover:bg-white/10 text-white py-3 transition "
    >
      {loading ? "Please wait..." : <span className="pl-18 font-semibold" >Continue with Google</span> }
    </button>
  );
}