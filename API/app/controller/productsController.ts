import { error } from "console";
import { ProductsModel } from "../models/productsModel";
import { Request, Response } from "express";
import { Product, createDTO, updateDTO } from "./DTO/productDtos";

export class ProductsController {
  productsModel: ProductsModel;
  constructor() {
    this.productsModel = new ProductsModel();
  }
  

  async getAllProducts(_req: Request, res: Response) {

    try {
      let products = await this.productsModel.getAllProducts(); 

      res.status(200).send(products)
    
    } catch (error) {

      const err = error as Error;

      res.status(404).send({message:"Products were not found", reason:`${err.message}`})
      
    }    
   
  }

  async getAllAndDeleted(_req: Request, res: Response) {
    try {
      const products = await this.productsModel.getAllAndDeleted();
      res.status(200).send(products);
    } catch (error) {
      const err = error as Error;
      res.status(400).send({ reason: err.message });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await this.productsModel.getProductById(req.params.id);

      res.status(200).send(product);
    } catch (error) {
      console.log(error);

      res
        .status(404)
        .send({ message: `Product with ${req.params.id} was not found` });
    }
  }

  async createProduct(req: Request, res: Response) {
    console.log(req.body);
    try {
      const { productName, size, color, origin } = req.body;

      const product: createDTO = {
        productName: productName,
        size: size,
        color: color,
        origin: origin,
      };

      const newProduct = await this.productsModel.createProduct(product);

      res.status(201).send({
        message: `New product was created with id: ${newProduct.id} `,
        newProduct,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).send({
        message: "Failed to create new product",
        reason: `${err.message}`,
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { productName, size, color, origin } = req.body;

      const product: updateDTO = {
        productName: productName,
        size: size,
        color: color,
        origin: origin,
      };

     let result:Product | null = await this.productsModel.updateProduct(id, product);

      res.status(202).send({ message: `Product with id: ${id} was updated`, updatedProduct:result });
    } catch (error) {
      const err = error as Error;
      res
        .status(400)
        .send({ message: `Product was not updated`, reason: `${err.message}` });
    }
  }

  async softDeleteOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.productsModel.softDeleteOne(id);
      res.status(200).send({
        message: `Product with id: ${id} was deleted`
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).send({ reason: err.message });
    }
  }


  async hardDeleteCollection (req:Request, res:Response):Promise<void> {

    try {
      const result = await this.productsModel.hardDeleteCollection();

      console.log("Result from deletion ", result);

      res.status(204).send({message:"Collection deleted!", result:result})
    } catch (error) {
      const err = error as Error;
      
      res.status(400).send({message:"Collection was not deleted", reason: `${err.message}`})
    }
  }


  async sendSSEmessages(req:Request, res:Response){

    try {
      const products = await  this.productsModel.getAllProducts();

      const data = JSON.stringify(products);

      res.write(`data: ${data}\n\n`)

    } 
    catch (error) {
      console.log('Error writeing SSE message:', error);

      const err = error as Error;
      res.write(`data: Error: ${err.message}\n\n`);
    }
  }
}
