
import ShopModel from "../models/userShopModel.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { saveShopToAlgolia } from "../services/algoliaShopService.js";



export const createShop = async (req, res) => {
    try {
        
        const { id } = req.params;
    
        const { name, email, role, passWord, description, experience, shopName, country, city, address, phoneNo  } = req.body;

        
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "Image is required"
            });
        }


       

        if ( !id || !name || !email || !role || !passWord || !description || !experience || !shopName || !country || !city || !address || !phoneNo) {

            return res.status(400).send({
                message: "All fields are required",
                success: false
            });


        }


        const ExistShop = await ShopModel.find(
            {
                shopId: id
            },
            {
                _id: 1,

            }
        )


        if (ExistShop.length > 0) {

            return res.status(409).send({
                message: "Shop Already Exists!",
                success: false
            });

        }


        // IMAGE UPLOAD
        let shopImage = "";
        let public_id = "";
        let filePath = req.file.path;
        if (filePath) {

            const result = await cloudinary.uploader.upload(filePath);
            public_id = result.public_id;
            shopImage = result.secure_url;

        }
        const hashPassword = await bcrypt.hash(passWord, 10);

        // CREATE SHOP

        const shop = await ShopModel.create({

            name,
            email,
            role,
            passWord:hashPassword,
            description,
            shopName,
            shopId: id,
            experience,
            country,
            city,
            address,
            phoneNo,
            shopImage,
            public_id

        });

        await shop.save();

        try {
        await saveShopToAlgolia(shop);
        } catch (error) {
        // console.error("Algolia sync failed:", error);
        }

        return res.status(200).send({

            message: "Shop Successfully Created",

            success: true,

            data: shop

        });


    } catch (err) {

        // console.log( "err in Create Shop Controller :- ", err );

        return res.status(500).send({

            message: err.message,

            success: false
        });

    }


};





export const UpdateMyShop = async (req, res) => {

    try {
        const { shopId } = req.params;
        const { name, email, role, passWord, description, experience, shopName, country, city, address, phoneNo } = req.body;

        if ( !shopId || !name || !email || !role || !passWord || !description || !experience || !shopName || !country || !city || !address || !phoneNo) {
            return res.status(400).send({
                message: "All fields are required",
                success: false
            });

        }



        const ExistShop = await ShopModel.findOne(
            {
                shopId: shopId
            }
        );
        
    
        if (name) {
            ExistShop.name = name;
        }
        if (email) {
            ExistShop.email = email;
        }
        if (role) {
            ExistShop.role = role;
        }

        if (passWord) {
            const hashPassword = await bcrypt.hash(passWord, 10);
            ExistShop.passWord = hashPassword;
        }
        if (description) {
            ExistShop.description = description;
        }
        if (experience) {
            ExistShop.experience = experience;
        }

        if (shopName) {
            ExistShop.shopName = shopName
        }

        if (country) {
            ExistShop.country = country;
        }

        if (city) {
            ExistShop.city = city;
        }

        if (phoneNo) {
            ExistShop.phoneNo = phoneNo;
        }


        // IMAGE UPLOAD
        if (req.file) {
            await cloudinary.uploader.destroy(ExistShop.public_id);
            const result = await cloudinary.uploader.upload(req.file.path);
            ExistShop.shopImage = result.secure_url;
            ExistShop.public_id = result.public_id;
        }

            const UpdateData = await ExistShop.save();

            try {
                await saveShopToAlgolia(UpdateData);
            } catch (error) {
                // console.error("Algolia sync failed:", error.message);
            }

            return res.status(200).send({

                message: "Shop Successfully Updated",

                success: true,

                data: UpdateData

            });
        

    } catch (err) {

        return res.status(500).send({

            message: err.message,

            success: false

        });


    }

}





export const shopData = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
        return res.status(400).send({
            message: "id is required",
            success: false
        })
    }
    
    const shopData = await ShopModel.find({
        shopId: id,
    }).select("-passWord");
    

    if (!shopData) {
        return res.status(404).send({
            message: "Shop Not Found ",
            success: false
        })
    }

    return res.status(200).send({
        message: "Your Shop Data",
        data: shopData,
        success: true
    })

}




export const allShopData = async (req, res) => {
    try {
       
        const allShops = await ShopModel.find().sort({ createdAt: -1 }).select("-passWord");

        if (!allShops) {
            return res.status(200).send({
                message: "Currently no Shop Avilable ",
                success: false,
                data: []
            })
        }

        return res.status(200).send({
            message: "all Shops Data",
            data: allShops,
            success: true
        })

    } catch (err) {
        // console.log("err in Get allSHop;-", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}


export const ShopOwnerProfile = async (req, res) => {
    
    try {
        const { id } = req.params;
        

        // MongoDB ID Validate
        if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid shop ID",
        });
        }

        const profile = await ShopModel.findOne({
            shopId: id
        }).select("-passWord");

        if (!profile) {
           
            return res.status(404).send({
                message: "User Profile Not Found",
                success: false,
                data: null
            });
        }

        return res.status(200).json({
            message: "User Profile Data",
            success: true,
            data: profile
        });

    } catch (error) {

        // console.log("ERROR:", error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};