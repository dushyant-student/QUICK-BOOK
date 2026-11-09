import api from "@/lib/axios";


export const FetchProfile = async()=>{
    const response =  await api.get("/auth/get-my-profile")
    return response.data ;
}


export const UpdateProfile = async(formData)=>{
    const response = await api.put("/auth/update-profile",formData);
    return response.data ;
}