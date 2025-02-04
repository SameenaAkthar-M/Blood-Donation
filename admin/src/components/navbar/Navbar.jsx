import {useState} from 'react'
import profile from '../../assets/profile_image.png'
import './navbar.css'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {

  const navigate=useNavigate();
  const [activeLink, setActiveLink] = useState('/admin-donors');

  const handleNavLink = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  return (
    <div className="nav-bar">
      <span className='logo'>RedPulse</span>
      <div className="nav-items">
      <Link
        to="/admin-donors"
        className={`nav-link ${activeLink==='/admin-donors' ? 'active':''}`}
        onClick={()=>{
          handleNavLink('/admin-donors')
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
      <div className="profile-image">
        <img src={profile} alt="" />
      </div>
    </div>
  )
}

export default Navbar