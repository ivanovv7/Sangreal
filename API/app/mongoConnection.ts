import mongoose from "mongoose"

const MONGO_URL = "mongodb+srv://ivan:ivan@cluster0.mezuiju.mongodb.net/?retryWrites=true&w=majority"

export const mongo_connection = async ():Promise<void> => {

    try {
        
        await mongoose.connect(MONGO_URL,{
            dbName:"sangreal"
        })

        console.log("DB CONNECTED")
    } catch (error) {
        console.log("Error with mongoDB connection")
    }
}