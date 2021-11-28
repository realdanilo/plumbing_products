import mongoose from 'mongoose';
import Product from "../models/Product"

async function main(){
  try{
    await mongoose.connect(process.env.MONGO_URL_STRING_CONNECTION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      // const resp = {
      //   materialID: "12345678",
      //   description:"this is a test"
      // }
      // const r = await Product.create(resp)
      // console.log(r);
      
  }catch(e){
    console.log(e);
  }
}



export default main