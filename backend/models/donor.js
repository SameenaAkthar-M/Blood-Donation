import mongoose from 'mongoose'

const donorSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  dob:{
    type:Date,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password:{
    type:String,
    required:true,
    minlength: [6, 'Password must be at least 6 characters long']
  },
  bloodGroup:{
    type:String,
    required:true
  },
  donations:[
    {
      date:{
        type:String,
        required:true
      }
    }
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
      },
    },
  availability:{
    type:String,
    required:true
  }
});

const Donor=new mongoose.model("Donor",donorSchema);
export default Donor;