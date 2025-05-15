const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userauthSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "please provide a name"],
    
  },
  email:{
    type:String,
    required:[true,"please provide an email"],
    unique:true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address!"],
  },
  password:{
    type:String,
    required: [true,"please provide a password"],
    minLength:[6, "please password  must be atleaset 6 character "],
    
  }
});

 


 userauthSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next();
  const salt  = await  bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  next();
 });


 userauthSchema.post("save", function(doc, next) {
  console.log(`New user ${doc.name} saved!`);
  next();
});


 userauthSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
 }

 const UserModel = mongoose.model("UserNew", userauthSchema);
 module.exports = UserModel;