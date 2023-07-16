import mongoose from "mongoose";

const OtpSchema =mongoose.Schema({
    number:{
        type:String,
        required:true
    },
    OTP:{
        type:Number,
        required:true
    }
}, {timestamps:true})

export default mongoose.model('OTPModel',OtpSchema)