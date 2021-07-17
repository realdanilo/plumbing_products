import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    materialId: String,
    description:String,
});


let Product = mongoose.models.Product || mongoose.model("Product",productSchema);
export default Product