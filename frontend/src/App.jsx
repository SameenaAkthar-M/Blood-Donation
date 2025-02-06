import {Routes,Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import FindDonor from './pages/findDonor/FindDonor.jsx'
import Register from './pages/register/Register.jsx'
import FandQ from './pages/f&q/FandQ.jsx'
import Footer from './components/footer/Footer.jsx'
import { useState,useEffect } from 'react'
import Listing from './pages/listingpage/Listing.jsx'
import Profile from './pages/profile/Profile.jsx'
import Contactus from './components/contactus/Contactus.jsx'

const App = () => {
  const [user,setUser]=useState(null);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/> 
        <Route path='/find-donor' element={<FindDonor/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/f&q' element={<FandQ/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/listings" element={<Listing />} />
        <Route path="/contact-us" element={<Contactus />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App