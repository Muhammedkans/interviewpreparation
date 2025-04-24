require('dotenv').config();

const express = require("express");
const router = require("./controller/router");

const mongoose = require("mongoose");
const connectDB = require("./database/database");
const Product = require("../my-app/models/Product");
const Productrouter = require('./router/productRouter');
const miniProductRouter = require('./router/miniProduct');
const app = express();

app.use(express.json());

const port = process.env.PORT;

app.use("/",router);
app.use("/",Productrouter);
app.use("/",miniProductRouter);




app.use((err, req, res,next) => {
  console.error(err.message);
  res.status(504).send('Page Not Found');
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






