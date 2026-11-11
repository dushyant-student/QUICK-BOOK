"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {  BookDashed, ShoppingBag, ShoppingBasket, Ticket, User, Menu, X, NotepadTextIcon, Megaphone, Clock, LogOut,} from "lucide-react";
import Link from "next/link";
import { LogoutService } from "@/services/authServices";
import { useAuth } from "@/context/authProvider";

export default function SideBar({ user , myShopInfo }) {
  
  const { refreshUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const Exits =await LogoutService();
      if (!Exits?.success){
        toast.error("LogOut Failed")
        return 
      }
      setIsOpen(false);
      refreshUser()
      router.replace("/login");
    } catch (error) {
      // console.error("Logout failed:", error);
    }
  };

  const MenuList = [
    {
      name: "My Profile",
      link: "/profile",
      icon: <User size={20} />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <BookDashed size={20} />,
    },
    {
      name: "My Ticket",
      link: "/my-ticket",
      icon: <Ticket size={20} /> ,
    },
    {
      name: "My Shop",
      link: myShopInfo && user?._id ? `/my-shop/${user?._id}` : "/my-shop",
      icon: <ShoppingBasket size={20} />,
    },
    {
      name: "Post Notice",
      link: "/upload-notice",
      icon: <Megaphone size={20} />,
    },
    {
      name: "My-Notice",
      link: "/notice",
      icon: <NotepadTextIcon size={20} />,
    },
    {
      name: "Create Shop",
      link: "/create-shop",
      icon: <ShoppingBag size={20} />,
    },
    {
      name: "Change-Shop Time",
      link: "/change-time",
      icon: <Clock size={20} />,
    },
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed left-4 top-4 z-60 rounded-lg
          bg-gray-900 p-2 text-white shadow-lg lg:hidden
          ${isOpen ? "pointer-events-none opacity-0" : ""}`}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

     
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-70 bg-black/50
          transition-opacity duration-300 lg:hidden
          ${isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
          }`}
      />

      {/* LEFT SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-80 h-screen
          flex w-72 max-w-[85vw] flex-col
          overflow-y-auto bg-gray-100 shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"
          }
          lg:sticky lg:top-0 lg:z-30
          lg:h-screen lg:w-64 lg:max-w-none
          lg:shrink-0 lg:translate-x-0 lg:shadow-none`}
      >

       
       {/* Options  */}
        <ul className="flex flex-1 flex-col gap-3 px-4 py-8 mt-18 ">
          {MenuList.map((item) => {
            const isActive =
              pathname === item.link ||
              (item.link !== "/dashboard" &&
                pathname.startsWith(item.link + "/"));

            return (
              <li key={item.name}>
                <Link
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className={`flex w-full items-center gap-4
                    rounded-xl px-4 py-3 font-semibold
                    transition-colors duration-200
                    ${isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* {/* LOGOUT  Button */}
        <div className="mt-auto border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4
              rounded-xl px-4 py-3 font-semibold
              text-red-600 transition hover:bg-red-100
              active:scale-95"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
