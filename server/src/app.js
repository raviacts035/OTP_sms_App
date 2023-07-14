import config from "./config/index.js";
import express from "express";
import twilio from 'twilio';
import asyncHandler from './services/asynchandler.js';
import CustomError from './services/CustomError.js';



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
    // const { to}=req.body;
    const { number}=req.params
    // console.log(number)
    const OTP=Math.floor(1000+Math.random()*9000)
    const body=`
    Dear User,
    Your OTP for ABC bank autherization is : ${OTP} `;

    client.messages
      .create({
        body,
        from: config.SENDER_number,
        to: number,
        statusCallback:`${req.protocol}://${req.get('host')}/delivery/status`
    })
      .then(message => console.log(message.sid))
      .catch(err=>console.log(err))
    console.log(`${req.protocol}://${req.get('host')}/delivery/status`);

    res.status(200).json({
        success: true,
        message:"Message sent sucessfully"
    })
}))

app.all('/delivery/status',asyncHandler(async (req, res)=>{
    const data=req.body;
    if(data?.status==='sent'|| data?.status==='delivered' || data?.status==='received'){
        res.sendStatus(200);
    }
    const OTP=Math.floor(1000+Math.random()*9000)

    await client.calls
    .create({
       url: `https://handler.twilio.com/twiml/EH5b5ecce91fbf4408ae785fdb8049fa16?otp=${OTP}`,
       to: data?.to,
       from: config.SENDER_number,
     })
    console.log(`message not delivered, voice OTP sent`)
    res.sendStatus(200);
}))

app.get('/otp/voice/:number',asyncHandler(async (req, res)=>{
    const { number}=req.params
    const OTP=Math.floor(1000+Math.random()*9000)

    const callResp=await client.calls
    .create({
       url: `https://handler.twilio.com/twiml/EH5b5ecce91fbf4408ae785fdb8049fa16?otp=${OTP}`,
       to: number,
       from: config.SENDER_number,
     })
    // console.log(callResp.sid)

    res.status(200).json({
        success: true,
        message:`Voice OTP sent sucessfully`,
        
    })
}))

export default app