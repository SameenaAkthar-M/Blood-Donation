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

const App = () => {
  const [user, setUser] = useState(null);
  console.log("App User State:", user);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored User:', storedUser);  // Debugging

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('Parsed User:', parsedUser);  // Debugging
      } catch (error) {
        console.error('Error reading user data from localStorage', error);
        setUser(null);
      }
    } else {
      console.log('No user found in localStorage');  // Debugging
      setUser(null);
    }
  }, []);

  return (
    <>
      <div>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login setUser={setUser} />}/>
          <Route path='/find-donor' element={<FindDonor/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/f&q' element={<FandQ/>}/>
          <Route path="/listings" element={<Listing />} />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App