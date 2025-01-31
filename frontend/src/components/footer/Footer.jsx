import React from 'react'
import './footer.css'
import assets from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer-comp'>
      <div className="footer-content">
        <div className="left-footer">
          <h3>RedPulse</h3>
          <p className="content">
            Thank you for visiting our website! We really hope that you are also saving someone's life by giving blood.
          </p>
          <div className="right-footer">
            <h3>QUICK LINKS</h3>
            <div className="link">
              <a href="">Home | </a>
              <a href="">Find Donor | </a>
              <a href="">FAQ</a>
            </div>
          </div>
        </div>
        <hr />
        <p className='last'>Made by SAMEENA AKTHAR M</p>
      </div>
    </div>
  )
}

export default Footer