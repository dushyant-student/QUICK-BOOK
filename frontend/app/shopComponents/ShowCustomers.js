"use client";

import { useAuth } from "@/context/authProvider";
import { confirmCustomer, deleteCustomer,} from "@/services/bookingTicketService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ShowCustomers({ Customersdata }) {
  const [customers, setCustomers] = useState(Customersdata || []);
  let { viewALL, changeView, } = useAuth();


  useEffect(() => {
    if (Customersdata) {
      setCustomers(Customersdata);
    }
  }, [Customersdata]);



  // REMOVE CUSTOMER

  const handleRemove = async (customerId, shopId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!isConfirmed) return;

    try {
      const response = await deleteCustomer(customerId, shopId);

      if (response.success) {
        toast.success(response.message);

        setCustomers((prev) =>
          prev.filter(
            (item) => item?.customerId?._id !== customerId
          )
        );
      } else {
        toast.error(
          response.message || "Unable to remove customer"
        );
      }
    } catch (error) {
      // console.error("Delete customer error:", error);
      toast.error("Something went wrong");
    }
  };


  // CONFIRM CUSTOMER

  const handleConfirm = async (customerId, shopId) => {
    try {
      const response = await confirmCustomer(customerId, shopId);

      if (response.success) {
        toast.success(response.message);

        setCustomers((prev) =>
          prev.filter(
            (item) => item?.customerId?._id !== customerId
          )
        );
      } else {
        toast.error(
          response.message || "Unable to confirm customer"
        );
      }
    } catch (error) {
      // console.error("Confirm customer error:", error);
      toast.error("Something went wrong");
    }
  };



  return (
    <section className="w-full min-w-0">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        
      {/* HEADER */}
        <div className="border-b border-slate-200 p-4 sm:p-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* TITLE */}
            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#173454] sm:text-lg">
                Customer Appointments
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Total Customers:{" "}
                <span className="font-semibold text-slate-700">
                  {customers?.length || 0}
                </span>
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex w-full gap-2 sm:w-auto">

              {/* REFRESH */}
              <button
                type="button"
                onClick={() => setCustomers(Customersdata || [])}
                className=" rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100 active:scale-95 sm:flex-none sm:text-sm cursor-pointer"      >
                Refresh
              </button>

              {/* VIEW TOGGLE */}
              <button
                type="button"
                onClick={changeView}
                className=" flex-1 rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 transition hover:bg-orange-100 active:scale-95 sm:flex-none sm:text-sm cursor-pointer">
                {viewALL ? "Small View" : "Full View"}
              </button>
            </div>
          </div>
        </div>

       {/* DESKTOP / TABLET TABLE */}
        <div className="hidden w-full overflow-x-auto md:block">

          <table className="w-full min-w-213 border-collapse text-left">

            {/* COLUMN WIDTHS */}
            <colgroup>
              <col className="w-20" />
              <col className="w-70" />
              <col className="w-55" />
              <col className="w-35" />
              <col className="w-33" />
              <col className="w-30" />
            </colgroup>

            {/* TABLE HEADER */}
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">

                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Token
                </th>

                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Customer
                </th>

                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Topic
                </th>

                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Payment
                </th>

                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Action
                </th>

                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Final
                </th>

              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-slate-100">

              {customers?.length > 0 ? (
                customers.map((appointment, index) => (

                  <tr
                    key={appointment?._id || index}
                    className="transition-colors hover:bg-blue-50/50"
                  >

                    {/* TOKEN */}
                    <td className="px-4 py-4 align-middle">

                      <span
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          bg-violet-100
                          text-sm
                          font-bold
                          text-violet-700
                        "
                      >
                        {appointment?.tokenNo ?? index + 1}
                      </span>

                    </td>

                    {/* CUSTOMER */}
                    <td className="px-4 py-4 align-middle">

                      <div className="flex min-w-0 items-center gap-3">

                        <img
                          src={
                            appointment?.customerId?.imageURL ||
                            "/default-avatar.png"
                          }
                          alt="Customer"
                          className="h-10w-10shrink-0rounded-fullborderborder-slate-200object-cover"/>

                        <div className="min-w-0">

                          <p
                            title={appointment?.customerId?.name}
                            className=" max-w-45 truncate text-sm font-semibold text-slate-800 ">
                            {appointment?.customerId?.name ||
                              "Unknown"}
                          </p>

                          <p
                            title={appointment?.customerId?.email}
                            className="
                              max-w-50
                              truncate
                              text-xs
                              text-slate-500
                            "
                          >
                            {appointment?.customerId?.email ||
                              "No email"}
                          </p>

                        </div>
                      </div>
                    </td>

                    {/* TOPIC */}
                    <td className="px-4 py-4 align-middle">

                      <p
                        title={appointment?.subject}
                        className="
                          max-w-50
                          truncate
                          text-sm
                          text-slate-700
                        "
                      >
                        {appointment?.subject || "N/A"}
                      </p>

                    </td>

                    {/* PAYMENT */}
                    <td className="px-4 py-4 align-middle">

                      <span
                        className="
                          inline-block
                          rounded-md
                          bg-blue-50
                          px-2.5
                          py-1.5
                          text-xs
                          font-medium
                          text-blue-700
                        "
                      >
                        {appointment?.method || "N/A"}
                      </span>

                    </td>

                    {/* REMOVE */}
                    <td className="px-4 py-4 align-middle">

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(
                            appointment?.customerId?._id,
                            appointment?.shopId
                          )
                        }
                        className="
                        cursor-pointer
                          rounded-lg
                          bg-red-50
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-red-600
                          transition
                          hover:bg-red-100
                          active:scale-95
                        "
                      >
                        Remove
                      </button>

                    </td>

                    {/* CONFIRM */}
                    <td className="px-4 py-4 align-middle">

                      <button
                        type="button"
                        onClick={() =>
                          handleConfirm(
                            appointment?.customerId?._id,
                            appointment?.shopId
                          )
                        }
                        className="
                          rounded-lg
                          cursor-pointer
                          bg-green-100
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-green-700
                          transition
                          hover:bg-green-200
                          active:scale-95
                        "
                      >
                        Confirm
                      </button>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-sm text-slate-500"
                  >
                    No customers found.
                  </td>
                </tr>

              )}

            </tbody>
          </table>
        </div>

      
        <div className="block md:hidden">

          {customers?.length > 0 ? (

            <div className="divide-y divide-slate-100">

              {customers.map((appointment, index) => (

                <div
                  key={appointment?._id || index}
                  className="
                    p-4
                    transition
                    hover:bg-slate-50
                    sm:p-5
                  "
                >

                  {/* CARD TOP */}
                  <div className="flex items-start justify-between gap-3">

                    {/* CUSTOMER */}
                    <div className="flex min-w-0 items-center gap-3">

                      <img
                        src={
                          appointment?.customerId?.imageURL ||
                          "/default-avatar.png"
                        }
                        alt="Customer"
                        className="
                          h-11
                          w-11
                          shrink-0
                          rounded-full
                          border
                          border-slate-200
                          object-cover
                        "
                      />

                      <div className="min-w-0">

                        <h3 className="truncate text-sm font-bold text-slate-800">
                          {appointment?.customerId?.name ||
                            "Unknown"}
                        </h3>

                        <p className="truncate text-xs text-slate-500">
                          {appointment?.customerId?.email ||
                            "No email"}
                        </p>

                      </div>
                    </div>

                    {/* TOKEN */}
                    <div
                      className="
                        flex
                        h-9
                        min-w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-violet-100
                        px-2
                        text-sm
                        font-bold
                        text-violet-700
                      "
                    >
                      {appointment?.tokenNo ?? index + 1}
                    </div>

                  </div>

                  {/* DETAILS */}
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                    {/* TOPIC */}
                    <div className="rounded-xl bg-slate-50 p-3">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Topic
                      </p>

                      <p className="mt-1 wrap-break-words text-sm font-medium text-slate-700">
                        {appointment?.subject || "N/A"}
                      </p>

                    </div>

                    {/* PAYMENT */}
                    <div className="rounded-xl bg-slate-50 p-3">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Payment
                      </p>

                      <span
                        className="
                          mt-1
                          inline-block
                          rounded-md
                          bg-blue-50
                          px-2.5
                          py-1
                          text-xs
                          font-semibold
                          text-blue-700
                        "
                      >
                        {appointment?.method || "N/A"}
                      </span>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="mt-4 flex gap-2">

                    {/* REMOVE */}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(
                          appointment?.customerId?._id,
                          appointment?.shopId
                        )
                      }
                      className="
                        flex-1
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-3
                        py-2.5
                        text-xs
                        font-bold
                        text-red-600
                        transition
                        hover:bg-red-100
                        active:scale-[0.98]
                      "
                    >
                      Remove
                    </button>

                    {/* CONFIRM */}
                    <button
                      type="button"
                      onClick={() =>
                        handleConfirm(
                          appointment?.customerId?._id,
                          appointment?.shopId
                        )
                      }
                      className="
                        flex-1
                        rounded-xl
                        border
                        border-green-200
                        bg-green-50
                        px-3
                        py-2.5
                        text-xs
                        font-bold
                        text-green-700
                        transition
                        hover:bg-green-100
                        active:scale-[0.98]
                      "
                    >
                      Confirm
                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="px-4 py-12 text-center">

              <p className="text-sm font-medium text-slate-600">
                No customers found.
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Customer appointments will appear here.
              </p>

            </div>

          )}

        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">

          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {customers?.length || 0}
              </span>{" "}
              customers
            </p>

            <p className="hidden text-xs text-slate-400 sm:block">
              Customer Appointment Management
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
