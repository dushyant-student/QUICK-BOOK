import Link from "next/link";
import CancleButton from "@/app/(admins-pages)/my-ticket/components/CancleButton";
import Back_View from "./components/Back_View";
import PrintButton from "./components/PrintButton";
import { getMeServer, myTickets } from "@/services/serverServices";


// Server-side date formatter
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

export default async function BookingTicket() {
    let user = null;
    let userTickets = [];
    let fetchError = false;

    try {
        // Get logged-in user
        user = await getMeServer();

        const userId = user?.user?._id ?? user?._id;

        if (!userId) {
            return (
                <div className="mt-40 text-center">
                    <h1 className="text-xl font-bold text-red-500">
                        Please login to view your tickets.
                    </h1>

                    <Link
                        href="/login"
                        className="mt-4 inline-block rounded-xl bg-blue-600 px-4 py-2 font-bold text-white"
                    >
                        Login
                    </Link>
                </div>
            );
        }

        // Get user tickets
        const response = await myTickets(userId);

        userTickets = response?.data ?? [];

    } catch (error) {
        // console.error("My Tickets Error:", error);
        fetchError = true;
    }

    // API Error
    if (fetchError) {
        return (
            <div className="mt-40 text-center">
                <h1 className="text-xl font-bold text-red-500">
                    Unable to load tickets
                </h1>

                <p className="mt-2 text-gray-500">
                    Please try again later.
                </p>
            </div>
        );
    }

    // No Tickets
    if (userTickets.length === 0) {
        return (
            <div className="mt-40 flex flex-col items-center gap-6">
                <h1 className="font-bold text-red-400">
                    No Tickets Found!
                </h1>

                <Link
                    href="/"
                    className="rounded-xl bg-blue-600 px-4 py-2 font-bold text-white"
                >
                    Booking Now
                </Link>
            </div>
        );
    }

    const customerId = user?.user?._id ?? user?._id;
    
    return (
        <div className="mt-20 min-h-screen px-4 py-8">

            <p className=" bg-orange-400 px-3 py-2 text-lg font-bold text-white">
                BOOKING TICKETS
            </p>

            {userTickets.map((item, index) => {
                const shopId =
                    typeof item?.shopId === "object"
                        ? item?.shopId?._id
                        : item?.shopId;

                return (
                    <div
                        key={item?._id ?? index}
                        className="mx-auto mt-12 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
                    >

                        {/* Header */}
                        <div className="bg-violet-600 px-6 py-5 text-white">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm font-medium text-violet-200">
                                        BOOKING CONFIRMED
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold">
                                        {item?.shopId?.name ??
                                            item?.shopId?.shopName ??
                                            "Shop"}
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl">
                                    ✓
                                </div>

                            </div>

                            <p className="mt-1 text-sm text-violet-200">
                                {item?.shopId?.role ?? ""}
                            </p>

                        </div>

                        {/* Token Section */}
                        <div className="px-6 py-7">

                            <div className="mb-5 flex flex-col gap-4 text-red-500 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-sm">
                                    Note: Please check your token regularly because other customers may cancel their tokens.
                                </p>

                                <Link
                                    href={`/shop/${shopId}`}
                                    className="flex shrink-0 items-center justify-center rounded-lg border-2 border-green-200 bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                                >
                                    View My Turn
                                </Link>

                            </div>

                            {/* Your Turn */}
                            <div className="rounded-2xl border border-dashed border-violet-300 bg-violet-50 p-5 text-center">

                                <p className="text-sm font-medium text-gray-500">
                                    YOUR TURN
                                </p>

                                <h1 className="mt-2 text-6xl font-black tracking-wider text-violet-600">
                                    {index + 1}
                                </h1>

                            </div>

                            {/* Turn Information */}
                            <div className="mt-5 grid grid-cols-2 gap-4">

                                <div className="rounded-2xl bg-gray-50 p-4 text-center">

                                    <p className="text-xs font-medium text-gray-500">
                                        YOUR TOKEN NUMBER
                                    </p>

                                    <p className="mt-1 text-3xl font-bold text-gray-900">
                                        #{item?.tokenNo ?? "N/A"}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        in queue
                                    </p>

                                </div>

                                <div className="flex flex-col items-center gap-2 rounded-2xl bg-gray-50 p-4 text-center">

                                    <p className="text-xs font-medium text-gray-500">
                                        STATUS
                                    </p>

                                    <p className="mt-2 inline-block rounded-md bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                        Confirmed
                                    </p>

                                    <PrintButton />

                                </div>

                            </div>

                            {/* Customer Details */}
                            <div className="mt-6 divide-y divide-gray-100 rounded-2xl border border-gray-100">

                                <div className="flex justify-between gap-3 px-4 py-3">

                                    <span className="text-sm text-gray-500">
                                        Customer
                                    </span>

                                    <span className="text-right text-sm font-semibold text-gray-900">
                                        {item?.customerId?.name ?? "N/A"}
                                    </span>

                                </div>

                                {/* Date - Server Formatted */}
                                <div className="flex justify-between gap-3 px-4 py-3">

                                    <span className="text-sm text-gray-500">
                                        Date
                                    </span>

                                    <span className="text-sm font-semibold text-gray-900">
                                        {formatDate(item?.createdAt)}
                                    </span>

                                </div>

                                <div className="flex justify-between gap-3 px-4 py-3">

                                    <span className="text-sm text-gray-500">
                                        Appointment
                                    </span>

                                    <span className="text-sm font-semibold text-gray-900">
                                        Not Fixed
                                    </span>

                                </div>

                            </div>

                            {/* Queue Message */}
                            <div className="mt-5 rounded-xl bg-green-100 px-4 py-3 text-center">

                                <p className="text-sm text-yellow-800">
                                    Please wait for your turn.
                                </p>

                            </div>

                            {/* Cancel Booking */}
                            <CancleButton customerId={customerId} />

                            {/* Footer */}
                            <div className="mt-6 border-t border-dashed border-gray-200 pt-5 text-center">

                                <p className="text-xs text-gray-400">
                                    Please show this ticket at the shop
                                </p>

                                <p className="mt-1 text-xs font-medium text-gray-500">
                                    Token #{item?.tokenNo} • Turn #{item?.tokenNo}
                                </p>

                            </div>

                            {/* Back View */}
                            <Back_View shopId={item?.shopId} />

                        </div>

                    </div>
                );
            })}

        </div>
    );
}
