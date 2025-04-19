import {useEffect, useState} from 'react'
import profile from '../../assets/profile_image.png'
import './navbar.css'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {

  const navigate=useNavigate();
  const [activeLink, setActiveLink] = useState('/admin-donors');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNavLink = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  const toggleProfileDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleOnClick = () => {
    setShowDropdown(false);
  };

  const logout=()=>{
    window.open('http://localhost:5173');
  }

  return (
    <div className="nav-bar">
      <span className='logo'>RedPulse</span>
      <div className="nav-items">
      <Link
        to="/admin-donors"
        className={`nav-link ${activeLink==='/admin-donors' ? 'active':''}`}
        onClick={()=>{
          handleNavLink('/admin-donors')
          setShowDropdown(false);
        }}
      >Donors</Link>
      <Link
        to="/admin-hospitals"
        className={`nav-link ${activeLink==='/admin-hospitals' ? 'active':''}`}
        onClick={()=>{
          handleNavLink('/admin-hospitals')
        }}
      >Hospitals</Link>
      </div>
      <div className="navbar-profile">
        <img
          src={profile}
          className="profile-image"
          alt=""
          onClick={toggleProfileDropdown}
        />
        {showDropdown && (
          <ul
            className={`nav-profile-dropdown ${showDropdown ? "show" : ""}`}
          >
            <li onClick={handleOnClick}>
              <p>Logout</p>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Navbar