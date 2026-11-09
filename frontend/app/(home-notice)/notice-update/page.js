"use client";

import { useAuth } from "@/context/authProvider";
import { Bell, Store, ArrowRight, MapPin,} from "lucide-react";
import { useRouter } from "next/navigation";


export default function ShopNotification() {
    const { isLoading, genNotification } = useAuth();
    const router =  useRouter();


    if (isLoading) {
        return (
            <div className="mt-10 w-full">

                <div className="mb-3 flex items-center gap-3">

                    <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />

                    <div>
                        <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
                        <div className="mt-2 h-3 w-52 animate-pulse rounded bg-gray-100" />
                    </div>

                </div>

                <div className="h-20 w-full animate-pulse rounded-2xl bg-gray-100" />

            </div>
        );
    }

    if (!genNotification) {
        return null;
    }

    // console.log(genNotification, "ALL Notification Here !")
    return (
        <div className="mt-8 w-full px-10 ">

            {/* Header */}
            <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100">

                        <Bell
                            size={18}
                            className="text-orange-500"
                        />

                    </div>

                    <div>

                        <h2 className="text-base font-bold text-gray-900">
                            Latest Notifications
                        </h2>

                        <p className="text-xs text-gray-400">
                            Stay updated with the latest shop activities
                        </p>

                    </div>

                </div>

                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                    New Shop
                </span>

            </div>





            {/* Notification */}
            {
                genNotification?.map((info) => {
                    return (

                        <div key={info?._id} className="w-full mb-6 bg-violet-50 rounded-2xl border border-gray-200 px-5 py-4 shadow-sm">

                            <div className="flex h-11 px-4 shrink-0 items-center rounded-xl bg-orange-100">

                                <Store
                                    size={21}
                                    className="text-orange-500"
                                />

                                <div className="md:flex-row flex flex-col pl-5 items-center md:gap-8" >
                                    <span className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                                        New Shop
                                    </span>

                                    {/* <span className="h-1 w-1 rounded-full bg-gray-300" /> */}

                                    <span className="text-xs text-gray-400">
                                        Just Opened
                                    </span>

                                </div>
                            </div>



                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                {/* Left */}
                                <div className="flex items-center justify-center mt-5 pb-4 gap-4">
                                    {/* <div> */}
                                    <div className="mt-1 flex flex-col  justify-center  gap-6   ">

                                        <div className="mt-1 flex flex-wrap items-center gap-2" >
                                            <Store
                                                size={16}
                                                className="text-gray-500"
                                            />

                                            <h3 className="font-semibold text-gray-900">
                                                {info?.shopName}
                                            </h3>

                                            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-violet-600">
                                                {info?.role}
                                            </span>
                                        </div>

                                        {/* Address */}
                                        <div className="mt-1 flex flex-col gap-4 justify-center min-w-0">
                                            <span className=" rounded-full bg-blue-600 px-3 max-w-40 py-1 text-xs font-medium text-white">
                                                Address
                                            </span>

                                            <div className="flex items-center text-2xl ml-2" >
                                                <MapPin
                                                    size={13}
                                                    className="shrink-0 text-gray-400"
                                                />

                                                <p className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                                                    {info?.country}
                                                </p>

                                            </div>

                                            <div className="flex flex-col gap-1 ml-2 " >
                                                <p className="rounded-full text-xs font-medium text-gray-400" >{info?.city}</p>
                                                <p className="rounded-full font-medium text-xs text-gray-400" >{info?.address}</p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Right */}
                                <div className="flex md:flex-col md:gap-12 justify-evenly md:justify-end items-center gap-3 sm:pl-4">

                                    <span className="text-xs text-gray-400 md:block">
                                        {new Date(info?.createdAt).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </span>

                                    <button
                                        onClick={()=>router.push(`/shop/${info?.shopId}`)}
                                        type="button"
                                        className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        bg-gray-900
                                        px-4
                                        py-2
                                        text-xs
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-orange-500
                                        "
                                    >
                                        View
                                        <ArrowRight size={14} />
                                    </button>

                                </div>

                            </div>

                        </div>

                    )
                })
            }


        </div>
    );
}