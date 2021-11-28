import Product from "../models/Product"
import mongoose from "mongoose"
import main from "./dbConnection"


export const  getById = async (id) => {
    try {
       if(mongoose.connection.readyState == 0){
           await main()
       }
        let product=  await Product.findOne({materialID: parseInt(id)})
        return product
    } catch (error) {
        console.log(error);
        return {}
    }
}
export const  getByDescription = async (search) => {
    try {
       if(mongoose.connection.readyState == 0){
           await main()
       }
       let pattern =/[^a-z0-9 ]+/g
       search = search.replace(pattern,"")
       let products=  await Product.
            find({ description: { $regex: `${search}`, $options: 'sig' } } ).
            limit(100)

        // console.log(product);
        // console.log(search);
        return products
    } catch (error) {
        console.log(error);
        return {}
    }
}
