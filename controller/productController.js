const express = require("express");

const Product = require("../models/Product")

const postProduct = async (req, res)=>{
 try{
    const product =   new Product(req.body);
    await product.save();
    res.json({message: "new product save "});
    }catch(err){
     res.status(500).json({message: "error happening in this product rute",err});
    }
}

const getproduct = async (req, res)=>{
 try{
    const product = await Product.find({});
    if(!product){
      throw new Error("Product not Found");
    }
    res.json({product});
  }catch(err){
    res.status(403).json({err});
  }
}


  const updateProduct = async (req, res)=>{
    try{
  
      const product = await Product.findByIdAndUpdate(req.params.id,req.body);
       
      if(!product){
        throw new Error("product not find")
      }
      await product.save();
    
      res.json({message:"updated products",product});
    
     }catch(err){
      res.status(404).json({errormessage: "error", err});
     }
  }


  const deleteProduct = async (req, res)=>{
    try{
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if(!product){
      throw new Error("product no find");
    }
    product.save();
    res.json({message: "deleted succuffully"})
    }catch(err){
    res.status(404).json({message:"failed deleted"});
    }
  }


  module.exports = {
    postProduct,
    getproduct,
    updateProduct,
    deleteProduct,
  }

