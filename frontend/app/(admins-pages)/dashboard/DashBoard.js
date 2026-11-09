"use client";

import Link from "next/link";
import { Ticket, Users, Store, Clock, CalendarDays, Plus, ShoppingBag, CircleCheck, Timer, ChevronRight, ChevronLeft, BellRing, Smartphone,  UserCheck, SearchX, Search, RefreshCw, XCircle, Activity, ArrowUpRight,  CreditCard, Banknote, LayoutDashboard } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { historyCall } from "@/services/historyService";
import { useAuth } from "@/context/authProvider";
import toast from "react-hot-toast";



export default function Dashboard( { details } ) {
  const { user } = useAuth();
  const [histdata, setHist_data] = useState([]);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingDashboard, setLoadingDashboard] = useState(true);


  // Table Sstates
  const [tableSearch, setTableSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refreshing, setRefreshing] = useState(false);
  const customerId = user?._id;
  


  //ALL Customers Untill ShopKeeper Watch 
  const historyCus = async () => {

    if (!customerId) return;

    try {
      setLoadingHistory(true);

      const response = await historyCall(customerId);

      setHist_data(response?.data || []);

    } catch (err) {

      console.error(
        "Error in History Customer Page:",
        err
      );

      toast.error("Unable to load customer history");

    } finally {

      setLoadingHistory(false);

    }
  };



//DashBoard Details 
  const DashInfo = async () => {

    if (!customerId) return;

    try {
      setLoadingDashboard(true);
      setTicketInfo(details);
      

    } catch (error) {

      console.error(
        "Dashboard error:",
        error
      );

      toast.error("Unable to load dashboard");

    } finally {

      setLoadingDashboard(false);

    }
  };


 
//Intital Load /First rendering 
  useEffect(() => {

    if (!customerId) return;

    historyCus();
    DashInfo();

  }, [customerId]);




  //Refresh Function 
  const refreshDashboard = async () => {

    try {

      setRefreshing(true);
      await Promise.all([
        historyCus(),
        DashInfo(),
      ]);

      toast.success("Dashboard updated");

    } finally {

      setRefreshing(false);

    }
  };



  //DashBoard Data
  const dashboardData = ticketInfo?.data || {};

  

 //  STATISTICS related Shop DAshBaord
  const stats = [

    {
      title: "Total Tickets",
      value: dashboardData?.totalCustomers || 0,
      subtitle: "All customer bookings",
      icon: Ticket,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      gradient: "from-violet-500/10",
    },

    {
      title: "Active Customers",
      value: dashboardData?.pending || 0,
      subtitle: "Currently in your queue",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      gradient: "from-blue-500/10",
    },

    {
      title: "Completed",
      value: dashboardData?.completed || 0,
      subtitle: "Successfully completed",
      icon: UserCheck,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      gradient: "from-emerald-500/10",
    },

    {
      title: "Rejected",
      value: dashboardData?.rejected || 0,
      subtitle: "Cancelled by shop",
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      gradient: "from-red-500/10",
    },

  ];



  //Quick Actions Links   
  const quickActions = [

    {
      title: "Publish Notice",
      description:
        "Notify your customers about shop updates.",
      href: "/upload-notice",
      icon: BellRing,
      color: "bg-red-500",
      shadow: "shadow-red-100",
    },

    {
      title: "My Bookings",
      description:
        "View and manage your customer tokens.",
      href: "/my-ticket",
      icon: Ticket,
      color: "bg-violet-600",
      shadow: "shadow-violet-100",
    },

    {
      title: "Manage Shop",
      description:
        "Update your shop information.",
      href: `/my-shop/${customerId || ""}`,
      icon: ShoppingBag,
      color: "bg-orange-500",
      shadow: "shadow-orange-100",
    },

  ];


 
  //Search Filter Page View pr Page
  const filteredTickets = useMemo(() => {

    const search = tableSearch.trim().toLowerCase();

    if (!search) {
      return histdata || [];
    }

    return (histdata || []).filter((ticket) => {

      return ( ticket?.customerId?.name?.toLowerCase().includes(search)  ||  ticket?.subject?.toLowerCase().includes(search)  ||  ticket?.method?.toLowerCase().includes(search)  ||  ticket?.status?.toLowerCase().includes(search)  | String(ticket?.tokenNo || "").includes(search)

      );

    });

  }, [histdata, tableSearch]);


  //  PAGINATION No
  const totalPages = Math.max( 1, Math.ceil( filteredTickets.length / rowsPerPage ));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedTickets = filteredTickets.slice( startIndex, endIndex );



  useEffect(() => {
    setCurrentPage(1);
  }, [tableSearch, rowsPerPage]);


 

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

  }, [currentPage, totalPages]);


 
//Change  Page No 
  const pageNumbers = useMemo(() => {

    const pages = [];

    if (totalPages <= 5) {
      for ( let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }


    pages.push(1);


    if (currentPage > 3) {
      pages.push("...");
    }


    const start = Math.max(  2,  currentPage - 1);
    const end =  Math.min( totalPages - 1,currentPage + 1);

    for ( let i = start; i <= end; i++) {
      pages.push(i);
    }


    if ( currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);


    return pages;

  }, [totalPages, currentPage]);


 
// STATUS COUNTS Like Complete , Pending , Success etc 

  const statusSummary = useMemo(() => {

    const completed = histdata.filter( (item) => item?.status ===  "Completed").length;
    const waiting = histdata.filter( (item) => item?.status === "Waiting" ).length;
    const rejected = histdata.filter( (item) => item?.status === "Rejected" ).length ;
    const cancelled = histdata.filter( (item) => item?.status === "Cancel" ).length;


    return {  completed,  waiting,  rejected,  cancelled };

  }, [histdata]);


 //  PAYMENT COUNTS  
  const paymentSummary = useMemo(() => {

    const online = histdata.filter( (item) =>  item?.method?.toLowerCase() ===  "online" ).length;


    const cash =histdata.filter( (item) => item?.method?.toLowerCase() === "cash").length;


    return {
      online,
      cash,
    };

  }, [histdata]);



  //Now Ui Stats
  const getStatusStyle = (status) => {

    switch (status) {

      case "Completed":
        return {  wrapper: "bg-emerald-50 text-emerald-700 ring-emerald-200",dot:  "bg-emerald-500",icon:  CircleCheck, };


      case "Waiting":
        return { 
          wrapper:  "bg-amber-50 text-amber-700 ring-amber-200",dot:  "bg-amber-500",icon:  Timer,
        };


      case "Rejected":
        return { wrapper:   "bg-blue-50 text-blue-700 ring-blue-200", dot:   "bg-blue-500", icon:   XCircle,
        };


      case "Cancel":
        return { wrapper:   "bg-red-50 text-red-700 ring-red-200", dot:   "bg-red-500", icon:   XCircle,
        };


      default:
        return {wrapper:  "bg-slate-50 text-slate-600 ring-slate-200",dot:  "bg-slate-400",icon:  Activity,
        };

    }

  };


    //  LOADING SKELETON

  const StatSkeleton = () => (

    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex justify-between">

        <div className="space-y-3">

          <div className="h-3 w-24 rounded bg-slate-200" />

          <div className="h-8 w-16 rounded bg-slate-200" />

        </div>

        <div className="h-12 w-12 rounded-xl bg-slate-200" />

      </div>

      <div className="mt-5 h-3 w-36 rounded bg-slate-200" />

    </div>

  );


    //  RETURN

  return (

    <main className="min-h-screen bg-[#f8fafc] px-4 pb-12 pt-24 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-[1600px]">



            {/* HERO HEADER */}
       

        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-blue-100 sm:p-8">

          {/* Decorative circles */}

          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />


          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-100">

                <LayoutDashboard size={17} />

                TURN MANAGEMENT SYSTEM

              </div>


              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">

                Dashboard Overview

              </h1>


              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">

                Welcome back,{" "}

                <span className="font-bold text-white">

                  {user?.name || "Shop Owner"}

                </span>

                . Manage your customers, tokens,
                bookings and shop activity from one place.

              </p>


              {/* HERO MINI STATS */}

              <div className="mt-6 flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur">

                  <Users size={16} />

                  <span className="text-sm font-semibold">

                    {histdata.length} Customers

                  </span>

                </div>


                <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur">

                  <CircleCheck size={16} />

                  <span className="text-sm font-semibold">

                    {statusSummary.completed} Completed

                  </span>

                </div>


                <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur">

                  <Clock size={16} />

                  <span className="text-sm font-semibold">

                    {statusSummary.waiting} Waiting

                  </span>

                </div>

              </div>

            </div>


            {/* HERO ACTIONS */}

            <div className="flex flex-wrap gap-3">

              <button
                onClick={refreshDashboard}
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/20 disabled:opacity-60"
              >

                <RefreshCw
                  size={17}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh

              </button>


              <Link
                href="/create-shop"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >

                <Plus size={18} />

                Update Shop

              </Link>

            </div>

          </div>

        </section>


      
            {/* KPI CARDS */}
        

        <section className="mb-8">

          <div className="mb-4 flex items-end justify-between">

            <div>

              <h2 className="text-lg font-bold text-slate-800">

                Business Overview

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Your latest booking and payment statistics.

              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {loadingDashboard

              ? Array.from({ length: 7 }).map(
                  (_, index) => (
                    <StatSkeleton key={index} />
                  )
                )

              : stats.map((stat) => {

                  const Icon =
                    stat.icon;

                  return (

                    <div
                      key={stat.title}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >

                      <div
                        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.gradient} to-transparent`}
                      />


                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <p className="text-sm font-medium text-slate-500">

                            {stat.title}

                          </p>


                          <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-800">

                            {stat.value}

                          </h3>

                        </div>


                        <div
                          className={`shrink-0 rounded-2xl p-3 ${stat.iconBg} ${stat.iconColor} transition duration-300 group-hover:scale-110`}
                        >

                          <Icon size={22} />

                        </div>

                      </div>


                      <div className="mt-5 flex items-center gap-2">

                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                        <p className="text-xs font-medium text-slate-500">

                          {stat.subtitle}

                        </p>

                      </div>

                    </div>

                  );

                })}

          </div>

        </section>


     
       {/* QUICK ACTIONS + STATUS OVERVIEW */}
      

        <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">


          {/* STATUS OVERVIEW */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="font-bold text-slate-800">

                  Booking Status

                </h2>

                <p className="mt-1 text-xs text-slate-500">

                  Current customer distribution

                </p>

              </div>


              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">

                <Activity size={19} />

              </div>

            </div>


            <div className="mt-5 space-y-4">


              <StatusRow
                label="Completed"
                value={statusSummary.completed}
                color="bg-emerald-500"
                icon={CircleCheck}
              />


              <StatusRow
                label="Waiting"
                value={statusSummary.waiting}
                color="bg-amber-500"
                icon={Clock}
              />


              <StatusRow
                label="Rejected"
                value={statusSummary.rejected}
                color="bg-blue-500"
                icon={XCircle}
              />


              <StatusRow
                label="Cancelled"
                value={statusSummary.cancelled}
                color="bg-red-500"
                icon={XCircle}
              />

            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="xl:col-span-2">

            <div className="mb-4">

              <h2 className="text-lg font-bold text-slate-800">

                Quick Actions

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Frequently used shop management features.

              </p>

            </div>


            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {quickActions.map((action) => {

                const Icon =
                  action.icon;

                return (

                  <Link
                    key={action.title}
                    href={action.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >

                    <div className="flex items-center justify-between">

                      <div
                        className={`rounded-xl p-3 text-white shadow-lg ${action.color} ${action.shadow}`}
                      >

                        <Icon size={21} />

                      </div>


                      <ArrowUpRight
                        size={18}
                        className="text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                      />

                    </div>


                    <h3 className="mt-5 font-bold text-slate-800">

                      {action.title}

                    </h3>


                    <p className="mt-1 text-sm leading-5 text-slate-500">

                      {action.description}

                    </p>

                  </Link>

                );

              })}

            </div>

          </div>

        </section>


      
            {/* PAYMENT OVERVIEW */}
      
        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">


          <PaymentCard
            title="Online Payments"
            value={paymentSummary.online}
            description="Customers paid digitally"
            icon={CreditCard}
            wrapper="bg-cyan-50"
            iconWrapper="bg-cyan-100 text-cyan-600"
          />


          <PaymentCard
            title="Cash Payments"
            value={paymentSummary.cash}
            description="Customers paid using cash"
            icon={Banknote}
            wrapper="bg-pink-50"
            iconWrapper="bg-pink-100 text-pink-600"
          />

        </section>


      
       {/* CUSTOMER TABLE */}
       

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


          {/* TABLE HEADER */}

          <div className="border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 p-5 sm:p-6">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">


              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                    <Users size={20} />

                  </div>


                  <div>

                    <h2 className="text-lg font-bold text-slate-800 sm:text-xl">

                      Customer History

                    </h2>

                    <p className="text-xs text-slate-500">

                      Latest customer appointments

                    </p>

                  </div>


                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">

                    {filteredTickets.length} Records

                  </span>

                </div>

              </div>


              {/* SEARCH */}

              <div className="relative w-full lg:w-80">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />


                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) =>
                    setTableSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search customer, token..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />


                {tableSearch && (

                  <button
                    onClick={() =>
                      setTableSearch("")
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    ×
                  </button>

                )}

              </div>

            </div>

          </div>


          {/* TABLE */}

          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[950px] text-left">


              <thead>

                <tr className="border-b border-slate-200 bg-slate-50">

                  {[
                    "Ticket",
                    "Customer",
                    "Subject",
                    "Token",
                    "Method",
                    "Status",
                  ].map((heading) => (

                    <th
                      key={heading}
                      className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-wider text-slate-500"
                    >
                      {heading}
                    </th>

                  ))}

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">


                {loadingHistory ? (

                  Array.from({
                    length: rowsPerPage,
                  }).map((_, index) => (

                    <tr
                      key={index}
                      className="animate-pulse"
                    >

                      {Array.from({
                        length: 6,
                      }).map((_, cell) => (

                        <td
                          key={cell}
                          className="px-5 py-5"
                        >

                          <div className="h-4 w-24 rounded bg-slate-200" />

                        </td>

                      ))}

                    </tr>

                  ))

                ) : paginatedTickets.length > 0 ? (

                  paginatedTickets.map(
                    (ticket, index) => {

                      const status =
                        getStatusStyle(
                          ticket?.status
                        );

                      const StatusIcon =
                        status.icon;


                      return (

                        <tr
                          key={
                            ticket?._id ||
                            index
                          }
                          className="group transition duration-200 hover:bg-blue-50/40"
                        >


                          {/* TICKET */}

                          <td className="px-5 py-4">

                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-600 ring-1 ring-blue-100">

                              #
                              {startIndex +
                                index +
                                1}

                            </span>

                          </td>


                          {/* CUSTOMER */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold text-white shadow-sm">

                                {ticket?.customerId?.name
                                  ?.charAt(
                                    0
                                  )
                                  ?.toUpperCase() ||
                                  "U"}

                              </div>


                              <div className="min-w-0">

                                <p className="max-w-[180px] truncate text-sm font-bold text-slate-800">

                                  {ticket
                                    ?.customerId
                                    ?.name ||
                                    "Unknown"}

                                </p>


                                <p className="mt-0.5 text-xs text-slate-400">

                                  Customer

                                </p>

                              </div>

                            </div>

                          </td>


                          {/* SUBJECT */}

                          <td className="px-5 py-4">

                            <p className="max-w-[220px] truncate text-sm font-medium text-slate-700">

                              {ticket?.subject ||
                                "No subject"}

                            </p>

                          </td>


                          {/* TOKEN */}

                          <td className="px-5 py-4">

                            <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl bg-violet-100 px-2 text-sm font-black text-violet-700">

                              {ticket?.tokenNo ??
                                "-"}

                            </span>

                          </td>


                          {/* METHOD */}

                          <td className="px-5 py-4">

                            <span
                              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold ${
                                ticket?.method
                                  ?.toLowerCase() ===
                                "online"
                                  ? "bg-cyan-50 text-cyan-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >

                              {ticket?.method
                                ?.toLowerCase() ===
                              "online" ? (
                                <Smartphone
                                  size={13}
                                />
                              ) : (
                                <Banknote
                                  size={13}
                                />
                              )}

                              {ticket?.method ||
                                "-"}

                            </span>

                          </td>


                          {/* STATUS */}

                          <td className="px-5 py-4">

                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${status.wrapper}`}
                            >

                              <span
                                className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                              />

                              <StatusIcon
                                size={13}
                              />

                              {ticket?.status ||
                                "Unknown"}

                            </span>

                          </td>

                        </tr>

                      );

                    }
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={6}
                      className="px-5 py-16 text-center"
                    >

                      <div className="mx-auto flex max-w-sm flex-col items-center">

                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">

                          <SearchX
                            size={27}
                            className="text-slate-400"
                          />

                        </div>


                        <h3 className="font-bold text-slate-700">

                          No customers found

                        </h3>


                        <p className="mt-1 text-sm text-slate-400">

                          {tableSearch
                            ? "Try changing your search."
                            : "No customer history is available yet."}

                        </p>


                        {tableSearch && (

                          <button
                            onClick={() =>
                              setTableSearch(
                                ""
                              )
                            }
                            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                          >
                            Clear Search
                          </button>

                        )}

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* ===================================================
              PAGINATION FOOTER
          =================================================== */}

          {!loadingHistory &&
            filteredTickets.length > 0 && (

              <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">


                {/* RESULT INFO */}

                <div className="flex flex-wrap items-center gap-3">

                  <p className="text-xs font-medium text-slate-500">

                    Showing{" "}

                    <span className="font-bold text-slate-700">

                      {startIndex + 1}

                    </span>

                    {" - "}

                    <span className="font-bold text-slate-700">

                      {Math.min(
                        endIndex,
                        filteredTickets.length
                      )}

                    </span>

                    {" of "}

                    <span className="font-bold text-slate-700">

                      {filteredTickets.length}

                    </span>

                  </p>


                  <select
                    value={rowsPerPage}
                    onChange={(e) =>
                      setRowsPerPage(
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value={5}>
                      5 / page
                    </option>

                    <option value={10}>
                      10 / page
                    </option>

                    <option value={15}>
                      15 / page
                    </option>

                    <option value={20}>
                      20 / page
                    </option>

                  </select>

                </div>


                {/* PAGE BUTTONS */}

                <div className="flex items-center gap-1">


                  <button
                    disabled={
                      currentPage ===
                      1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (prev) =>
                          Math.max(
                            prev - 1,
                            1
                          )
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >

                    <ChevronLeft
                      size={17}
                    />

                  </button>


                  {pageNumbers.map(
                    (page, index) => {

                      if (
                        page ===
                        "..."
                      ) {

                        return (

                          <span
                            key={`dots-${index}`}
                            className="flex h-9 w-8 items-center justify-center text-sm font-bold text-slate-400"
                          >
                            ...
                          </span>

                        );

                      }


                      return (

                        <button
                          key={page}
                          onClick={() =>
                            setCurrentPage(
                              page
                            )
                          }
                          className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-bold transition ${
                            currentPage ===
                            page
                              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                              : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >

                          {page}

                        </button>

                      );

                    }
                  )}


                  <button
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (prev) =>
                          Math.min(
                            prev + 1,
                            totalPages
                          )
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >

                    <ChevronRight
                      size={17}
                    />

                  </button>

                </div>

              </div>

            )}

        </section>


        {/* =====================================================
            BOTTOM INFORMATION
        ===================================================== */}

        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">


          <InfoCard
            icon={CalendarDays}
            title="Manage Tickets"
            description="Track customer tokens, booking status and service progress from your ticket management page."
            href="/my-ticket"
            linkText="View My Tokens"
            wrapper="border-blue-100 bg-blue-50"
            iconWrapper="bg-blue-100 text-blue-600"
            linkColor="text-blue-600"
          />


          <InfoCard
            icon={Store}
            title="Shop Management"
            description="Update your shop details, manage your services and keep your customer experience organized."
            href="/create-shop"
            linkText="Manage My Shop"
            wrapper="border-orange-100 bg-orange-50"
            iconWrapper="bg-orange-100 text-orange-600"
            linkColor="text-orange-600"
          />

        </section>


      </div>

    </main>

  );

}


/* =============================================================
   STATUS ROW
============================================================= */

function StatusRow({
  label,
  value,
  color,
  icon: Icon,
}) {

  return (

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div
          className={`h-2.5 w-2.5 rounded-full ${color}`}
        />

        <span className="text-sm font-semibold text-slate-600">

          {label}

        </span>

      </div>


      <div className="flex items-center gap-2">

        <Icon
          size={14}
          className="text-slate-400"
        />

        <span className="text-sm font-black text-slate-800">

          {value}

        </span>

      </div>

    </div>

  );

}


/* =============================================================
   PAYMENT CARD
============================================================= */

function PaymentCard({
  title,
  value,
  description,
  icon: Icon,
  wrapper,
  iconWrapper,
}) {

  return (

    <div
      className={`flex items-center justify-between rounded-2xl border border-slate-200 p-5 shadow-sm ${wrapper}`}
    >

      <div>

        <p className="text-sm font-medium text-slate-500">

          {title}

        </p>


        <h3 className="mt-1 text-3xl font-black text-slate-800">

          {value}

        </h3>


        <p className="mt-1 text-xs text-slate-500">

          {description}

        </p>

      </div>


      <div
        className={`rounded-2xl p-4 ${iconWrapper}`}
      >

        <Icon size={25} />

      </div>

    </div>

  );

}


/* =============================================================
   INFORMATION CARD
============================================================= */

function InfoCard({
  icon: Icon,
  title,
  description,
  href,
  linkText,
  wrapper,
  iconWrapper,
  linkColor,
}) {

  return (

    <div
      className={`rounded-2xl border p-5 sm:p-6 ${wrapper}`}
    >

      <div className="flex items-start gap-4">

        <div
          className={`shrink-0 rounded-xl p-3 ${iconWrapper}`}
        >

          <Icon size={23} />

        </div>


        <div>

          <h3 className="font-bold text-slate-800">

            {title}

          </h3>


          <p className="mt-1 text-sm leading-6 text-slate-600">

            {description}

          </p>


          <Link
            href={href}
            className={`mt-3 inline-flex items-center gap-1 text-sm font-bold hover:underline ${linkColor}`}
          >

            {linkText}

            <ChevronRight size={16} />

          </Link>

        </div>

      </div>

    </div>

  );

}
