
import Link from "next/link";
import { MapPin, UserRound, BriefcaseBusiness, Users, ArrowRight, Store, Clock3, Star } from "lucide-react";
import Footer from "./Footer";
import { getAllShop } from "@/services/serverServices";
import LoadingSpinner from "./LoadingSpinner";

export default async function ShopCart() {
    let shops = [];
    let ExistErr = false;
    let Laoding = false ;


    try {
        Laoding = true ;
        const shopList = await getAllShop();
        shops = shopList?.data || [];
        Laoding = false ;

    } catch (err) {
        ExistErr = true;
        
    }finally{
        Laoding = false ;
    }


    if (Laoding){
        return <div className="flex flex-col " >
        <LoadingSpinner/>
        <Footer/>
        </div>
    }


   
   

    return (
        <section className="min-h-screen pb-10 w-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

            {/* //Header */}
            <div className="mx-auto mb-8 max-w-7xl">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <div className="mb-2 flex items-center gap-2">

                            <span className="
                                flex h-9 w-9 items-center justify-center
                                rounded-xl bg-violet-100 text-violet-600
                            ">
                                <Store size={19} />
                            </span>

                            <span className="
                                text-xs font-bold uppercase
                                tracking-[0.18em] text-violet-600
                            ">
                                Explore Shops
                            </span>

                        </div>

                        <h1 className="
                            text-2xl font-black tracking-tight
                            text-slate-900 sm:text-3xl
                        ">
                            Find the Right Shop for You
                        </h1>

                        <p className="
                            mt-1 max-w-2xl text-sm leading-6
                            text-slate-500 sm:text-base
                        ">
                            Explore available shops, check their services,
                            and connect with the shop that suits your needs.
                        </p>
                    </div>

                    <div className="
                        flex w-fit items-center gap-2 rounded-full
                        border border-slate-200 bg-white px-4 py-2
                        text-sm font-semibold text-slate-600 shadow-sm
                    ">
                        <Store size={16} className="text-violet-600" />
                        {shops?.length} Shops Available
                    </div>

                </div>

            </div>



            {/* SHOPs LIST */}
            <div className="mx-auto flex max-w-7xl flex-col gap-6">

                {shops?.length > 0 || !ExistErr ? (
                    shops?.map((shop, ind) => (

                        <article
                            key={shop?._id || shop?.shopId || ind}
                            className="
                                group overflow-hidden rounded-3xl
                                border border-slate-200/80
                                bg-white
                                shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                                transition-all duration-300
                                hover:-translate-y-1
                                hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
                            "
                        >

                            <div className="flex flex-col lg:flex-row">

                                
                                <div className="
                                    relative w-full
                                    lg:w-[45%]
                                    lg:min-h-107
                                    overflow-hidden
                                ">

                                    <img
                                        src={
                                            shop?.shopImage ||
                                            "/image/defaultImage.png"
                                        }
                                        alt={shop?.ShopName || "Shop"}
                                        className="
                                            h-64 w-full object-cover
                                            transition duration-700
                                            group-hover:scale-105
                                            sm:h-80
                                            lg:absolute lg:inset-0
                                            lg:h-full
                                        "
                                    />

                                    {/* Image overlay */}
                                    <div className="
                                        absolute inset-0
                                        bg-gradient-to-t
                                        from-slate-950/75
                                        via-slate-950/10
                                        to-transparent
                                    " />

                                  
                                    <div className="
                                        absolute left-5 top-5
                                        flex items-center gap-2
                                        rounded-full
                                        border border-white/20
                                        bg-white/90
                                        px-3 py-1.5
                                        text-xs font-bold
                                        text-violet-700
                                        shadow-lg backdrop-blur
                                    ">
                                        <Store size={14} />
                                        {shop?.shopName || "Shop"}
                                    </div>

                                   
                                    <div className="
                                        absolute bottom-0 left-0 right-0
                                        p-5 sm:p-6
                                    ">

                                        <div className="
                                            mb-2 flex items-center gap-1
                                            text-amber-300
                                        ">
                                            <Star size={15} fill="currentColor" />
                                            <Star size={15} fill="currentColor" />
                                            <Star size={15} fill="currentColor" />
                                            <Star size={15} fill="currentColor" />
                                            <Star size={15} fill="currentColor" />

                                            <span className="
                                                ml-1 text-xs font-semibold
                                                text-white/90
                                            ">
                                                Trusted Shop
                                            </span>
                                        </div>

                                        <h2 className="
                                            text-2xl font-black text-white
                                            sm:text-3xl
                                        ">
                                            {shop?.shopName || "Shop Name"}
                                        </h2>

                                        <div className="
                                            mt-2 flex items-center gap-2
                                            text-sm text-white/80
                                        ">
                                            <MapPin size={15} />
                                            <span>
                                                {shop?.location || "Delhi"}
                                            </span>
                                        </div>

                                    </div>

                                </div>


                               
                                <div className="
                                    flex w-full flex-1 flex-col
                                    justify-between p-5
                                    sm:p-7 lg:p-8
                                ">

                                    {/* Top */}
                                    <div>

                                        {/* Heading row */}
                                        <div className="
                                            flex flex-col gap-4
                                            sm:flex-row sm:items-start
                                            sm:justify-between
                                        ">

                                            <div>

                                                <div className="
                                                    mb-2 inline-flex
                                                    items-center gap-2
                                                    rounded-full
                                                    bg-emerald-50
                                                    px-3 py-1
                                                    text-xs font-bold
                                                    text-emerald-700
                                                ">
                                                    <span className="
                                                        h-2 w-2 rounded-full
                                                        bg-emerald-500
                                                    " />
                                                    Available Now
                                                </div>

                                                <h2 className="
                                                    text-2xl font-black
                                                    tracking-tight
                                                    text-[#173454]
                                                    sm:text-3xl
                                                ">
                                                    {shop?.shopName || "Shop Name"}
                                                </h2>

                                            </div>

                                            <div className="
                                                flex w-fit items-center
                                                gap-2 rounded-xl
                                                bg-violet-50 px-3 py-2
                                            ">
                                                <Star
                                                    size={17}
                                                    className="text-amber-500"
                                                    fill="currentColor"
                                                />

                                                <span className="
                                                    text-sm font-bold
                                                    text-slate-700
                                                ">
                                                    4.3
                                                </span>

                                                <span className="
                                                    text-xs text-slate-400
                                                ">
                                                    / 5
                                                </span>
                                            </div>

                                        </div>


                                        {/* Owner */}
                                        <div className="
                                            mt-4 flex items-center gap-2
                                            text-sm text-slate-500
                                        ">

                                            <span className="
                                                flex h-8 w-8
                                                items-center justify-center
                                                rounded-lg bg-slate-100
                                                text-slate-600
                                            ">
                                                <UserRound size={15} />
                                            </span>

                                            <span>
                                                Owner:
                                            </span>

                                            <span className="
                                                font-bold text-slate-800
                                            ">
                                                {shop?.shopName || "Shop Owner"}
                                            </span>

                                        </div>


                                        {/* Description */}
                                        <div className="mt-6">

                                            <h3 className="
                                                mb-2 text-sm font-bold
                                                uppercase tracking-wider
                                                text-slate-800
                                            ">
                                                About this shop
                                            </h3>

                                            <p className="
                                                text-sm leading-7
                                                text-slate-500
                                                sm:text-base
                                            ">
                                                {shop?.description ||
                                                    "Welcome to our shop. We provide quality services and a convenient experience for all our customers."}
                                            </p>

                                        </div>


                                        {/* Information cards */}
                                        <div className="
                                            mt-7 grid grid-cols-1
                                            gap-3 sm:grid-cols-3
                                        ">

                                            {/* Experience */}
                                            <InfoCard
                                                icon={<BriefcaseBusiness size={18} />}
                                                title="Experience"
                                                value={
                                                    shop?.experience ||
                                                    "Professional"
                                                }
                                            />

                                            {/* Staff */}
                                            <InfoCard
                                                icon={<Users size={18} />}
                                                title="Available Staff"
                                                value={
                                                    shop?.availableStaff ||
                                                    "1 Persons"
                                                }
                                            />

                                            {/* Location */}
                                            <InfoCard
                                                icon={<MapPin size={18} />}
                                                title="Location"
                                                value={
                                                    shop?.Location ||
                                                    "Delhi"
                                                }
                                            />

                                        </div>


                                        {/* Timing */}
                                        <div className="
                                            mt-5 flex items-center gap-3
                                            rounded-2xl border
                                            border-slate-100
                                            bg-slate-50 p-4
                                        ">

                                            <div className="
                                                flex h-10 w-10
                                                shrink-0 items-center
                                                justify-center rounded-xl
                                                bg-white text-violet-600
                                                shadow-sm
                                            ">
                                                <Clock3 size={19} />
                                            </div>

                                            <div>
                                                <p className="
                                                    text-xs font-semibold
                                                    text-slate-400
                                                ">
                                                    SHOP TIMING
                                                </p>

                                                <p className="
                                                    mt-0.5 text-sm font-bold
                                                    text-slate-700
                                                ">
                                                    Open today · {shop?.openTime} - {shop?.closeTime}
                                                </p>
                                            </div>

                                        </div>

                                    </div>


                                    
                                    <div className="
                                        mt-7 flex flex-col gap-4
                                        border-t border-slate-100
                                        pt-6
                                        sm:flex-row sm:items-center
                                        sm:justify-between
                                    ">

                                        <div className="flex items-center gap-2">

                                            <div className="
                                                flex h-9 w-9
                                                items-center justify-center
                                                rounded-lg bg-violet-50
                                                text-violet-600
                                            ">
                                                <Store size={17} />
                                            </div>

                                            <div>
                                                <p className="
                                                    text-xs font-medium text-green-500
                                                ">
                                                    Trusted Shop 
                                                </p>
                                            </div>

                                        </div>


                                        <Link
                                            href={`/shop/${shop?.shopId}`}
                                            className="
                                                group/button
                                                inline-flex w-full
                                                items-center justify-center
                                                gap-2 rounded-xl
                                                bg-[#173454]
                                                px-6 py-3.5
                                                text-sm font-bold
                                                text-white
                                                shadow-lg
                                                shadow-slate-900/10
                                                transition-all duration-300
                                                hover:bg-violet-600
                                                hover:shadow-violet-500/20
                                                active:scale-[0.98]
                                                sm:w-auto
                                            "
                                        >
                                            Visit Shop

                                            <ArrowRight
                                                size={17}
                                                className="
                                                    transition-transform
                                                    duration-300
                                                    group-hover/button:translate-x-1
                                                "
                                            />
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </article>

                    ))
                ) 
                
                : 
                
                
                (
                    //  if Shops Are Not Avilable
                   
                    <div className="
                        flex min-h-88 flex-col
                        items-center justify-center
                        rounded-3xl border border-dashed
                        border-slate-300 bg-white
                        px-6 text-center
                    ">

                        <div className="
                            flex h-16 w-16 items-center
                            justify-center rounded-2xl
                            bg-violet-50 text-violet-600
                        ">
                            <Store size={30} />
                        </div>

                        <h2 className="
                            mt-5 text-xl font-bold text-slate-800
                        ">
                            {
                                ExistErr? 
                                "Internet/Network Issue"
                                :
                                " No Shops Available"
                            }
                           
                        </h2>

                        <p className="
                            mt-2 max-w-md text-sm
                            leading-6 text-slate-500
                        ">
                            { 
                            ExistErr ? 
                            "Please! check Check Your Internet connection again later." 
                            :
                            "There are currently no shops available. Please check again later." 
                            }
                            
                        </p>

                    </div>
                )}

            </div>

        {/* //Footer */}
        <Footer/>


        </section>
    );
}






function InfoCard({ icon, title, value }) {
    return (
        <div className="
            group rounded-2xl border border-slate-100
            bg-slate-50 p-4
            transition duration-300
            hover:border-violet-100
            hover:bg-violet-50/50
        ">

            <div className="
                flex h-9 w-9 items-center
                justify-center rounded-lg
                bg-white text-violet-600
                shadow-sm
                transition duration-300
                group-hover:scale-105
            ">
                {icon}
            </div>

            <p className="
                mt-3 text-xs font-medium
                text-slate-400
            ">
                {title}
            </p>

            <p className="
                mt-1 truncate
                text-sm font-bold text-slate-800
            ">
                {value}
            </p>

        </div>
    );
}
