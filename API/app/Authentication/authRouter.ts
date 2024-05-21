import {Router} from "express"
import { Request,Response } from "express";
import { credentialsRequest, userDB } from "./authInterfaces";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { userModel } from "../mongoose/authSchema";
import { getUserByUsername } from "./usersService";
import { generateToken } from "../Services/signJWT";
import { validateJWT } from "./middlewares/authJWT";



export const authRouter:Router = Router();



authRouter.post("/register", async (req:Request<[],[],credentialsRequest>,res:Response) => {

    const {username, password, permission} = req.body

    const foundUser:userDB|null  = await getUserByUsername(username);

    if(foundUser) {
      return res.status(403).send({message:"This E-mail adress is allready registered"})
    }

    if(!username || !password){
     
        return res.status(400).send({message:"Username or password invalid, try again!"})
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user:userDB = {
        id:uuid(),
        username:username,
        password:hashedPassword,
        permission: permission || "USER"
    }

     const newUser = new userModel(user);
     const response = await newUser.save()

     res.status(201).send({message:`User with id:${response.id} was created`})
})

authRouter.post("/login", async(req:Request<[],[],credentialsRequest>,res:Response) => {

    const {username, password} = req.body;
    if(!username || !password){
     
        return res.status(401).send({message:"Username or password invalid, try again!"})
    }

   const foundUser:userDB|null = await getUserByUsername(username);
   if(!foundUser){

     return res.status(401).send({message:"Username or password invalid, try again!"})

   }
    const isLoggedIn:boolean = await bcrypt.compare(password,foundUser.password)
      if(!isLoggedIn){
       return res.status(401).send({message:"Your password is invalid! Try again"})
      }

        
        const accessToken = generateToken(foundUser)

        res.status(200).send({message:"You are logged in!", token:accessToken, username:username})

   
})

authRouter.get("/validateToken", validateJWT,async (req:Request, res:Response) => {
  res.status(200).send({message:"valid"})
})

