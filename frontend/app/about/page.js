import Link from "next/link";
import {  Users,  Clock,  ShieldCheck,  Target,  CheckCircle,  ArrowRight,} from "lucide-react";
import Footer from "../components/Footer";
import HomeNavBar from "../components/HomeNavBar";


export default function AboutPage() {

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      
      <HomeNavBar />
      <section className="bg-black px-5 py-20 text-white md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-blue-200">
            About QUICK-Book
          </p>

          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Your Time Matters.
            <br />
            <span className="text-blue-300">
              We Make It Count.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-7 text-gray-200 md:text-lg">
            QUICK-Book makes appointment booking simple. Book your
            slot, track your token, and save your valuable time
            without waiting in long queues.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#173454] transition hover:bg-blue-100"
          >
            Explore Shops <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="mb-3 font-semibold text-blue-700">
            WHO WE ARE
          </p>

          <h2 className="mb-5 text-3xl font-bold md:text-4xl">
            Making Appointments Easier for Everyone
          </h2>

          <p className="mb-4 leading-7 text-gray-600">
            QUICK-Book is an appointment and token management
            platform designed to connect customers with shops
            and service providers.
          </p>

          <p className="leading-7 text-gray-600">
            Customers can explore shops, book appointments,
            check their token numbers, and manage their
            bookings from one place.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-[#173454]">
            <Target size={30} />
          </div>

          <h3 className="mb-3 text-2xl font-bold">
            Our Mission
          </h3>

          <p className="leading-7 text-gray-600">
            To reduce unnecessary waiting, simplify appointment
            management, and make everyday services more
            convenient for customers and shop owners.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white px-5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              What Makes QUICK-Book Useful?
            </h2>

            <p className="mt-3 text-gray-600">
              Simple features for a smoother appointment experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<Clock size={28} />}
              title="Save Time"
              description="Book appointments and reduce unnecessary waiting at shops."
            />

            <Feature
              icon={<Users size={28} />}
              title="Easy Booking"
              description="Explore available shops and manage your appointments in one place."
            />

            <Feature
              icon={<ShieldCheck size={28} />}
              title="Booking Management"
              description="Keep track of your tickets and appointment details."
            />
          </div>
        </div>
      </section>

      {/* WHY TURN */}
      <section className="mx-auto max-w-5xl px-5 py-16 text-center">
        <h2 className="mb-5 text-3xl font-bold">
          Designed Around Your Time
        </h2>

        <div className="mx-auto max-w-2xl space-y-4 text-left">
          {[
            "Explore shops and their details.",
            "Book and track your appointment token.",
            "Manage your tickets from your account.",
            "Help shop owners organize customer appointments.",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle
                className="mt-1 shrink-0 text-green-600"
                size={20}
              />
              <p className="text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br
          from-[#173454]
          via-blue-600
          to-blue-100 px-5 py-14 text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready to Save Your Time?
        </h2>

        <p className="mt-3 text-gray-300">
          Discover shops and manage your appointments with QUICK-BOOK.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-[#173454] transition hover:bg-blue-100"
        >
          Get Started
        </Link>
      </section>
      <Footer />
    </main>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-[#173454]">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="leading-7 text-gray-600">{description}</p>
    </div>
  );
}