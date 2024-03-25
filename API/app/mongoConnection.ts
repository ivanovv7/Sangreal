import mongoose from "mongoose"
import dotenv from "dotenv"
import { userSchema } from "./mongoose/authSchema";
dotenv.config();
export const userModel = mongoose.model("users_model",userSchema,"users")


const MONGO_URL = process.env.MONGO_CONNECTION!

export const mongo_connection = async ():Promise<void> => {

    try {
        
        await mongoose.connect(MONGO_URL,{
            dbName:"sangreal"
        })
         //await userModel.updateMany({permission:"ADMIN"},{$set:{permission:"USER"}}) MIGRATION TEST, SIMPLE EXAMPLE -> WORKS

        console.log("DB CONNECTED")
    } catch (error) {
        console.log("Error with mongoDB connection")
    } 
} 