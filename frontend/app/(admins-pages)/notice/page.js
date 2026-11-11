
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fecthAllNotice } from "@/services/NoticeService";
import { Bell, Megaphone, Clock3 } from "lucide-react";
import { useAuth } from "@/context/authProvider";
import LoadingSpinner from "@/app/components/LoadingSpinner";


function formatDate(dateValue) {
  if (!dateValue) return "N/A";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}


export default function NoticeBoard() {

  const { user, isLoading } = useAuth();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);


  // FETCH ALL NOTICES
  useEffect(() => {

    if (isLoading) return;

    const fetchNotices = async () => {

      const userId = user?._id || user?.id;

      if (!userId) {
        setNotices([]);
        setLoading(false);
        return;
      }

      try {

        setLoading(true);
        setFetchError(false);

        const response = await fecthAllNotice(userId);

        if (!response?.success) {
          throw new Error("Failed to fetch notices");
        }

        setNotices(response?.data ?? []);

      } catch (error) {

        console.error("NoticeBoard Error:", error);

        setFetchError(true);
        setNotices([]);

      } finally {

        setLoading(false);

      }
    };

    fetchNotices();

  }, [user, isLoading]);


  // AUTH LOADING
  if (isLoading || loading) {
    return (
      <div className="mt-40 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }


  // FETCH ERROR
  if (fetchError) {
    return (
      <div className="mt-40 text-center">
        <h2 className="font-bold text-red-500">
          Unable to load notices
        </h2>

        <p className="mt-2 text-gray-500">
          Please try again later.
        </p>
      </div>
    );
  }


  // EMPTY NOTICES
  if (notices.length === 0) {
    return (
      <div className="mt-40 flex flex-col items-center gap-6">

        <h1 className="font-bold">
          You Did Not Upload Any Notice For Shop!
        </h1>

        <Link
          href="/upload-notice"
          className="rounded-xl bg-blue-600 px-4 py-2 font-bold text-white"
        >
          Upload Notice
        </Link>

      </div>
    );
  }


  // RENDER NOTICES
  return (
    <div className="h-screen w-full overflow-y-auto rounded-2xl border border-blue-100 bg-white p-5 py-24 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-2">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
          <Megaphone size={22} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Notice Board
          </h2>

          <p className="text-sm text-gray-500">
            Important shop notifications
          </p>
        </div>

      </div>


      {/* Notices */}
      <div className="mt-5 space-y-3">

        {notices.map((notice) => (

          <div
            key={notice._id}
            className="rounded-xl border border-blue-100 bg-blue-50 p-4"
          >

            <div className="flex items-start gap-3">

              {/* Icon */}
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <Bell size={18} className="text-blue-600" />
              </div>


              {/* Content */}
              <div className="min-w-0 flex-1">

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                  <h3 className="font-semibold text-gray-800">
                    {notice?.type}
                  </h3>


                  <div className="flex flex-wrap items-center gap-3">

                    {/* View Notice */}
                    <Link
                      href={`/notice-view/${notice._id}`}
                      className="rounded-sm bg-blue-600 px-4 py-1 font-bold text-white"
                    >
                      View Notice
                    </Link>


                    {/* Date */}
                    <div className="flex items-center gap-1 rounded-sm bg-green-100 px-4 py-1 text-xs text-black">

                      <Clock3 size={13} />

                      {formatDate(notice?.createdAt)}

                    </div>

                  </div>

                </div>


                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {notice?.title}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
