import {Routes,Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import FindDonor from './pages/findDonor/FindDonor.jsx'
import Register from './pages/register/Register.jsx'
import FandQ from './pages/f&q/FandQ.jsx'
import Footer from './components/footer/Footer.jsx'

const App = () => {
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/find-donor' element={<FindDonor/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/f&q' element={<FandQ/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App