import mongoose from "mongoose";

//func to connect to mongo
export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=>{
            console.log("Database Connected")
        })  //for knowing if db is connected

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "chat-app",
    });
    } catch (error) {
        console.log(error);
    }
}