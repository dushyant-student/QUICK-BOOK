
"use client";

import { useState, useEffect } from "react";
import { Clock3, Store, Check, Pencil } from "lucide-react";
import { useAuth } from "@/context/authProvider";
import { ChangeTiming, getShopTiming } from "@/services/ChangeTiming";
import Link from "next/link";


const DEFAULT_OPEN = "09:00";
const DEFAULT_CLOSE = "18:00";

// Convert database time into HH:mm format
const normalizeTime = (time, fallback) => {
  if (!time) return fallback;

  const value = String(time).trim();

  // Already in 24-hour format
  if (/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
    return value;
  }

  // Handle 12-hour format, e.g. 09:00 AM
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (match) {
    let hours = Number(match[1]);
    const minutes = match[2];
    const period = match[3].toUpperCase();

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, "0")}:${minutes}`;
  }

  return fallback;
};

export default function Page() {
  const { user, myShopInfo } = useAuth();

  const [openTime, setOpenTime] = useState(DEFAULT_OPEN);
  const [closeTime, setCloseTime] = useState(DEFAULT_CLOSE);

  const [tempOpenTime, setTempOpenTime] = useState(DEFAULT_OPEN);
  const [tempCloseTime, setTempCloseTime] = useState(DEFAULT_CLOSE);

  const [editMode, setEditMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Live clock
  useEffect(() => {
    const updateClock = () => setCurrentTime(new Date());

    updateClock();

    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch saved shop timing
  useEffect(() => {
    let active = true;

    const fetchTiming = async () => {
      if (!myShopInfo?.shopId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await getShopTiming(myShopInfo.shopId);

        if (!active) return;

        if (response?.success) {
          // Supports both array and object responses
          const timing = Array.isArray(response.data)
            ? response.data[0]
            : response.data;

          const savedOpen = normalizeTime(
            timing?.openTime,
            DEFAULT_OPEN
          );

          const savedClose = normalizeTime(
            timing?.closeTime,
            DEFAULT_CLOSE
          );

          setOpenTime(savedOpen);
          setCloseTime(savedClose);

          setTempOpenTime(savedOpen);
          setTempCloseTime(savedClose);
        }
      } catch (err) {
        // console.error("Timing fetch error:", err);

        if (active) {
          setError("Unable to load shop timing.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchTiming();

    return () => {
      active = false;
    };
  }, [myShopInfo?.shopId]);

  // No shop
  if (!myShopInfo) {
    return (
      <div className="flex flex-col justify-center gap-8 items-center mt-40">
        <h1 className="font-bold">
          You have not created any shop yet!
        </h1>

        <Link
          href="/create-shop"
          className="text-white font-bold px-4 py-2 rounded-xl bg-blue-600"
        >
          Create SHOP
        </Link>
      </div>
    );
  }

  const getMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Save updated timing
  const saveSchedule = async () => {
    try {
      setError("");

      if (!user?._id || !myShopInfo?.shopId) {
        setError("Shop or user ID not found. Please login again.");
        return;
      }

      if (!tempOpenTime || !tempCloseTime) {
        setError("Please select both opening and closing times.");
        return;
      }

      if (tempOpenTime === tempCloseTime) {
        setError("Opening and closing times cannot be the same.");
        return;
      }

      setSaving(true);

      const timing = {
        open: tempOpenTime,
        close: tempCloseTime,
      };

      // Use the same shop ID used by getShopTiming.
      const response = await ChangeTiming(myShopInfo.shopId, timing);

      if (!response?.success) {
        setError(response?.message || "Unable to update shop timing.");
        return;
      }

      const updatedTiming = response.data || {};

      const updatedOpen = normalizeTime(
        updatedTiming.openTime,
        tempOpenTime
      );

      const updatedClose = normalizeTime(
        updatedTiming.closeTime,
        tempCloseTime
      );

      setOpenTime(updatedOpen);
      setCloseTime(updatedClose);

      setTempOpenTime(updatedOpen);
      setTempCloseTime(updatedClose);

      setEditMode(false);
      setError("");

    } catch (err) {
      // console.error("Save timing error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to update shop timing."
      );
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setTempOpenTime(openTime);
    setTempCloseTime(closeTime);
    setError("");
    setEditMode(false);
  };

  // Format time
  const formatTime = (time) => {
    if (!time) return "--";

    const [hours, minutes] = time.split(":").map(Number);

    return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );
  };

  if (!currentTime || loading) {
    return (
      <section className="mx-auto mt-20 max-w-xl p-6 text-center">
        <p className="text-gray-500">
          Loading shop timing...
        </p>
      </section>
    );
  }

  // Current time calculation
  const nowMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes();

  const nowSeconds =
    nowMinutes * 60 + currentTime.getSeconds();

  const openMinutes = getMinutes(openTime);
  const closeMinutes = getMinutes(closeTime);

  // Supports overnight timing
  const totalMinutes =
    closeMinutes > openMinutes
      ? closeMinutes - openMinutes
      : 1440 - openMinutes + closeMinutes;

  const elapsedMinutes =
    (nowMinutes - openMinutes + 1440) % 1440;

  const isOpen = elapsedMinutes < totalMinutes;

  let remainingSeconds;

  if (isOpen) {
    remainingSeconds =
      totalMinutes * 60 -
      elapsedMinutes * 60 -
      currentTime.getSeconds();
  } else {
    remainingSeconds =
      (openMinutes * 60 - nowSeconds + 86400) % 86400;
  }

  const hours = Math.floor(remainingSeconds / 3600);

  const minutes = Math.floor(
    (remainingSeconds % 3600) / 60
  );

  const seconds = remainingSeconds % 60;

  const progress = isOpen
    ? Math.min(
        100,
        Math.max(0, (elapsedMinutes / totalMinutes) * 100)
      )
    : 0;

  return (
    <section className="mt-17 mb-10 mx-auto w-full overflow-hidden bg-white">

      {/* Header */}
      <div className="flex items-center justify-between bg-orange-500 px-6 py-4 text-white">

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/20 p-2">
            <Store size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Shop Timing
            </h2>

            <p className="text-xs text-orange-50">
              Today's opening schedule
            </p>
          </div>
        </div>

        {!editMode && (
          <button
            type="button"
            onClick={() => {
              setTempOpenTime(openTime);
              setTempCloseTime(closeTime);
              setError("");
              setEditMode(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-100"
          >
            <Pencil size={15} />
            Edit
          </button>
        )}
      </div>

      <div className="space-y-5 p-5 max-w-3xl mx-auto mt-6">

        {/* Current Status */}
        <div className="flex items-center justify-between gap-3">

          <div>
            <p className="text-sm text-gray-500">
              Current shop status
            </p>

            <p
              className={`mt-1 text-lg font-bold ${
                isOpen ? "text-green-600" : "text-red-500"
              }`}
            >
              {isOpen ? "● Shop is Open" : "● Shop is Closed"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">
              Current time
            </p>

            <p className="mt-1 font-semibold tabular-nums text-gray-800">
              {currentTime.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        {/* Edit Timing */}
        {editMode && (
          <div className="space-y-4 rounded-xl border border-orange-100 bg-orange-50/60 p-4">

            <div>
              <h3 className="font-bold text-gray-800">
                Update Shop Timings
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Choose your opening and closing times.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="shop-open-time"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Opening Time
                </label>

                <input
                  id="shop-open-time"
                  type="time"
                  value={tempOpenTime}
                  onChange={(e) =>
                    setTempOpenTime(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="shop-close-time"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Closing Time
                </label>

                <input
                  id="shop-close-time"
                  type="time"
                  value={tempCloseTime}
                  onChange={(e) =>
                    setTempCloseTime(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  required
                />
              </div>

            </div>

            {error && (
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={saveSchedule}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
              >
                <Check size={17} />
                {saving ? "Saving..." : "Save Timings"}
              </button>

              <button
                type="button"
                onClick={cancelEdit}
                disabled={saving}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

            </div>
          </div>
        )}

        {/* Countdown */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-5 text-center">

          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-600">
            <Clock3 size={17} className="text-blue-600" />

            {isOpen
              ? "Time remaining until closing"
              : "Time remaining until opening"}
          </div>

          <p className="text-4xl font-bold tracking-wider text-gray-900 tabular-nums sm:text-5xl">
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-blue-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOpen ? "bg-green-500" : "bg-orange-400"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Schedule Summary */}
          <div className="mt-5 flex items-center justify-between gap-2">

            <div className="text-left">
              <p className="text-xs font-medium text-gray-500">
                Opens At
              </p>

              <p className="mt-1 text-sm font-bold text-gray-800">
                {formatTime(openTime)}
              </p>
            </div>

            <p className="text-center text-xs text-gray-500">
              {isOpen
                ? `${progress.toFixed(0)}% of opening period elapsed`
                : "Your shop is currently outside its opening hours."}
            </p>

            <div className="text-right">
              <p className="text-xs font-medium text-gray-500">
                Closes At
              </p>

              <p className="mt-1 text-sm font-bold text-gray-800">
                {formatTime(closeTime)}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
