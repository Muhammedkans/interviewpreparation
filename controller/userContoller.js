require("dotenv").config();

const bcrypt = require("bcryptjs");

const UserModel = require("../models/User2");

const jwt = require("jsonwebtoken");
const generateToken = require("../jwt/jwt");

const JWT_SECRET = process.env.JWT_SECRET;

const rejisterUser =async (req, res) =>{
  console.log("Received data in backend:", req.body);  
  try{
    const {name , email , password} = req.body;

    

    const existingUser =await UserModel.findOne({email})

    if(existingUser){
      throw new Error(" user already logging");
    }


    const newUser =  new UserModel({
      name,
      email,
      password,
    }) 
     await newUser.save();

     const token =  generateToken(newUser._id)

    res.status(201).json({message:"user created succefully"
      ,token,user:{
        id:newUser._id,
        name:newUser.name,
        email:newUser.email,
      }});
  }catch(err){
    console.error(err);
    res.status(404).json({errormessage:"error happening",err});
  }

}


const loginUser = async (req, res)=>{
  try{
      const { email ,password} = req.body;
      const loggedInUser  = await UserModel.findOne({email});

      if(!loggedInUser){
        throw new Error(" no user found");
      }

      const isValid = await loggedInUser.comparePassword(password);

      if(!isValid){
        throw new Error("password not valid ");
      }

    
      const token  = await generateToken(loggedInUser._id);

      if(!token){
        throw new Error(" please loggin");
      }
      
      res.status(201).json({message:" loggin succefull",token,
        
          user:{
            name:loggedInUser.name,
            email:loggedInUser.email,
            id:loggedInUser._id
          }
      });

  }catch(err){
    console.log(err);
    res.status(404).json({errormessage: "error happening",err});
  }
}




const UserAuth = async (req, res ,next)=>{
   
  try{
    const authHeader = req.headers.authorization;
      
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];


    if(!token){
      throw new Error("please login");
    }

    const decoded =  await jwt.verify(token,JWT_SECRET);

    if(!decoded){
      throw new Error("some thing went wrong")
    }

    req.user = decoded;
    next();

  }catch(err){
    console.log(err)
   res.status(404).json({errormessage: "something went wrong",err});
  }
}

const getUser = async (req, res)=>{
  try{
    const user = req.user.id;

    const loggeinUser = await UserModel.findById(user);
  
  if(!loggeinUser){
    throw new Error(" no user found")
  }
  res.json({message: "this is the user" ,user : loggeinUser});

  }catch(err){
    console.error(err)
    res.status(404).json({errmessage: "err happening",err})
  }


}


module.exports = {
  rejisterUser,
  loginUser,
  UserAuth,
  getUser
}