import api from "@/lib/axios"

export const sendNotice = async(shopId,noticeData)=>{
    const response = await api.post(`/notice/${shopId}`,noticeData)
    return response.data ;
}


export const  fecthAllNotice = async(shopId)=>{
    const response = await api.get(`/notice/give-all/${shopId}`)
    return response.data ;
}


export const fetchNoticeById = async(noticeId)=>{
    const response = await api.get(`/notice/${noticeId}`)
    return response.data ;
}

