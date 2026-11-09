import bookingHistoryModel from "../models/ticketHistoryModel.js";


export const dashBoardDetails = async (req, res) => {
    try {
     
        const shopId = req.user?.id ;

        //Totals Customers 
        const totalCustomers = await bookingHistoryModel.countDocuments(
            {
                shopId: shopId
            }
        )
        
        // Active customers
        const completed = await bookingHistoryModel.countDocuments(
            {
                shopId: shopId,
                status: "Completed"
            }
        );
        


        // Pending tickets
        const pending = await bookingHistoryModel.countDocuments({
            shopId: shopId,
            status: "Waiting"
        });

          // Rejected tickets
        const recjected = await bookingHistoryModel.countDocuments({
            shopId: shopId,
            status: "Rejected"
        });

          // Customer Canel tickets
        const cancel = await bookingHistoryModel.countDocuments({
            shopId: shopId,
            status: "Cancel"
        });

        //method
        const online = await bookingHistoryModel.countDocuments({
            shopId: shopId,
            method:"Online"
        });
        //method
        const cash = await bookingHistoryModel.countDocuments({
            shopId: shopId,
            method: "Cash"
        });
        
        
        
        res.status(200).json({
            success: true,
            data: { totalCustomers, completed, pending, shopId, recjected, cancel, online, cash }
        });

    } catch (error) {
        // console.error("Dashboard error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};