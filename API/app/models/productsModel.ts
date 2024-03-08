import { HydratedDocument } from "mongoose";
import { Product, createDTO, updateDTO } from "../controller/DTO/productDtos";
import {  productsModel,productsSchema } from "../mongoose/schema";

export class ProductsModel {
  constructor() {}

 

  async getAllProducts():Promise<Product[]> {
    // Return the products that are not deleted, the query filters out all the products.
    const products = await productsModel.find({deleted:false});
    if(!products){
      throw new Error("No products were found")
    }

    return products;
  }


  // Return the deleted as well
  async getAllAndDeleted ():Promise<Product[]>{
    const products = await productsModel.find();
    return products
  }


  async getProductById(productsId: string):Promise<Product> {
    const product = await productsModel.findById(productsId);

    if (!product || product.deleted) {
      throw new Error("Product was not found");
    }
    return product;
  }

  async createProduct(product: createDTO):Promise<Product> {
    //with the model we create a new object that is about to be saved in the DB
    const newProduct = new productsModel(product);
    console.log("About to be saved", newProduct);

    const response  = await newProduct.save();

    console.log("Response from db", response);

    return response;
  }

  // findByIdAndUpdate can pottentially return NULL, this is why we have to write Product| null.
  async updateProduct(id: string, product: updateDTO):Promise<Product | null> {
    const productFound = await this.getProductById(id);
   const result:Product | null = await productsModel.findByIdAndUpdate(id,
      {
        productName: product.productName || productFound.productName,
        size: product.size || productFound.size,
        color: product.color || productFound.color,
        origin: product.origin || productFound.origin,
      }
    );

    return result
  }

  async softDeleteOne(id:string):Promise<void>{
    // const deletedProduct =  await productsModel.findOneAndDelete({_id:id});
     await productsModel.updateOne({_id:id}, {deleted:true, deletedAt:new Date()})

  }



  async hardDeleteCollection (){
   //hard delete only the soft deleted products
  //  const result = await productsModel.deleteMany({deleted:true})

  //Delete everything, like drop collection
  productsModel.deleteMany();
  }

  async sendSSEmessages ():Promise<void>{
    const products = await this.getAllProducts()
    console.log("PRODUCTS",products)
  }
}
