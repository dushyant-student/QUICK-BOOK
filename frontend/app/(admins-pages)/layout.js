
import React from "react";
import NaveBar from "../shopComponents/NaveBar";
import SideBar from "../components/SideBar";
import { getMeServer, myShopData } from "@/services/serverServices";
import { redirect } from "next/navigation";
export default async function Layout({ children }) {

    let user = null;
    let myShopInfo = null;

    try {
        const response = await getMeServer();
        
        user = response?.user ?? null;
        
    } catch (err) {
        console.error("Authentication error:", err);
    }

    // Redirect
    if (!user) {
        redirect("/login");
    }

    const userId = user._id;
   
    try {
        const response = await myShopData(userId);
        
        myShopInfo = response?.data?.[0] ?? null;

    } catch (err) {
        console.error("Shop data error:", err);
        
    }

    return (
        <div className="flex min-h-screen w-full bg-white">

            <SideBar user={user} myShopInfo={myShopInfo}/>

            <section className="flex min-w-0 flex-1 flex-col">

                <NaveBar user={user} myShopInfo={myShopInfo}/>

                <main className="min-w-0 flex-1">
                    {children}
                </main>

            </section>

        </div>
    );
}
