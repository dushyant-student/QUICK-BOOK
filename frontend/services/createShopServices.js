import api from "@/lib/axios";


//used
export const CreateShop = async(shopId,formData)=>{
    const response = await api.post(`/create-shop/${shopId}`,formData);
    return response.data ;
}


//used
export const UpdateShop = async(shopId,formData)=>{
    const response = await api.post(`/update-shop/${shopId}`,formData);
    return response.data ;
}


//Shop by Id by Server in serverservice
export const ShopById = async(shopId)=>{
    const response = await api.get(`/my-shop-data/${shopId}`);
    return response.data ;
}



