import mongoose, { mongo } from "mongoose";

export async function ConnectDB() {

    if(mongoose.connection.readyState >=1){
        console.log("MongoDb is already connected!");
        return
        
    }

    try {

        await mongoose.connect("mongodb+srv://webdevbymazhar:12345@cluster0.ybbhm.mongodb.net/blogapp")
        console.log("MongoDb is connected!");
        

        
    } catch (error) {
        console.log("Error in connectingDB!");
        
    }
    
} 