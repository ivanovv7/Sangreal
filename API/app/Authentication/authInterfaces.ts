import { JwtPayload } from "jsonwebtoken"
import { Request } from "express";

export type credentialsRequest = {

    username:string,
    password:string,
    permission?:string
}

export type userDB = {
    id:string,
    username:string,
    password:string,
    permission?:string | undefined | null
}


export interface customRequest extends Request  {

user:JwtPayload

}