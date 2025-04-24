const express = require("express");
const ProDuctMini = require("../models/ProductMini");



const postMiniProduct = async(req, res)=>{
   try{
    const MiniProduct  =   new ProDuctMini(req.body);
    await MiniProduct.save();
    res.json({message:"new mini product created",MiniProduct})
   }catch(err){
    res.status(404).json({error:"error happeing",err});
   }
  
}


const getMiniProduct = async (req,res)=>{
   try{
     const productMini = await ProDuctMini.find();
     if(!productMini){
      throw new Error("no product found");
     }
     res.json({message:" all products ", productMini})
   }catch(err){
    res.status(500).json({errmessage:"error happening", err})
   }
}


const updateMiniProduct = async(req, res)=>{
  try{
    const productMini = await ProDuctMini.findByIdAndUpdate(req.params.id,req.body)
    if(!productMini){
      throw new Error("no productmini found")
    }
    await productMini.save();
    res.json({message:"update succefully", productMini})
  }catch(err){
    console.error(err.message);
     res.status(501).json({errmessage: " somthing went wrong",err})
  }
 
}




module.exports = {
  postMiniProduct,
  getMiniProduct,
  updateMiniProduct,
}