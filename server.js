require('dotenv').config();

const express = require("express");
const router = require("./controller/router");

const mongoose = require("mongoose");
const connectDB = require("./database/database");
const Product = require("../my-app/models/Product");
const Productrouter = require('./router/productRouter');
const miniProductRouter = require('./router/miniProduct');
const userRouter = require('./router/userRouter');
const app = express();
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const port = process.env.PORT;


app.use("/",router);
app.use("/",Productrouter);
app.use("/",miniProductRouter);
app.use("/",userRouter);



app.use((err, req, res,next) => {
  ;
  console.error("Global Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
  
});




connectDB().then(()=>{
  console.log(" database connection established")
  app.listen(port,()=>{
    console.log("listning on port listening 7777");
   });
})
.catch((err)=>{
console.error( "database connection fail" ,err.message);
})






