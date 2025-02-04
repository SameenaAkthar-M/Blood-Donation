import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import './hospital.css'

const Hospitals = ({url}) => {
  const [list,setList]=useState([]);

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

  return (
    <div className="hospitals-list">
      <h2>Hospital List</h2>
      <div className='hospitals-header'>
        <b>S.No</b>
        <b>Hospital Name</b>
        <b>Blood Type</b>
        <b>Phone</b>
        <b>State</b>
        <b>City</b>
        <b>Update</b>
        <b>Delete</b>
      </div>

      {list.length > 0 ? (
  list.map((item, i) => (
    <div className="hospitals-row" key={item._id || i}>
      <p>{i + 1}</p>
      <p>{item.name || "N/A"}</p>
      <p>{item.availability || "N/A"}</p>
      <p>{item.phone || "N/A"}</p>
      <p>{item.address?.state || "N/A"}</p>
      <p>{item.address?.city || "N/A"}</p>
      <a href="#" className="update-btn">Update</a>
      <a href="#" onClick={()=>deleteHospital(item._id)} className="delete-btn">Delete</a>
    </div>
  ))
) : (
  <p>No data found.</p>
)}
    </div>
  )
}

export default Hospitals