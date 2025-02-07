import React, { useEffect, useState } from 'react'
import './login.css'
import assets from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ({setUser}) => {
  const navigate = useNavigate();
  const [formData,setFormData]=useState({
    userType:'',
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
    console.log(formData)
    try{
      const res=await axios.post('/api/user/login',formData);
      console.log(res.data)

      if(res.data.success){
        const user = res.data.user;
        if (formData.userType === 'admin') {
          window.open('http://localhost:5174');
          navigate('/');
          return
        }
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', res.data.token);
        setUser(user);
        alert('Login Successful!');
        navigate('/');
        window.location.reload();
      }else{
        alert(res.message || "Login Failed");
      }
    } catch(error){
      alert("Login failed. Check credentials");
      console.error(error);
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
          <div className="form-check form-check-inline">
           <input className="form-check-input" type="radio" name="userType" id="inlineRadio1" value="donor" onChange={handleInputChange}
           defaultChecked/>
           <label className="form-check-label" htmlFor="inlineRadio1">Donor</label>
          </div>
          <div className="form-check form-check-inline">
           <input className="form-check-input" type="radio" name="userType" id="inlineRadio2" value="admin" onChange={handleInputChange}/>
           <label className="form-check-label" htmlFor="inlineRadio2">Admin</label>
          </div>
          <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="userType" id="inlineRadio3" value="hospital" onChange={handleInputChange}/>
          <label className="form-check-label" htmlFor="inlineRadio3">Hospital</label>
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
            <button type="submit" className="butn ">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login;