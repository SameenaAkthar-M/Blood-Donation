import React from 'react'
import './header.css'
import assets from '../../assets/assets'
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const navigate=useNavigate();

  const handleDonor=()=>{
    navigate('/find-donor');
  }

  const handleDonate=()=>{
    navigate('/login');
  }

  return (
    <div className='header'>
      <div className="main-content">
        <div className="textual-content">
          <p className="title">Your Blood Can Be Someone's Lifeline!</p>
          <p className="sub-title">Save Lives, One Drop at a Time</p>
          <div className="buttons">
            <button className='butn b-1' onClick={handleDonate}>Donate</button>
            <button className='butn b-2' onClick={handleDonor}>Find Donor</button>
          </div>
        </div>
        <div className="main-image">
          <img src={assets.headerImg} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header