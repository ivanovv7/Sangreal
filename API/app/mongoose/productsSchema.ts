import mongoose from "mongoose"
import { Product, Countries } from "../controller/DTO/productDtos"
// import { Sizes } from "./interfaces" 



const Schema = mongoose.Schema

export const productsSchema = new Schema<Product>({

     productName:{
        required:true,
        type:String,
     },
     size:{
        required: true,
        type:Number
     },
     color:{
        required:true,
        type:String
     },
     origin:{
        type:String,
        required:true,
     },
     deleted:{
       type:Boolean,
       default:false
     },
     deletedAt: {
         type:Date,
         default:null
     },
})


export const productsModel = mongoose.model("product",productsSchema,"cocktails");