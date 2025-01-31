import {useState} from 'react'

import './navbar.css'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate();
  const [activeLink, setActiveLink] = useState('/');

  const handleNavClick = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  const handleLoginBtn=()=>{
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button><span>RedPulse</span>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link
                  to="/"
                  className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
                  onClick={() => handleNavClick('/')}
                >Home</Link>
              </li>
              <li className="nav-item">
              <Link
                  to="/find-donor"
                  className={`nav-link ${activeLink === '/find-donor' ? 'active' : ''}`}
                  onClick={() => handleNavClick('/find-donor')}
                >Find Donor</Link>
              </li>
              <li className="nav-item">
              <Link
                  to="/f&q"
                  className={`nav-link ${activeLink === '/f&q' ? 'active' : ''}`}
                  onClick={() => handleNavClick('/f&q')}
                >FAQ</Link>
              </li>
              <li className="nav-item">
              <Link
                  to="#contact-us"
                  className={`nav-link ${activeLink === '#contact-us' ? 'active' : ''}`}
                  onClick={() => handleNavClick('#contact-us')}
                >Contact Us</Link>
              </li>
            </ul>
          </div>
          <button className='butn' onClick={handleLoginBtn}>Login/Register</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar