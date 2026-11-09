import express from "express";
import {  allShopData, createShop,  shopData,  ShopOwnerProfile, UpdateMyShop } from "../controllers/createShopControllers.js";
import upload  from "../middleaware/multer.js";
import { protect } from "../middleaware/protect.js";




const createShopRoutes = express.Router();
createShopRoutes.post("/create-shop/:id",protect, upload.single("shopImage"), createShop); //create A new Shop
createShopRoutes.post("/update-shop/:shopId",protect , upload.single("shopImage"),UpdateMyShop) //Update Shop
createShopRoutes.get("/my-shop-data/:id", protect , shopData); //My shop data
createShopRoutes.get("/all-shops", allShopData); //All Shops data 
createShopRoutes.get("/shop-by-id/:id",protect, ShopOwnerProfile) //Shop Proile

export default createShopRoutes ;
