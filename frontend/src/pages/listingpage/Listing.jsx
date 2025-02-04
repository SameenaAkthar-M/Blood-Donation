import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './listing.css';

const API_BASE_URL = "http://localhost:3000";

const Listing = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [donors, setDonors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);

  const bloodGroup = queryParams.get("bloodGroup");
  const country = queryParams.get("country");
  const state = queryParams.get("state");
  const city = queryParams.get("city");

  useEffect(() => {
    const fetchData = async () => {
      console.log("Sending request with filters...");
      try {
        const res = await axios.get(`${API_BASE_URL}/api/user/donors`, {
          params: { bloodGroup, city, state, country },
        });
        console.log("Response received:", res);
  
        if (res.data.success) {
          setDonors(res.data.donors || []);
          setHospitals(res.data.hospitals || []);
          if (res.data.donors.length === 0) setError("No donors found.");
          if (res.data.hospitals.length === 0) setError("No hospitals found.");
        } else {
          setError(res.data.message || "Something went wrong.");
        }
  
        // Check if hospitals data exists
        if (res.data.hospitals && res.data.hospitals.length === 0) {
          setError("No hospitals found for the selected filters.");
        } else {
          setHospitals(res.data.hospitals || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err.response?.data || err.message);
        setError("Error fetching data. Please try again.");
      }
    };
  
    fetchData();
  }, [bloodGroup, city, state, country]);

  return (
    <div className="listing-container">
      <h2>Available Donors & Hospitals</h2>

      {error && <p className="error">{error}</p>}

      {/* Donors Table */}
      <h3>Donors</h3>
      {donors.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Phone</th>
              <th>City</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, i) => (
              <tr key={i}>
                <td>{donor.name}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.phone}</td>
                <td>{donor.address?.city || "N/A"}</td>
                <td>{donor.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Donors Found</p>
      )}

      {/* Hospitals Table */}
      <h3>Hospitals</h3>
      {hospitals.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Hospital Name</th>
              <th>Blood Group</th>
              <th>Phone</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital, i) => (
              <tr key={i}>
                <td>{hospital.name}</td>
                <td>{hospital.availability}</td>
                <td>{hospital.phone}</td>
                <td>{hospital.address?.city || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Hospitals Found</p>
      )}
    </div>
  );
};

export default Listing;
