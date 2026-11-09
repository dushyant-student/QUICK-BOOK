"use client"

import { Ticket, UserRound, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Table_C from './Table_C.js';
import { useAuth } from '@/context/authProvider.js';
import { CallStatusService } from '@/services/historyService.js';

function TurnInfo({ TableData ,shopId }) {

    const [currentStatus, setCurrentStatus] = useState("");
    const { user } = useAuth();
    const myPosition = user?._id;

    const MyLineNo = TableData?.findIndex(
        (data) => data?.customerId?._id === myPosition
    );



    const callStatus = async () => {
        try {
            
            const response = await CallStatusService(shopId)
            
            setCurrentStatus(response.data)
            if (!response.success) {
                return
            }

        } catch (err) {
            // console.log(err, "err in My shop page :-")
        }
    }


    useEffect(() => { 
        if ( !myPosition ) return ;

        callStatus() },
        [myPosition])





    return (
        <>
            <div className="space-y-5">

              
                <section className="rounded-xl border border-blue-100 bg-white p-5 shadow-[0_2px_12px_rgba(20,70,120,0.03)]">

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* POSITION */}
                        <div className="rounded-sm bg-blue-50 ">
                            <div className="flex px-4 py-2 items-center justify-center rounded-sm bg-green-400 text-white">
                                <Ticket size={22} />
                                <h2 className="text-xl font-bold">
                                    Your Queue Status
                                </h2>
                            </div>

                            <div className="mt-8 mb-8 md:mt-15 flex justify-center items-center gap-2">

                                <span className="text-5xl font-bold text-green-500">
                                    {(Number(MyLineNo) + 1 || "Your Turn")}
                                </span>

                                <span className="text-xl font-semibold text-slate-500">
                                    / {TableData?.length}
                                </span>

                            </div>
                        </div>

                        <div className='flex flex-col justify-center gap-2'>
                            <h2 className=' text-xl font-bold bg-green-400 text-white flex justify-center px-4 py-2 rounded-full ' >Shop Status </h2>
                            <h2 className=' text-xl font-bold text-green-500 bg-green-50 flex justify-center px-8 py-3 rounded-2xl ' >total Clients {currentStatus?.totalCount || 0  } </h2>
                            <h2 className=' text-xl font-bold text-green-500 bg-green-50 flex justify-center px-8 py-3 rounded-2xl ' >Completed {currentStatus?.CompletedCount || 0 }</h2>
                            <h2 className=' text-xl font-bold text-green-500 bg-green-50 flex justify-center px-8 py-3 rounded-2xl ' >Remaining {currentStatus?.waitingCount || 0 } </h2>
                        </div>

                    </div>
                </section>


               {/* Line Status */}
                <section className="rounded-xl border border-blue-100 bg-white p-5">

                    <div className="mb-6 flex items-center gap-3">
                        <Users size={29} />

                        <div>
                            <h2 className="text-xl font-bold">
                                Queue Line
                            </h2>

                            <p className="text-sm text-[#527099]">
                                Totals No of People waiting {TableData?.length}
                            </p>
                        </div>
                    </div>


                 
                    <div className="mb-8 overflow-x-auto pb-3">
                        <div className="flex min-w-78  md:min-w-175 items-center justify-between gap-3">

                            {TableData?.map((item, index) => {
                                const position = index + 1;
                                const isMe = item?.customerId?._id === myPosition;

                                return (
                                    <div
                                        key={position}
                                        className="flex min-w-9 flex-col items-center"
                                    >

                                        <div
                                            className={`flex h-9 w-9 items-center justify-center rounded-full ${isMe
                                                ? "h-12 w-12 bg-green-500 text-white shadow-lg"
                                                : position < myPosition
                                                    ? "bg-blue-100 text-blue-500"
                                                    : "bg-slate-100 text-slate-400"
                                                }`}
                                        >
                                            <UserRound
                                                size={isMe ? 23 : 17}
                                                fill={isMe ? "currentColor" : "none"}
                                            />
                                        </div>

                                        <span
                                            className={`mt-2 text-sm font-semibold ${isMe
                                                ? "text-green-600"
                                                : "text-[#17365e]"
                                                }`}
                                        >
                                            {position}
                                        </span>

                                        {isMe && (
                                            <span className="mt-1 rounded-full bg-green-500 px-3 py-1 text-[11px] font-semibold text-white">
                                                You
                                            </span>
                                        )}

                                    </div>
                                );
                            })}

                        </div>
                    </div>


                    {/* TABLE TITLE */}
                    <h3 className="mb-3 text-base font-bold">
                        Queue Details{" "}
                        <span className="font-normal text-[#527099]">
                            (Current Order)
                        </span>
                    </h3>


                    <Table_C myPosition={myPosition} TableData={TableData} />

                </section>

            </div>

        </>
    )
}

export default TurnInfo