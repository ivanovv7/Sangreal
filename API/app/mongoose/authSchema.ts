import mongoose, { mongo } from "mongoose";
import { userDB } from "../Authentication/authInterfaces";

const usersSchema = mongoose.Schema

export const userSchema = new usersSchema({

    id:{
        type:String,
        required:true
    },
    username:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String
    },
    permission:{
        
        type:String
    },



})


export const userModel = mongoose.model("users_model",userSchema,"users")

