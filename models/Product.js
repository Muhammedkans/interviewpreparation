const mongoose = require("mongoose");

const  productSchema = new mongoose.Schema({
  id:{type:String},
  name:{type :String, required:true},
  price:{type:Number, required:true},
  description:{type:String},
  catergory:{type : String}

},{timestamps:true})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;