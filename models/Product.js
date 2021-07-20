import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    materialID: String,
    description:String,
    imageURL:String,
    sizingURL:String,
    categoryName: String,
    subCategory: String
});


let Product = mongoose.model("Product",productSchema) || mongoose.models.Product;
export default Product