import mongoose from "mongoose";
import app from './src/app.js';
import config from "./src/config/index.js"


(async ()=>{
    try{
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB cconnected !")

        //for some error handling from db side
        app.on("error",(superman)=>{
            console.error('ERROR',superman);
            throw superman
        })

        function onListening(){
            console.log("Started Listening, port "+config.PORT)
        }
        app.listen(config.PORT,onListening);
    }
    catch(superman){
        console.error("ERROR", superman)
        throw superman
    }
})()