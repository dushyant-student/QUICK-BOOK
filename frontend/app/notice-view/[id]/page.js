"use client";

import React, { use, useEffect, useState } from "react";
import { CheckCircle2, } from "lucide-react";
import { fetchNoticeById } from "@/services/NoticeService";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";


export default function NoticePage({ params }) {
  const [newNotice, setNewNotice] = useState([]);
  const url = useParams();
  const id = url.id;

  const noticeId = id;
  ExistErr = null;

  const callNotices = async () => {
    try {

      const response = await fetchNoticeById(noticeId);

      if (!response.success) {
        toast.error("Network Error !")
      }
      setNewNotice(response?.data ?? null)


    } catch (err) {
      ExistErr = true;
      console.log("NoticePage:- " ,err)
    }
  }

  useEffect(() => {
    callNotices()
  }, [noticeId])


  if (ExistErr) {
    return <>
      <main className="min-h-screen mt-10 flex justify-center items-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

        <button onClick={() => window.location.reload()}>
          Reload Page
        </button>

      </main>
    </>
  }


  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Notice Document */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Notice Top Header */}
          <div className="border-b border-gray-200 px-5 py-5 sm:px-8">

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">

              <div>
                <p className="text-xs text-green-300 font-semibold uppercase tracking-wider">
                  Official Notice
                </p>

                <p className="mt-2  text-2xl text-black font-extrabold">
                  {newNotice?.shopName}
                </p>

                <h2 className="mt-2 ml-5 text-2xl font-bold text-red-600 sm:text-2xl">
                  NOTICE
                </h2>

              </div>

            </div>

            {/* Meta Information */}
            <div className="mt-5 text-sm text-gray-500">
              <span>
                Date:{" "}
                <strong className="text-gray-700">
                  {
                    new Date(newNotice?.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })

                  }
                </strong>
              </span>
            </div>
          </div>


          {/* Notice Body */}
          <div className="px-5 py-7 sm:px-8">

            {/* Opening Message */}
            <div>
              <p className=" flex justify-center items-center mt-3 text-xl font-bold leading-7 text-gray-600">
                {newNotice?.title}
              </p>
            </div>

            {/* Important Points */}
            <div className="mt-8 px-10">
              <div className="mt-4 flex justify-center items-center">
                <p className="text-md leading-6 text-gray-600">
                  {newNotice?.message}
                </p>
              </div>
            </div>
          </div>


          {/* Notice Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-5 py-6 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Issued By
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {newNotice?.name}
                </p>

              </div>

              {/* Signature */}
              <div className="sm:text-right">
                <div className="mb-2 ml-auto h-px w-32 bg-gray-300" />
                <p className="text-xs text-gray-400">
                  Shop Administration Staff
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Phone No: {newNotice?.phone}
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Bottom Status */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
          <CheckCircle2 className=" text-green-600 h-4 w-4" />
          This notice is currently active
        </div>

      </div>
    </main>
  );
}