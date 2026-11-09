
"use client";

import React from "react";
import { MapPin, Clock3, BriefcaseBusiness, Store, CalendarCheck, Navigation, } from "lucide-react";
import Link from "next/link";

export default function Banner({ myShopInfo }) {
  return (
    <section className=" relative mb-6 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      
     {/* TOP GRADIENT HEADER */}
      
      <div className=" relative overflow-hidden bg-gradient-to-br from-[#173454] via-blue-700 to-blue-500 px-5 py-6 sm:px-7 sm:py-7 lg:px-8"  >
        {/* Decorative circles */}
        <div
          className="  absolute  -right-10  -top-16  h-40  w-40  rounded-full  bg-white/10"
        />

        <div
          className="  absolute  -bottom-20  right-20  h-44  w-44  rounded-full  bg-white/5"/>

        {/* Header Content */}
        <div
          className=" relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"  >
          {/* LEFT */}
          <div className="min-w-0">

            {/* SHOP NAME */}
            <div className="mb-3 flex items-center gap-2">

              <div
                className=" flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                <Store size={19} />
              </div>

              <p className="truncate text-sm font-semibold text-blue-100">
                {myShopInfo?.shopName || "My Shop"}
              </p>

            </div>

            {/* WELCOME */}
            <h2
              className="
                text-2xl
                font-extrabold
                tracking-tight
                text-white
                sm:text-3xl
                lg:text-4xl
              "
            >
              Welcome,{" "}
              <span className="text-blue-100">
                {myShopInfo?.name || "Shop Owner"}
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Manage your shop, view your schedule, and serve your
              customers efficiently.
            </p>

          </div>

          {/* EXPERIENCE */}
          <div
            className="
              
              w-fit
              shrink-0
              items-center
             
              rounded-sm
              border
              border-white/20
              bg-white/10
              px-2
              py-1
              backdrop-blur-md
            "
          >
            <img src={myShopInfo?.shopImage} className="object-cover h-30 w-40 rounded-sm" />
            <div>

              <div className="flex gap-2 p-2 
                  " >
                <div className=" flex h-8 w-8 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm   " >
                  <BriefcaseBusiness size={16} />
                </div>

                <div className="pl-6 " >
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100">
                  Experience
                </p>

                <p className="mt-0.5 text-sm font-bold text-white">
                  {myShopInfo?.experience || "Not specified"} Years
                </p>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      
          INFORMATION SECTION
      
      <div className="p-5 sm:p-6 lg:p-7">

        {/* INFO GRID */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <InfoCard
            icon={<Clock3 size={19} />}
            title="Today's Availability"
            iconClass="bg-green-50 text-green-600"
          >
            <div className="mt-1 flex items-center gap-4">

              <span className="h-2 w-2 rounded-full bg-green-500" />

              <p className="text-sm font-semibold text-slate-700">
                9:00 AM — 2:00 PM
              </p>
              <Link href="/change-time" className="
              bg-green-100 text-green-600 px-2 py-1 rounded-md 
                font-bold 
               
              "
              
              >
                Change Time
              </Link>

            </div>

            <p className="mt-1 text-xs text-slate-400">
              Available today
            </p>
          </InfoCard>

          <InfoCard
            icon={<Store size={19} />}
            title="Shop"
            iconClass="bg-blue-50 text-blue-600"
          >
            <p
              title={myShopInfo?.shopName}
              className="mt-1 truncate text-sm font-semibold text-slate-700"
            >
              {myShopInfo?.shopName || "Shop not available"}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Active shop
            </p>
          </InfoCard>

         
          <InfoCard
            icon={<MapPin size={19} />}
            title="Location"
            iconClass="bg-red-50 text-red-600"
          >
            <p className="mt-1 text-sm font-semibold text-slate-700">
              {myShopInfo?.city || "City not available"}
            </p>

            <p className="mt-1 truncate text-xs text-slate-400">
              {myShopInfo?.country || "Country not available"}
            </p>
          </InfoCard>

        </div>

       {/* //Addresss */}
        <div
          className="
            mt-4
            rounded-2xl
            border
            border-slate-100
            bg-slate-50
            p-4
            sm:p-5
          "
        >

          <div className="flex items-start gap-3">

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white
                text-red-500
                shadow-sm
              "
            >
              <Navigation size={18} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Complete Address
              </p>

              <p className="mt-1 break-words text-sm font-medium leading-6 text-slate-700">
                {myShopInfo?.address ||
                  "Shop address has not been added yet."}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">

                <span>
                  {myShopInfo?.city || "City"}
                </span>

                <span className="text-slate-300">•</span>

                <span>
                  {myShopInfo?.country || "Country"}
                </span>

              </div>

            </div>

          </div>
        </div>

       
        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">

            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500" />

            <p className="text-xs font-semibold text-slate-600">
              Shop information is available
            </p>

          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">

            <CalendarCheck size={14} />

            <span>
              Manage your daily schedule from dashboard
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}



function InfoCard({
  icon,
  title,
  iconClass,
  children,
}) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-100
        bg-white
        p-4
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-slate-200
        hover:shadow-sm
      "
    >
      <div className="flex items-start gap-3">

        {/* ICON */}
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            transition-transform
            duration-200
            group-hover:scale-105
            ${iconClass}
          `}
        >
          {icon}
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1">

          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          {children}

        </div>

      </div>
    </div>
  );
}

