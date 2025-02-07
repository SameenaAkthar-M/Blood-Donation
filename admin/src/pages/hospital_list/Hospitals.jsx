import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import './hospital.css'
import { useNavigate } from 'react-router-dom'

const Hospitals = ({url}) => {
  const [list,setList]=useState([]);
  const [selectedHospital,setSelectedHospital] = useState(null);
    const [updatedData, setUpdatedData] = useState({
      name: "",
      phone: "",
      state: "",
      city: "",
      availability: ""
    });
    const navigate=useNavigate();

  useEffect(()=>{
    fetchHospitalList();
  },[])

  const deleteHospital=async(id)=>{
    try{
      const res=await axios.delete(`${url}/api/admin/admin-hospitals/${id}`);
      if(res.data.success){
        toast.success("Hospital removed successfully!");
        setList(list.filter(item=>item._id!==id));
      }
      else{
        toast.error("Failed to delete the hospital");
      }
    } catch(error){
      toast.error("Error deleting hospital");
      console.log(error);
    }
  }

  const fetchHospitalList=async()=>{
    try {
      const res = await axios.get(`${url}/api/admin/admin-hospitals`);
      console.log(res.data);
  
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error(res.data.message || "Error fetching hospitals"); 
      }
    } catch (error) {
      toast.error("Network error! Unable to fetch hospitals");
    }
  }

  const handleUpdateClick=(hospital)=>{
    setSelectedHospital(hospital);
    setUpdatedData({
      name:hospital.name,
      phone:hospital.phone,
      state:hospital.address.state,
      city:hospital.address.city,
      availability:hospital.availability
    })
  }

  const updateHospital=async()=>{
    if(!selectedHospital){
      toast.error("No hospital selected for update");
      return;
    }
    try{
      const res = await axios.put(`${url}/api/admin/admin-hospitals/${selectedHospital._id}`, updatedData);

      if(res.data.data){
        toast.success("Hospital updated successfully!");
        setSelectedHospital(null);
        fetchHospitalList();
      }
      else{
        toast.error("Failed to update the hospital")
      }
    } catch(error){
      toast.error("Error updating the hospital");
      console.log(error);
    }
  }

  return (
    <div className="hospitals-list container">
      <div className="top">
        <h2>Hospital List</h2>
        <button onClick={() => navigate('/add-hospital')}>Add</button>
      </div>

      {/* Table Structure */}
      <div className="table-container">
        <table className="hospitals-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Hospital Name</th>
              <th>Availability</th>
              <th>Phone</th>
              <th>State</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, i) => (
              <tr key={i}>
                <td className='sno'>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.availability}</td>
                <td>{item.phone}</td>
                <td>{item.address.state}</td>
                <td>{item.address.city}</td>
                <td>
                  <div className="buttons">
                    <button className="update-btn" onClick={() => handleUpdateClick(item)}>Update</button>
                    <button className="delete-btn" onClick={() => deleteHospital(item._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Update Form */}
        {selectedHospital && (
          <div className="update-form">
            <h3>Update Hospital</h3>
            <input type="text" value={updatedData.name} onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })} placeholder="Name" />
            <input type="text" value={updatedData.phone} onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })} placeholder="Phone" />
            <input type="text" value={updatedData.state} onChange={(e) => setUpdatedData({ ...updatedData, state: e.target.value })} placeholder="State" />
            <input type="text" value={updatedData.city} onChange={(e) => setUpdatedData({ ...updatedData, city: e.target.value })} placeholder="City" />
            <input type="text" value={updatedData.availability} onChange={(e) => setUpdatedData({ ...updatedData, availability: e.target.value })} placeholder="Availability" />
            <button onClick={updateHospital}>Save Changes</button>
            <button onClick={() => setSelectedHospital(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hospitals