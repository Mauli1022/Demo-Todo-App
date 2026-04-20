import app  from "./app.js";
import { dbConnect } from "./db/index.js";
import dotenv from "dotenv";


dotenv.config({
    path: "./.env"
});
const PORT  = process.env.PORT ?? 6000;

dbConnect()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server is Running: http://localhost:"+PORT);
    });    
})
.catch((error)=>{
    console.error("DB CONNECTION FAILED!!!"+error.message);
    process.exit(1);
});






