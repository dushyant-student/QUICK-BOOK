import noticeModel from "../models/noticeModel.js";
import ShopModel from "../models/userShopModel.js";


export const NoticeController = async (req, res) => {
    try {
        const { shopId } = req.params ;
        const { name, email, message ,type ,title ,phone } = req.body;
        if (!name || !email || !type ,!message || !title ||!shopId || !phone ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }
        let shopName = await ShopModel.findOne(
            {shopId:shopId},
            {shopName:1,_id:0}
        )
        shopName = shopName.shopName

        await noticeModel.create({ name, email, type, title, shopId, message, phone, shopName });

        return res.status(201).json({
            success: true,
            message: "Notice Successfully",
         
        });
    } catch (err) {
        console.log("Notice Post Error :-", err);

        return res.status(500).json({
            success: false,
            message: "newWork error ",
        });
    }
};


export const getALlNotices = async (req, res) => {
    try {
        
        const { shopId } = req.params ;
        
        if (!shopId ) {
            return res.status(400).json({
                success: false,
                message: "shopId is reqired",
            });    
        }    
        
        const notice = await noticeModel.find({ shopId:shopId })    
        

        return res.status(201).json({
            success: true,
            message: "Notice Successfully",
            data :notice
         
        });    
    } catch (err) {
        // console.log("Notice Post Error :-", err);

        return res.status(500).json({
            success: false,
            message: "newWork error ",
        });    
    }    
};    






export const getNoticeById = async (req, res) => {
    try {
        const { noticeId } = req.params ;
        
        if (!noticeId ) {
            return res.status(400).json({
                success: false,
                message: "noticeId is reqired",
            });
        }
        
        const notice = await noticeModel.find({  _id:noticeId})
        

        return res.status(201).json({
            success: true,
            message: "Notice Successfully",
            data :notice
         
        });
    } catch (err) {
        // console.log("Notice Post Error :-", err);

        return res.status(500).json({
            success: false,
            message: "newWork error ",
        });
    }
};
