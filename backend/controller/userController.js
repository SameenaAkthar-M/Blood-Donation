import userModel from '../models/donor.js'
import hospitalModel from '../models/hospital.js'
import adminModel from '../models/admin.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Token creation
const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET, { expiresIn: "1d" })
}

const validateAge=(dob)=>{
  const today=new Date();
  const birthDate=new Date(dob);
  const age=today.getFullYear()-birthDate.getFullYear();
  const monthDifference=today.getMonth()-birthDate.getMonth();
  if(age<18 || (age===18 && monthDifference<0) || (age===18 && monthDifference===0 && today.getDate()<birthDate.getDate())){
    return false;
  }
  return true;
}

// User login
const loginUser=async (req,res)=>{
  const {email,password}=req.body;
  try{
    const user=await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"User does not exist"});
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.json({
        success:false,
        message:"Invalid credentials"
      })
    }
    const token=createToken(user._id);
    res.json({success:true,token})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

// Register user
const registerUser=async(req,res)=>{
  console.log("Received registration request:", req.body);
  try{
    const {userType, ...formData}=req.body;
    if(userType==="donor"){
      try{
        const { name, dob, email, password, bloodGroup, phone, address, availability } = req.body;

      if (!address || !address.city || !address.state || !address.country) {
        return res.status(400).json({ message: "Address fields are required!" });
      }

      const exist=await userModel.findOne({email});
      if(exist){
        return res.json({success:false,message:"User already exist"})
      }
      if(!validateAge(dob)){
        return res.json({success:false,message:"You must be at least 18 years old to register."});
      }

      // Validating email format and strong password
      if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter valid email"})
      }
      if(password.length<8){
        return res.json({success:false,message:"Please enter strong password"});
      }

      // Encrypt the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new userModel({
          name,
          dob,
          email,
          password:hashedPassword,
          bloodGroup,
          phone,
          address,
          availability:availability
        })
        const user=await newUser.save();
        const token=createToken(user._id);

        res.json({success:true,message:"User registered successfully",token});
      }
      catch(error){
        console.log(error);
        res.json({success:false,message:"There is an error"});
      }
    }
    else if(userType==="hospital"){
      const {
        name,
        email,
        password,
        phone,
        address
      }=formData;

      const exist=await hospitalModel.findOne({email});
      if(exist){
        return res.json({
          success:false,
          message: "Hospital already exists"
        });
      }

      if(!validator.isEmail(email)){
        return res.json({
          success: false,
          message: "Invalid email format"
        })
      }
      if(password.length<8){
        return res.json({success:false,message:"Please enter strong password"});
      }

      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);

      const newHospital=new hospitalModel({
        name,
        email,
        password:hashedPassword,
        phone,
        address
      })
      try {
        const hospital = await newHospital.save();
        const token = createToken(hospital._id, "hospital");
        return res.json({ success: true, message: "Hospital registered successfully", token });
      } catch (error) {
        console.error("Error saving hospital:", error);
        return res.status(500).json({ success: false, message: "Error saving hospital", error: error.message });
      }
    }
    else if (userType === "admin") {
      const { email, password } = formData;
      const exist=await adminModel.findOne({email});
      if(exist){
        return res.json({
          success:false,
          message: "Admin already exists"
        });
      }
      if(!validator.isEmail(email)){
        return res.json({
          success: false,
          message: "Invalid email format"
        })
      }
      if(password.length<8){
        return res.json({success:false,message:"Please enter strong password"});
      }
      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);

      const newAdmin=new adminModel({
        email,
        password:hashedPassword
      })
      const admin = await newAdmin.save();
      const token = createToken(admin._id, "admin");

      return res.json({ 
        success: true,
        message: "Admin registered successfully", token 
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export {loginUser,registerUser}