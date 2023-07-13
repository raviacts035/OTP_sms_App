import config from "./config/index.js";
import express from "express";
import twilio from 'twilio';



const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// function sendSms(){
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const client = require('twilio')(accountSid, authToken);

    // client.messages
    //   .create({body: 'Hi there', from: '+15017122661', to: '+919100184635'})
    //   .then(message => console.log(message.sid));
// }

app.get('/',(_req,res)=>{
    return res.status(200).json({
        success: true,
        message: "Hello welcome to OTP Sender app"
    })
})

app.post('/send/otp',(req,res)=>{
    const { to}=req.body;
    const accountSid = config.TWILIO_ACCOUNT_SID;
    const authToken = config.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    const OTP=Math.floor(1000+Math.random()*9000)
    const body=`
    Dear User,

    Your OTP for ABC bank autherization is : ${OTP} `

    client.messages
      .create({body, from: config.SENDER_number, to})
      .then(message => console.log(message.sid))
      .catch(err=>console.log(err))

    res.status(200).json({
        success: true,
        message:"Message sent sucessfully"
    })
})

export default app