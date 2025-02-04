import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import './list.css'

const List = ({url}) => {
  const [list,setList]=useState([]);

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

  return (
    <div className="donors-list">
      <h2>Donors List</h2>
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
            <a href="#" className="update-btn">Update</a>
            <a href="#" onClick={()=>deleteDonor(item._id)} className="delete-btn">Delete</a>
          </div>
        )
      })}
    </div>
  )
}

export default List