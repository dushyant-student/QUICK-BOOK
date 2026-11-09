import api from "@/lib/axios";


export const getShopNotifications = async () => {
    try {
        const response = await api.get("/genral/shop-notifications");

        return response.data;

    } catch (error) {
        // console.error(
        //     "GET SHOP NOTIFICATIONS ERROR:",
        //     error.response?.data || error.message
        // );

        throw error;
    }
};