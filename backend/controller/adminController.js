import hospitalModel from '../models/hospital.js'
import userModel from '../models/donor.js'

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

export {getDonors,getHospitals,deleteDonor,deleteHospital}