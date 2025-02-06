import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import './list.css'
import { useNavigate } from 'react-router-dom'

const List = ({url}) => {
  const [list,setList]=useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    state: "",
    city: "",
    availability: ""
  });
  const navigate=useNavigate();

  useEffect(()=>{
    fetchDonorList();
  },[])

  const deleteDonor=async(id)=>{
    try{
      const res=await axios.delete(`${url}/api/admin/admin-donors/${id}`);
      if(res.data.success){
        toast.success("Donor removed successfully!");
        setList(list.filter(item=>item._id!==id));
      }
      else{
        toast.error("Failed to delete the donor");
      }
    } catch(error){
      toast.error("Error deleting donor");
      console.log(error);
    }
  }

  const fetchDonorList=async()=>{
    try {
      const res = await axios.get(`${url}/api/admin/admin-donors`);
      console.log(res.data);
  
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error(res.data.message || "Error fetching donors"); 
      }
    } catch (error) {
      toast.error("Network error! Unable to fetch donors");
    }
  }

  const handleUpdateClick = (donor) => {
    setSelectedDonor(donor);
    setUpdatedData({
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      phone: donor.phone,
      state: donor.address.state,
      city: donor.address.city,
      availability: donor.availability
    });
  };

  const updateDonor = async () => {
    if (!selectedDonor) {
      toast.error("No donor selected for update");
      return;
    }
  
    console.log("Updating Donor ID:", selectedDonor._id);
    console.log("Updated Data:", updatedData);
  
    try {
      const res = await axios.put(`${url}/api/admin/admin-donors/${selectedDonor._id}`, updatedData);
  
      if (res.data.success) {
        toast.success("Donor updated successfully!");
        setSelectedDonor(null);
        fetchDonorList();
      } else {
        toast.error("Failed to update the donor");
      }
    } catch (error) {
      toast.error("Error updating the donor");
      console.log(error);
    }
  };  

  return (
    <div className="donors-list">
      <div className="top">
        <h2>Donors List</h2>
        <button onClick={() => navigate('/add-donor')}>Add</button>
      </div>
      <div className='donors-header'>
        <b>S.No</b>
        <b>Name</b>
        <b>Blood Type</b>
        <b>Phone</b>
        <b>State</b>
        <b>City</b>
        <b>Availability</b>
        <b>Update</b>
        <b>Delete</b>
      </div>

      {list.map((item,i)=>{
        return (
          <div className="donor-row" key={i}>
            <p>{i+1}</p>
            <p>{item.name}</p>
            <p>{item.bloodGroup}</p>
            <p>{item.phone}</p>
            <p>{item.address.state}</p>
            <p>{item.address.city}</p>
            <p>{item.availability}</p>
            <a href="#" className="update-btn" onClick={()=>handleUpdateClick(item)}>Update</a>
            <a href="#" onClick={()=>deleteDonor(item._id)} className="delete-btn">Delete</a>
          </div>
        )
      })}

      {selectedDonor && (
        <div className="update-form">
          <h3>Update Donor</h3>
          <input type="text" value={updatedData.name} onChange={(e) => setUpdatedData({...updatedData, name: e.target.value})} placeholder="Name" />
          <input type="text" value={updatedData.bloodGroup} onChange={(e) => setUpdatedData({...updatedData, bloodGroup: e.target.value})} placeholder="Blood Group" />
          <input type="text" value={updatedData.phone} onChange={(e) => setUpdatedData({...updatedData, phone: e.target.value})} placeholder="Phone" />
          <input type="text" value={updatedData.state} onChange={(e) => setUpdatedData({...updatedData, state: e.target.value})} placeholder="State" />
          <input type="text" value={updatedData.city} onChange={(e) => setUpdatedData({...updatedData, city: e.target.value})} placeholder="City" />
          <input type="text" value={updatedData.availability} onChange={(e) => setUpdatedData({...updatedData, availability: e.target.value})} placeholder="Availability" />
          <button onClick={updateDonor}>Save Changes</button>
          <button onClick={() => setSelectedDonor(null)}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default List