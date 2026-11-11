import { serverApi } from "@/lib/server-api";


//Auth Me Form Server
export async function getMeServer() {
    try {
        return await serverApi("/auth/me");
    } catch (error) {
        // console.error("getMeServer error:", error);
        return null;
    }
}


//Fetch All Shops 
export const getAllShop = async()=>{
    try{
        return serverApi("/all-shops");

    }catch(err){
        // console.log("Enable to Fetch All Shops")
        return response.data;
    }
}



//Dashboard
export const getDashBordDetails= async()=>{
    try{
        return serverApi("/dashboard");
    }catch(err){
        // console.log("Dash Board Err :-",err)
        return null;
    }

}


//My tickets Services 
export const myTickets = async(userId)=>{
    try{
       
        return serverApi(`/booking/my-tickets/${userId}`) ;
    }catch(err){
        // console.log("my Ticket Err:- ",err)
        return null ;
    }
}


export const ShopOwnerProfileById = async (shopId)=>{  
     try{
         return serverApi(`/shop-by-id/${shopId}`)

     }catch(err){
        // console.log("Err in owner profile :- ",err)
        return null ;
     }

}


//Total Shop Customers
export const myAllCustomers = async(userId)=>{
    try{
        return serverApi(`/booking/my-all-customers/${userId}`);

    }catch(err){
        // console.log("Err in Table data:-",err)
        return null ;
    }
    

}


//Shop by My Shop data 
export const myShopData = async(shopId)=>{
    try{
        return serverApi(`/my-shop-data/${shopId}`);
    
    }catch(err){
        // console.log("Error in My Shop Data:-",err)
        return null ;
    }
}


//Fetch All Shops 
export const getAllShop = async()=>{
    try{
        return serverApi("/all-shops");

    }catch(err){
        // console.log("Enable to Fetch All Shops")
        return response.data;
    }
}

// Call Status
export const CallStatusService= async(shopId)=>{
    try{
        return serverApi(`/history/current-status/${shopId}`);   

    }catch(err){
        console.log("Error:-",err)
        return []
    }
    
}


