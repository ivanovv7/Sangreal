import { Product, createDTO, updateDTO } from "../controller/DTO/productDtos";
import { productsModel } from "../mongoose/schema";

export class ProductsModel {
  constructor() {}

  async getAllProducts() {
    // Return the products that are not deleted, the query filters out all the products.
    const products = await productsModel.find({deleted:false});

    if(!products){
      throw new Error("No products were found")
    }

    return products;
  }


  // Return the deleted as well
  async getAllAndDeleted (){
    const products = await productsModel.find();
    return products
  }


  async getProductById(productsId: string) {
    const product = await productsModel.findById(productsId);

    if (!product || product.deleted) {
      throw new Error("Product was not found");
    }
    return product;
  }

  async createProduct(product: createDTO) {
    //with the model we create a new object that is about to be saved in the DB
    const newProduct = new productsModel(product);
    console.log("About to be saved", newProduct);

    const response  = await newProduct.save();

    console.log("Response from db", response);

    return response;
  }

  async updateProduct(id: string, product: updateDTO) {
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

  async softDeleteOne(id:string){
    // const deletedProduct =  await productsModel.findOneAndDelete({_id:id});
    const softDeleted = await productsModel.updateOne({_id:id}, {deleted:true, deletedAt:new Date()})
    return softDeleted;
  }



  async hardDeleteCollection (){
   //hard delete only the soft deleted products
  //  const result = await productsModel.deleteMany({deleted:true})


      const result = await productsModel.deleteMany();
      return result
  }


  async sendSSEmessages (){

    const products = await this.getAllProducts()
    console.log("PRODUCTS",products)
  }
}
