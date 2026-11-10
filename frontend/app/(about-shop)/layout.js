import { redirect } from "next/navigation";
import React from "react";
import HomeNavBar from "../components/HomeNavBar";
import { getMeServer } from "@/services/serverServices";

export default async function Layout({ children }) {
  let user = null;
  try {

    user = await getMeServer();

  } catch (err) {
    // console.log(err,shopId)

  }

  if (!user) {
    redirect("/login")
  }

  return (
    <div className=" min-h-screen w-full bg-white">
      <HomeNavBar user={user} />
      <main className="min-w-0 flex-1">
        {children}
      </main>


    </div>
  );
}