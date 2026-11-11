
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle,} from "lucide-react";
import Footer from "../../components/Footer";
import HomeNavBar from "../../components/HomeNavBar";
import api from "@/lib/axios";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
});


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");
    setSubmitted(false);

    const response = await api.post("/contact", form);

    if (response.data.success) {
      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "",
      });
    }

  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Something went wrong. Please try again."
    );

  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-gray-50">
        <HomeNavBar/>


      {/* HEADER */}
      <section className="bg-black px-5 py-3 text-center text-white my-18  md:py-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-blue-200">
          Contact Us
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">
          Let's Talk
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-200">
          Have a question, suggestion, or need help with your
          appointment? Send us a message.
        </p>
      </section>

      {error && (
        <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}


      {/* CONTACT CONTENT */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-5 ">
        {/* CONTACT INFORMATION */}
        <div className="rounded-2xl bg-[#173454] p-4 text-white md:col-span-2 md:p-9">
          <h2 className="text-2xl font-bold">
            Get in Touch
          </h2>

          <p className="mt-3 leading-7 text-gray-300">
            We would love to hear from you. Contact us using
            the details below.
          </p>

          <div className="mt-10 space-y-7">
            <ContactInfo
              icon={<Mail size={21} />}
              title="Email"
              value="support@turn.com"
            />

            <ContactInfo
              icon={<Phone size={21} />}
              title="Phone"
              value="+91 XXXXX XXXXX"
            />

            <ContactInfo
              icon={<MapPin size={21} />}
              title="Address"
              value="India"
            />

            <ContactInfo
              icon={<Clock size={21} />}
              title="Working Hours"
              value="Monday - Saturday"
            />
          </div>

          <div className="mt-10 rounded-xl border border-white/20 bg-white/10 p-4">
            <p className="text-sm leading-6 text-gray-200">
              For Booking-related issues, please include your
              ticket or appointment details in your message.
            </p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-3 md:p-9">
          <h2 className="text-2xl font-bold text-gray-800">
            Send Us a Message
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Fill out the form below.
          </p>

          {submitted && (
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              <CheckCircle size={20} />
              Your message has been sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {/* Honeypot field - hidden from real users */}
              <div
                className="absolute left-[-9999px]"
                aria-hidden="true"
              >
                <label htmlFor="website">
                  Leave this field empty
                </label>

                <input
                  id="website"
                  name="website"
                  type="text"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  minLength={2}
                  maxLength={60}

                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  maxLength={254}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                 minLength={3}
                 maxLength={100}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
              
                minLength={10}
                maxLength={2000}
                required
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#173454] px-6 py-3 font-semibold text-white transition hover:bg-[#244b73] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98] sm:w-auto"
            >
              {loading ? "Sending..." : "Send Message"}

              {!loading && <Send size={18} />}
            </button>
          </form>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

function ContactInfo({ icon, title, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-blue-200">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 break-words text-sm leading-6 text-gray-300">
          {value}
        </p>
      </div>
    </div>
  );
}