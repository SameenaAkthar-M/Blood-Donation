import hospitalModel from '../models/hospital.js'
import userModel from '../models/donor.js'
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

const getDonors=async (req,res)=>{
  try{
    const donors=await userModel.find();
    res.json({ success: true, data: donors });
  } catch(error){
    res.json({ message: 'Error fetching donors', error: error.message})
  }
}

const getHospitals=async (req,res)=>{
  try{
    const hospitals=await hospitalModel.find();
    res.json({ success: true, data: hospitals });
  } catch(error){
    res.json({ message: 'Error fetching hospital', error: error.message})
  }
}

const deleteDonor=async(req,res)=>{
  try{
    const donorId=req.params.id;
    await userModel.findByIdAndDelete(donorId);
    res.json({ success: true, message: "Donor deleted successfully" });
  } catch(error){
    res.json({ success: false, message: "Error deleting donor", error: error.message });
  }
}

const deleteHospital=async(req,res)=>{
  try{
    const hospitalId=req.params.id;
    await hospitalModel.findByIdAndDelete(hospitalId);
    res.json({ success: true, message: "Hospital deleted successfully" });
  } catch(error){
    res.json({ success: false, message: "Error deleting hospital", error: error.message });
  }
}

const updateDonor=async(req,res)=>{
  try{
    const donorId = req.params.id;
    const updatedDonor = await userModel.findByIdAndUpdate(
      donorId,
      { 
        name: req.body.name,
        bloodGroup: req.body.bloodGroup,
        phone: req.body.phone,
        availability: req.body.availability,
        address: { state: req.body.state, city: req.body.city } // Ensure correct format
      },
      { new: true } // Return updated donor
    );
    if (updatedDonor) {
      res.json({ success: true, message: "Donor updated successfully", data: updatedDonor });
    } else {
      res.json({ success: false, message: "Donor not found" });
    }
  } catch(error){
    res.json({success:false, message: "Error updating donor", error: error.message})
  }
}

const updateHospital=async(req,res)=>{
  try{
    const hospitalId=req.params.id;
    const updatedHospital=await hospitalModel.findByIdAndUpdate(
      hospitalId,
      {
        name:req.body.name,
        phone: req.body.phone,
        availability: req.body.availability,
        address: { state: req.body.state, city: req.body.city }
      },
      { new: true }
    )
    if (updatedHospital) {
      res.json({ success: true, message: "Hospital updated successfully", data: updatedHospital });
    } else {
      res.json({ success: false, message: "Hospital not found" });
    }
  } catch(error){
    res.json({success:false, message: "Error updating hospital", error: error.message})
  }
}

const addDonor = async (req, res) => {
    const {userType, ...donor}=req.body;

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
      if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter valid email"})
      }
      if(password.length<8){
        return res.json({success:false,message:"Please enter strong password"});
      }
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
    }catch(error){
      console.log(error);
        res.json({success:false,message:"There is an error"});
    }
};


const addHospital=async(req,res)=>{
  const {userType, ...hospital}=req.body;
  const {
    name,
    email,
    password,
    phone,
    address,
    availability
  }=hospital;

  const exist=await hospitalModel.findOne({email});
  if(exist){
    return res.json({
      success:false,
      message: "Hospital already exists"
    });
  }

  if(!validator.isEmail(email)){
    return res.json({
      success:false,
      message:"Invalid Email format"
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
    address,
    availability:availability
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

export {getDonors,getHospitals,deleteDonor,deleteHospital,updateDonor,updateHospital,addDonor,addHospital}