import api from "@/lib/axios";


// Booking New Ticket
export const bookingTicket = async(shopId,data)=>{
    const response = await api.post(`/booking/ticket/${shopId}`,data);
    return response.data;
    
}

//My Tickets servies is in serviceServices



export const cancleTicket = async(customerId)=>{
    const response = await api.delete(`/booking/cancle-ticket/${customerId}`)
    return response.data ;
}


//Shopkeeper Customer Bookings  in serverServices



export const deleteCustomer = async(customerId,shopId)=>{
    const response =  await api.delete("/booking/shopowner-deleteCustomer",{data : {customerId,shopId}});
    return response.data;
}

export const confirmCustomer = async(customerId,shopId)=>{
    const response =  await api.delete("/booking/shopowner-confirmCustomer",{data : {customerId,shopId}});
    return response.data;
}


