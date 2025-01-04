import mongoose, { mongo } from "mongoose";

export async function ConnectDB() {

    if(mongoose.connection.readyState >=1){
        console.log("MongoDb is already connected!");
        return
        
    }

    try {

        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb is connected!");
        

        
    } catch (error) {
        console.log("Error in connectingDB!");
        
    }
    
} 