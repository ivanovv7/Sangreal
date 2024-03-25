import { IncomingHttpHeaders } from "http";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { customRequest } from "../authInterfaces";


// if we want to add a new property to the request in this phase we must create new interface that will extend the Request and add that property.
export const validateJWT = async (req:Request,res:Response,next:NextFunction) => {

const headers = req.headers as unknown as IncomingHttpHeaders

const token = headers.authorization


if(!token){
  return  res.status(400).send({message:"Token is required for authentication"})
}

try {
   const payload: JwtPayload | string = jwt.verify(token, process.env.USER_TOKEN!);
    (req as customRequest).user = payload as JwtPayload; // Explicitly cast req to CustomRequest
} catch (error) {
    

return res.status(401).send({message:"Token is invlalid or expired !"})
}

next()


}


export const validateAdmin = async (req:Request,res:Response,next:NextFunction) => {

  const payload = (req as customRequest).user

  console.log("ADMIN CONSOLE>LOG",payload)

  if(payload.permission !== "ADMIN"){

    return res.status(401).send({message:"You do not have permission for this action"})
  }

  next()

}