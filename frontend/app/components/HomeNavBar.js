"use client";

import { useAuth } from "@/context/authProvider";
import { Bell, ContactRound, House, LayoutGrid, Menu, Search, User, UserRound, UsersRound, X, } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function HomeNavBar({ user }) {
  
  const { noti_len } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathName = usePathname();
  const closeMenu = () => setIsOpen(false);

  const mobileLinkStyle = "flex gap-2 rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600";
  const activeBar = "flex gap-2 rounded-xl bg-orange-600 px-4 py-3 font-medium text-white transition hover:bg-orange-700"

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    closeMenu();

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <nav className="fixed left-0 top-0 z-60 w-full bg-gray-900 shadow-sm">
        <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
          {/* Logo and mobile menu */}
          <div className="flex shrink-0 items-center ">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden ${isOpen ? "invisible" : ""
                }`}
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <Menu size={25} />
            </button>

            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-1 text-xl font-bold text-orange-500 sm:text-2xl"
            >
              Qbook
          
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="font-medium text-white transition hover:text-orange-500"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="font-medium text-white transition hover:text-orange-500"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="font-medium text-white transition hover:text-orange-500"
            >
              Contact
            </Link>
          </div>

          {/* Algolia shop search */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="flex min-w-0 max-w-md flex-1 items-center overflow-hidden rounded-lg border border-gray-300 bg-amber-50 focus-within:ring-2 focus-within:ring-amber-300"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shops..."
              aria-label="Search shops"
              className="w-full min-w-0 bg-transparent px-2 py-2 text-sm text-black outline-none sm:px-3"
            />

            <button
              type="submit"
              aria-label="Search shops"
              className="flex shrink-0 items-center justify-center bg-orange-500 px-3 py-2 text-white transition hover:bg-orange-600"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Right controls */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-5 pr-6">
            <Link
              href="/notice-update"
              aria-label="Notifications"
              className="relative pt-1"
            >
              <Bell className="text-white" size={26} />

              <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-yellow-300 px-1 text-xs font-bold text-red-600">
                {noti_len || 0}
              </span>
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-orange-600 md:block"
                >
                  My Dashboard
                </Link>

                <Link
                  href="/profile"
                  aria-label="My Profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition hover:bg-orange-600 hover:text-white"
                >
                  <User size={18} />
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="flex h-8 items-center justify-center rounded-md bg-red-600 px-3 font-bold text-white transition hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-70 bg-black/50 transition-opacity duration-300 md:hidden ${isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
          }`}
      />

      {/* Mobile drawer */}
      <aside
        aria-label="Mobile navigation"
        aria-modal={isOpen ? "true" : undefined}
        className={`fixed inset-y-0 left-0 z-80 flex h-dvh w-72 max-w-[85vw] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-5">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-2xl font-bold text-orange-600"
          >
            QuickBook
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="rounded-lg p-2 text-gray-700 transition hover:bg-orange-100"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <Link
            href="/"
            onClick={closeMenu}
            className={pathName === "/" ? activeBar : mobileLinkStyle}
          >
            <House /> Home
          </Link>

          <Link
            href="/dashboard"
            onClick={closeMenu}
            className={mobileLinkStyle}
          >
            <LayoutGrid /> My Dashboard
          </Link>

          <Link
            href="/profile"
            onClick={closeMenu}
            className={mobileLinkStyle}
          >
            <UserRound size={19} /> My Profile
          </Link>

          <Link
            href="/about"
            onClick={closeMenu}
            className={pathName === "/about" ? activeBar : mobileLinkStyle}
          >
            <UsersRound size={20} /> About
          </Link>

          <Link
            href="/contact"
            onClick={closeMenu}
            className={pathName === "/contact" ? activeBar : mobileLinkStyle}
          >
            <ContactRound /> Contact
          </Link>

          {/* Search from mobile menu too */}
          <form onSubmit={handleSearch} className="mt-3 flex gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shops..."
              aria-label="Search shops"
              className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-orange-300"
            />

            <button
              type="submit"
              aria-label="Search shops"
              className="rounded-lg bg-orange-500 px-3 text-white hover:bg-orange-600"
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        <div className="border-t border-gray-200 p-4 text-center text-sm text-gray-500">
          Discover newly opened shops!
        </div>
      </aside>
    </>
  );
}