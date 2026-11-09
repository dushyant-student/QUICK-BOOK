"use client";

import { useAuth } from "@/context/authProvider";
import { bookingTicket } from "@/services/bookingTicketService";
import { CalendarDays, Clock3, User, Store,} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Convert time into minutes
const convertToMinutes = (time) => {
  if (!time) return null;

  const value = String(time).trim().toUpperCase();

  // Supports HH:mm, HH:mm AM/PM
  const match = value.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/
  );

  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3];

  if (minutes > 59) return null;

  if (period) {
    if (hours < 1 || hours > 12) return null;

    if (period === "AM") {
      hours = hours === 12 ? 0 : hours;
    } else {
      hours = hours === 12 ? 12 : hours + 12;
    }

    
  } else {
    if (hours > 23) return null;
  }

  return hours * 60 + minutes;
};

const BookingCard = ({ openTime, closeTime, shopId ,user }) => {
  const [subject, setSubject] = useState("");
  const [method, setMethod] = useState("Cash");
  const [currTime, setCurrTime] = useState("");
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);


  const router = useRouter();

  // Check shop opening and closing time
  useEffect(() => {
    const checkShopStatus = () => {
      const now = new Date();

      // Display current time in 12-hour format without AM/PM
      const displayTime = `${String(
        now.getHours() % 12 || 12
      ).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      setCurrTime(displayTime);

      // Current time in 24-hour minutes
      const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

      // Convert shop timing
      const openingMinutes = convertToMinutes(openTime);
      const closingMinutes = convertToMinutes(closeTime);

      // Invalid timing
      if (
        openingMinutes === null ||
        closingMinutes === null ||
        openingMinutes === closingMinutes
      ) {
        setIsShopOpen(false);
        return;
      }

      // Check shop status
      const isOpen =
        openingMinutes < closingMinutes
          ? currentMinutes >= openingMinutes &&
            currentMinutes < closingMinutes
          : currentMinutes >= openingMinutes ||
            currentMinutes < closingMinutes;

      setIsShopOpen(isOpen);
    };

    checkShopStatus();

    const interval = setInterval(checkShopStatus, 1000);

    return () => clearInterval(interval);
  }, [openTime, closeTime]);

  // Book Ticket
  const submitTicket = async () => {
    if (!isShopOpen) {
      toast.error(`Shop is closed! Opening time: ${openTime}`);
      return;
    }

    if (!user?._id) {
      toast.error("Please login to book a ticket!");
      router.push("/login");
      return;
    }

    if (!subject.trim()) {
      toast.error("Please enter your subject!");
      return;
    }

    try {
      setIsBooking(true);

      const userId = user._id;

      const data = {
        user,
        subject: subject.trim(),
        method,
        userId,
      };

      const response = await bookingTicket(shopId, data);


      if (response?.success) {
        toast.success("Ticket booked successfully!");
        router.push("/my-ticket");
      } else {
        toast.error(
          response?.message || "Ticket booking failed!"
        );
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Network Error"
      );
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="space-y-5 mt-10 pb-10">

      <section className="rounded-xl border border-blue-100 bg-white p-16">

        {/* Heading */}
        <div className="mb-5 flex items-center gap-3">
          <CalendarDays
            size={25}
            className="text-[#102d57]"
          />

          <h2 className="text-xl font-bold">
            Your Details!
          </h2>
        </div>

        <div className="border-t border-slate-100 pt-5">

          {/* User Information */}
          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-blue-100">

              {user?.imageURL ? (
                <img
                  src={user.imageURL}
                  alt={user?.name || "User profile"}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User
                  size={32}
                  className="text-blue-600"
                />
              )}

            </div>

            <div>
              <h3 className="font-bold">
                {user?.name}
              </h3>

              <p className="mt-1 text-sm text-[#527099]">
                {user?.email}
              </p>
            </div>

          </div>

          {/* Date */}
          <InfoRow
            icon={<CalendarDays size={24} />}
            label="Date"
            value={new Date().toLocaleDateString("en-IN")}
          />

          {/* Current Time */}
          <InfoRow
            icon={<Clock3 size={24} />}
            label="Booking Time"
            value={currTime || "--:--"}
          />

          {/* Shop Status */}
          <div className="mb-5 rounded-lg border border-gray-100 bg-gray-50 p-4">

            <div className="mb-3 flex items-center justify-between">

              <div className="flex items-center gap-2">
                <Store
                  size={20}
                  className="text-blue-600"
                />

                <span className="font-semibold">
                  Shop Status
                </span>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-bold ${
                  isShopOpen
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isShopOpen ? "Open Now" : "Closed"}
              </span>

            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Opening Time</span>

              <span className="font-semibold">
                {openTime || "--:--"}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <span>Closing Time</span>

              <span className="font-semibold">
                {closeTime || "--:--"}
              </span>
            </div>

          </div>

          {/* Booking Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitTicket();
            }}
          >

            <div className="flex flex-col justify-center gap-4 p-5">

              {/* Subject */}
              <label className="block text-md font-semibold">
                Subject:
              </label>

              <input
                required
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                disabled={!isShopOpen || isBooking}
                className="rounded-xl border px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:bg-gray-100"
                placeholder="Enter Subject To Meet"
              />

              {/* Payment Method */}
              <select
                required
                value={method}
                onChange={(e) =>
                  setMethod(e.target.value)
                }
                disabled={!isShopOpen || isBooking}
                className="w-full rounded-lg border border-gray-300 p-2 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option value="">PAYMENT METHOD:</option>
                <option value="Online">Online</option>
                <option value="Cash">Cash</option>
              </select>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  required
                  disabled={!isShopOpen || isBooking}
                  className="mt-1 h-4 w-4 cursor-pointer accent-orange-500"
                />

                <span className="text-sm text-gray-700">
                  I agree to the terms and conditions
                  <span className="ml-1 text-red-500">*</span>
                </span>

              </label>

            </div>

            {/* Booking Button */}
            <div className="w-full">

              <button
                type="submit"
                disabled={!isShopOpen || isBooking}
                className={`w-full rounded-xl px-4 py-3 font-bold transition-all duration-200 ${
                  isShopOpen && !isBooking
                    ? "cursor-pointer bg-green-500 text-white hover:bg-green-600 hover:shadow-md active:scale-95"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
              >
                {isBooking
                  ? "Booking..."
                  : isShopOpen
                  ? "Book Ticket"
                  : "Shop Closed"}
              </button>

            </div>

          </form>

        </div>
      </section>

    </div>
  );
};

export default BookingCard;


// Reusable Information Row
const InfoRow = ({ icon, label, value }) => {
  return (
    <div className="mb-5 flex items-start gap-4">

      <div className="text-blue-500">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-[#527099]">
          {label}
        </p>

        <div className="mt-1 font-semibold">
          {value}
        </div>
      </div>

    </div>
  );
};
