import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        email: {
            type: String,
            required: true,

        },
        passWord:{
            type:String,
            default: "newuser",
            
        },
        imageURL: {
            type: String,
            default: "../image/defaultImage.png"
        },
        public_id: {
            type: String,

        },
        firebaseUid: {
            type:String,
            required:true
        },
        description: {
            type: String,
            default: "Hi , I Am Here"
        },
        authProvider:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }

)
const fireBaseUserModel = mongoose.model("FireBaseUser", userSchema);
export default fireBaseUserModel;