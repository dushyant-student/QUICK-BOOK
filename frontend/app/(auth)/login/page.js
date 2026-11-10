"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, User } from "lucide-react";
import { useAuth } from "@/context/authProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import GoogleLogin from "@/app/ComponentsClient.js/GoogleLogin";
import { LoginService } from "@/services/authServices";



export default function LoginForm({ type = "login" }) {
  const router = useRouter();
  const isLogin = type === "login";
  const { user, refreshUser, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passWord: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await LoginService(formData);

      if (!response?.success) {
        toast.error(response?.message || "Login failed");
        return;
      }

      // Verify session using backend cookie
      const loggedInUser = await refreshUser();

      if (!loggedInUser) {
        toast.error("Login successful, but session verification failed");
        return;
      }

      toast.success("Login Successfully");
      window.location.reload()
      

    } catch (err) {
      // console.error("Login Error:", err);

      toast.error(
        err?.response?.data?.message || "Login failed"
      );

    } finally {
      setIsSubmitting(false);
    }
  };




  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-8">

      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">

        <div className="rounded-3xl border border-white/10 bg-white/[0.07] backdrop-blur-xl shadow-2xl p-6 sm:p-8">

          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Lock className="text-white" size={26} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold text-white">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="text-slate-400 mt-2 text-sm">
              {isLogin
                ? "Login to continue to your account"
                : "Create your account and get started"}
            </p>
          </div>

          <GoogleLogin />

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            {!isLogin && (
              <div>
                <label className="text-sm text-slate-300">
                  Full Name
                </label>

                <div className="relative mt-2">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-sm text-slate-300">
                Email Address
              </label>

              <div className="relative mt-2">
                {/* <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                /> */}

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between">
                <label className="text-sm text-slate-300">
                  Password
                </label>

                {isLogin && (
                  <Link
                    href="/forgot-password"

                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="passWord"
                  value={formData.passWord}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required

                  className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-11 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div>
                <label className="text-sm text-slate-300">
                  Confirm Password
                </label>

                <div className="relative mt-2">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData?.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-11 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Terms */}
            {!isLogin && (
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  required
                  className="mt-1 accent-indigo-500"
                />

                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-indigo-400 hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3.5 font-semibold text-white disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
              <ArrowRight size={18} />
            </button>

          </form>

          {/* Switch */}
          <div className="text-center mt-6 text-sm text-slate-400">

            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Create account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Login
                </Link>
              </>
            )}

          </div>

        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-slate-600 mt-5">
          © 2026 YourApp. All rights reserved.
        </p>

      </div>
    </div>
  );
}
