import mongoose from "mongoose";

const adminSchema=mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], 
  },
  password:{
    type:String,
    required:true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  userType:{
    type:String,
    default:'admin'
  }
})

const Admin=new mongoose.model("Admin",adminSchema);
export default Admin;