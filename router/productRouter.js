const express = require("express");
const Product = require("../models/Product");
const Productrouter = express.Router();


const { getproduct,postProduct,updateProduct,deleteProduct,} =require("../controller/productController");

Productrouter.post("/product", postProduct);
Productrouter.get("/product", getproduct)
Productrouter.put("/product/:id",updateProduct);
Productrouter.delete("/product/:id",deleteProduct)


module.exports = Productrouter;