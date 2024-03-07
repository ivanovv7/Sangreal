import { NextFunction } from "express"
import { Request, Response } from "express";


export const validateCreateDto = (req:Request, res:Response, next:NextFunction ) => {

    const { productName, size, color, origin } =  req.body;
    
    if(!productName || !size || !color ||!origin){

       return res.status(422).send({message:"You have send a invalid request, please send all properties to create a new product"})
    };

    next();
        
}


export const validateUpdateDto = (req:Request, res:Response, next:NextFunction ) => {

    const { productName, size, color, origin } =  req.body;

    if(!productName && !size && !color &&!origin){

       return res.status(422).send({message:"You have send a invalid request, please send at least one property to update an existing product"})
    };

    next();
        
}

    

