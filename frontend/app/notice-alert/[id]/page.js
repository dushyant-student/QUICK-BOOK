"use client";

import { fecthAllNotice } from "@/services/NoticeService";
import { Bell, Megaphone, Clock3, Loader } from "lucide-react";
import {  useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function page() {
    const [loading , setLoading] = useState(false);
    const [ notices ,setNotices] = useState([]);

    const router = useRouter();
    const { id } = useParams();
    const shopId = id ;
    

    const CallFunction = async()=>{
        
        try{
            setLoading(true)
            const response = await fecthAllNotice(shopId)
            if ( !response.success){
                toast.error("Network err")
            }
            
            setNotices( response.data || [] )
        }catch(err){
            // console.log("err in NoticeBoard Owner Shop;-")
        }finally{
            setLoading(false)
        }
    }
    

    useEffect(()=>{
        CallFunction()
    },[shopId])


    if (loading){
    return (
    <div className="flex flex-col justify-center  gap-12 items-center mt-40 " >
        <Loader  size={25} className="font-bold" />
      <h1 className="font-bold" > Loading data! </h1>
    </div>
    )
  }



    if (notices.length === 0){
    return (
    <div className="flex flex-col justify-center gap-12 items-center mt-40 " >
      <h1 className="font-bold" > Shop Did Not Publish any Notice yet! </h1>
      <button type="button" onClick={() => router.back()} className={`text-white font-bold  md:flex px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 cursor-pointer `}>
            Back To Shop
      </button>
    </div>
    )
  }




    
    return (
        <div className="w-full pt-10 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm overflow-y-auto h-screen  ">

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 pb-2 ">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                    <Megaphone
                        size={22}
                        className="text-blue-600"
                    />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        Notice Board
                    </h2>

                    <p className="text-sm text-gray-500">
                        Important shop notifications
                    </p>
                </div>
            </div>

            {/* Notices */}
            <div className="mt-5 space-y-3 overflow-y-auto  ">
                {notices?.map((notice) => (
                    <div
                        key={notice._id}
                        className="rounded-xl border border-blue-100 bg-blue-50 p-4"
                    >
                        <div className="flex items-start gap-3">

                            {/* Icon */}
                            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                                <Bell
                                    size={18}
                                    className="text-blue-600"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="font-semibold text-gray-800">
                                        {notice?.type}
                                    </h3>
                                    <div className="flex items-center justify-between gap-3" >
                                        <button onClick={()=>{router.push(`/notice-view/${notice?._id}`)}} className="px-4 py-1 bg-blue-600 text-white font-bold rounded-sm">View Notice</button>
                                        <div  className="flex items-center gap-1 text-xs text-black  bg-green-100 px-4 py-1 rounded-sm ">
                                            <Clock3 size={13} />
                                            {
                                            new Date(notice?.createdAt).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    {notice?.title}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}