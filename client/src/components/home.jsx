import { useState } from "react"

const Home=()=>{
    const [number,setNumber]=useState()
    const [countryCode,setCountryCode]=useState(91)
    const [dialog,setDialog]=useState(false);

    const handleSmsOTP=async (eve, mode)=>{
        eve.preventDefault();
        if (!number || !countryCode) return
        let url=''
        if (mode==='sms'){
            url='http://127.0.0.1:5000'+'/otp/sms/+'+countryCode+number;
        }
        else if (mode==='voice'){
            url='http://127.0.0.1:5000'+'/otp/voice/+'+countryCode+number;
        }
        var resp=await fetch(url)
        var data=await resp.json()
        console.log(data)
        if (data.success) setDialog(true)
        return
    }


    return (
        <section>
        <div>
            <p>OTP verification</p>
        </div>
        <div>
            <form>
                <div>
                    <p>Country code</p>
                    <input type='text' value={countryCode} onChange={(event)=>{setCountryCode(event.target.value)}} placeholder="country"/>
                </div>
                <div>
                    <p>Eneter mobile Number</p>
                    <input type='text' value={number} onChange={(event)=>{setNumber(event.target.value)}} placeholder="mobile"/>
                </div>
                <div>
                    <button onClick={(eve)=>{handleSmsOTP(eve,'sms')}}>send SMS</button>
                    <button onClick={(eve)=>{handleSmsOTP(eve,'voice')}}>send Voice</button>
                </div>
                {dialog && 
                <div>
                    <p>OTP sent sucessfully to : +{countryCode} {number}</p>
                </div>
                }
            </form>
        </div>
        </section>
    )
}


export default Home