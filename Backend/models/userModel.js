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
        imageURL: {
            type: String,
            default: "../image/defaultImage.png"
        },
        passWord:{
            type:String,
            required:true
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
    },
    {
        timestamps: true
    }

)
const userModel = mongoose.model("User", userSchema);
export default userModel;