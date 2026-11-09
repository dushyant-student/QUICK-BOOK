
import bookingHistoryModel from "../models/ticketHistoryModel.js";
import ticketModel from "../models/ticketModel.js";



export const Ticket = async (req, res) => {
    try {

        const { shopId } = req.params;
        const { subject, method, userId } = req.body;
        const ticketExist = await ticketModel.findOne({
            customerId: userId,
            shopId: shopId
        });


     
        if (ticketExist) {
            return res.status(409).send({
                message: "You Have Already Booked Ticket",
                success: false,
                data: []
            });
        }

        const lastToken = await ticketModel.findOne().sort({ tokenNo: -1 });

        const tokenNo = lastToken
            ? lastToken.tokenNo + 1
            : 1;


        const newTicket = await ticketModel.create(
            {
                customerId: userId,
                shopId: shopId,
                subject: subject,
                method: method,
                status: "Waiting",
                tokenNo: tokenNo
            }
        );

        await bookingHistoryModel.create(
            {
                customerId: userId,
                shopId: shopId,
                subject: subject,
                method: method,
                tokenNo: tokenNo,
                status: "Waiting",
            }
        )



        return res.status(201).send({
            message: "Successfully Booked",
            data: newTicket,
            success: true
        });

    } catch (error) {

        // console.log("Booking Error:", error);

        return res.status(500).send({
            message: "Internal Server Error",
            success: false
        });
    }
};




export const MyTickets = async (req, res) => {
    
    try {
         
    
        const { userId } = req.params;


        if (!userId) {
            return res.status(400).send({
                message: "Required User Id ",
                success: false,
                data: []
            })
        }


        const myTick = await ticketModel.find({
            customerId: userId
        }).sort({ createdAt: -1 }).populate("customerId", "name email")



        if (!myTick) {
            return res.send(404).send({
                message: "You Have No Tickets",
                success: false,
                data: []
            })
        }

        return res.status(200).send({
            message: "Your All Tickets",
            success: true,
            data: myTick
        })

    } catch (err) {
        // console.log("err in Mytick contolller;- ", err)
    }

}



export const deleteTicket = async (req, res) => {
    try {
        const { customerId } = req.params;

        const ticket = await ticketModel.findOneAndDelete(
            {
                customerId: customerId
            }
        );


        const historyUpdate = await bookingHistoryModel.findOne(
            {
                customerId: ticket.customerId,
                shopId: ticket.shopId,

            }
        )

        historyUpdate.status = "Cancel"
        historyUpdate.save();


        if (!ticket) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Ticket not found"
                }
            );
        }


        return res.status(200).json(
            {
                success: true,
                message: "Ticket cancelled successfully",
                data: ticket
            }
        );

    } catch (error) {
        // console.log("Cancel ticket error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};




export const MyCustomers = async (req, res) => {

    try {
        
        const { userId } = req.params;

        const myId = userId;
        if (!userId) {
            return res.status(400).send({
                message: "Required User Id ",
                success: false,
                data: []
            })
        }


        const Customers = await ticketModel.find({
            shopId: myId
        }).sort({ createdAt: 1 })
            .populate("customerId", "name email imageURL")



        if (!Customers) {
            return res.send(404).send({
                message: "You Have No Coustomer Now",
                success: false,
                data: []
            })
        }

        return res.status(200).send({
            message: "Your All Customers",
            success: true,
            data: Customers
        })

    } catch (err) {
        // console.log("err in Mytick contolller;- ", err)
    }

}



export const deleteCustomer = async (req, res) => {
    try {
        const { customerId, shopId } = req.body;

        const ticket = await ticketModel.findOneAndDelete({
            shopId: shopId,
            customerId: customerId,
        });

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        const historyUpdate = await bookingHistoryModel.findOne({
            customerId: ticket.customerId,
            shopId: ticket.shopId,
        })

        historyUpdate.status = "Rejected"
        await historyUpdate.save();


        return res.status(200).json({
            success: true,
            message: "Ticket Removed successfully",

        });

    } catch (error) {
        // console.log("Cancel ticket error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};




export const confirmCustomer = async (req, res) => {
    try {
        const { customerId, shopId } = req.body;

        const ticket = await ticketModel.findOneAndDelete(
            {
                shopId: shopId,
                customerId: customerId,
            }
        );

        if (!ticket) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Ticket not found"
                }
            );
        }

        const historyUpdate = await bookingHistoryModel.findOne(
            {
                customerId: ticket.customerId,
                shopId: ticket.shopId,
            }
        )

        historyUpdate.status = "Completed"
        await historyUpdate.save();


        return res.status(200).json(
            {
                success: true,
                message: "Ticket confirmed successfully",

            }
        );

    } catch (error) {
        // console.log("Cancel ticket error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};





