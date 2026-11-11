import api from "@/lib/axios";


export const historyCall= async(shopId)=>{
    const response = await api.get(`/history/all/${shopId}`);
    return response.data ;
}


