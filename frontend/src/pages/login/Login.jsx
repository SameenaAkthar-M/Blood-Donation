import React, { useState } from 'react'
import './login.css'
import assets from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ({setUser}) => {
  const navigate = useNavigate();
  const [formData,setFormData]=useState({
    email:"",
    password:""
  });

  const handleInputChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post('/api/user/login',formData);
      if(res.data.success){
        const user = res.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', res.data.token);
        setUser(user);
        alert('Login Successful!');
        navigate('/');
      }else{
        alert(res.message || "Login Failesd");
      }
    } catch(error){
      alert("Login failed. Check credentials");
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
    <div className='login-bg'>
      <div className="side-image">
        <img src={assets.logSide} alt="" />
      </div>
      <div className='login-page'>
      <p className='login-title'>Login</p>
        <div className="user-type">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
            <label class="form-check-label" htmlFor="inlineRadio1">Donor</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
            <label class="form-check-label" htmlFor="inlineRadio2">Admin</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
            <label class="form-check-label" htmlFor="inlineRadio3">Hospital</label>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1" 
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" 
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"/>
          </div>
          <div className="toregister">
            <p className='link-to-register'>Don't have an account? <a href="/register">Register</a></p>
          </div>
          <div className="btn-styling">
          <button type="submit" class="btn btn-danger">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login