import bookingHistoryModel from "../models/ticketHistoryModel.js";


export const historyData = async (req, res) => {
    try {
        

        const { shopId } = req.params;

        const data = await bookingHistoryModel.find(
            { shopId: shopId },
            { 
                status: 1,
                method: 1,
                subject: 1,
                tokenNo: 1, 
                _id: 0
            }
        ).populate("customerId", "name").sort({ createdAt: 1 })

        if (!data) {
            return res.status(404).send({
                message: "History Not Found ",
                success: false
            })
        }

        return res.status(200).send({
            message: "All History ",
            data: data,
            success: true,
        })

    } catch (err) {
        // console.log("err in history Contorllers ;- ", err)
        res.status(500).send({
            message: "Network Error ",
            succes: false
        })
    }

}


export const callMyShopStatus = async (req, res) => {
    try {
        const { shopId } = req.params;
       
        const fifteenHoursAgo = new Date(
                Date.now() - 15 * 60 * 60 * 1000
            );


        const CompletedCount = await bookingHistoryModel.countDocuments({
            shopId:shopId,
            createdAt: { $gte: fifteenHoursAgo },
            status: "Completed"
        });

        const waitingCount = await bookingHistoryModel.countDocuments({
            shopId:shopId ,
            createdAt: { $gte: fifteenHoursAgo },
            status: "Waiting"
        });
        const totalCount = CompletedCount + waitingCount;
        
        


        if (!totalCount) {
            return res.status(200).send({
                message: "Crrently You Have No data Related to Tickets",
                success: false,
                data:[]
            })
        }

        return res.status(200).send({
            message: "All History ",
            data:{totalCount ,CompletedCount , waitingCount},
            success: true,
        })

    } catch (err) {
        // console.log("err in history Contorllers ;- ", err)
        res.status(500).send({
            message: "Network Error ",
            succes: false
        })
    }

}

