import React from 'react'
import './contactus.css'

const Contactus = () => {

  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  return (
    <>
      <div className='container' id='contact-us'>
        <div className="contact-content">
          <p className='contact-title'>Contact Us</p>
          <div className="form">
            <form action="">
              <input type="text" placeholder='Enter your email'/>
              <textarea name="feedback" id="text" placeholder='Share your thoughts'></textarea>
              <button className='butn' onClick={handleSubmit}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contactus