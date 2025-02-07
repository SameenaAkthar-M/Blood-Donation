import React, { useState } from 'react'
import useLocationData from '../../hooks/useLocationData';
import './finddonor.css'
import { fetchDonors } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const FindDonor = () => {
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

  const [filters,setFilters]=useState({
    bloodGroup:'',
    city:'',
    state:'',
    country:'',
  })

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    console.log("Selected value for", e.target.id, value);
    setFilters({ ...filters, [e.target.id]: value });
  };

  const handleSearch = async () => {
    console.log("Filters being sent:", filters); // Debugging
  
    if (!filters.bloodGroup || !filters.city || !filters.state || !filters.country) {
      alert("Please provide all filter details.");
      return;
    }
  
    try {
      const donors = await fetchDonors(filters);
      console.log("Donors received:", donors); // Debugging
  
      navigate(
        `/listings?bloodGroup=${encodeURIComponent(filters.bloodGroup)}&city=${encodeURIComponent(filters.city)}&state=${encodeURIComponent(filters.state)}&country=${encodeURIComponent(filters.country)}`
      );
      
    } catch (error) {
      alert("Failed to fetch donors. Please try again.");
    }
  };

  const handleCountryChangeAndUpdate = (e) => {
    const countryCode = e.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      country: countryCode,
      state: '',
      city: '',
    }));

    handleCountryChange(e);
    handleInputChange(e);
  };

  const handleStateChangeAndUpdate = (e) => {
    const stateCode = e.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      state: stateCode,
      city: '',
    }));
    handleStateChange(e);
    handleInputChange(e);
  };

  return (
    <div className='outer-container'>
      <div className="container main-cont">
        <div className="find-donor-container">
        <div className="form-title">
            <h3>Find Blood Donor</h3>
            </div>
          <div className="form-detail">
            <div className="detail">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select id="bloodGroup" onChange={handleInputChange}>
                <option value='Select'>Select</option>
                {bloodGroup.map((bg,i)=>{
                  return <option key={i}>{bg}</option>
                })}
              </select>
            </div>

            <div className="detail">
              <label htmlFor="country">Country</label>
              <select id="country" onChange={handleCountryChangeAndUpdate}>
                <option value="Select">Select</option>
                {countryNames.map((country,i)=>{
                  return <option key={i} value={countryCodes[i]} className='dropdown'>{country}</option>
                })}
              </select>
            </div>

            <div className="detail">
              <label htmlFor="state">State</label>
              <select id="state" onChange={handleStateChangeAndUpdate}>
                <option value="Select">Select</option>
                {states.map((state,i)=>{
                  return <option value={state.isoCode} key={i}>{state.name}</option>
                })}
              </select>
            </div>

            <div className="detail">
              <label htmlFor="city">City</label>
              <select id="city" onChange={handleInputChange}>
                <option value="Select">Select</option>
                {city.map((city,i)=>{
                  return <option key={i} value={city.name}>{city.name}</option>
                })}
              </select>
            </div>

            <button className="search-button butn" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindDonor