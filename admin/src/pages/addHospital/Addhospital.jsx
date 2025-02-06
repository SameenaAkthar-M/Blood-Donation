import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import useLocationData from '../../hooks/useLocationData';
import './addhospital.css'

const Addhospital = ({url}) => {
  const {
    countryNames,
    countryCodes,
    states,
    city,
    handleCountryChange,
    handleStateChange,
  } = useLocationData();
  const [hospital,setHospital]=useState({
      userType:'hospital',
      name: '',
      email: '',
      password: '',
      phone:'',
      address: {
        city: '',
        state: '',
        country: '',
      },
      availability: ''
    })

    const navigate=useNavigate();
    
      const handleChange=(e)=>{
        const {name,value}=e.target;
        
        if(name.includes('address.')){
          const addressField = name.split(".")[1];
          setHospital((prev)=>({
          ...prev,
          address: {
            ...prev.address,
            [addressField]: value
          }
        }));
        }
        else{
          setHospital((prev) => ({
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
            userType:'hospital',
            name: hospital.name,
            email: hospital.email,
            password: hospital.password,
            phone: hospital.phone,
            address: hospital.address,
            availability: hospital.availability,
          }
          const res=await axios.post(`${url}/api/admin/admin-hospitals`,filteredFormData);
          if(res.data.success){
            toast.success("Hospital added successfully!");
            navigate('/admin-hospitals');
            setHospital({
              name: "",
              email: "",
              password: "",
              phone: "",
              address: { city: '', state: '', country: '' },
              availability: '',
            });
          }
          else{
            toast.error(res.data.message);
          }
        }catch (error) {
          toast.error('Error adding Hospital');
          console.error(error);
        }
      }

      const handleCountryChangeAndUpdate = (e) => {
        const countryCode = e.target.value;
    
        setHospital((prev) => ({
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
    
        setHospital((prev) => ({
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
    <div className='add-hospital-container'>
    <h3>Add Hospital</h3>
    <form className='hospital-form' onSubmit={handleSubmit}>
      <div>
        <label>Hospital Name</label>
        <input
          type="text"
          name="name"
          value={hospital.name}
          onChange={handleChange}
          required
          placeholder='Hospital Name'
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={hospital.email}
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
          value={hospital.password}
          onChange={handleChange}
          required
          placeholder='password'
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={hospital.phone}
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
          value={hospital.address.country}
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
        <select id="state" name="address.state" value={hospital.address.state} onChange={handleStateChangeAndUpdate} required>
          <option value="">Select</option>
          {states.map((state, i) => (
            <option value={state.isoCode} key={i}>{state.name}
            </option>
          ))}
        </select>
      </div>

      <div className="detail">
        <label htmlFor="city">City</label>
        <select id="city" name="address.city" value={hospital.address.city || ""} onChange={handleChange} required>
          <option value="">Select</option>
          {city.map((city, i) => (
           <option key={i} value={city.name}>{city.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="avilabliity">Availability</label>
          <select name="availability" id="availability" 
            value={hospital.availability} onChange={handleChange}>
              <option value="">Select Blood Availability</option>
              <option value="All">All</option>
                {bloodGroup.map((blood,i)=>{
                  return <option key={i}>{blood}</option>
                })}
                </select>
      </div>
      <div className='register-butn'>
        <button type="submit">Add</button>
      </div>
    </form>
  </div>
  )
}

export default Addhospital