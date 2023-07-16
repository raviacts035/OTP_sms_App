import dotenv from 'dotenv';

dotenv.config()

const config={
    PORT:process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL,
    TWILIO_ACCOUNT_SID:process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    SENDER_number: process.env.SENDER_number,
    twiMl_Template_URL: process.env.twiMl_Template_URL,
}

export default config
