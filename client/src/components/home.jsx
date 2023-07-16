import { useState } from "react";
import config from "../config";

const Home=()=>{
    const [number,setNumber]=useState()
    const [countryCode,setCountryCode]=useState(91)
    const [dialog,setDialog]=useState(false);

    const handleSmsOTP=async (eve, mode)=>{
        eve.preventDefault();
        if (!number || !countryCode) return
        let url='';

        if (mode==='sms'){
            url=config.backend_domain_URL+'/otp/sms/+'+countryCode+number;
        }
        else if (mode==='voice'){
            url=config.backend_domain_URL+'/otp/voice/+'+countryCode+number;
        }
        try{
            var resp=await fetch(url)
            var data=await resp.json()
        }
        catch(error){
            console.log(error.message)
        }

        if (data.success) setDialog(true)
        return
    }


    return (
        <section className="main_cont">
            <div>
                <p className="top_heading">OTP verification</p>
            </div>
                <form className="hero_cont">
                    <p className="text_1">Eneter mobile Number</p>
                    <div className="input_group">
                        <p>+
                            <input className="c_input input_fields" type='text' value={countryCode} onChange={(event)=>{setCountryCode(event.target.value)}} placeholder="country"/>
                            <input className="n_input input_fields" type='text' value={number} onChange={(event)=>{setNumber(event.target.value)}} placeholder="mobile"/>
                        </p>
                    </div>
                    <p className="option_text">send OTP through</p>
                    <div className="btn_grup">
                        <button onClick={(eve)=>{handleSmsOTP(eve,'sms')}}>SMS</button>
                        <button onClick={(eve)=>{handleSmsOTP(eve,'voice')}}>Call</button>
                    </div>
                    {dialog && 
                    <div>
                        <p className="text_2">OTP sent sucessfully to : +{countryCode} {number}</p>
                    </div>
                    }
                </form>
        </section>
    )
}


export default Home