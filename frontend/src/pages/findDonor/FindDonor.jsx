import React, { useState } from 'react'
import useLocationData from '../../hooks/useLocationData';
import './finddonor.css'

const FindDonor = () => {
  
  const {
    countryNames,
    countryCodes,
    states,
    city,
    handleCountryChange,
    handleStateChange,
  } = useLocationData();

  const bloodGroup=["A+","A-","A1+","A1-","A1B+","A1B-","A2+","A2-","A2B+","A2B-","AB+","AB-","B+","B-","Bombay Blood Group","INRA","O+","O-"];

  return (
    <div>
      <div className="container">
        <div className="finddonor-form">
        <div className="form-title">
            <p>Find Blood Donor</p>
            </div>
          <div className="form-detail">
            <div className="detail">
              <label htmlFor="bld-grp">Blood Group</label>
              <select id="bld-grp">
                <option value='Select'>Select</option>
                {bloodGroup.map((bg,i)=>{
                  return <option key={i}>{bg}</option>
                })}
              </select>
            </div>

            <div className="detail">
              <label htmlFor="country">Country</label>
              <select id="country" onChange={handleCountryChange}>
                <option value="Select">Select</option>
                {countryNames.map((country,i)=>{
                  return <option key={i} value={countryCodes[i]}>{country}</option>
                })}
              </select>
            </div>

            <div className="detail">
              <label htmlFor="state">State</label>
              <select id="state" onChange={handleStateChange}>
                <option value="Select">Select</option>
                {states.map((state,i)=>{
                  return <option value={state.isoCode} key={i}>{state.name}</option>
                })}
              </select>
            </div>

            <div className="detail">
              <label htmlFor="city">City</label>
              <select id="city">
                <option value="Select">Select</option>
                {city.map((city,i)=>{
                  return <option key={i} value={city.name}>{city.name}</option>
                })}
              </select>
            </div>

            <button className="search-button butn">Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindDonor