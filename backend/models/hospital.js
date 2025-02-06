import mongoose from "mongoose";

const hospitalSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  password:{
    type:String,
    required:true,
    minlength: [6, 'Password must be at least 6 characters long']
  },
  userType: {
    type: String,
    default: 'hospital', // Default value
  },
  bloodRequests: [
    {
      bloodGroup: { 
        type: String, 
        required: true 
      },
      quantityRequired: { 
        type: Number, 
        required: true 
      },
      requestDate: { 
        type: Date, 
        default: Date.now 
      },
    },
  ],
  phone:{
    type:Number,
    required:true,
    unique:true
  },
  address:
    {
      city:{
        type:String,
        required:true
      },
      state:{
        type:String,
        required:true
      },
      country:{
        type:String,
        required:true
      }
    },
    availability:{
      type:String,
      required:true
    }
})

const Hospital=new mongoose.model("Hospital",hospitalSchema);
export default Hospital;