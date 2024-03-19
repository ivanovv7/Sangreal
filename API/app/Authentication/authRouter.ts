import {Router} from "express"
import { Request,Response } from "express";
import { credentialsRequest, userDB } from "./authInterfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { userModel } from "../mongoose/authSchema";
import { getUserByUsername } from "./usersService";



export const authRouter:Router = Router();



authRouter.post("/register", async (req:Request<[],[],credentialsRequest>,res:Response) => {

    const {username, password} = req.body

    if(!username || !password){
     
        return res.status(400).send({message:"Username or password invalid, try again!"})
    }

    const hashedPassword =await bcrypt.hash(password,10);

    const user:userDB = {
        id:uuid(),
        username:username,
        password:hashedPassword
    }

     const newUser = new userModel(user);
     const response = await newUser.save()

     res.status(201).send({message:`User with id:${response.id} was created`})
})

authRouter.post("/login", async(req:Request<[],[],credentialsRequest>,res:Response) => {

    const {username, password} = req.body;
    if(!username || !password){
     
        return res.status(400).send({message:"Username or password invalid, try again!"})
    }

   const foundUser:userDB|null = await getUserByUsername(username);
   if(foundUser){
    const isLoggedIn:boolean = await bcrypt.compare(password,foundUser.password)
      if(isLoggedIn){
        
        const accessToken = jwt.sign({username:username},"user_token",{expiresIn:"25s"})

        res.status(200).send({message:"You are logged in!", token:accessToken})
      }else{
        res.status(401).send({message:"Your password is invalid! Try again"})
      }
   }else{
    return res.status(400).send({message:"Username or password invalid, try again!"})
   }


})

