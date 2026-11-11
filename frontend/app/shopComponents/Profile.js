"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authProvider";
import { User, Mail, BriefcaseBusiness, Award, Bell, Settings, ArrowRight, Sparkles, InfoIcon, } from "lucide-react";

export default function Profile({ shopData }) {
  const { viewALL, user } = useAuth();
  const router = useRouter();


  return (
    <div className={viewALL ? "hidden" : "w-full max-w-sm space-y-5"} >

      <div className=" group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl " >

        <div className="relative h-50 overflow-hidden">

          {/* Background */}
          <div className=" absolute inset-0 bg-linear-to-br from-[#173454] via-blue-700 to-blue-500" />

          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/10" />

          {/* Small badge */}
          <div className=" absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"          >
            <Sparkles size={13} />
            Professional
          </div>

          {/* Profile image */}
          <div className="absolute bottom-2 left-5">

            <div className="   rounded-full   border-4   border-white   bg-white   p-1   shadow-lg " >
              <img
                src={
                  user?.imageURL ||
                  "/image/defaultImage.png"
                }
                alt={shopData?.name || "Profile"}className="  h-45  w-45  rounded-full  object-cover"/>
            </div>

          </div>
        </div>

        {/* Profile */}
        <div className="px-5 pb-5 pt-12">

          {/* Name + Role */}
          <div>
            <h2 className="truncate text-xl font-bold text-slate-900">
              {shopData?.name || "Shop Owner"}
            </h2>

            <div className="mt-1 flex items-center gap-1.5">

              <BriefcaseBusiness size={14} className="text-blue-600"/>

              <p className="text-sm font-semibold text-blue-600">
                {shopData?.role || "Professional"}
              </p>

            </div>
          </div>

          {/* Experience */}
          <div className=" mt-4 flex items-center justify-between rounded-xl border border-orange-100 bg-orange-50 px-3 py-3">

            <div className="flex items-center gap-2">

              <div className="  flex  h-9  w-9  items-center  justify-center  rounded-lg  bg-orange-100  text-orange-600" >
                <Award size={18} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                  Experience
                </p>

                <p className="text-sm font-bold text-slate-800">
                  {shopData?.experience || "Not specified"} Years
                </p>
              </div>

            </div>

            <span className=" rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold text-orange-700">
              EXPERIENCE
            </span>

          </div>

          {/* Email */}
          <div className="mt-4 flex items-start gap-3">

            <div className=" flex   h-9 w-9 shrink-0 items-center  justify-center  rounded-lg bg-blue-50 text-blue-600 " >
              <Mail size={17} />
            </div>

            <div className="min-w-0">

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Email Address
              </p>

              <p title={shopData?.email}className="  mt-0.5  truncate  text-sm  font-medium  text-slate-700">
                {shopData?.email || "No email available"}
              </p>

            </div>

          </div>

          {/* Description */}
          {shopData?.description && (
            <div className="mt-4">

              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                About
              </p>

              <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                {shopData.description}
              </p>

            </div>
          )}

          {/* Divider */}
          <div className="my-5 border-t border-slate-100" />

          {/* View Profile */}
          <button type="button" onClick={() => router.push("/profile")} className=" cursor-pointergroup/buttonflexw-fullitems-centerjustify-centergap-2rounded-xlbg-[#173454]px-4py-3text-smfont-boldtext-whiteshadow-smtransition-allduration-200hover:bg-blue-700hover:shadow-mdactive:scale-[0.98]">
            <User size={17} />
            View Profile
            <ArrowRight
              size={16}
              className="
              cursor-pointer
                transition-transform
                duration-200
                group-hover/button:translate-x-1
              "
            />
          </button>

        </div>
      </div>

      
     {/* QUICK ACTIONS */}
      
      <div className="  overflow-hidden  rounded-2xl  border  border-slate-200  bg-white  shadow-sm  ">

        {/* Header */}
        <div className="border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className=" flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600"  >
              <Sparkles size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#173454]">
                Quick Actions
              </h2>

              <p className="text-xs text-slate-400">
                Manage your shop quickly
              </p>
            </div>

          </div>

        </div>

        {/* Actions */}
        <div className="space-y-2 p-3">

          <Action
            title="Publish Notice"
            description="View All Shops Recently Opened !"
            icon={<Bell size={18} />}
            iconClass="bg-orange-50 text-orange-600"
            onClick={() => router.push("/notice-update")}
          />

          <Action
            title="My Notice"
            description="Send an update to customers"
            icon={<InfoIcon size={18} />}
            iconClass="bg-orange-50 text-orange-600"
            onClick={() => router.push("/notice")}
          />

          <Action
           title="My Profile"
           description="View and update your profile"
           icon={<Settings size={18} />}
           iconClass="bg-blue-50 text-blue-600"
           onClick={() => router.push("/profile")}
          />


        </div>

      </div>
    </div>
  );
}


  //  ACTION COMPONENT

function Action({ title, description, icon, iconClass, onClick,}) {
  return (
    <button type="button" onClick={onClick} className=" cursor-pointer group flex w-full items-center gap-3 rounded-xl border border-transparent p-3 text-left transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 active:scale-[0.98] " >

      <div className={` flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${iconClass}`}>
        {icon}
      </div>
     
      <div className="min-w-0 flex-1">

        <p className="text-sm font-bold text-slate-800">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-slate-400">
          {description}
        </p>

      </div>

      <ArrowRight size={16} className=" shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-600"/>

    </button>
  );
}
