import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import useLocationData from '../../hooks/useLocationData';
import './adddonor.css'

const Adddonor = ({url}) => {
  const {
    countryNames,
    countryCodes,
    states,
    city,
    handleCountryChange,
    handleStateChange,
  } = useLocationData();
  const [donor,setDonor]=useState({
    userType:'donor',
    name: '',
    dob:'',
    email: '',
    password: '',
    bloodGroup: '',
    phone:'',
    address: {
      city: '',
      state: '',
      country: '',
    },
    availability: 'available'
  })
  const navigate=useNavigate();

  const handleChange=(e)=>{
    const {name,value}=e.target;
    
    if(name.includes('address.')){
      const addressField = name.split(".")[1];
      setDonor((prev)=>({
      ...prev,
      address: {
        ...prev.address,
        [addressField]: value
      }
    }));
    }
    else{
      setDonor((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      let filteredFormData;
      filteredFormData={
        userType:'donor',
        name: donor.name,
        dob: donor.dob,
        email: donor.email,
        password: donor.password,
        bloodGroup: donor.bloodGroup,
        phone: donor.phone,
        address: donor.address,
        availability: donor.availability,
      }
      const res=await axios.post(`${url}/api/admin/admin-donors`,filteredFormData);
      if(res.data.success){
        toast.success("Donor added successfully!");
        navigate('/admin-donors');
        setDonor({
          name: "",
          dob:"",
          email: "",
          password: "",
          bloodGroup: "",
          phone: "",
          address: { city: '', state: '', country: '' },
          availability: 'available',
        });
      }
      else{
        toast.error(res.data.message);
      }
    }catch (error) {
      toast.error('Error adding donor');
      console.error(error);
    }
  }


  const handleCountryChangeAndUpdate = (e) => {
    const countryCode = e.target.value;

    setDonor((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        country: countryCode,
      },
    }));

    handleCountryChange(e);
    handleChange(e);
  };

  const handleStateChangeAndUpdate = (e) => {
    const stateCode = e.target.value;

    setDonor((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        state: stateCode,
      },
    }));
    handleStateChange(e);
    handleChange(e);
  };


  const bloodGroup=["A+","A-","A1+","A1-","A1B+","A1B-","A2+","A2-","A2B+","A2B-","AB+","AB-","B+","B-","Bombay Blood Group","INRA","O+","O-"];

  return (
    <div className='add-donor-container'>
      <h3>Add Donor</h3>
      <form className='donor-form' onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={donor.name}
            onChange={handleChange}
            required
            placeholder='your name'
          />
        </div>
        <div>
          <label htmlFor="dob">DOB</label>
          <input type="date" 
            name="dob" 
            onChange={handleChange} value={donor.dob}/>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={donor.email}
            onChange={handleChange}
            required
            placeholder='your email'
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={donor.password}
            onChange={handleChange}
            required
            placeholder='password'
          />
        </div>
        <div>
          <label>Blood Group</label>
          <select
            name="bloodGroup"
            value={donor.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {bloodGroup.map((blood,i)=>{
              return <option key={i}>{blood}</option>
            })}
          </select>
        </div>
        <div>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={donor.phone}
            onChange={handleChange}
            required
            placeholder='phone number'
          />
        </div>

        <div className="detail">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="address.country"
            value={donor.address.country}
            onChange={handleCountryChangeAndUpdate}
            required
          >
            <option value="">Select</option>
            {countryNames.map((country, i) => (
              <option key={i} value={countryCodes[i]}>{country}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="state">State</label>
          <select id="state" name="address.state" value={donor.address.state} onChange={handleStateChangeAndUpdate} required>
            <option value="">Select</option>
            {states.map((state, i) => (
              <option value={state.isoCode} key={i}>{state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="detail">
          <label htmlFor="city">City</label>
          <select id="city" name="address.city" value={donor.address.city} onChange={handleChange} required>
            <option value="">Select</option>
            {city.map((city, i) => (
             <option key={i} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="avilability">Availability</label>
          <select name="availability" id="availability" value={donor.availability} onChange={handleChange}>
            <option value="available">available</option>
            <option value="unavailable">unavailable</option>
          </select>
        </div>
        <div className='register-butn'>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default Adddonor