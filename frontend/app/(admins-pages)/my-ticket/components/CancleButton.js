"use client"

import { cancleTicket } from '@/services/bookingTicketService';
import React from 'react'
import toast from 'react-hot-toast';

export default function CancleButton({customerId}) {
    
    
    const cancleRequest = async () => {
        try{
            const request = await cancleTicket(customerId);
            if (request.success){
                toast.success("Ticket SuccessFully Cancelled !")
                window.location.reload();
            }

        }catch(err){
            console.log("err in delete Cancle Req",err)
        }

    }



    return (
    
        <button onClick={cancleRequest} className="cursor-pointer w-full mt-5 rounded-xl bg-red-100 px-4 py-3 text-center font-semibold hover:bg-red-200
                transition-transform duration-150
                active:scale-x-90 ">
            <p className="text-md text-yellow-800    ">
                CANCLE MY TICKET
            </p>
        </button>

    )
}
