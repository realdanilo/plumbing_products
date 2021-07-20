import Product from "../models/Product"
import mongoose from "mongoose"
import main from "./dbConnection"
 export const  getById = async (id) => {
    try {
       if(mongoose.connection.readyState == 0){
           await main()
       }
        let product=  await Product.findOne({materialID: id})
        return product
    } catch (error) {
        console.log(error);
    }
   
}
