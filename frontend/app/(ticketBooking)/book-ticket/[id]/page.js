
import { notFound, redirect } from "next/navigation";

import BookingCard from "@/app/ComponentsClient.js/BookingCard";
import DocterInfo from "@/app/ComponentsClient.js/DocterInfo";
import { getMeServer, ShopOwnerProfileById } from "@/services/serverServices";
import HomeNavBar from "@/app/components/HomeNavBar";


export default async function Page({ params }) {

    const { id } = await params;

    //Validate MongoDB ObjectId
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
        notFound();
    }

    //Shop Owner Profile
    let shopKepperProfile = null;
    let shopData = null ;
    let user = null ;


    try {
        user = await getMeServer();
        user= user?.user ?? null ;
        

        shopKepperProfile = await ShopOwnerProfileById(id);
        shopData = shopKepperProfile?.data ;
       
        if ( !shopData || !shopData?._id ) {
            redirect("/login")
        }
        

    } catch (error) {
        // console.error("Shop Owner Profile Error:", error);
        throw error;
    }
    

     if (!user) {
        redirect("/login")
    }


    return (

        <div className="flex flex-col justify-center items-center mt-20">
            <HomeNavBar user={user} />
            <DocterInfo ShopOwnerInfo={shopData}/>
            <BookingCard openTime={shopData.openTime} closeTime={shopData.closeTime} shopId={id} user= {user}/>

        </div>

    );
}
