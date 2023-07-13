import { useState } from "react"

const Home=()=>{
    const [number,setNumber]=useState()

const handleSubmit=(eve)=>{
    eve.preventDefault();
    console.log(number)
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
                    <input type="+91" value={+91}/>
                </div>
                <div>
                    <p>Eneter mobile Number</p>
                    <input type='number' value={number} onChange={(event)=>{setNumber(event.target.value)}} placeholder="mobile"/>
                </div>
                <div>
                    <button onClick={(eve)=>{handleSubmit(eve)}}>send OTP</button>
                </div>
            </form>
        </div>
        </section>
    )
}


export default Home