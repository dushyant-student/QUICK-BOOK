import ShopModel from "../models/userShopModel.js";


export const getShopNotifications = async (req, res) => {
    try {
        const shops = await ShopModel.find(
            {},
            {
                shopName: 1,
                role: 1,
                createdAt: 1,
                country: 1,
                city: 1,
                address: 1,
                shopId: 1

            }
        ).sort({ createdAt: -1 }).limit(10).lean();

        return res.status(200).json({
            success: true,
            count: shops.length,
            data: shops,
        });

    } catch (err) {
        // console.error("SHOP NOTIFICATION ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch shop notifications",
        });
    }
};