import React from 'react'
import './successstory.css'
import assets from '../../assets/assets'

const SuccessStory = () => {
  return (
    <>
      <p className='success-text'>Success Stories</p>
      <div className='container cards'>
        <div className="card">
          <img src={assets.p1} className="card-img-top" alt="..."/>
          <div className="card-body">
            <p className="card-text">Ravi, a 12-year-old boy, was born with thalassemia, a genetic blood disorder requiring monthly blood transfusions to survive. Since birth, Ravi has received over 100 units of blood from various donors. These transfusions have allowed him to attend school, play with his friends, and lead as normal a life as possible. Ravi’s parents often say,<strong>"Every blood donor is an angel in our lives."</strong></p>
          </div>
        </div>
        <div className="card">
          <img src={assets.p2} className="card-img-top" alt="..."/>
          <div className="card-body">
            <p className="card-text">Captain Arjun, an army officer, sustained critical injuries while serving in the line of duty. He required multiple surgeries and over 20 units of blood during his recovery. The timely donations of fellow soldiers and civilians ensured he survived. Captain Arjun now serves as an advocate for blood donation, emphasizing how it can save the lives of heroes on the battlefield.</p>
          </div>
        </div>
        <div className="card card-3">
          <img src={assets.p3} className="card-img-top" alt="..."/>
          <div className="card-body">
            <p className="card-text">A premature baby, born at just 28 weeks, was diagnosed with a severe case of anemia and jaundice. The infant’s tiny body couldn't produce enough blood cells to survive. After multiple blood transfusions provided by generous donors, the baby grew stronger and was eventually discharged from the hospital. Today, that child is a healthy 10-year-old, living a normal life thanks to life-saving blood donations.</p>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default SuccessStory