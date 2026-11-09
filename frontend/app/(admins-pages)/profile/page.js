"use client";

import { useAuth } from "@/context/authProvider";
import { UpdateProfile } from "@/services/profileServices";
import { Camera, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const emptyProfile = {
  name: "",
  email: "",
  passWord: "",
  description: "",
  imageURL: "",
};


export default function Profile() {
  const { user, setUser } = useAuth();
  const inputRef = useRef(null);
  const [form, setForm] = useState(emptyProfile);
  const [image, setImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [ExistERROR , setExitERROR] = useState("")
  const [showPassword, setShowPassword] = useState(false);


  
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        passWord: "",
        description: user.description || "",
        imageURL: user.imageURL || "",
      });
    }
  }, [user]);

  // Input change
  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  
  

  // open Image Box
  const openInputBox = () => {
    inputRef.current?.click();
  };


  // Image select
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;
    handleChange("imageURL", file);
    setImage(URL.createObjectURL(file));

  };



  // Update profile
  const EditProfile = async () => {
    try {
      setIsUpdating(true);
      setExitERROR("")
      const formData = new FormData();

      if (form?.passWord) {
       
        if ((form?.passWord).length < 6  ){
          setExitERROR("Password length Must be Greater than 6")
          return
        }
        formData.append("passWord", form?.passWord);
        
      }

      formData.append("name", form.name);
      formData.append("email", form.email);


      if (form?.description) {
        formData.append("description", form.description);
      }

      // Image Append into the Form
      if (form?.imageURL instanceof File) {
        formData.append("imageURL", form.imageURL);
      }


      const updated = await UpdateProfile(formData);

      if (updated?.success) {
        toast.success("Profile Successfully Updated!");

        if (updated.user) {
          setUser(updated.user);
        }

  

        setForm((prev) => ({
          ...prev,
          passWord: "",
        }));


        setImage(null);
      }

    } catch (err) {
      // console.error("Error in update profile:", err);
      toast.error( err.response?.data?.message || "Something went wrong while updating profile");
    }  finally {
      setIsUpdating(false);
    }
  };

  return (

    <div className="px-20 py-30 min-h-screen overflow-y-auto">
      <h1 className="text-2xl mb-6 font-bold text-black">
        Profile
      </h1>

      {/* Profile Image */}
      <div className="flex gap-10 items-center mb-8 z-0 ">
        <div className="relative z-0 ">
         <img
            src={
              image ||
              form?.imageURL ||
              "/image/defaultImage.png"
            }
            alt="Profile"
            onError={(e) => {
              e.currentTarget.src = "/image/defaultImage.png";
            }}
            className="w-30 h-30 rounded-full object-cover"
          />
         
          <button
            type="button"
            title="Change profile picture"
            className="absolute bottom-3 right-2 bg-black text-white p-2 rounded-full hover:bg-gray-800"
            onClick={openInputBox}
          >
            <Camera size={16} />
          </button>
        </div>

        <input
          className="hidden"
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* Profile Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          EditProfile();
        }}
        className="grid gap-5 max-w-xl"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-black">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
            className="
              px-4 py-2 rounded-xl border-2
              border-gray-200 outline-none
              focus:border-blue-500
              focus:ring-2 focus:ring-blue-500/30
            "
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-black">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            autoComplete="user-email"
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
            className="
              px-4 py-2 rounded-xl border-2
              border-gray-200 outline-none
              focus:border-blue-500
              focus:ring-2 focus:ring-blue-500/30
            "
          />
        </div>


        
        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-black">
            Password
          </label>

          <span className="text-rose-500 text-sm">
            {ExistERROR}
          </span>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="passWord"
              value={form.passWord}
              autoComplete="new-password"
              placeholder="Enter new password"
              onChange={(e) =>
                handleChange("passWord", e.target.value)
              }
              className="
                w-full px-4 py-2 pr-12 rounded-xl border-2
                border-gray-200 outline-none
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-500/30
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-gray-500 hover:text-gray-800
              "
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-black">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
            className="
              px-4 py-2 rounded-xl border-2
              border-gray-200 outline-none
              focus:border-blue-500
              focus:ring-2 focus:ring-blue-500/30
            "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isUpdating}
          className="
            px-4 py-2 rounded-2xl
            bg-green-200
            hover:bg-green-300
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          { form ? 
          isUpdating ? "Updating..."  : "Update Profile"
          : "Create"}
        </button>
      </form>
    </div>
  );
}