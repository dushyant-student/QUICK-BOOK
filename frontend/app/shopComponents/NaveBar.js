"use client";


import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, CalendarDays, User, LogOut, ShoppingBag, Store, Ticket, House, Contact, Phone, Megaphone, Clock, BookDashed, NotepadText,} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogoutService } from "@/services/authServices";
import { useAuth } from "@/context/authProvider";


function NaveBar({user ,myShopInfo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { refreshUser } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const linkStyle =
    "flex items-center gap-2 px-3 py-2 text-orange-700 rounded-xl font-semibold transition";

  const closeMenu = () => setIsMenuOpen(false);

  // All Navigation Links
  const MenuList = [
    {
      name: "Home",
      link: "/",
      icon: House,
    },
    {
      name: "My Profile",
      link: "/profile",
      icon: User,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: BookDashed,
    },
    {
      name: "My Ticket",
      link: "/my-ticket",
      icon: Ticket,
    },
    {
      name: "My Shop",
      link:
        myShopInfo && user?._id
          ? `/my-shop/${user._id}`
          : "/my-shop",
      icon: ShoppingBag,
    },
    {
      name: "Post Notice",
      link: "/upload-notice",
      icon: Megaphone,
    },
    {
      name: "My Notice",
      link: "/notice",
      icon: NotepadText,
    },
    {
      name: "Create Shop",
      link: "/create-shop",
      icon: Store,
    },
    {
      name: "Change Shop Time",
      link: "/change-time",
      icon: Clock,
    },
    {
      name: "About",
      link: "/about",
      icon: Phone,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: Contact,
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await LogoutService();

      if (response?.success) {
        closeMenu();
        refreshUser()
        toast.success( response?.data?.message || "Logged out successfully" );
        router.replace("/login");
    
      }
      
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        err.message ||
        "Logout failed"
      );
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 z-[60] w-full bg-[#173454] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 md:px-8 py-3">

          {/* LOGO */}
          <div className="flex items-center gap-7">
            <Link href="/dashboard" className="flex items-center gap-2">
              <CalendarDays size={30} className="text-blue-300" />

              <div>
                <h1 className="text-xl md:text-2xl font-bold text-blue-300">
                  QuickBook
                </h1>
                <p className="hidden sm:block text-xs text-slate-300">
                  Book Appointments, Save Time
                </p>
              </div>
            </Link>

            <Link
              href="/"
              className={`bg-gray-100 hidden md:flex ${linkStyle}`}
            >
              Home
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {myShopInfo?._id ? (
              pathname === "/dashboard" ? (
                ""
              ) : (
                <Link
                  href="/dashboard"
                  className={`bg-gray-100 hidden md:flex ${linkStyle}`}
                >
                  {myShopInfo?.shopName}
                </Link>
              )
            ) : pathname === "/profile" ? (
              ""
            ) : (
              <Link
                href="/profile"
                className={`bg-gray-100 hidden md:flex ${linkStyle}`}
              >
                <User size={18} />
                {user?.name || "My Profile"}
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className={`md:hidden rounded-lg p-2 hover:bg-white/10 ${
              isMenuOpen ? "invisible" : ""
            }`}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[70] bg-black/50
          transition-opacity duration-300 md:hidden ${
            isMenuOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }`}
      />

      {/* LEFT SLIDE DRAWER */}
      <aside
        className={`fixed inset-y-0 left-0 z-[80]
          flex h-[100dvh] w-72 max-w-[85vw] flex-col
          overflow-y-auto overscroll-contain
          bg-white text-gray-800 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          md:hidden ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* DRAWER HEADER */}
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-gray-200 bg-[#173454] px-5 py-5">
          <div className="flex items-center gap-2">
            <CalendarDays size={26} className="text-blue-300" />

            <h2 className="text-xl font-bold text-blue-300">
              QuickBook
            </h2>
          </div>

          <button
            onClick={closeMenu}
            className="rounded-lg p-2 text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={25} />
          </button>
        </div>

        {/* DRAWER LINKS */}
        <nav className="flex-1 px-4 py-4">
          <ul className="flex flex-col gap-2">

            {MenuList.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.link ||
                (item.link !== "/" &&
                  item.link !== "/dashboard" &&
                  pathname.startsWith(item.link + "/"));

              return (
                <li key={item.name} className="shrink-0">
                  <Link
                    href={item.link}
                    onClick={closeMenu}
                    className={`flex items-center gap-3
                      rounded-xl px-3 py-3 font-semibold
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#173454] text-white shadow-md"
                          : "text-orange-700 hover:bg-gray-100"
                      }`}
                  >
                    <Icon size={21} className="shrink-0" />

                    <span className="whitespace-nowrap">
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}

          </ul>
        </nav>

        {/* LOGOUT AT BOTTOM */}
        <div className="sticky bottom-0 mt-auto shrink-0 border-t border-gray-200 bg-white p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50 active:scale-95">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default NaveBar;
