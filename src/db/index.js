import mongoose from "mongoose";


export async function dbConnect(){
    const url = process.env.DB_URL;
    const db_name = process.env.DB_NAME;

    try {
        const connectionInstance = await mongoose.connect(`${url}/${db_name}`);
        console.log("Database Connection Successfull"+connectionInstance.connection.host);
        return connectionInstance; 
        
    } catch (error) {
        console.error("Something Went Wrong While Connectino to Database:"+error.message);
        throw error
    }
}