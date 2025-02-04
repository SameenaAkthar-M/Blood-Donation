import React from 'react'
import Navbar from './components/navbar/Navbar'
import { ToastContainer } from 'react-toastify'
import {Routes, Route} from 'react-router-dom'
import List from './pages/list_page/List'
import Hospitals from './pages/hospital_list/Hospitals'

const App = () => {

  const url="http://localhost:3000"

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/admin-donors' element={<List url={url}/>}></Route>
        <Route path='/admin-hospitals' element={<Hospitals url={url}/>}></Route>
      </Routes>
    </div>
  )
}

export default App