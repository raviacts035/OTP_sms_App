import config from "./config/index.js";
import express from "express";
import twilio from 'twilio';
import asyncHandler from './services/asynchandler.js';
import CustomError from './services/CustomError.js';
import mongoose from "mongoose";
import OTPModel from './models/OtpSchema.js';




const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


app.get('/',asyncHandler(async (_req,res)=>{
    return res.status(200).json({
        success: true,
        message: "Hello welcome to OTP Sender app"
    })
}))

app.get('/otp/sms/:number',asyncHandler(async (req,res)=>{
    const { number}=req.params
    const OTP=Math.floor(1000+Math.random()*9000).toString()
    const body=`
    Dear User,
    Your OTP for ABC bank autherization is : ${OTP} `;
    
    await client.messages
    .create({
        body,
        from: config.SENDER_number,
        to: number,
        statusCallback:`${req.protocol}://${req.get('host')}/delivery/status`
    })
    const newOTP=await OTPModel.create({
        number,
        OTP
    })
    if (!newOTP){
        throw new CustomError('OTP sent, some DataBase error')
    }

    res.status(200).json({
        success: true,
        message:"Message sent sucessfully"
    })
}))

app.all('/delivery/status',asyncHandler(async (req, res)=>{
    const data=req.body;
    if(data?.MessageStatus==='sent'|| data?.MessageStatus==='delivered' || data?.MessageStatus==='received'){
        return res.sendStatus(200);
    }
    const OTP=Math.floor(1000+Math.random()*9000)

    await client.calls
    .create({
       url: `${config.twiMl_Template_URL}?otp=${OTP}`,
       to: data?.To,
       from: config.SENDER_number,
     })
    res.sendStatus(200);
}))

app.get('/otp/voice/:number',asyncHandler(async (req, res)=>{
    const { number}=req.params
    const OTP=Math.floor(1000+Math.random()*9000)

    const callResp=await client.calls
    .create({
       url: `${config.twiMl_Template_URL}?otp=${OTP.toString()}`,
       to: number,
       from: config.SENDER_number,
     })
    // console.log(callResp.sid)

    const newOTP=await OTPModel.create({
        number,
        OTP
    })
    if (!newOTP){
        throw new CustomError('OTP sent, some DataBase error')
    }
    res.status(200).json({
        success: true,
        message:`Voice OTP sent sucessfully`,
        
    })
}))

export default app