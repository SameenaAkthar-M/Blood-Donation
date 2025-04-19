import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./navbar.css";
import assets from "../../assets/assets.js";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setShowDropdown(false);
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    setActiveLink(location.pathname); // Update active link when route changes
  }, [location.pathname]);

  const toggleProfileDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleNavClick = (path) => {
      navigate(path);
  };

  const handleOnClick = () => {
    navigate("/profile");
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowDropdown(false);
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <span>RedPulse</span>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${activeLink === "/" ? "active" : ""}`}
                  onClick={() => handleNavClick("/")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/find-donor"
                  className={`nav-link ${
                    activeLink === "/find-donor" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/find-donor")}
                >
                  Find Donor
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/f&q"
                  className={`nav-link ${activeLink === "/f&q" ? "active" : ""}`}
                  onClick={() => handleNavClick("/f&q")}
                >
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact-us"
                  className={`nav-link ${
                    activeLink === "#contact-us" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("#contact-us")}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {!token ? (
            <button onClick={() => navigate("/login")} className="butn">
              Login/Register
            </button>
          ) : (
            <div className="navbar-profile">
              <img
                src={assets.profile}
                className="profile-image"
                alt=""
                onClick={toggleProfileDropdown}
              />
              {showDropdown && (
                <ul
                  className={`nav-profile-dropdown ${showDropdown ? "show" : ""}`}
                >
                  <li onClick={handleOnClick}>
                    <p>My Profile</p>
                  </li>
                  <hr />
                  <li onClick={handleLogout}>
                    <p>Logout</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
