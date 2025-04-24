const mongoose = require("mongoose");




const MONGO_URL = process.env.MONGO_URL

const connectDB = async()=>{
 await  mongoose.connect(MONGO_URL);
}




module.exports=connectDB;