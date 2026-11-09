import mongoose from "mongoose";
import ShopModel from "../models/userShopModel.js";



export const ChangeTiming = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { open, close } = req.body;
    
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid shop ID",
      });
    }

    if (!open || !close) {
      return res.status(400).json({
        success: false,
        message: "Opening and closing time are required",
      });
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(open) || !timeRegex.test(close)) {
      return res.status(400).json({
        success: false,
        message: "Time must be in HH:mm format",
      });
    }

    if (open === close) {
      return res.status(400).json({
        success: false,
        message: "Opening and closing time cannot be the same",
      });
    }

    // Update existing fields or add them if they don't exist.
    const shop = await ShopModel.findOneAndUpdate(
  { shopId: id },
  {
    $set: {
      openTime: open,
      closeTime: close,
    },
  },
  {
    returnDocument: "after",
    runValidators: true,
  }
  );
  
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Shop timing saved successfully",
      data: {
        openTime: shop.openTime,
        closeTime: shop.closeTime,
      },
    });
  } catch (error) {
    console.error("CHANGE TIMING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to save shop timing",
    });
  }
};





export const getShopTiming = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid shop ID",
      });
    }

    const shop = await ShopModel.find({shopId:id}).select(
      "openTime closeTime"
    );
    // console.log("Id incomming",id,shop)
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Shop timing fetched successfully",
      data:shop
    });
  } catch (error) {
    // console.error("GET SHOP TIMING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch shop timing",
    });
  }
};