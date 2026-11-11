
import React from "react";
import { getMeServer } from "@/services/serverServices";
import HomeNavBar from "../components/HomeNavBar";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {

  let user = null;

  try {
    const response = await getMeServer();

    user = response?.user ?? null;

  } catch (err) {
    console.error("About-Web Layout Error:", err);
  }

  if (!user?.success) {
    redirect("/login");
  }

  return (
    <>
      <HomeNavBar user={user} />
      {children}
    </>
  );
}
