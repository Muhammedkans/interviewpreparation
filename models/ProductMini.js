const mongoose = require("mongoose");


const miniProduct =  new mongoose.Schema({
  name:{
    type: String,
    required:true,
  },
  prize:{
    type: Number,
    required:true,
  
  },
  imageUrl :{
    type:String
  }
})

const ProDuctMini = mongoose.model("ProductMini",miniProduct);

module.exports= ProDuctMini;