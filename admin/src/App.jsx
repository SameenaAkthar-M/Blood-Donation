import React, { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import { ToastContainer } from 'react-toastify'
import {Routes, Route, useNavigate} from 'react-router-dom'
import List from './pages/list_page/List'
import Hospitals from './pages/hospital_list/Hospitals'
import Adddonor from './pages/add_donor/Adddonor'
import Addhospital from './pages/addHospital/Addhospital'

const App = () => {

  const url="http://localhost:3000"
  const navigate=useNavigate();
  useEffect(()=>{
    navigate('/admin-donors')
  },[])

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/admin-donors' element={<List url={url}/>}></Route>
        <Route path='/admin-hospitals' element={<Hospitals url={url}/>}></Route>
        <Route path='/add-donor' element={<Adddonor url={url}/>}></Route>
        <Route path='/add-hospital' element={<Addhospital url={url}/>}></Route>
      </Routes>
    </div>
  )
}

export default App