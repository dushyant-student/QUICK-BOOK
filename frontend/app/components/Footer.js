"use client"

import Link from "next/link";
import { Clock, MapPin, Mail, Phone, ArrowRight, MonitorPlay} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  return (
    <footer className="bg-[#173454] text-white mt-20 w-full ">
      {/* MAIN FOOTER */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">

        {/* BRAND */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-3xl font-bold"
          >
            <Clock size={30} className="text-blue-300" />
            QuickBook
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-gray-300">
            Book appointments, track your token, and save your
            valuable time. Turn makes managing shop visits
            simple and convenient.
          </p>


          <div className="mt-8 flex gap-8" >
            <SocialLink
              href="https://www.linkedin.com/"
              label="YouTube"
              icon={<MonitorPlay size={19} />}
            />
        

            <SocialLink
              href="https://www.linkedin.com/"
              label="LinkedIn"
              icon="In"
            />

          </div>
          

        </div>


        {/* QUICK LINKS */}
        <div>
          <h2 className="mb-5 text-lg font-bold">
            Quick Links
          </h2>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <FooterLink href="/">Home</FooterLink>
            </li>
            <li>
              <FooterLink href="/about">About Us</FooterLink>
            </li>
            <li>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </li>
            <li>
              <FooterLink href="/profile">My Profile</FooterLink>
            </li>
            <li>
              <FooterLink href="/my-ticket">My Tickets</FooterLink>
            </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h2 className="mb-5 text-lg font-bold">
            Our Features
          </h2>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <FooterLink href="/">Explore Shops</FooterLink>
            </li>
            <li>
              <FooterLink href="/">Book Appointment</FooterLink>
            </li>
            <li>
              <FooterLink href="/my-ticket">Track Your Token/Tickets</FooterLink>
            </li>
            <li>
              <FooterLink href="/contact">Help & Support</FooterLink>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="mb-5 text-lg font-bold">
            Contact Us
          </h2>

          <ul className="space-y-5 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin
                size={20}
                className="shrink-0 text-blue-300"
              />
              <span>India</span>
            </li>

            <li className="flex items-start gap-3">
              <Mail
                size={20}
                className="shrink-0 text-blue-300"
              />
              <a
                href="mailto:support@turn.com"
                className="break-all transition hover:text-white"
              >
                support@Mail: ownerpro1234@gmail.com
              </a>
            </li>
              
            <li className="flex items-start gap-3">
              <Phone
                size={20}
                className="shrink-0 text-blue-300"
              />
              <span>+91 XXXXX XXXXX</span>
            </li>
          </ul>
          {
            pathname === "/contact"? 
            "" 
            :
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#173454] transition hover:bg-blue-100 active:scale-95"
          >
            Contact Support <ArrowRight size={16} />
          </Link>
          }
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-center text-sm text-gray-300 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Turn. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-block transition duration-200 hover:translate-x-1 hover:text-white"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, label, icon }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border  border-white/20 transition hover:border-white hover:bg-white hover:text-[#173454]"
    >
      {icon}
    </Link>
  );
}