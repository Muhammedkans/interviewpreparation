const express = require("express");
const  mongoose = require("mongoose");
const path =require("path");
const User = require("../models/User");



//Cruid Application Create
exports.postproduct = async (req, res)=>{
 
    const user =  new User(req.body);
    await user.save()

   res.status(201).json({message: "create a new user ", user});
   
};


exports.getproduct = async (req, res)=>{
  try {

   const user = await  User.findOne({id:req.params.id});

   if(!user){
    throw new error(" user is not insid DAata base");
   }

   res.status(201).json({message:" find the existing user ", user}); 
 
  }catch(err){
    console.error(err);
   res.status(404).json({ message: 'User not found' });
  }



};


exports.putproduct = async (req, res)=>{
     const user = await User.findOneAndUpdate({id:req.params.id},req.body)

    if(!user){
      return res.status(404).send("error happening");
    }
     await user.save();
    res.json({message : "updated a user ",user});
}

exports.deleteproduct = async (req, res)=>{
   

  const user = await User.findOneAndDelete({id:req.params.id})
   
  if(!user){
    throw new Error("not find a user")
  }
  user.save();
  res.json({meassage:"user deleteed succefully",user});
  
}

