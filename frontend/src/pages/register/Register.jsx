import React from 'react'
import { useState } from 'react'
import { registerUser } from "../../utils/api.js";
import './register.css'
import useLocationData from '../../hooks/useLocationData';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userType,setUserType]=useState('donor');
  const [isFormVisible, setIsFormVisible] = useState(true);
  const navigate=useNavigate();

  const {
    countryNames,
    countryCodes,
    states,
    city,
    handleCountryChange,
    handleStateChange,
  } = useLocationData();

  const bloodGroup=["A+","A-","A1+","A1-","A1B+","A1B-","A2+","A2-","A2B+","A2B-","AB+","AB-","B+","B-","Bombay Blood Group","INRA","O+","O-"];

  const [formData,setFormData]=useState({
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
  });
  
  const handleRadioChange=(e)=>{
    setIsFormVisible(false);
    setUserType(e.target.value);
    setTimeout(() => {
      setUserType(e.target.value);
      setIsFormVisible(true);
    }, 1000);
  }

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    
    if(name.includes('address.')){
      const addressField = name.split(".")[1];
      setFormData({
      ...formData,
      address: {
        ...formData.address,
        [addressField]: value
      }
    });
    }
    else if (name === "availability") { 
      setFormData({
        ...formData,
        availability: value,
      });
    }
    else{
      setFormData({
        ...formData,
        [name]: value
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let filteredFormData;

      if(userType==="donor"){
        filteredFormData={
          userType,
          name: formData.name,
          dob: formData.dob,
          email: formData.email,
          password: formData.password,
          bloodGroup: formData.bloodGroup,
          phone: formData.phone,
          address: formData.address,
          availability: formData.availability,
        }
      }
      else if (userType === "hospital") {
        filteredFormData = {
          userType,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          availability: formData.availability,
        };
      }
      else if (userType === "admin") {
        filteredFormData = {
          userType,
          email: formData.email,
          password: formData.password,
        };
      }
      const response = await registerUser(filteredFormData);
      console.log("Registration Successful:", response);
      alert("User registered successfully!");

      setFormData({
        name: "",
        dob:"",
        email: "",
        password: "",
        bloodGroup: "",
        phone: "",
        address: { city: '', state: '', country: '' },
        availability: 'available',
      });
      navigate('/');
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  const handleCountryChangeAndUpdate = (e) => {
    const countryCode = e.target.value;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        country: countryCode,
      },
    }));

    handleCountryChange(e);
    handleInputChange(e);
  };

  const handleStateChangeAndUpdate = (e) => {
    const stateCode = e.target.value;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        state: stateCode,
      },
    }));
    handleStateChange(e);
    handleInputChange(e);
  };

  return (
      <div className="container">
        <div className="outer-page">
        <div className={`register-page ${isFormVisible ? 'show' : ''}`}>
          {isFormVisible && (
            <div className={`register-title ${isFormVisible ? 'show' : 'hidden'}`}>
              <h3>Registration Form</h3>
              <hr />
            </div>
              )}
          {/* User Type Selection Toggle */}
          
          <div className="user-type">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="donor"
              onChange={handleRadioChange}
              defaultChecked
              />
              <label className="form-check-label" htmlFor="inlineRadio1">Donor</label>
            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="admin"
              onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">Admin</label>
            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="hospital"
              onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">Hospital</label>
            </div>
          </div>
          {/* Donor registration form */}
          {userType==='donor' && isFormVisible && (
            <div className={`register-form ${isFormVisible ? 'show' : 'hidden'}`}>
              <form onSubmit={handleSubmit} className="donor-form">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder='your name'
                  />
                </div>
                <div>
                  <label htmlFor="dob">DOB</label>
                  <input type="date" 
                  name="dob" onChange={handleInputChange} value={formData.dob}/>
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder='your email'
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder='password'
                  />
                </div>
                <div>
                  <label>Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
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
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder='phone number'
                  />
                </div>

                <div className="detail">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleCountryChangeAndUpdate}
                    required
                  >
                    <option value="">Select</option>
                    {countryNames.map((country, i) => (
                      <option key={i} value={countryCodes[i]}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="state">State</label>
                  <select id="state" name="address.state" value={formData.address.state} onChange={handleStateChangeAndUpdate} required>
                    <option value="">Select</option>
                    {states.map((state, i) => (
                      <option value={state.isoCode} key={i}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    required
                    placeholder='city'
                  />
                </div>

                <div>
                  <label htmlFor="avilablity">Availability</label>
                  <select name="available" id="availability" 
                  value={formData.availability} onChange={handleInputChange}
                  >
                    <option value="available">available</option>
                    <option value="unavailable">unavailable</option>
                  </select>
                </div>
                <div className='register-butn'>
                  <button type="submit">Register</button>
                </div>
              </form>
            </div>
          )}
          {/* Admin registration form */}
          {userType==='admin' &&isFormVisible && (
            <div className={`register-form ${isFormVisible ? 'show' : 'hidden'}`}>
              <form onSubmit={handleSubmit} className="admin-form">
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder='email'
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder='password'
                  />
                </div>
                <div className='register-butn'>
                  <button type="submit">Register</button>
                </div>
              </form>
            </div>
          )}
          {/* Hospital registration form */}
          {userType==='hospital' &&isFormVisible && (
            <div className={`register-form ${isFormVisible ? 'show' : 'hidden'}`}>
              <form onSubmit={handleSubmit} className="hospital-form">
                <div>
                  <label>Hospital Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder='hospital name'
                  />
                </div>
                <div className='registration-detail'>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder='email'
                  />
                </div>
                <div className='registration-detail'>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder='password'
                  />
                </div>
                <div className='registration-detail'>
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder='phone number'
                  />
                </div>
                <div className="detail">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleCountryChangeAndUpdate}
                    required
                  >
                    <option value="">Select</option>
                    {countryNames.map((country, i) => (
                      <option key={i} value={countryCodes[i]}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="state">State</label>
                  <select id="state" name="address.state" value={formData.address.state} onChange={handleStateChangeAndUpdate} required>
                    <option value="">Select</option>
                    {states.map((state, i) => (
                      <option value={state.isoCode} key={i}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    required
                    placeholder='city'
                  />
                </div>

                <div>
                  <label htmlFor="avilablity">Availability</label>
                  <select name="availability" id="availability" 
                  value={formData.availability} onChange={handleInputChange}>
                  <option value="">Select Blood Availability</option>
                  <option value="All">All</option>
                    {bloodGroup.map((blood,i)=>{
                      return <option key={i}>{blood}</option>
                    })}
                  </select>
                </div>
                <div className='register-butn'>
                  <button type="submit">Register</button>
                </div>
              </form>
            </div>
          )}
        </div>
        </div>
      </div>
  )
}

export default Register