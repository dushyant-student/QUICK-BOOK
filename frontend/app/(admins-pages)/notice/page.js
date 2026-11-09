import Link from "next/link";
import { fecthAllNotice } from "@/services/NoticeService";
import { Bell, Megaphone, Clock3 } from "lucide-react";
import { getMeServer } from "@/services/serverServices";


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



export default async function NoticeBoard() {
  let notices = [];
  let fetchError = false;

  try {
    
    const user = await getMeServer();
    
    // Fetch notices
    let userId = user?.user?._id ;
    if (userId) {
      
        const response = await fecthAllNotice(userId);
        
        if (!response?.success) {
            throw new Error("Failed to fetch notices");
        }
      notices = response?.data ?? [];

    }



  } catch (error) {
    // console.error("NoticeBoard Error:", error);
    fetchError = true;
  }


  
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


  
  // 5. Render notices
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

                    {/* View Notice: no router needed */}
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
