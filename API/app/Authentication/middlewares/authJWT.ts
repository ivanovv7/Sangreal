import { IncomingHttpHeaders } from "http";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";



export const validateJWT = async (req:Request,res:Response,next:NextFunction) => {

const headers = req.headers as unknown as IncomingHttpHeaders

const token = headers.authorization

if(!token){
  return  res.status(400).send({message:"Token is required for authentication"})
}

try {
    const payload = jwt.verify(token,"user_token")

} catch (error) {
    

return res.status(401).send({message:"Token is invlalid or expired !"})
}

next()


}